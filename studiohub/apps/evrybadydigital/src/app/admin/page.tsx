'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { upsertSection, deleteSection as deleteSectionSvc } from '@/services/sectionService';
import type { SectionRecord } from '@/services/sectionService';
import type { Session } from '@supabase/supabase-js';
import MarkdownToasts from '@/components/Toasts';
import SectionForm from '@/components/SectionForm';
import BookingsManager from '@/components/BookingsManager';
import { useRole } from '@/hooks/useRole';
import type { Business, SectionFormState, Toast } from '@/types';

export default function AdminPage() {
  const { isStaff, roleLoading } = useRole();
  const [session, setSession] = useState<Session | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  // Section Management States
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [sections, setSections] = useState<SectionRecord[]>([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [sectionForm, setSectionForm] = useState<SectionFormState>({
    title: '', page_slug: 'home', section_key: '', subtitle: '', content: '', position: 0, cta_text: '', cta_url: '', metadata: {}
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    supabase?.auth.getSession().then(({ data }) => {
      if (!mountedRef.current) return;
      setSession(data.session ?? null);
    });

    const { data: sub } = supabase?.auth.onAuthStateChange((_event, s) => {
      if (!mountedRef.current) return;
      setSession(s ?? null);
    }) ?? { data: null };

    return () => {
      mountedRef.current = false;
      sub?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      setBusinesses([]);
      return;
    }

    setLoading(true);
    fetch('/api/businesses', { headers: { Authorization: `Bearer ${session.access_token}` } })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((json) => setBusinesses(json.businesses ?? []))
      .catch(() => setMessage('Failed to load businesses'))
      .finally(() => setLoading(false));
  }, [session]);

  const pushToast = (message: string, type: Toast['type'] = 'info') => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
    setToasts((s) => [{ id, message, type }, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000);
  };

  async function fetchSectionsForBusiness(bizId: string) {
    setLoading(true);
    try {
      const token = session?.access_token;
      const res = await fetch(`/api/sections?business_id=${encodeURIComponent(bizId)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      const json = await res.json();
      if (res.ok) setSections(json.sections ?? []);
      else setFormError(json.message || 'Unable to fetch sections');
    } catch (err) {
      setFormError('Unable to fetch sections');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  function handleSelectBusiness(biz: Business | null) {
    setSelectedBusiness(biz);
    setSelectedPage('home');
    setSections([]);
    setSectionForm({ title: '', page_slug: 'home', section_key: '', subtitle: '', content: '', position: 0, cta_text: '', cta_url: '', metadata: {} });
    setFormError(null);
    if (biz?.id) fetchSectionsForBusiness(biz.id);
  }

  // Safe and precise Absolute URL structure verification
  function validateSectionForm(f: SectionFormState) {
    if (!f.title || f.title.trim().length < 2) return 'Title is required (min 2 chars)';
    if (!f.section_key || f.section_key.trim().length < 1) return 'Section key is required';
    if (!f.page_slug || f.page_slug.trim().length < 1) return 'Page slug is required';
    if (f.position != null && isNaN(Number(f.position))) return 'Position must be a number';

    if (f.cta_url && f.cta_url.trim()) {
      if (!/^https?:\/\/\S+/i.test(f.cta_url)) {
        return 'CTA URL must be a valid absolute path starting with http:// or https://';
      }
      try { new URL(f.cta_url); } catch (e) { return 'CTA URL is structured incorrectly'; }
    }
    return null;
  }

  async function handleSaveSection(e?: React.FormEvent) {
    e?.preventDefault();
    setFormError(null);
    if (!selectedBusiness) return setFormError('Select a business first');

    const validationError = validateSectionForm(sectionForm);
    if (validationError) return setFormError(validationError);

    setSaving(true);
    const isUpdate = !!sectionForm.id;
    const previousSectionsSnapshot = [...sections]; // State snapshot created

    // Generate strict temp identifier context
    const tempId = sectionForm.id ?? `temp-${Date.now()}`;
    const optimisticEntry = { ...sectionForm, id: tempId, business_id: selectedBusiness.id } as SectionRecord;

    setSections((currentSections) => {
      if (isUpdate) return currentSections.map((x) => (x.id === tempId ? optimisticEntry : x));
      return [...currentSections, optimisticEntry];
    });

    try {
      const payload = { ...sectionForm, business_id: selectedBusiness.id };
      const saved = await upsertSection(payload);

      setSections((currentSections) => currentSections.map((x) => (x.id === tempId ? saved : x)));
      setSectionForm({ title: '', page_slug: selectedPage, section_key: '', subtitle: '', content: '', position: 0, cta_text: '', cta_url: '', metadata: {} });
      pushToast('Section saved securely', 'success');
    } catch (err) {
      // Direct rollback to snapshot context upon rejection
      setSections(previousSectionsSnapshot);
      const msg = err instanceof Error ? err.message : 'Save sequence aborted';
      setFormError(msg);
      pushToast(msg, 'error');
    } finally {
      if (mountedRef.current) setSaving(false);
    }
  }

  async function handleDeleteSection(id: string) {
    if (!selectedBusiness) return setFormError('Select a business first');
    if (!confirm('Delete this section permanently?')) return;

    setSaving(true);
    const previousSectionsSnapshot = [...sections];
    setSections((s) => s.filter((x) => x.id !== id));

    try {
      await deleteSectionSvc(id);
      pushToast('Section deleted', 'success');
    } catch (err) {
      setSections(previousSectionsSnapshot); // Rollback
      const msg = err instanceof Error ? err.message : 'Deletion failure';
      setFormError(msg);
      pushToast(msg, 'error');
    } finally {
      if (mountedRef.current) setSaving(false);
    }
  }

  async function createBusiness(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return setMessage('Enter name');
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json.message || 'Failed to establish new business module');
      } else {
        setBusinesses((b) => [...b, json.business]);
        setNewName('');
        pushToast('Business created successfully', 'success');
      }
    } catch {
      setMessage('Network interaction failed');
    } finally {
      setLoading(false);
    }
  }

  const visibleSections = sections
    .filter((s) => s.page_slug === selectedPage)
    .sort((a, b) => Number(a.position ?? 0) - Number(b.position ?? 0));

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-alt text-ink px-6">
        <div className="max-w-md p-8 text-center">
          <p className="mb-4">You must <Link href="/login" className="underline text-brand hover:text-brand-dark">sign in</Link> to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt text-ink p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {roleLoading ? (
          <div className="py-16 text-center text-sm text-ink-muted">Checking access...</div>
        ) : !isStaff ? (
          <div className="py-16 text-center">
            <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
              <h1 className="text-xl font-semibold text-ink">Staff access only</h1>
              <p className="mt-3 text-sm text-ink-muted">
                This area is for Evrybady internal staff. Clients can manage their bookings from the client dashboard.
              </p>
              <Link
                href="/client"
                className="mt-7 inline-flex rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Go to my dashboard
              </Link>
            </div>
          </div>
        ) : (
        <>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-ink">Admin dashboard</h1>
          <p className="text-sm text-ink-muted">Signed in as {session.user?.email} · {isStaff ? 'Internal staff' : 'Client'}</p>
        </header>

        <form onSubmit={createBusiness} className="mb-10 flex gap-3">
          <label htmlFor="new-business-name" className="sr-only">New business name</label>
          <input
            id="new-business-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New business name"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-ink outline-none focus:border-brand"
          />
          <button disabled={loading} className="rounded-full bg-brand px-6 py-2.5 text-white font-medium transition hover:bg-brand-dark disabled:opacity-50">
            Create
          </button>
        </form>

        {message && <div role="status" className="mb-6 text-sm p-4 bg-white rounded-xl border border-gray-200 text-ink-muted">{message}</div>}

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-ink">Your businesses</h2>
          {loading && businesses.length === 0 ? (
            <div className="text-sm text-ink-faint">Loading engine instances…</div>
          ) : (
            <ul className="space-y-3">
              {businesses.map((b) => (
                <li key={b.id} className="rounded-xl border border-gray-200 bg-white p-4 text-sm flex justify-between items-center">
                  <span><strong className="text-ink">{b.name}</strong> <span className="text-xs text-ink-faint ml-2">({b.id})</span></span>
                </li>
              ))}
              {businesses.length === 0 && <li className="text-sm text-ink-faint italic">No businesses bound to this profile.</li>}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-ink">Manage sections</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="sr-only">Select business target context</span>
              <select
                aria-label="Select business"
                className="w-full border rounded-xl px-3 py-2.5 bg-white text-ink border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                onChange={(e) => {
                  const id = e.target.value;
                  const biz = businesses.find(b => b.id === id) ?? null;
                  handleSelectBusiness(biz);
                }}
                value={selectedBusiness?.id ?? ''}
              >
                <option value="">— Choose business —</option>
                {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </label>

            {selectedBusiness && (
              <SectionForm
                selectedBusiness={selectedBusiness}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                sectionForm={sectionForm}
                setSectionForm={setSectionForm}
                onSave={handleSaveSection}
                saving={saving}
                formError={formError}
                setFormError={setFormError}
                visibleSections={visibleSections}
                onDelete={handleDeleteSection}
              />
            )}
          </div>
        </section>

        <BookingsManager token={session.access_token} />

        <MarkdownToasts toasts={toasts} />
        </>
        )}
      </div>
    </div>
  );
}
