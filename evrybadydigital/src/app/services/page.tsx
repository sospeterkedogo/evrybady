'use client';

import { useSections } from "@/hooks/useSections";

export default function ServicesPage() {
  const { sections, loading, error } = useSections("services");
  const hero = sections.find((section) => section.section_key === "hero");

  return (
    <main className="min-h-screen bg-[#08140d] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
        {loading && <div className="text-lg text-white/70">Loading services...</div>}
        {error && <div className="text-lg text-rose-400">{error}</div>}

        {hero && (
          <section className="mb-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-12 shadow-2xl shadow-[#00000040]">
            <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">What we do</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{hero.subtitle}</p>
          </section>
        )}

        <div className="grid gap-8 xl:grid-cols-2">
          {sections
            .filter((section) => section.section_key !== "hero")
            .map((section) => (
              <section
                key={section.id}
                className="rounded-[2.5rem] border border-white/10 bg-[#0a1e0a] p-10 shadow-xl shadow-[#00000030]"
              >
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <p className="mt-4 text-white/70 leading-8">{section.subtitle}</p>
              </section>
            ))}
        </div>
      </div>
    </main>
  );
}
