'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { getBreadcrumbs } from '@/lib/nav-config';
import { useShell } from './ShellContext';
import { useTheme } from './ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileNavOpen, toggleMobileNav } = useShell();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const crumbs = getBreadcrumbs(pathname);
  const userEmail = user?.email;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    router.replace('/login');
  };

  return (
    <header id="topbar" className="topbar" role="banner">
      <div className="topbar-start">
        {/* Mobile hamburger */}
        <button
          type="button"
          className="topbar-menu-btn"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
          aria-controls="sidebar"
          onClick={toggleMobileNav}
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {i > 0 && <ChevronRight size={14} className="breadcrumb-sep" aria-hidden />}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="breadcrumb-item">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-item active" aria-current={isLast ? 'page' : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Theme toggle */}
        <button
          type="button"
          className="btn btn-icon btn-ghost"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications placeholder */}
        <button
          type="button"
          className="btn btn-icon btn-ghost"
          aria-label="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={17} />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent-red)',
              border: '2px solid var(--bg-primary)',
            }}
          />
        </button>

        {/* User dropdown */}
        <div className="user-dropdown" ref={dropdownRef}>
          <button
            type="button"
            id="user-avatar-btn"
            onClick={() => setDropdownOpen((v) => !v)}
            className="sidebar-avatar"
            style={{ cursor: 'pointer', border: 'none', fontSize: '0.72rem' }}
            title={userEmail}
          >
            {userEmail?.[0]?.toUpperCase() ?? 'U'}
          </button>

          {dropdownOpen && (
            <div className="user-dropdown-menu">
              {userEmail && (
                <>
                  <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                    {userEmail}
                  </div>
                  <div className="user-dropdown-divider" />
                </>
              )}
              <Link href="/dashboard/settings" className="user-dropdown-item">
                <Settings size={15} />
                Settings
              </Link>
              <Link href="/dashboard/security" className="user-dropdown-item">
                <Shield size={15} />
                Security
              </Link>
              <Link href="/dashboard/settings" className="user-dropdown-item">
                <User size={15} />
                Profile
              </Link>
              <div className="user-dropdown-divider" />
              <button onClick={handleSignOut} className="user-dropdown-item" style={{ width: '100%' }}>
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
