'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { services } from '@/lib/services';

// Keep the booking flow dynamic so the deployed Worker never serves a stale
// prerendered form after a release.
export const dynamic = 'force-dynamic';

function BookingContent() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled') === '1';

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeSubmitted, setFreeSubmitted] = useState(false);

  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const toggleService = (id: string) => {
    setFreeSubmitted(false);
    setError(null);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  async function handleDiscoverySubmit() {
    if (selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and project brief.');
      return;
    }

    setError(null);
    setLoading(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      services: selectedServices.map((s) => s.name),
      message: message.trim(),
    };

    try {
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const bookingData = await bookingResponse.json().catch(() => null);
      if (!bookingResponse.ok) {
        throw new Error(bookingData?.error || 'Unable to submit your request.');
      }

      setFreeSubmitted(true);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface-alt text-ink">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Hero */}
        <section className="py-24 lg:py-32">
          <div className="w-full">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-md shadow-black/5 sm:p-14">
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Discovery &amp; proposal</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Start with a free discovery call
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
                Tell us about your vision, requirements, and goals. We&apos;ll review your brief,
                meet for a free onboarding call, and create a tailored proposal for the work.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-3 text-sm text-ink-muted">
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  1. Share your brief
                </span>
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  2. Free discovery call
                </span>
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  3. Proposal before work begins
                </span>
              </div>
              <p className="mt-8 max-w-3xl text-sm leading-7 text-ink-muted">
                There&apos;s no charge to submit your brief or join the discovery call. The £100
                onboarding fee is only requested after you approve the proposal and we&apos;re ready to begin work.
              </p>
            </div>
          </div>
        </section>

        {cancelled && (
          <div role="status" className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-700">
            Your previous request was not sent. You can select a service and try again.
          </div>
        )}

        {/* Project interests */}
        <section id="project-interests" className="pb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-brand mb-5">What can we help with?</h2>
          <p className="mb-11 max-w-2xl text-ink-muted">
            Choose the areas that best match your project. We&apos;ll use these alongside your brief to prepare for the discovery call.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((svc) => {
              const isActive = selectedIds.includes(svc.id);
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => toggleService(svc.id)}
                  aria-pressed={isActive}
                  className={`group relative min-h-[148px] rounded-2xl border p-7 text-left transition ${
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
                  <span className="block text-lg font-semibold text-ink pr-16">{svc.name}</span>
                  <span className="mt-3 block text-sm leading-7 text-ink-muted">{svc.description}</span>
                  <span className="mt-4 block text-sm font-medium text-brand-dark">{svc.priceRange}</span>
                  {isActive && (
                    <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-brand" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Discovery brief */}
        {selectedServices.length > 0 && !freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-gray-200 bg-white p-9 shadow-sm md:p-12">
                <h2 className="text-2xl font-semibold text-ink">Your project brief</h2>
                <p className="mt-3 text-sm text-ink-muted">
                  Give us the context we need for a useful, free discovery call.
                </p>

                <form className="mt-9 space-y-6" onSubmit={(event) => { event.preventDefault(); void handleDiscoverySubmit(); }}>
                  <div>
                    <label htmlFor="booking-name" className="sr-only">Your name</label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="sr-only">Your email</label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="Your email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="sr-only">Phone number (optional)</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="Phone number (optional)"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-company" className="sr-only">Company or organisation (optional)</label>
                    <input
                      id="booking-company"
                      type="text"
                      placeholder="Company or organisation (optional)"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-message" className="sr-only">Project brief</label>
                    <textarea
                      id="booking-message"
                      placeholder="Tell us about your vision, requirements, goals, and ideal timeline"
                      rows={6}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-surface-alt p-9 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-ink-faint">Selected packages</p>
                  <div className="mt-5 space-y-5">
                    {selectedServices.map((svc) => (
                      <div key={svc.id} className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-ink">{svc.name}</h3>
                          <button
                            type="button"
                            onClick={() => toggleService(svc.id)}
                            className="shrink-0 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-ink-muted transition hover:border-rose-300 hover:text-rose-700"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-muted">{svc.description}</p>
                        <p className="mt-3 text-sm font-medium text-brand-dark">{svc.priceRange}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-xl border border-brand/20 bg-brand-soft/40 p-5">
                    <p className="text-sm font-semibold text-ink">What happens next</p>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">
                      We&apos;ll review your brief, arrange your free call, then send a proposal. The £100 onboarding fee is due only if you approve the proposal and choose to start.
                    </p>
                  </div>
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleDiscoverySubmit}
                  disabled={loading}
                  className="w-full min-h-[52px] rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending your brief...' : 'Request free discovery call'}
                </button>

                <p className="text-center text-xs text-ink-faint">
                  No payment is required now. We&apos;ll be in touch to arrange your call.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Free service submitted confirmation */}
        {freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="mx-auto max-w-xl rounded-3xl border border-brand/30 bg-brand-soft p-10 text-center shadow-md shadow-black/5 md:p-12">
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-ink">Request received</h2>
              <p className="mt-4 text-ink-muted leading-7">
                Thank you, {name}. We&apos;ve received your request for:{' '}
                <span className="font-medium text-ink">
                  {selectedServices.map((s) => s.name).join(', ')}
                </span>
                . Our team will be in touch shortly to arrange your free discovery call and discuss the next steps.
              </p>
              <Link
                href="/"
                className="mt-9 inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Back to home
              </Link>
            </div>
          </section>
        )}

        {/* CTA section at bottom */}
        {selectedServices.length === 0 && !freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="rounded-3xl border border-gray-200 bg-surface-alt p-10 text-center shadow-md shadow-black/5 md:p-16">
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Not sure what you need?</p>
              <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">Start with a free discovery call</h2>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-ink-muted leading-8">
                Select the services you&apos;re interested in, then share your vision, requirements,
                and goals. We&apos;ll discuss the right next steps together before any work begins.
              </p>
              <a
                href="#project-interests"
                className="mt-9 inline-flex rounded-full bg-brand px-9 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Choose project areas
              </a>
              <p className="mt-4 text-center text-xs text-ink-faint">
                The £100 onboarding fee is only due once you approve the proposal and work begins.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-surface-alt text-ink">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
              <div className="w-full text-center text-ink-muted">Loading booking...</div>
            </section>
          </div>
        </main>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
