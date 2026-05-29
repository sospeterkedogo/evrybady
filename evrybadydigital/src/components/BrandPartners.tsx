import * as React from 'react';
import { getPartners } from '../services/partners';
import { Partner } from '../types';

export function BrandPartners() {
  const [partners, setPartners] = React.useState<Partner[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getPartners()
      .then(setPartners)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full py-12 bg-[--color-surface]">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[--color-primary] mb-8">Our Brand Partnerships</h2>
        {loading && <div className="text-[--color-secondary]">Loading partners...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center w-full">
          {partners.map(partner => (
            <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="mt-2 text-xs text-[--color-secondary] font-semibold opacity-80 group-hover:opacity-100 transition-all">{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
