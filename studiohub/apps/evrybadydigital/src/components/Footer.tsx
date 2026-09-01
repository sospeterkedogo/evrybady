'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchSections, SectionRecord } from '@/services/sectionService';

export default function Footer() {
  const [footer, setFooter] = useState<SectionRecord | null>(null);

  useEffect(() => {
    let active = true;
    fetchSections('global')
      .then((data) => {
        if (!active) return;
        const f = data.find((s) => s.section_key === 'footer') ?? null;
        setFooter(f as SectionRecord | null);
      })
      .catch(() => setFooter(null));
    return () => { active = false; };
  }, []);

  const meta = footer?.metadata ?? {};
  const brand = String(meta.brand_blurb ?? footer?.title ?? 'A creative digital agency helping professional service businesses build trust, attract clients, and grow revenue through innovative digital branding and marketing.');
  const address = String(meta.address ?? 'Northampton, United Kingdom');

  const year = new Date().getFullYear();

  const servicesLinks = [
    'Websites',
    'Brand identity & strategy',
    'Social media management',
    'SEO & organic search',
    'Paid search & PPC',
    'Lead generation',
    'Creative retainers',
  ];

  const companyLinks = [
    { label: 'About us', href: '/about' },
    { label: 'Clients & work', href: '/work' },
    { label: 'News & insights', href: '/articles' },
    { label: 'Contact', href: '/contact' },
    { label: 'Consultancy', href: '/services' },
    { label: 'Partnerships', href: '/services' },
  ];

  const resourceLinks = [
    { label: 'SEO healthcheck', href: '/services' },
    { label: 'PPC healthcheck', href: '/services' },
    { label: 'Website healthcheck', href: '/services' },
    { label: 'Reputation management', href: '/services' },
    { label: 'Blog', href: '/articles' },
  ];

  return (
    <footer className="mt-8 border-t border-gray-200 bg-surface-footer text-ink">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-6 lg:px-10">
        {/* Top row: brand + link columns */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:grid-cols-[1.4fr_1fr_1fr_1fr] sm:grid-cols-2">
          {/* Brand column */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/LOGO.png" alt="EvryBady logo" className="h-12 w-auto rounded object-contain" />
            </div>
            <p className="text-sm text-ink-muted leading-6 max-w-xs">{brand}</p>
            {address && <p className="text-xs text-ink-faint">{address}</p>}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.linkedin.com/in/evrybady-digital-aaa701420/" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-brand transition" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://x.com/Evrybadydigital" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-brand transition" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] text-ink mb-4">Services</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {servicesLinks.map((label) => (
                <li key={label}><Link href="/services" className="hover:text-brand transition">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] text-ink mb-4">Company</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {companyLinks.map((l) => (
                <li key={l.label}><Link href={l.href} className="hover:text-brand transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] text-ink mb-4">Resources</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {resourceLinks.map((l) => (
                <li key={l.label}><Link href={l.href} className="hover:text-brand transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] text-ink mb-4">Get in touch</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li><a href="mailto:evrybadydigital@gmail.com" className="hover:text-brand transition">evrybadydigital@gmail.com</a></li>
              <li><a href="tel:+442037404890" className="hover:text-brand transition">0203 740 4890</a></li>
              <li className="pt-2"><Link href="/booking" className="inline-flex rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-dark">Book a consultation</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal links bar */}
        <div className="mt-14 border-t border-gray-200 pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-ink-faint">© {year} Evrybady Digital Creative Marketing Ltd. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-faint">
            <Link href="/terms" className="hover:text-brand transition">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-brand transition">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-brand transition">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-brand transition">Disclaimer</Link>
          </nav>
        </div>

        {/* Company registration */}
        <div className="mt-6 border-t border-gray-200 pt-5 text-xs text-ink-faint">
          <p>Evrybady Digital Creative Marketing Ltd · Registered in England &amp; Wales · SIC 70229 — Management consultancy activities</p>
        </div>
      </div>
    </footer>
  );
}
