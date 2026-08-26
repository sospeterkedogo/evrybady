import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Evrybady Digital',
  description: 'Cookie Policy for Evrybady Digital Creative Marketing Ltd.',
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Cookie Policy</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 1 June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-ink-muted">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information to website operators. Cookies set by us are called &quot;first-party cookies&quot;. Cookies set by third parties are called &quot;third-party cookies&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. How We Use Cookies</h2>
            <p>Evrybady Digital (evrybady.digital) uses cookies for the following purposes:</p>

            <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-surface-alt">
                    <th className="px-4 py-3 font-semibold text-ink">Type</th>
                    <th className="px-4 py-3 font-semibold text-ink">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-ink">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-ink">Essential</td>
                    <td className="px-4 py-3">Required for the website to function. These include session cookies and security tokens.</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ink">Analytics</td>
                    <td className="px-4 py-3">Help us understand how visitors interact with our website by collecting anonymous usage data.</td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ink">Functional</td>
                    <td className="px-4 py-3">Remember your preferences such as language selection and form data.</td>
                    <td className="px-4 py-3">Up to 1 year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ink">Marketing</td>
                    <td className="px-4 py-3">Used to deliver relevant advertising and track campaign performance across platforms.</td>
                    <td className="px-4 py-3">Up to 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. Third-Party Cookies</h2>
            <p>We may use third-party services that set their own cookies, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-ink">Google Analytics:</strong> Measures website traffic and user behaviour.</li>
              <li><strong className="text-ink">Google Ads:</strong> Tracks conversions from advertising campaigns.</li>
              <li><strong className="text-ink">Meta (Facebook/Instagram):</strong> Supports social media advertising and tracking.</li>
              <li><strong className="text-ink">LinkedIn:</strong> Enables advertising and audience insights.</li>
            </ul>
            <p className="mt-2">Each third party has its own privacy policy governing how they use the data they collect.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Managing Cookies</h2>
            <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>View and delete existing cookies</li>
              <li>Block all cookies or specific categories</li>
              <li>Set preferences for certain websites</li>
              <li>Receive notifications when cookies are being set</li>
            </ul>
            <p className="mt-2">
              Please note that blocking essential cookies may affect the functionality of this website. For more information on managing cookies in your browser, visit{' '}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer" className="text-brand hover:underline hover:text-brand-dark">allaboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Consent</h2>
            <p>
              When you first visit our website, we will ask for your consent to set non-essential cookies. You can change your preferences at any time by clearing your browser cookies and revisiting the site. Essential cookies do not require consent as they are necessary for the website to function.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our business practices. Any updates will be posted on this page with a revised date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Contact</h2>
            <p>
              For questions about our use of cookies, contact us at{' '}
              <a href="mailto:hello@evrybady.digital" className="text-brand hover:underline hover:text-brand-dark">hello@evrybady.digital</a> or call 0203 740 4890.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
