"use client";
import * as React from 'react';
import { Button } from '../design-system/Button';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

export function NavBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--color-background)]/80 backdrop-blur border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">evrybady<span className="text-[var(--color-secondary)]">digital</span></a>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-bold text-lg text-[var(--color-primary)] px-2 py-1 transition-colors hover:text-[var(--color-secondary)] group"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-secondary)] transition-all group-hover:w-full group-hover:h-0.5"></span>
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="focus:outline-none">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#806500"/><rect y="15" width="32" height="3" rx="1.5" fill="#806500"/><rect y="23" width="32" height="3" rx="1.5" fill="#806500"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 animate-fade-in-down bg-[var(--color-background)]/95">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-bold text-lg text-[var(--color-primary)] px-2 py-2 border-b border-[var(--color-border)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
