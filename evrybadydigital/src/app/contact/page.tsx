'use client';

import { useSections } from "@/hooks/useSections";

export default function ContactPage() {
  const { sections, loading, error } = useSections("contact");
  const hero = sections.find((section) => section.section_key === "hero");

  return (
    <main className="min-h-screen bg-[#08140d] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
        {loading && <div className="text-lg text-white/70">Loading contact details...</div>}
        {error && <div className="text-lg text-rose-400">{error}</div>}

        {hero && (
          <section className="mb-14 rounded-[2.5rem] border border-white/10 bg-white/5 p-12 shadow-2xl shadow-[#00000040]">
            <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">Talk to us</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{hero.subtitle}</p>
          </section>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0a1e0a] p-10 shadow-xl shadow-[#00000030]">
            <h2 className="text-2xl font-semibold text-white">Send us a message</h2>
            <form className="mt-8 space-y-6">
              <input type="text" placeholder="Your name" className="w-full rounded-3xl border border-white/10 bg-[#08140d] px-5 py-4 text-white outline-none" />
              <input type="email" placeholder="Your email" className="w-full rounded-3xl border border-white/10 bg-[#08140d] px-5 py-4 text-white outline-none" />
              <textarea placeholder="Project details" rows={6} className="w-full rounded-3xl border border-white/10 bg-[#08140d] px-5 py-4 text-white outline-none" />
              <button type="submit" className="inline-flex rounded-full bg-[#f7e7a6] px-8 py-4 text-sm font-semibold text-[#0a1e0a] transition hover:bg-white">
                Send request
              </button>
            </form>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-[#08140d] p-10 shadow-xl shadow-[#00000030]">
            {sections
              .filter((section) => section.section_key !== "hero")
              .map((section) => (
                <div key={section.id} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                  <p className="text-white/70 leading-8">{section.subtitle}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
