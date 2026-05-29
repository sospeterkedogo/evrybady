
import { Heading, Body } from "../design-system/typography";
import { Button } from "../design-system/Button";
import { Card } from "../design-system/Card";
import { BrandPartners } from "../components/BrandPartners";

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-[var(--color-background)]">
      {/* Hero Section */}
      <header className="w-full py-20 px-4 flex flex-col items-center border-b border-[var(--color-border)] bg-[var(--color-primary)]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex flex-col items-start gap-6">
            <Heading level={1} className="text-white">Evrybady Digital</Heading>
            <Body className="text-2xl text-white font-medium">Your brand, our strategy — let’s make it happen.</Body>
            <Button as="a" href="#contact" className="mt-4">Get Started.</Button>
          </div>
          <div className="flex-1 flex justify-center">
            {/* Decorative abstract shapes */}
            <div className="relative w-full h-72 flex items-center justify-center">
              <div className="absolute left-0 top-0 w-40 h-40 rounded-full bg-[var(--color-secondary)] opacity-80" style={{zIndex:1}}></div>
              <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-[var(--color-secondary)] opacity-40" style={{zIndex:1}}></div>
              <div className="w-64 h-64 rounded-full border-8 border-white opacity-90" style={{zIndex:2}}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="w-full py-20 px-4 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <Heading level={2} className="mb-8 text-[var(--color-primary)]">Our Services</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <Card className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/><path d="M8 24V8h16v16H8z" stroke="#806500" strokeWidth="2"/></svg>
              </div>
              <Heading level={3} className="mb-2 text-[var(--color-primary)]">Web Design & Development</Heading>
              <Body className="text-white">Custom websites and landing pages that convert visitors into customers, built for speed and SEO.</Body>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2"/><path d="M16 8v8l6 4" stroke="#806500" strokeWidth="2"/></svg>
              </div>
              <Heading level={3} className="mb-2 text-[var(--color-primary)]">SEO & PPC</Heading>
              <Body className="text-white">Get found on Google and drive targeted traffic with expert search engine optimization and pay-per-click campaigns.</Body>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/><path d="M16 12v8" stroke="#806500" strokeWidth="2"/></svg>
              </div>
              <Heading level={3} className="mb-2 text-[var(--color-primary)]">Ongoing Support</Heading>
              <Body className="text-white">We’re here for you after launch, offering ongoing support, updates, and digital strategy to keep you ahead.</Body>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="w-full py-20 px-4 bg-[var(--color-primary)] border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <Heading level={2} className="mb-4 text-white">Careers with Creative</Heading>
            <Body className="text-white mb-4">Our Creative team works closely with businesses to design and create the resources they need to stand out. Designers and developers collaborate on advertising, websites, and full branding projects.</Body>
            <Button as="a" href="#contact" className="mt-2">Join Our Team</Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-40 rounded-xl bg-[var(--color-secondary)]/30 flex items-center justify-center">
              <svg width="80" height="80" fill="none" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#806500" fillOpacity="0.5"/><path d="M20 60V20h40v40H20z" stroke="#fff" strokeWidth="4"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section with Logos */}
      <section className="w-full py-20 px-4 bg-[var(--color-background)] border-b border-[var(--color-border)]" id="partners">
        <BrandPartners />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 px-4 bg-[var(--color-secondary)]/10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <Heading level={2} className="mb-4 text-[var(--color-primary)]">Ready to Grow?</Heading>
          <Body className="text-white mb-8 text-center">Contact us today for a free consultation and let’s build something amazing together.</Body>
          <Button as="a" href="mailto:hello@evrybady.digital">Contact Us</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-[var(--color-primary)] text-[var(--color-secondary)] flex flex-col items-center mt-auto">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm">&copy; {new Date().getFullYear()} Evrybady Digital. All rights reserved.</span>
          <span className="text-sm">Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
