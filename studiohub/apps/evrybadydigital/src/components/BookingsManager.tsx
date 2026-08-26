'use client';

import { useEffect, useState, useCallback } from 'react';
import { BOOKING_STATUSES, STATUS_LABELS, STATUS_COLORS } from '@/lib/rbac';
import { services } from '@/lib/services';

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

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BookingsManager({ token }: { token: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Create-on-behalf form
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [bookMessage, setBookMessage] = useState('');
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings?all=true', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unable to load bookings');
      const json = await res.json();
      setBookings(json.bookings ?? []);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    Promise.resolve().then(loadBookings);
  }, [loadBookings]);

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  async function updateBooking(id: string, updates: Record<string, unknown>) {
    setSavingId(id);
    setMessage(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, ...updates }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Update failed');
      setBookings((prev) => prev.map((b) => (b.id === id ? json.booking : b)));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSavingId(null);
    }
  }

  async function deleteBooking(id: string) {
    if (!confirm('Delete this booking permanently?')) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/bookings?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function createBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!clientEmail.trim() || !clientName.trim() || selectedServices.length === 0) {
      setMessage('Client email, name, and at least one service are required.');
      return;
    }
    setCreating(true);
    setMessage(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: clientName.trim(),
          email: clientEmail.trim(),
          phone,
          company,
          services: selectedServices.map((id) => services.find((s) => s.id === id)?.name ?? id),
          message: bookMessage,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Unable to create booking');
      setClientEmail('');
      setClientName('');
      setPhone('');
      setCompany('');
      setSelectedServices([]);
      setBookMessage('');
      setShowCreate(false);
      setMessage('Booking created.');
      loadBookings();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setCreating(false);
    }
  }

  const counts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink">Booking management</h2>
          <p className="text-sm text-ink-muted">Update client progress: pending call → proposal → delivery.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate((v) => !v)}
          className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          {showCreate ? 'Close form' : '+ Create booking'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={createBooking} className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-base font-semibold text-ink">Book a service on behalf of a client</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bm-name" className="sr-only">Client name</label>
              <input
                id="bm-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client name"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="bm-email" className="sr-only">Client email</label>
              <input
                id="bm-email"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Client email"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="bm-phone" className="sr-only">Phone (optional)</label>
              <input
                id="bm-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="bm-company" className="sr-only">Company (optional)</label>
              <input
                id="bm-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((svc) => {
              const isActive = selectedServices.includes(svc.id);
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() =>
                    setSelectedServices((prev) =>
                      prev.includes(svc.id) ? prev.filter((s) => s !== svc.id) : [...prev, svc.id],
                    )
                  }
                  aria-pressed={isActive}
                  className={`rounded-xl border p-4 text-left transition ${
                    isActive ? 'border-brand bg-brand-soft' : 'border-gray-200 bg-white hover:border-brand/40'
                  }`}
                >
                  <span className="block text-sm font-semibold text-ink">{svc.name}</span>
                  <span className="mt-1 block text-xs text-ink-faint">{svc.priceRange}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <label htmlFor="bm-message" className="sr-only">Message (optional)</label>
            <textarea
              id="bm-message"
              value={bookMessage}
              onChange={(e) => setBookMessage(e.target.value)}
              placeholder="Message (optional)"
              rows={3}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>

          <button
            type="submit"
            disabled={creating}
            className="mt-6 inline-flex rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {creating ? 'Creating...' : 'Create booking'}
          </button>
        </form>
      )}

      {message && (
        <div role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-700">
          {message}
        </div>
      )}

      {/* Status filter */}
      <div className="mt-7 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            filter === 'all' ? 'bg-brand text-white' : 'border border-gray-300 text-ink-muted hover:text-ink'
          }`}
        >
          All ({bookings.length})
        </button>
        {BOOKING_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
              filter === s ? 'bg-brand text-white' : 'border border-gray-300 text-ink-muted hover:text-ink'
            }`}
          >
            {STATUS_LABELS[s]} ({counts[s] ?? 0})
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFilter('cancelled')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            filter === 'cancelled' ? 'bg-brand text-white' : 'border border-gray-300 text-ink-muted hover:text-ink'
          }`}
        >
          Cancelled ({counts.cancelled ?? 0})
        </button>
      </div>

      {/* Bookings list */}
      {loading ? (
        <div className="mt-6 text-sm text-ink-faint">Loading bookings…</div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-ink-muted">
          No bookings{filter !== 'all' ? ` with status "${STATUS_LABELS[filter]}"` : ''} yet.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((b) => (
            <article key={b.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-ink">{b.client_name}</h3>
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[b.status] ?? ''}`}>
                      {STATUS_LABELS[b.status] ?? b.status}
                    </span>
                    {b.client_id && <span className="text-xs text-ink-faint">registered client</span>}
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{b.client_email}</p>
                  <p className="mt-1 text-xs text-ink-faint">
                    {b.company && `Company: ${b.company} · `}
                    {b.phone && `Phone: ${b.phone} · `}
                    Booked {formatDate(b.created_at)}
                  </p>
                  <p className="mt-2 text-sm text-ink">{b.services.join(', ')}</p>
                  {b.message && <p className="mt-1 text-sm text-ink-muted">“{b.message}”</p>}
                  {b.project_name && (
                    <p className="mt-2 text-sm font-medium text-brand-dark">Project: {b.project_name}</p>
                  )}
                  {b.staff_note && (
                    <p className="mt-2 rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand-dark">
                      <span className="font-semibold">Note:</span> {b.staff_note}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:w-72">
                  <div>
                    <label htmlFor={`bm-status-${b.id}`} className="sr-only">Status</label>
                    <select
                      id={`bm-status-${b.id}`}
                      value={b.status}
                      disabled={savingId === b.id}
                      onChange={(e) => updateBooking(b.id, { status: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
                    >
                      {[...BOOKING_STATUSES, 'cancelled'].map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`bm-note-${b.id}`} className="sr-only">Staff note</label>
                    <input
                      id={`bm-note-${b.id}`}
                      defaultValue={b.staff_note ?? ''}
                      placeholder="Staff note (client sees this)"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          updateBooking(b.id, { staff_note: (e.target as HTMLInputElement).value });
                        }
                      }}
                      onBlur={(e) => updateBooking(b.id, { staff_note: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor={`bm-project-${b.id}`} className="sr-only">Project name</label>
                    <input
                      id={`bm-project-${b.id}`}
                      defaultValue={b.project_name ?? ''}
                      placeholder="Project name (optional)"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                      onBlur={(e) => updateBooking(b.id, { project_name: e.target.value })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteBooking(b.id)}
                    className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
