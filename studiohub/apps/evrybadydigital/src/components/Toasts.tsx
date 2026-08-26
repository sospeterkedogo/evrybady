'use client';

import React from 'react';

export type ToastItem = { id: string; message: string; type?: 'info' | 'success' | 'error' };

export default function Toasts({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div aria-live="polite" className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`max-w-sm rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
            t.type === 'success' ? 'bg-emerald-700' : t.type === 'error' ? 'bg-rose-700' : 'bg-slate-800'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
