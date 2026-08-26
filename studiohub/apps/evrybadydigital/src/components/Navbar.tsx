'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Social', href: '/social-hooks' },
  { label: 'Contact', href: '/contact' },
  { label: 'Booking', href: '/booking' },
  { label: 'Articles', href: '/articles' },
];

export default function Navbar() {
  const { session, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setOpen(false);
    router.push('/');
  }, [signOut, router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Keyboard trap + Escape close for mobile drawer
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Focus first link when drawer opens
  useEffect(() => {
    if (open && drawerRef.current) {
      const firstLink = drawerRef.current.querySelector<HTMLElement>('a');
      firstLink?.focus();
    }
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          scrolled ? 'border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg' : 'border-transparent bg-white/85 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/LOGO.png" alt="EvryBady logo" className="h-9 w-auto rounded-md object-contain" />
            <span className="font-semibold tracking-[0.18em] text-brand">EVRYBADY</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 text-sm text-ink-muted md:flex" role="list">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-brand" role="listitem">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <Link
                  href="/client"
                  className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  My dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-sm text-ink-muted transition hover:text-ink"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex rounded-full border border-brand/40 px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand/10"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggle}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted transition hover:bg-gray-100 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        ref={drawerRef}
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-[56] flex h-full w-72 flex-col bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 px-6 pb-8 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1.5" role="list">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="rounded-lg px-4 py-3 text-base font-medium text-ink-muted transition hover:bg-gray-100 hover:text-ink"
                role="listitem"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 space-y-3 border-t border-gray-200 pt-8">
            {session ? (
              <>
                <Link
                  href="/client"
                  onClick={close}
                  className="block rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  My dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="block w-full rounded-full border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-ink-muted transition hover:border-rose-300 hover:text-rose-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={close}
                  className="block rounded-full border border-brand/40 px-4 py-3 text-center text-sm font-semibold text-brand-dark transition hover:bg-brand/10"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={close}
                  className="block rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Sign up
                </Link>
              </div>
            )}
            <Link
              href="/contact"
              onClick={close}
              className="block rounded-full border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-ink-muted transition hover:text-ink"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
