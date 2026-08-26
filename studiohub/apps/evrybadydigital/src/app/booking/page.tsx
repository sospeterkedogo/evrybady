'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { services } from '@/lib/services';

function BookingContent() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled') === '1';

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeSubmitted, setFreeSubmitted] = useState(false);

  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const hasPaid = selectedServices.some((s) => !s.isFree);

  const feeDisplay = () => {
    const raw = process.env.NEXT_PUBLIC_BOOKING_FEE_GBP ?? '10000';
    const gbp = Number(raw) / 100;
    return `£${gbp}`;
  };

  const buyLink =
    process.env.NEXT_PUBLIC_STRIPE_BUY_LINK ||
    'https://buy.stripe.com/7sY8wP2GtdE87zhfpFes000';

  const toggleService = (id: string) => {
    setFreeSubmitted(false);
    setError(null);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  async function handleCheckout() {
    if (selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email.');
      return;
    }

    setError(null);
    setLoading(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      services: selectedServices.map((s) => s.name),
      message: message.trim(),
    };

    try {
      // Create the booking record first so the booking slot is always reserved,
      // independently of the Stripe onboarding call payment.
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const bookingData = await bookingResponse.json().catch(() => null);
      if (!bookingResponse.ok) {
        throw new Error(bookingData?.error || 'Unable to submit your request.');
      }

      // Paid services: proceed to Stripe for the onboarding call fee.
      if (hasPaid) {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (!response.ok || !data?.url) {
          throw new Error(data?.error || 'Unable to start checkout.');
        }

        window.location.assign(data.url);
        return;
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
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Book a consultation</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Digital Marketing Strategy Consultation
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
                Book a one-to-one digital marketing consultation tailored to your business goals.
                During this session, we&apos;ll assess your current online presence, identify growth
                opportunities, and provide actionable recommendations to improve your brand visibility,
                generate qualified leads, and increase conversions.
              </p>

              <p className="mt-8 max-w-3xl text-sm uppercase tracking-[0.3em] text-ink-faint">
                Your consultation may include
              </p>
              <ul className="mt-5 max-w-3xl space-y-3 text-ink-muted">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Website and SEO review
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Social media strategy
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Branding and positioning advice
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Content marketing recommendations
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Paid advertising opportunities
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Lead generation strategy
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Marketing roadmap with next steps
                </li>
              </ul>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-muted">
                Whether you&apos;re launching a new business, looking to grow your existing brand,
                or need expert guidance on your marketing strategy, you&apos;ll leave with practical
                insights and a clear action plan.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4 text-sm text-ink-muted">
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  Duration: 60 minutes
                </span>
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Format: Online (Google Meet or Zoom)
                </span>
                <span className="flex items-center gap-2.5">
                  <svg className="h-5 w-5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Includes: Personalised recommendations and follow-up summary
                </span>
              </div>
            </div>
          </div>
        </section>

        {cancelled && (
          <div role="status" className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-700">
            Checkout was cancelled. You can select a service and try again.
          </div>
        )}

        {/* Service grid */}
        <section className="pb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-brand mb-5">Our Services &amp; Typical Investment</h2>
          <p className="mb-11 max-w-2xl text-ink-muted">
            Select the packages you&apos;re interested in. The consultation fee covers your onboarding call and is confirmed when you check out.
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

        {/* Contact form + checkout */}
        {selectedServices.length > 0 && !freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-gray-200 bg-white p-9 shadow-sm md:p-12">
                <h2 className="text-2xl font-semibold text-ink">Your details</h2>
                <p className="mt-3 text-sm text-ink-muted">
                  {hasPaid
                    ? `Fill in your details to proceed to checkout (${feeDisplay()} onboarding call fee).`
                    : 'Fill in your details to book your free consultation.'}
                </p>

                <div className="mt-9 space-y-6">
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
                    <label htmlFor="booking-message" className="sr-only">Project details (optional)</label>
                    <textarea
                      id="booking-message"
                      placeholder="Tell us about your project (optional)"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
                    />
                  </div>
                </div>
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

                  {hasPaid && (
                    <div className="mt-7 rounded-xl border border-gray-200 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ink-muted">Onboarding call fee</span>
                        <span className="text-lg font-semibold text-ink">{feeDisplay()}</span>
                      </div>
                      <p className="mt-2 text-xs text-ink-faint">
                        This fee secures your consultation session.
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full min-h-[52px] rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? 'Redirecting...'
                    : hasPaid
                      ? `Proceed to Checkout — ${feeDisplay()}`
                      : 'Book Free Consultation'}
                </button>

                <p className="text-center text-xs text-ink-faint">
                  {hasPaid
                    ? 'You\'ll be redirected to Stripe to complete your payment securely.'
                    : 'No payment required. We\'ll be in touch to confirm your slot.'}
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
                . Our team will be in touch shortly to confirm your free consultation slot.
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
        {selectedServices.length === 0 && (
          <section className="pb-24 lg:pb-32">
            <div className="rounded-3xl border border-gray-200 bg-surface-alt p-10 text-center shadow-md shadow-black/5 md:p-16">
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Not sure what you need?</p>
              <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">Book your £100 onboarding consultation</h2>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-ink-muted leading-8">
                We&apos;ll assess your current online presence and recommend the right website,
                branding, SEO, or marketing package for your goals. Payment is taken securely
                through Stripe when you book.
              </p>
              <a
                href={buyLink}
                className="mt-9 inline-flex rounded-full bg-brand px-9 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Book My £100 Consultation
              </a>
              <p className="mt-4 text-center text-xs text-ink-faint">
                You&apos;ll be redirected to Stripe to complete your payment securely.
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
