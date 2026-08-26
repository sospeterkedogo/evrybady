import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Evrybady Digital',
  description: 'Legal disclaimer for Evrybady Digital Creative Marketing Ltd.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Disclaimer</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 1 June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-ink-muted">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. General Information</h2>
            <p>
              The information provided on the Evrybady Digital website (evrybady.digital) is for general informational purposes only. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. Professional Advice</h2>
            <p>
              The content on this website does not constitute professional marketing, legal, financial, or business advice. You should not rely solely on the information provided here when making business decisions. We recommend consulting qualified professionals for advice tailored to your specific circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. Results Disclaimer</h2>
            <p>
              Any case studies, testimonials, or results mentioned on this website are specific to the clients and projects described. Results may vary depending on individual circumstances, market conditions, and other factors. We do not guarantee that similar results will be achieved for every client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. External Links</h2>
            <p>
              This website may contain links to external websites that are not operated by us. We have no control over the content, privacy practices, or availability of those sites and accept no responsibility or liability for them. The inclusion of any link does not imply endorsement or recommendation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Evrybady Digital Creative Marketing Ltd shall not be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of, or inability to use, this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Copyright Notice</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Evrybady Digital Creative Marketing Ltd and is protected by UK and international copyright laws. Unauthorised reproduction, distribution, or use of any content is strictly prohibited without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Availability</h2>
            <p>
              We make every effort to keep this website running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues, maintenance, or circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">8. Governing Law</h2>
            <p>
              This disclaimer shall be governed by and construed in accordance with the laws of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">9. Contact</h2>
            <p>
              If you have any questions about this disclaimer, please contact us at{' '}
              <a href="mailto:hello@evrybady.digital" className="text-brand hover:underline hover:text-brand-dark">hello@evrybady.digital</a> or call 0203 740 4890.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
