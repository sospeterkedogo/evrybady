'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';
import { fetchUserRole } from './useAuth';
import { isStaffRole, normalizeRole, type UserRole } from '@/lib/rbac';

export function useRole() {
  const { session, user, loading } = useAuth();
  const [role, setRole] = useState<UserRole>('client');
  const [roleResolved, setRoleResolved] = useState(false);

  useEffect(() => {
    if (!session?.access_token) return;
    let active = true;
    fetchUserRole(session.access_token)
      .then((r) => {
        if (active) setRole(normalizeRole(r ?? 'client'));
      })
      .catch(() => {
        if (active) setRole('client');
      })
      .finally(() => {
        if (active) setRoleResolved(true);
      });
    return () => {
      active = false;
    };
  }, [session?.access_token, user?.id]);

  const roleLoading = loading || (!!session && !roleResolved);

  return useMemo(
    () => ({
      role,
      isStaff: isStaffRole(role),
      isAdmin: role === 'admin',
      loading,
      roleLoading,
    }),
    [role, loading, roleLoading],
  );
}
