/**
 * Role-based access control (RBAC) for the Evrybady client portal.
 * Mirrors the StudioHub dashboard RBAC pattern.
 */

export type UserRole = 'client' | 'staff' | 'admin';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  staff: ['*'],
  client: ['bookings', 'profile'],
};

export function hasPermission(role: string, permission: string): boolean {
  const grants = ROLE_PERMISSIONS[role as UserRole];
  if (!grants) return false;
  if (grants[0] === '*') return true;
  return grants.includes(permission);
}

export function isStaffRole(role: string): boolean {
  return role === 'staff' || role === 'admin';
}

export function isAdminRole(role: string): boolean {
  return role === 'admin';
}

export function normalizeRole(role: unknown): UserRole {
  if (role === 'admin' || role === 'staff' || role === 'client') return role;
  return 'client';
}

/** Booking status pipeline — ordered from booking through to delivery. */
export const BOOKING_STATUSES = [
  'booked',
  'pending_call',
  'proposal_sent',
  'in_progress',
  'delivered',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number] | 'cancelled';

export const STATUS_LABELS: Record<string, string> = {
  booked: 'Booked',
  pending_call: 'Pending call',
  proposal_sent: 'Proposal sent',
  in_progress: 'In progress',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const STATUS_COLORS: Record<string, string> = {
  booked: 'bg-gray-100 text-ink-muted border-gray-300',
  pending_call: 'bg-amber-50 text-amber-700 border-amber-200',
  proposal_sent: 'bg-sky-50 text-sky-700 border-sky-200',
  in_progress: 'bg-brand-soft text-brand-dark border-brand/30',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

export function statusStepIndex(status: string): number {
  const idx = BOOKING_STATUSES.indexOf(status as (typeof BOOKING_STATUSES)[number]);
  return idx === -1 ? -1 : idx;
}
