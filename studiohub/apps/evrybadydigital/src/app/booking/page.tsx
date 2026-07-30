'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  isFree?: boolean;
}

const services: Service[] = [
  {
    id: 'website-design',
    name: 'Website Design & Development',
    description:
      'Bespoke brochure websites, CMS builds, e-commerce, bookings, and integrations.',
    priceRange: '£1,500 – £10,000+',
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity & Rebranding',
    description:
      'Logo design, brand guidelines, messaging, visual identity systems, and full rebrands.',
    priceRange: '£300 – £2,000',
  },
  {
    id: 'corporate-profiles',
    name: 'Corporate Profiles & Digital Assets',
    description:
      'Pitch decks, company profiles, presentation templates, and social media asset packs.',
    priceRange: '£300 – £1,200',
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    description:
      'Content creation, posting, community management, paid social, and video content.',
    priceRange: '£500 – £3,000/month',
  },
  {
    id: 'seo',
    name: 'SEO Services',
    description:
      'Monthly SEO retainers and one-off SEO audits to improve rankings and organic traffic.',
    priceRange: '£250 – £2,000/month',
  },
  {
    id: 'google-ads',
    name: 'Google Ads & PPC Management',
    description:
      'PPC management, campaign optimisation, and paid search audits.',
    priceRange: '£200 – £1,500/month',
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation Campaigns',
    description:
      'B2B lead generation campaigns designed to attract qualified enquiries.',
    priceRange: '£800 – £2,500/month',
  },
  {
    id: 'creative-retainers',
    name: 'Creative Design Retainers',
    description:
      'Ongoing graphic design support for marketing, social media, and sales materials.',
    priceRange: '£500 – £2,000/month',
  },
  {
    id: 'marketing-consultancy',
    name: 'Marketing Consultancy & Strategy',
    description:
      'One-off strategy sessions and ongoing advisory support.',
    priceRange: '£300 – £1,500/month',
  },
  {
    id: 'website-health-check',
    name: 'Free Website Health Check',
    description:
      'Get a professional review of your website\'s SEO, performance, user experience, and online presence.',
    priceRange: 'Usually £100 – £250',
    isFree: true,
  },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled') === '1';

  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeSubmitted, setFreeSubmitted] = useState(false);

  const selectedService = services.find((s) => s.id === selected);
  const isFree = selectedService?.isFree === true;

  const feeDisplay = () => {
    const raw = process.env.NEXT_PUBLIC_BOOKING_FEE_GBP ?? '5000';
    const gbp = Number(raw) / 100;
    return `£${gbp}`;
  };

  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL || 'https://buy.stripe.com/7sY8wP2GtdE87zhfpFes000';

  async function handleCheckout() {
    if (!selectedService || !name.trim() || !email.trim()) {
      setError('Please select a service and fill in your name and email.');
      return;
    }

    setError(null);
    setLoading(true);

    if (isFree) {
      setFreeSubmitted(true);
      setLoading(false);
      return;
    }

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: selectedService.name,
          message: message.trim(),
        }),
      });

      window.location.href = stripePaymentLink;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface-alt text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Hero */}
        <section className="py-24 lg:py-32">
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/25 sm:p-12">
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Book a consultation</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Digital Marketing Strategy Consultation
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
                Book a one-to-one digital marketing consultation tailored to your business goals.
                During this session, we&apos;ll assess your current online presence, identify growth
                opportunities, and provide actionable recommendations to improve your brand visibility,
                generate qualified leads, and increase conversions.
              </p>

              <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.3em] text-white/40">
                Your consultation may include
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-white/70">
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

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                Whether you&apos;re launching a new business, looking to grow your existing brand,
                or need expert guidance on your marketing strategy, you&apos;ll leave with practical
                insights and a clear action plan.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  Duration: 60 minutes
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Format: Online (Google Meet or Zoom)
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Includes: Personalised recommendations and follow-up summary
                </span>
              </div>
            </div>
          </div>
        </section>

        {cancelled && (
          <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-300">
            Checkout was cancelled. You can select a service and try again.
          </div>
        )}

        {/* Service grid */}
        <section className="pb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-brand mb-6">Our Services &amp; Typical Investment</p>
          <p className="mb-10 max-w-2xl text-white/60">
            Transparent pricing for websites, branding, SEO, social media, and digital growth services.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((svc) => {
              const isActive = selected === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => {
                    setSelected(svc.id);
                    setFreeSubmitted(false);
                    setError(null);
                  }}
                  className={`group relative min-h-[148px] rounded-2xl border p-7 text-left transition ${
                    isActive
                      ? 'border-brand/50 bg-brand/[0.08] shadow-lg shadow-brand/10'
                      : 'border-white/10 bg-surface hover:border-white/20 hover:bg-surface-card'
                  }`}
                >
                  {svc.isFree && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
                      Free
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white pr-16">{svc.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{svc.description}</p>
                  <p className="mt-4 text-sm font-medium text-brand/80">{svc.priceRange}</p>
                  {isActive && (
                    <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-brand shadow-lg shadow-brand/50" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Contact form + checkout */}
        {selected && !freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-surface p-8 shadow-xl shadow-black/19">
                <h2 className="text-2xl font-semibold text-white">Your details</h2>
                <p className="mt-2 text-sm text-white/50">
                  {isFree
                    ? 'Fill in your details to book your free consultation.'
                    : `Fill in your details to proceed to checkout (${feeDisplay()} consultation fee).`}
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="booking-name" className="sr-only">Your name</label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-white/10 bg-surface-alt px-5 py-4 text-white outline-none placeholder:text-white/50 focus:border-brand/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="sr-only">Your email</label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-white/10 bg-surface-alt px-5 py-4 text-white outline-none placeholder:text-white/50 focus:border-brand/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="sr-only">Phone number (optional)</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[52px] rounded-xl border border-white/10 bg-surface-alt px-5 py-4 text-white outline-none placeholder:text-white/50 focus:border-brand/50"
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
                      className="w-full min-h-[52px] rounded-xl border border-white/10 bg-surface-alt px-5 py-4 text-white outline-none placeholder:text-white/50 focus:border-brand/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-surface-alt p-8 shadow-xl shadow-black/19">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">Selected service</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{selectedService?.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{selectedService?.description}</p>
                  <p className="mt-4 text-sm font-medium text-brand/80">{selectedService?.priceRange}</p>

                  {!isFree && (
                    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">Consultation fee</span>
                        <span className="text-lg font-semibold text-white">{feeDisplay()}</span>
                      </div>
                      <p className="mt-2 text-xs text-white/40">
                        This fee secures your consultation session.
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full min-h-[52px] rounded-full bg-brand px-8 py-4 text-sm font-semibold text-surface shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:bg-white hover:shadow-[0_14px_32px_rgba(247,231,166,0.16)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? 'Redirecting...'
                    : isFree
                      ? 'Book Free Consultation'
                      : `Proceed to Checkout — ${feeDisplay()}`}
                </button>

                <p className="text-center text-xs text-white/40">
                  {isFree
                    ? 'No payment required. We\'ll be in touch to confirm your slot.'
                    : 'You\'ll be redirected to Stripe to complete your payment securely.'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Free service submitted confirmation */}
        {freeSubmitted && (
          <section className="pb-24 lg:pb-32">
            <div className="mx-auto max-w-xl rounded-2xl border border-brand/30 bg-brand/[0.06] p-10 text-center shadow-xl shadow-black/19">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white">Request received</h2>
              <p className="mt-3 text-white/70 leading-7">
                Thank you, {name}. We&apos;ve received your request for a <span className="font-medium text-white">{selectedService?.name}</span>.
                Our team will be in touch shortly to confirm your free consultation slot.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-surface transition hover:bg-white"
              >
                Back to home
              </a>
            </div>
          </section>
        )}

        {/* CTA section at bottom */}
        {!selected && (
          <section className="pb-24 lg:pb-32">
            <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center shadow-xl shadow-black/18 md:p-14">
              <p className="text-sm uppercase tracking-[0.4em] text-brand">Not sure what you need?</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Book a free discovery call</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70 leading-8">
                We&apos;ll recommend the right website, branding, SEO, or marketing package for your goals.
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected('website-health-check');
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="mt-8 inline-flex rounded-full bg-brand px-8 py-4 text-sm font-semibold text-surface transition hover:bg-white"
              >
                Book My Free Call
              </a>
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
        <main className="min-h-screen bg-surface-alt text-white">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
              <div className="w-full text-center text-white/70">Loading booking...</div>
            </section>
          </div>
        </main>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
