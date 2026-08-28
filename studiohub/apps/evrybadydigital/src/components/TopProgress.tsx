'use client';

import { useEffect, useState } from 'react';

export default function TopProgress() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    let showFrame: number | null = null;

    const show = () => {
      // History can be changed by Next during an insertion effect. Defer the
      // state update until the browser task queue so we never update React
      // while an insertion effect is running.
      if (showFrame != null) window.clearTimeout(showFrame);
      showFrame = window.setTimeout(() => setVisible(true), 0);
      if (timer != null) window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 1200);
    };

    type HistoryMethod = (data: unknown, title?: string, url?: string | null) => void;
    const originals: Partial<Record<'pushState' | 'replaceState', HistoryMethod>> = {};
    const patchHistory = (type: 'pushState' | 'replaceState') => {
      const orig = (history as unknown as Record<string, HistoryMethod>)[type];
      originals[type] = orig;
      (history as unknown as Record<string, HistoryMethod>)[type] = function (data: unknown, title?: string, url?: string | null) {
        orig.call(this, data, title, url);
        show();
      };
    };

    patchHistory('pushState');
    patchHistory('replaceState');
    window.addEventListener('popstate', show);

    return () => {
      window.removeEventListener('popstate', show);
      if (showFrame != null) window.clearTimeout(showFrame);
      if (timer != null) window.clearTimeout(timer);
      if (originals.pushState) history.pushState = originals.pushState as typeof history.pushState;
      if (originals.replaceState) history.replaceState = originals.replaceState as typeof history.replaceState;
    };
  }, []);

  return (
    <div aria-hidden className={`fixed left-0 top-0 z-50 h-1 w-full transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="h-1 w-full overflow-hidden">
        <div className="h-1 bg-linear-to-r from-brand-dark via-brand to-brand-dark animate-[progress_1.2s_ease-in-out]" style={{ width: visible ? '100%' : '0%' }} />
      </div>
      <style>{`@keyframes progress { 0% { transform: translateX(-100%);} 100% { transform: translateX(0%);} }`}</style>
    </div>
  );
}
