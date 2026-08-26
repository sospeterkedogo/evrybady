'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { services } from '@/lib/services';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/rbac';
import BookingStepper from '@/components/BookingStepper';

interface Booking {
  id: string;
  client_id: string | null;
  client_email: string;
  client_name: string;
  phone: string | null;
  company: string | null;
  services: string[];
  message: string | null;
  status: string;
  project_name: string | null;
  staff_note: string | null;
  created_at: string;
  updated_at: string;
}

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
}

type Tab = 'bookings' | 'book' | 'profile';

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ClientDashboard() {
  const { session, user, loading: authLoading } = useAuth();
  const { isStaff } = useRole();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile>({
    full_name: user?.user_metadata?.full_name ?? '',
    email: user?.email ?? '',
    phone: '',
    company: '',
  });
  const [tab, setTab] = useState<Tab>('bookings');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Book-a-service form
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bookMessage, setBookMessage] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookCompany, setBookCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const token = session?.access_token;

  const loadAll = useCallback(async () => {
    if (!token) return;
    try {
      const [bookRes, meRes] = await Promise.all([
        fetch('/api/bookings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (!bookRes.ok) throw new Error('Unable to load bookings');
      const bookJson = await bookRes.json();
      setBookings(bookJson.bookings ?? []);

      if (meRes.ok) {
        const meJson = await meRes.json();
        const p = meJson.profile;
        if (p) {
          setProfile({
            full_name: p.full_name ?? user?.user_metadata?.full_name ?? '',
            email: p.email ?? user?.email ?? '',
            phone: p.phone ?? '',
            company: p.company ?? '',
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    if (token) Promise.resolve().then(loadAll);
  }, [token, loadAll]);

  if (authLoading) {
    return (
      <main className="min-h-[70vh] bg-surface-alt text-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-center py-32 text-ink-muted">Loading dashboard...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-[70vh] bg-surface-alt text-ink">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-md shadow-black/5">
              <h1 className="text-2xl font-semibold text-ink">Client dashboard</h1>
              <p className="mt-4 text-ink-muted leading-7">
                Sign in to view your consultations, book services, and track progress through to delivery.
              </p>
              <Link
                href="/login"
                className="mt-8 inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Sign in
              </Link>
              <div className="mt-4">
                <Link href="/signup" className="text-sm text-brand underline hover:text-brand-dark">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
  const inProgress = activeBookings.filter((b) => b.status === 'in_progress');
  const delivered = activeBookings.filter((b) => b.status === 'delivered');

  async function createBooking(e: React.FormEvent) {
    e.preventDefault();
    if (selectedIds.length === 0) {
      setError('Please select at least one service.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: profile.full_name || user?.email,
          email: user?.email,
          phone: bookPhone,
          company: bookCompany,
          services: services.filter((s) => selectedIds.includes(s.id)).map((s) => s.name),
          message: bookMessage,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Unable to create booking');
      setSelectedIds([]);
      setBookMessage('');
      setBookPhone('');
      setNotice('Booking created. Our team will be in touch to confirm.');
      setTab('bookings');
      loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function cancelBooking(id: string) {
    if (!confirm('Cancel this booking?')) return;
    setError(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, status: 'cancelled' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Unable to cancel');
      setNotice('Booking cancelled.');
      loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancel failed');
    }
  }

  async function deleteBooking(id: string) {
    if (!confirm('Delete this booking permanently?')) return;
    setError(null);
    try {
      const res = await fetch(`/api/bookings?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unable to delete');
      setNotice('Booking deleted.');
      loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          full_name: profile.full_name,
          phone: profile.phone,
          company: profile.company,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Unable to update profile');
      setNotice('Profile updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSubmitting(false);
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bookings', label: 'Consultations & Projects' },
    { id: 'book', label: 'Book a service' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <main className="min-h-screen bg-surface-alt text-ink">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand">Client dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Welcome back, {profile.full_name || 'there'}
            </h1>
            <p className="mt-2 text-ink-muted">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {isStaff && (
              <Link
                href="/admin"
                className="inline-flex rounded-full border border-brand/30 bg-brand-soft px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand/10"
              >
                Staff admin
              </Link>
            )}
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Book on site
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink-muted">Active bookings</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{activeBookings.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink-muted">In progress</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{inProgress.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink-muted">Delivered</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{delivered.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-9 flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setError(null);
                setNotice(null);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === t.id ? 'bg-brand text-white' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {notice && (
          <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
            {notice}
          </div>
        )}
        {error && (
          <div role="alert" className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* ── Bookings tab ── */}
        {tab === 'bookings' && (
          <section className="mt-8 pb-8">
            {loading && bookings.length === 0 ? (
              <div className="text-ink-muted">Loading your bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-ink">No consultations yet</h2>
                <p className="mt-3 text-ink-muted">
                  Book a service to get started — our team will guide you through the process.
                </p>
                <button
                  type="button"
                  onClick={() => setTab('book')}
                  className="mt-6 inline-flex rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Book your first service
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => {
                  const cancellable = b.status === 'booked' || b.status === 'pending_call';
                  return (
                    <article key={b.id} className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-lg font-semibold text-ink">
                              {b.project_name || b.services[0]}
                            </h2>
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLORS[b.status] ?? STATUS_COLORS.booked}`}
                            >
                              {STATUS_LABELS[b.status] ?? b.status}
                            </span>
                            {b.status === 'in_progress' && (
                              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                                Project
                              </span>
                            )}
                            {b.status === 'delivered' && (
                              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Delivered project
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-ink-faint">
                            Booked {formatDate(b.created_at)} · {b.services.join(', ')}
                          </p>
                          {b.company && <p className="mt-1 text-sm text-ink-muted">{b.company}</p>}
                        </div>
                        <div className="flex shrink-0 gap-2">
                          {cancellable && (
                            <button
                              type="button"
                              onClick={() => cancelBooking(b.id)}
                              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-ink-muted transition hover:border-amber-300 hover:text-amber-700"
                            >
                              Cancel
                            </button>
                          )}
                          {b.status === 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => deleteBooking(b.id)}
                              className="rounded-full border border-rose-200 px-4 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-50"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-7">
                        <BookingStepper status={b.status} />
                      </div>

                      {b.message && (
                        <p className="mt-5 text-sm text-ink-muted">
                          <span className="font-medium text-ink">Your note:</span> {b.message}
                        </p>
                      )}
                      {b.staff_note && (
                        <div className="mt-5 rounded-xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm text-brand-dark">
                          <span className="font-semibold">Update from our team:</span> {b.staff_note}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ── Book a service tab ── */}
        {tab === 'book' && (
          <section className="mt-8 pb-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9">
              <h2 className="text-2xl font-semibold text-ink">Book a service</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Select the services you&apos;re interested in. We&apos;ll be in touch to arrange a consultation.
              </p>

              <form onSubmit={createBooking} className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((svc) => {
                    const isActive = selectedIds.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() =>
                          setSelectedIds((prev) =>
                            prev.includes(svc.id) ? prev.filter((s) => s !== svc.id) : [...prev, svc.id],
                          )
                        }
                        aria-pressed={isActive}
                        className={`relative min-h-[120px] rounded-2xl border p-5 text-left transition ${
                          isActive
                            ? 'border-brand bg-brand-soft shadow-md shadow-brand/10'
                            : 'border-gray-200 bg-white hover:border-brand/40 hover:shadow-md'
                        }`}
                      >
                        {svc.isFree && (
                          <span className="absolute right-4 top-4 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">
                            Free
                          </span>
                        )}
                        <span className="block pr-14 text-base font-semibold text-ink">{svc.name}</span>
                        <span className="mt-2 block text-xs leading-6 text-ink-muted">{svc.description}</span>
                        <span className="mt-3 block text-sm font-medium text-brand-dark">{svc.priceRange}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client-book-phone" className="sr-only">Phone number (optional)</label>
                    <input
                      id="client-book-phone"
                      type="tel"
                      value={bookPhone}
                      onChange={(e) => setBookPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="client-book-company" className="sr-only">Company (optional)</label>
                    <input
                      id="client-book-company"
                      type="text"
                      value={bookCompany}
                      onChange={(e) => setBookCompany(e.target.value)}
                      placeholder="Company (optional)"
                      autoComplete="organization"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="client-book-message" className="sr-only">Tell us about your project (optional)</label>
                  <textarea
                    id="client-book-message"
                    value={bookMessage}
                    onChange={(e) => setBookMessage(e.target.value)}
                    placeholder="Tell us about your project (optional)"
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || selectedIds.length === 0}
                  className="mt-7 inline-flex rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Booking...' : 'Book services'}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ── Profile tab ── */}
        {tab === 'profile' && (
          <section className="mt-8 pb-8">
            <div className="max-w-xl rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9">
              <h2 className="text-2xl font-semibold text-ink">Your profile</h2>
              <p className="mt-2 text-sm text-ink-muted">Keep your contact details up to date.</p>

              <form onSubmit={saveProfile} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="profile-email" className="sr-only">Email</label>
                  <input
                    id="profile-email"
                    type="email"
                    value={profile.email ?? ''}
                    disabled
                    className="w-full rounded-xl border border-gray-200 bg-surface-alt px-4 py-3 text-ink-muted outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="profile-name" className="sr-only">Full name</label>
                  <input
                    id="profile-name"
                    value={profile.full_name ?? ''}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="Full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="profile-phone" className="sr-only">Phone</label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={profile.phone ?? ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="Phone"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-company" className="sr-only">Company</label>
                    <input
                      id="profile-company"
                      value={profile.company ?? ''}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      placeholder="Company"
                      autoComplete="organization"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Save profile'}
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
