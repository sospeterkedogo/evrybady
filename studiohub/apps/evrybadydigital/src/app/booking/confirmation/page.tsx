'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="min-h-screen bg-surface-alt text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
          <div className="w-full">
            <div className="mx-auto max-w-xl rounded-2xl border border-brand/30 bg-brand/[0.06] p-10 text-center shadow-xl shadow-black/25">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="text-3xl font-semibold text-white">Booking confirmed</h1>

              {sessionId ? (
                <p className="mt-4 text-white/70 leading-7">
                  Your payment was successful and your consultation has been booked.
                  Check your email for a confirmation with next steps.
                </p>
              ) : (
                <p className="mt-4 text-white/70 leading-7">
                  Your booking has been received. Check your email for confirmation details.
                </p>
              )}

              <div className="mt-8 space-y-3">
                <a
                  href="/"
                  className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-surface transition hover:bg-white"
                >
                  Back to home
                </a>
                <div>
                  <a
                    href="/booking"
                    className="text-sm text-white/50 hover:text-white transition"
                  >
                    Book another consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-surface-alt text-white">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
              <div className="w-full text-center text-white/70">Loading...</div>
            </section>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
