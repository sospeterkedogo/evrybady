/**
 * Centralized navigation config — drives the Sidebar and breadcrumbs.
 * Modeled on the Espeezy DevHub nav-config pattern.
 */

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string; // lucide-react icon name
  accent?: string;
  section: 'main' | 'management' | 'admin';
  /** Permission key required to view this item (if any). */
  permission?: string;
};

export const NAV_ITEMS: NavItem[] = [
  // ── Main ──
  {
    id: 'overview',
    label: 'Overview',
    href: '/dashboard',
    icon: 'LayoutGrid',
    accent: '#3b82f6',
    section: 'main',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/dashboard/projects',
    icon: 'FolderKanban',
    accent: '#10b981',
    section: 'main',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'BarChart3',
    accent: '#8b5cf6',
    section: 'main',
  },

  // ── Management ──
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'Settings',
    accent: '#f59e0b',
    section: 'management',
  },
  {
    id: 'security',
    label: 'Security',
    href: '/dashboard/security',
    icon: 'Shield',
    accent: '#ef4444',
    section: 'management',
  },

  // ── Admin ──
  {
    id: 'users',
    label: 'Users',
    href: '/dashboard/users',
    icon: 'Users',
    accent: '#06b6d4',
    section: 'admin',
    permission: 'users',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    href: '/dashboard/audit',
    icon: 'ScrollText',
    accent: '#ec4899',
    section: 'admin',
    permission: 'audit',
  },
];

export const SECTION_LABELS: Record<NavItem['section'], string> = {
  main: 'Main',
  management: 'Management',
  admin: 'Admin Console',
};

export function getNavItem(id: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => item.id === id);
}

/**
 * Given a pathname, returns the breadcrumb segments.
 * e.g. "/dashboard/settings" → [{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]
 */
export function getBreadcrumbs(pathname: string): { label: string; href?: string }[] {
  const crumbs: { label: string; href?: string }[] = [
    { label: 'Dashboard', href: '/dashboard' },
  ];

  if (pathname === '/dashboard') return crumbs;

  // Match a nav item
  const item = NAV_ITEMS.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + '/')
  );

  if (item) {
    crumbs.push({ label: item.label, href: item.href });
  }

  // Check for deeper paths (e.g., /dashboard/projects/new)
  const deepMatch = pathname.match(/^\/dashboard\/[^/]+\/(.+)$/);
  if (deepMatch) {
    const subPath = deepMatch[1];
    const label = subPath
      .split('/')
      .pop()!
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label });
  }

  return crumbs;
}
