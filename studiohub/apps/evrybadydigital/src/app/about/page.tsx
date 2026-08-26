'use client';

import { useSections } from "@/hooks/useSections";

export default function AboutPage() {
  const { sections, loading, error } = useSections("about");
  const hero = sections.find((section) => section.section_key === "hero");

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Hero */}
        <section className="flex min-h-[70vh] items-center py-24 lg:py-32">
          <div className="w-full">
            {loading && <div className="text-lg text-ink-muted">Loading about content...</div>}
            {error && <div className="text-lg text-rose-700" role="alert">{error}</div>}

            {hero && (
              <div className="rounded-3xl border border-gray-200 bg-surface-alt p-10 shadow-md shadow-black/5 sm:p-14">
                <p className="text-sm uppercase tracking-[0.4em] text-brand">About EvryBady</p>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {hero.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">{hero.subtitle}</p>
              </div>
            )}
          </div>
        </section>

        {/* Content sections */}
        <section className="pb-24 lg:pb-32">
          <div className="grid gap-8 lg:grid-cols-2">
            {sections
              .filter((section) => section.section_key !== "hero")
              .map((section) => (
                <article
                  key={section.id}
                  className="rounded-3xl border border-gray-200 bg-white p-9 shadow-sm transition hover:shadow-md"
                >
                  <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
                  <p className="mt-5 text-ink-muted leading-8">{section.subtitle}</p>
                </article>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
