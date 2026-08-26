import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Evrybady Digital',
  description: 'Privacy Policy for Evrybady Digital Creative Marketing Ltd.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 1 June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-ink-muted">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. Who We Are</h2>
            <p>
              Evrybady Digital Creative Marketing Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a digital marketing and branding agency based in Northampton, United Kingdom (SIC 70229 — Management consultancy activities). We are the data controller for personal data collected through our website evrybady.digital and in the course of providing our services.
            </p>
            <p className="mt-2">
              Contact: <a href="mailto:hello@evrybady.digital" className="text-brand hover:underline hover:text-brand-dark">hello@evrybady.digital</a> | 0203 740 4890
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. Information We Collect</h2>
            <p>We may collect and process the following personal data:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-ink">Information you provide:</strong> Name, email address, phone number, company name, and project details submitted through contact forms or email correspondence.</li>
              <li><strong className="text-ink">Automatically collected data:</strong> IP address, browser type, operating system, referring URLs, pages visited, and timestamps via cookies and similar technologies.</li>
              <li><strong className="text-ink">Client data:</strong> Information provided during the course of a project engagement, including branding materials, business information, and access credentials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. How We Use Your Data</h2>
            <p>We use personal data for the following purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To respond to enquiries and provide quotes</li>
              <li>To deliver and manage our services</li>
              <li>To send newsletters and marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Legal Basis for Processing</h2>
            <p>We process personal data under the UK General Data Protection Regulation (UK GDPR) on the following bases:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-ink">Consent:</strong> Where you have given explicit consent for marketing communications.</li>
              <li><strong className="text-ink">Contractual necessity:</strong> To fulfil our obligations under a service agreement.</li>
              <li><strong className="text-ink">Legitimate interests:</strong> To operate our business, improve our services, and maintain website security.</li>
              <li><strong className="text-ink">Legal obligation:</strong> To comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share data with trusted third-party service providers who assist us in operating our business (e.g., hosting providers, email platforms, analytics tools). All third parties are required to process data in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for the purposes set out in this policy, or as required by law. Client project data is retained for a period of six years following the completion of a project. Marketing subscriber data is retained until you unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Your Rights</h2>
            <p>Under the UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (right to be forgotten)</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
              <li>Lodge a complaint with the Information Commissioner&apos;s Office (ICO)</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact us at <a href="mailto:hello@evrybady.digital" className="text-brand hover:underline hover:text-brand-dark">hello@evrybady.digital</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">10. Contact</h2>
            <p>
              For any privacy-related enquiries, contact us at{' '}
              <a href="mailto:hello@evrybady.digital" className="text-brand hover:underline hover:text-brand-dark">hello@evrybady.digital</a> or call 0203 740 4890.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
