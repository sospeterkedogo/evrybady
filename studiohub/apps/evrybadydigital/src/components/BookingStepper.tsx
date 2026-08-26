'use client';

import { BOOKING_STATUSES, STATUS_LABELS, statusStepIndex } from '@/lib/rbac';

export default function BookingStepper({ status }: { status: string }) {
  if (status === 'cancelled') {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700">
        This booking was cancelled.
      </div>
    );
  }

  const current = statusStepIndex(status);

  return (
    <ol className="flex items-center gap-1" aria-label="Booking progress">
      {BOOKING_STATUSES.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex flex-1 items-center gap-1">
            <div className="flex flex-col items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${
                  done
                    ? 'border-brand bg-brand text-white'
                    : active
                      ? 'border-brand bg-brand-soft text-brand-dark'
                      : 'border-gray-300 bg-white text-ink-faint'
                }`}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`hidden text-[11px] font-medium sm:block ${
                  active ? 'text-brand-dark' : done ? 'text-ink' : 'text-ink-faint'
                }`}
              >
                {STATUS_LABELS[step]}
              </span>
            </div>
            {i < BOOKING_STATUSES.length - 1 && (
              <span
                aria-hidden="true"
                className={`mx-0.5 mb-4 h-0.5 flex-1 rounded-full ${i < current ? 'bg-brand' : 'bg-gray-200'}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
