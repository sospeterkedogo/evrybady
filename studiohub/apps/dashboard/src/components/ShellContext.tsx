'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ShellContextValue = {
  mobileNavOpen: boolean;
  sidebarCollapsed: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  toggleSidebar: () => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const toggleMobileNav = useCallback(() => setMobileNavOpen((v) => !v), []);
  const toggleSidebar = useCallback(() => setSidebarCollapsed((v) => !v), []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  // Escape key closes mobile nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileNav();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMobileNav]);

  const value = useMemo(
    () => ({
      mobileNavOpen,
      sidebarCollapsed,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      toggleSidebar,
    }),
    [mobileNavOpen, sidebarCollapsed, openMobileNav, closeMobileNav, toggleMobileNav, toggleSidebar]
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell(): ShellContextValue {
  const ctx = useContext(ShellContext);
  if (!ctx) {
    return {
      mobileNavOpen: false,
      sidebarCollapsed: false,
      openMobileNav: () => {},
      closeMobileNav: () => {},
      toggleMobileNav: () => {},
      toggleSidebar: () => {},
    };
  }
  return ctx;
}
