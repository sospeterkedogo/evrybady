/**
 * Role-based access control (RBAC) for StudioHub.
 * Modeled on Espeezy's hub-admin-rbac pattern.
 */

export type UserRole = 'admin' | 'editor' | 'viewer';

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  editor: ['overview', 'projects', 'analytics', 'settings', 'security'],
  viewer: ['overview', 'projects', 'analytics'],
};

/**
 * Check whether a role has a specific permission.
 */
export function hasPermission(role: string, permission: string): boolean {
  const grants = ROLE_PERMISSIONS[role as UserRole];
  if (!grants) return false;
  if (grants[0] === '*') return true;
  return grants.includes(permission);
}

/**
 * Get all permissions for a role.
 */
export function getPermissions(role: string): string[] {
  return ROLE_PERMISSIONS[role as UserRole] ?? [];
}

/**
 * Determine if a role has admin-level access.
 */
export function isAdminRole(role: string): boolean {
  return role === 'admin';
}
