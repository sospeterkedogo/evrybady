
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans flex flex-col">
      {/* Hero Section */}
      <header className="w-full bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black py-12 px-4 flex flex-col items-center border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
              Grow Your Business with <span className="text-blue-600">Evrybady Digital</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl">
              We help brands stand out with high-impact digital marketing, web design, SEO, and ongoing support. Transparency, collaboration, and service are at the heart of everything we do.
            </p>
            <a href="#contact" className="mt-2 inline-block rounded-full bg-blue-600 text-white px-8 py-3 font-semibold shadow hover:bg-blue-700 transition-colors">Get Started</a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/Screenshot 2026-05-29 at 16-00-45 Digital Marketing Northampton Web Design SEO & PPC Zinc Digital.png"
              alt="Evrybady Digital Hero"
              width={420}
              height={320}
              className="rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800"
              priority
            />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="w-full py-16 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 shadow hover:shadow-lg transition-shadow border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
              <Image src="/images/Screenshot 2026-05-29 at 16-01-00 Digital Marketing Northampton Web Design SEO & PPC Zinc Digital.png" alt="Web Design" width={80} height={80} className="mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Web Design & Development</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Custom websites and landing pages that convert visitors into customers, built for speed and SEO.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 shadow hover:shadow-lg transition-shadow border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
              <Image src="/images/Screenshot 2026-05-29 at 16-01-15 Digital Marketing Northampton Web Design SEO & PPC Zinc Digital.png" alt="SEO & PPC" width={80} height={80} className="mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">SEO & PPC</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Get found on Google and drive targeted traffic with expert search engine optimization and pay-per-click campaigns.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 shadow hover:shadow-lg transition-shadow border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
              <Image src="/images/Screenshot 2026-05-29 at 16-01-33 Digital Marketing Northampton Web Design SEO & PPC Zinc Digital.png" alt="Ongoing Support" width={80} height={80} className="mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-zinc-600 dark:text-zinc-300">We’re here for you after launch, offering ongoing support, updates, and digital strategy to keep you ahead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="w-full py-16 px-4 bg-zinc-50 dark:bg-black border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Careers with Creative</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">Our Creative team works closely with businesses to design and create the resources they need to stand out. Designers and developers collaborate on advertising, websites, and full branding projects.</p>
            <a href="#contact" className="inline-block rounded-full bg-blue-600 text-white px-8 py-3 font-semibold shadow hover:bg-blue-700 transition-colors mt-2">Join Our Team</a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/images/Screenshot 2026-05-29 at 16-01-51 Digital Marketing Northampton Web Design SEO & PPC Zinc Digital.png" alt="Careers" width={320} height={220} className="rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800" />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-16 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Our Partners</h2>
          <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
            <a href="https://www.ronaldonyangoconsultancy.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow hover:shadow-lg transition-shadow font-semibold text-zinc-800 dark:text-zinc-100">
              Ronald Onyango Consultancy (ROC)
            </a>
            <a href="https://studio.espeezy.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow hover:shadow-lg transition-shadow font-semibold text-zinc-800 dark:text-zinc-100">
              Espeezy Ltd via espeezystudios
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 px-4 bg-blue-50 dark:bg-zinc-950">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Ready to Grow?</h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-8 text-center">Contact us today for a free consultation and let’s build something amazing together.</p>
          <a href="mailto:hello@evrybady.digital" className="inline-block rounded-full bg-blue-600 text-white px-8 py-3 font-semibold shadow hover:bg-blue-700 transition-colors">Contact Us</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-zinc-900 text-zinc-100 flex flex-col items-center mt-auto">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm">&copy; {new Date().getFullYear()} Evrybady Digital. All rights reserved.</span>
          <span className="text-sm">Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
