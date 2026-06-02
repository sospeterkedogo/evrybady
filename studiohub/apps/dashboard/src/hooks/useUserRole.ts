'use client';

import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { hasPermission, isAdminRole, type UserRole } from '@/lib/rbac';

/**
 * Hook to read the user's role from Supabase user_metadata.
 * Falls back to 'viewer' if no role is set.
 */
export function useUserRole() {
  const { user } = useAuth();

  const role: UserRole = useMemo(() => {
    const r = user?.user_metadata?.role as string | undefined;
    if (r === 'admin' || r === 'editor' || r === 'viewer') return r;
    return 'viewer';
  }, [user]);

  return {
    role,
    isAdmin: isAdminRole(role),
    can: (permission: string) => hasPermission(role, permission),
  };
}
