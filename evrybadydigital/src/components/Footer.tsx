import * as React from 'react';

const siteLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Careers', href: '/careers' },
  { label: 'Partners', href: '/partners' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-[--color-primary] text-[--color-secondary] flex flex-col items-center mt-auto border-t border-[--color-border]">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex gap-6 flex-wrap justify-center md:justify-start">
          {siteLinks.map(link => (
            <a key={link.href} href={link.href} className="font-bold text-base hover:text-[--color-accent] transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm">&copy; {new Date().getFullYear()} Evrybady Digital</span>
          <span className="text-sm">Built with Next.js</span>
        </div>
      </div>
      <div className="text-xs text-[--color-secondary] opacity-70">All rights reserved.</div>
    </footer>
  );
}
