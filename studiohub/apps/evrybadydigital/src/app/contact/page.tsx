'use client';

import { useSections } from "@/hooks/useSections";

export default function ContactPage() {
  const { sections, loading, error } = useSections("contact");
  const hero = sections.find((section) => section.section_key === "hero");

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Hero */}
        <section className="flex min-h-[60vh] items-center py-24 lg:py-32">
          <div className="w-full">
            {loading && <div className="text-lg text-ink-muted">Loading contact details...</div>}
            {error && <div className="text-lg text-rose-700" role="alert">{error}</div>}

            {hero && (
              <div className="rounded-3xl border border-gray-200 bg-surface-alt p-10 shadow-md shadow-black/5 sm:p-14">
                <p className="text-sm uppercase tracking-[0.4em] text-brand">Talk to us</p>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {hero.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">{hero.subtitle}</p>
              </div>
            )}
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="pb-24 lg:pb-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-9 shadow-sm md:p-12">
              <h2 className="text-2xl font-semibold text-ink">Send us a message</h2>
              <p className="mt-3 text-ink-muted">We typically reply within one working day.</p>
              <form className="mt-9 space-y-6">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your name</label>
                  <input id="contact-name" type="text" placeholder="Your name" autoComplete="name" className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Your email</label>
                  <input id="contact-email" type="email" placeholder="Your email" autoComplete="email" className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand" />
                </div>
                <div>
                  <label htmlFor="contact-details" className="sr-only">Project details</label>
                  <textarea id="contact-details" placeholder="Project details" rows={6} className="w-full min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-4 text-ink outline-none placeholder:text-ink-faint focus:border-brand" />
                </div>
                <button type="submit" className="inline-flex min-h-[48px] rounded-full bg-brand px-9 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark">
                  Send request
                </button>
              </form>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-surface-alt p-9 shadow-sm md:p-12">
              {sections
                .filter((section) => section.section_key !== "hero")
                .map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
                    <p className="text-ink-muted leading-8">{section.subtitle}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
