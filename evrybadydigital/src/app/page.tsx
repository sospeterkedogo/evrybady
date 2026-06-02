
export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a1e0a] text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 blur-3xl opacity-80" style={{ background: 'radial-gradient(circle at top right, rgba(255,215,0,0.18), transparent 24%)' }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-72 bg-linear-to-b from-[#806500]/25 to-transparent blur-3xl opacity-80" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:py-12">
          <nav className="flex items-center justify-between gap-8 text-sm md:text-base">
            <div className="font-semibold tracking-[0.28em] text-[#f7e7a6]">EVRYBADY</div>
            <div className="hidden items-center gap-8 text-white/70 md:flex">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#work" className="hover:text-white">Work</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#f7e7a6]/30 bg-white/5 px-4 py-2 text-sm text-[#f7e7a6]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f7e7a6]" />
                Northamptonshire excellence in digital services
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Creating success for your business online
                </h1>
                <p className="max-w-xl text-lg leading-8 text-white/75 sm:text-xl">
                  We are a full-service digital agency that turns ambitious brands into memorable digital experiences. Strategy, design, and marketing crafted to help your business grow.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#work" className="inline-flex items-center justify-center rounded-full bg-[#f7e7a6] px-8 py-3 text-sm font-semibold text-[#0a1e0a] transition hover:bg-white">
                  View our work
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Talk to us
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                  <p className="font-semibold text-white">Small Business of the Year</p>
                  <p className="mt-2 text-white/70">Award-winning creative and digital strategy.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                  <p className="font-semibold text-white">SEO healthchecks</p>
                  <p className="mt-2 text-white/70">Actionable insights that improve visibility.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                  <p className="font-semibold text-white">Creative & marketing</p>
                  <p className="mt-2 text-white/70">Design and campaigns built to perform.</p>
                </div>
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-[#ffffff0d] p-8 shadow-2xl shadow-[#00000030] sm:p-10">
              <div className="absolute -right-12 top-8 h-48 w-48 rounded-full bg-[#f7e7a6]/20 blur-3xl" />
              <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-[#f7e7a6]/10 blur-3xl" />
              <div className="relative grid gap-6">
                <div className="rounded-3xl bg-[#0a1e0a] p-8 text-white/90 shadow-xl shadow-[#00000020]">
                  <span className="text-sm uppercase tracking-[0.36em] text-[#f7e7a6]">Featured case study</span>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight">Rose Gallery</h2>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    A Northampton fine art gallery project with an 83% keyword first place performance and a modern online shop experience.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#f7e7a6]">
                    <span className="rounded-full border border-[#f7e7a6]/20 bg-[#f7e7a6]/5 px-3 py-2">Web design</span>
                    <span className="rounded-full border border-[#f7e7a6]/20 bg-[#f7e7a6]/5 px-3 py-2">SEO</span>
                    <span className="rounded-full border border-[#f7e7a6]/20 bg-[#f7e7a6]/5 px-3 py-2">Creative support</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                    <p className="font-semibold text-white">83%</p>
                    <p className="mt-2 text-white/70">of focus keywords reaching first place</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                    <p className="font-semibold text-white">Local & national</p>
                    <p className="mt-2 text-white/70">Supporting startups through bluechip brands.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-white/10 bg-[#08140d] py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">As a full-service digital agency</p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">We help businesses succeed with creative, marketing and ongoing support.</h2>
            <p className="text-white/70 leading-8">
              In a busy online marketplace you need to be a cut above the rest. Our team specialise in memorable design and measurable marketing, working collaboratively to make your business more visible and more trusted.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              <p className="font-semibold text-white">Semrush trusted</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              <p className="font-semibold text-white">Meta partner</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              <p className="font-semibold text-white">Shopify partner</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">What we do</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Creative, marketing and support services for growth-focused brands.</h2>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="space-y-6 rounded-4xl border border-white/10 bg-[#0c2113] p-8 shadow-xl shadow-[#0000002d]">
              <h3 className="text-xl font-semibold text-white">Creative</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Websites</li>
                <li>Ecommerce</li>
                <li>Branding</li>
                <li>Brochures</li>
                <li>Creative retainers</li>
              </ul>
            </div>
            <div className="space-y-6 rounded-4xl border border-white/10 bg-[#0c2113] p-8 shadow-xl shadow-[#0000002d]">
              <h3 className="text-xl font-semibold text-white">Marketing</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Paid search</li>
                <li>Organic search</li>
                <li>Digital performance</li>
                <li>Social media</li>
                <li>Video marketing</li>
              </ul>
            </div>
            <div className="space-y-6 rounded-4xl border border-white/10 bg-[#0c2113] p-8 shadow-xl shadow-[#0000002d]">
              <h3 className="text-xl font-semibold text-white">Support</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Consultancy</li>
                <li>Partnerships</li>
                <li>SEO healthcheck</li>
                <li>PPC healthcheck</li>
                <li>Website healthcheck</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#08140d] py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">Clients & work</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">We work with leading companies locally and nationally.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <article className="group overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-sm uppercase tracking-[0.36em] text-[#f7e7a6]">Case study</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Rose Gallery</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">A fine art gallery website that reached top SEO positions and drove direct sales.</p>
            </article>
            <article className="group overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-sm uppercase tracking-[0.36em] text-[#f7e7a6]">Case study</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Dragon Drilling</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">Bespoke site build and training to support a busy operational team.</p>
            </article>
            <article className="group overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-sm uppercase tracking-[0.36em] text-[#f7e7a6]">Case study</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Client growth</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">Digital performance and advertising campaigns that deliver a measurable return.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">Working in partnership</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">We become part of your team to support long-term growth.</h2>
              <p className="max-w-2xl text-white/70 leading-8">
                When it comes to business growth, working together is the best way. We are part of your digital department, answering questions and delivering the support your brand needs to move forward with confidence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-4xl border border-white/10 bg-[#0a1e0a] p-8 text-white/80">
                <p className="text-sm uppercase tracking-[0.32em] text-[#f7e7a6]">Partnership</p>
                <p className="mt-4 text-base">A strategic partner for marketing, web and ongoing optimisation.</p>
              </div>
              <div className="rounded-4xl border border-white/10 bg-[#0a1e0a] p-8 text-white/80">
                <p className="text-sm uppercase tracking-[0.32em] text-[#f7e7a6]">Support</p>
                <p className="mt-4 text-base">Expert care through launches, updates and performance reviews.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#08140d] py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-[#0000002d] md:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">News & insights</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Get great content, tips and news straight to your inbox.</h2>
                <p className="max-w-xl text-white/70 leading-8">Every month, we send the inside scoop on the digital landscape so you stay ahead of the competition.</p>
              </div>
              <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <input type="email" placeholder="Your email address" className="min-w-0 rounded-full border border-white/10 bg-[#0a1e0a] px-5 py-4 text-white outline-none placeholder:text-white/40" />
                <button type="submit" className="rounded-full bg-[#f7e7a6] px-8 py-4 text-sm font-semibold text-[#0a1e0a] transition hover:bg-white">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-4xl border border-white/10 bg-[#08140d] p-10 text-white shadow-2xl shadow-[#0000002d] md:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.4em] text-[#f7e7a6]">Talk to us about your project</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">Start your next digital chapter with Evrybady.</h2>
                <p className="max-w-2xl text-white/70 leading-8">Book a consultation to discuss websites, marketing, branding or ongoing support that helps your business grow.</p>
              </div>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-[#0a1e0a] p-8">
                <a href="mailto:hello@evrybady.digital" className="block rounded-full bg-[#f7e7a6] px-6 py-4 text-center text-sm font-semibold text-[#0a1e0a]">Email us</a>
                <div className="rounded-3xl bg-[#ffffff0d] p-5 text-sm text-white/75">
                  <p className="font-medium text-white">Phone</p>
                  <p className="mt-2">01604 59 89 99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0a1e0a] py-10 text-[#f7e7a6]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.32em] text-sm text-[#f7e7a6]">About</p>
            <p className="max-w-xl text-sm text-white/70">A creative digital agency built for brands that want bold ideas and measurable results.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-sm text-white">Services</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><a href="#services" className="hover:text-white">Creative</a></li>
                <li><a href="#services" className="hover:text-white">Marketing</a></li>
                <li><a href="#services" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><a href="#work" className="hover:text-white">Clients & Work</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="/articles" className="hover:text-white">News & insights</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Social</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><a href="https://www.instagram.com/zincdigital/" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a></li>
                <li><a href="https://www.linkedin.com/company/zinc-digital-business-solutions-ltd/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">© {new Date().getFullYear()} Evrybady Digital Creative Marketing Ltd.</div>
      </footer>
    </main>
  );
}
