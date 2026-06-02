'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  FolderKanban,
  BarChart3,
  Settings,
  Shield,
  Users,
  ScrollText,
  ChevronsLeft,
  LogOut,
} from 'lucide-react';
import { NAV_ITEMS, SECTION_LABELS, type NavItem } from '@/lib/nav-config';
import { useShell } from './ShellContext';
import { useUserRole } from '@/hooks/useUserRole';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutGrid,
  FolderKanban,
  BarChart3,
  Settings,
  Shield,
  Users,
  ScrollText,
};

interface SidebarProps {
  userEmail?: string;
  onSignOut: () => void;
}

export default function Sidebar({ userEmail, onSignOut }: SidebarProps) {
  const pathname = usePathname();
  const { mobileNavOpen, closeMobileNav, sidebarCollapsed, toggleSidebar } = useShell();
  const { can, isAdmin } = useUserRole();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Group nav items by section
  const sections = ['main', 'management', 'admin'] as const;

  const filteredItems = (section: NavItem['section']) =>
    NAV_ITEMS.filter((item) => {
      if (item.section !== section) return false;
      if (item.permission && !can(item.permission)) return false;
      if (item.section === 'admin' && !isAdmin) return false;
      return true;
    });

  const collapsed = sidebarCollapsed && !isMobile;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${mobileNavOpen ? 'is-open' : ''}`}
        onClick={closeMobileNav}
        aria-hidden
      />

      <aside
        id="sidebar"
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileNavOpen ? 'mobile-open' : ''}`}
        aria-label="Dashboard navigation"
        aria-hidden={isMobile && !mobileNavOpen}
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">S</div>
          {!collapsed && (
            <div className="sidebar-brand-text animate-fade-in">
              <span className="sidebar-brand-title">StudioHub</span>
              <span className="sidebar-brand-sub">Dashboard</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {sections.map((section) => {
            const items = filteredItems(section);
            if (items.length === 0) return null;

            return (
              <div key={section}>
                {!collapsed && (
                  <p className="sidebar-section-label">
                    {SECTION_LABELS[section]}
                  </p>
                )}
                {items.map((item) => {
                  const Icon = ICON_MAP[item.icon] || LayoutGrid;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      id={`nav-${item.id}`}
                      className={`sidebar-nav-item ${active ? 'active' : ''}`}
                      onClick={isMobile ? closeMobileNav : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      <span
                        className="sidebar-icon-wrap"
                        style={{ color: active ? item.accent : undefined }}
                      >
                        <Icon size={17} />
                      </span>
                      {!collapsed && (
                        <span className="sidebar-nav-item-label">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!collapsed && userEmail && (
            <div className="sidebar-user animate-fade-in">
              <div className="sidebar-avatar">{userEmail[0]}</div>
              <span className="sidebar-user-email">{userEmail}</span>
            </div>
          )}

          {!collapsed && (
            <button
              id="btn-sign-out"
              onClick={onSignOut}
              className="sidebar-nav-item"
              style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'transparent' }}
            >
              <span className="sidebar-icon-wrap">
                <LogOut size={16} />
              </span>
              <span className="sidebar-nav-item-label" style={{ color: 'var(--text-muted)' }}>Sign out</span>
            </button>
          )}

          <button
            id="btn-collapse-sidebar"
            onClick={toggleSidebar}
            className="btn btn-ghost btn-sm"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ChevronsLeft
              size={18}
              style={{
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
