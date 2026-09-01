import type { ReactNode } from 'react';

// The booking page is interactive and must not be served from a stale
// prerendered cache after a deployment.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
