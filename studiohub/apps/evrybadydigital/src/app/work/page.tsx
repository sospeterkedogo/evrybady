'use client';

import Image from 'next/image';

const projects = [
  {
    title: 'Espeezy Apps Ltd',
    category: 'Product design & mobile UX',
    description: 'A premium, conversion-focused app experience that helps teams simplify delivery and win more clients with confidence.',
    image: '/images/case-studies/espeezy-apps-ltd.svg',
    href: 'https://studio.espeezy.com',
    tags: ['Product strategy', 'UI systems', 'Mobile-first'],
  },
  {
    title: 'Lukara Adventures',
    category: 'Brand storytelling & travel experience',
    description: 'An immersive travel brand concept designed to feel aspirational, refined, and instantly memorable from the first scroll.',
    image: '/images/case-studies/lukara-adventures.svg',
    href: 'https://lukaraadventures.com/',
    tags: ['Brand direction', 'Visual storytelling', 'Landing experience'],
  },
  {
    title: 'Ronald Onyango',
    category: 'Personal brand & thought leadership',
    description: 'A polished digital presence built to elevate authority, sharpen messaging, and attract high-value opportunities.',
    image: '/images/case-studies/ronald-onyango.svg',
    href: 'https://ronaldonyangoconsultancy.co.uk/',
    tags: ['Personal brand', 'Content design', 'Premium positioning'],
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <section className="rounded-[2rem] border border-gray-200 bg-surface-alt p-10 shadow-md shadow-black/5 sm:p-14">
          <p className="text-sm uppercase tracking-[0.4em] text-brand">Clients & work</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Premium digital experiences crafted for ambitious brands.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
            We create bold websites, polished brand systems, and thoughtful digital experiences that help modern businesses look sharper and convert better.
          </p>
        </section>

        <section className="mt-16 grid gap-8 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group flex flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-md shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-brand/30 hover:shadow-xl hover:shadow-black/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={project.image} alt={`${project.title} illustration`} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="text-sm font-medium text-brand">{project.category}</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-xs font-medium text-brand-dark">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand transition hover:text-brand-dark"
                >
                  Visit site
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
