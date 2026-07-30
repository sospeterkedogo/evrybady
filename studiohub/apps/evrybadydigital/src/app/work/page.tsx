'use client';

import Image from 'next/image';

const projects = [
  {
    title: 'Espeezy Apps Ltd',
    category: 'Product design & mobile UX',
    description: 'A premium, conversion-focused app experience that helps teams simplify delivery and win more clients with confidence.',
    image: '/images/case-studies/espeezy-apps-ltd.svg',
    tags: ['Product strategy', 'UI systems', 'Mobile-first'],
  },
  {
    title: 'Lukara Adventures',
    category: 'Brand storytelling & travel experience',
    description: 'An immersive travel brand concept designed to feel aspirational, refined, and instantly memorable from the first scroll.',
    image: '/images/case-studies/lukara-adventures.svg',
    tags: ['Brand direction', 'Visual storytelling', 'Landing experience'],
  },
  {
    title: 'Ronald Onyango',
    category: 'Personal brand & thought leadership',
    description: 'A polished digital presence built to elevate authority, sharpen messaging, and attract high-value opportunities.',
    image: '/images/case-studies/ronald-onyango.svg',
    tags: ['Personal brand', 'Content design', 'Premium positioning'],
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-surface text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-12">
          <p className="text-sm uppercase tracking-[0.4em] text-brand">Clients & work</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Premium digital experiences crafted for ambitious brands.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
            We create bold websites, polished brand systems, and thoughtful digital experiences that help modern businesses look sharper and convert better.
          </p>
        </section>

        <section className="mt-14 grid gap-8 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface-alt shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={project.image} alt={`${project.title} illustration`} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
              </div>
              <div className="p-8">
                <p className="text-sm font-medium text-brand">{project.category}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1.5 text-xs text-brand/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
