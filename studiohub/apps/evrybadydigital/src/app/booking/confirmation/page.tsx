'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
          <div className="w-full">
            <div className="mx-auto max-w-xl rounded-3xl border border-brand/30 bg-brand-soft p-10 text-center shadow-md shadow-black/5 md:p-12">
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="text-3xl font-semibold text-ink">Request received</h1>

              {sessionId ? (
                <p className="mt-5 text-ink-muted leading-7">
                  Your payment was successful. We&apos;ll be in touch with the next steps for your project.
                </p>
              ) : (
                <p className="mt-5 text-ink-muted leading-7">
                  Your discovery brief has been received. Check your email for details about your free call.
                </p>
              )}

              <div className="mt-9 space-y-4">
                <Link
                  href="/"
                  className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Back to home
                </Link>
                <div>
                  <Link
                    href="/booking"
                    className="text-sm text-brand hover:text-brand-dark transition"
                  >
                    Submit another project brief
                  </Link>
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
        <main className="min-h-screen bg-white text-ink">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
              <div className="w-full text-center text-ink-muted">Loading...</div>
            </section>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
