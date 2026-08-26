export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  isFree?: boolean;
}

/** Services offered on the booking flow — shared by the site and client portal. */
export const services: Service[] = [
  {
    id: 'website-design',
    name: 'Website Design & Development',
    description:
      'Bespoke brochure websites, CMS builds, e-commerce, bookings, and integrations.',
    priceRange: '£1,500 – £10,000+',
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity & Rebranding',
    description:
      'Logo design, brand guidelines, messaging, visual identity systems, and full rebrands.',
    priceRange: '£300 – £2,000',
  },
  {
    id: 'corporate-profiles',
    name: 'Corporate Profiles & Digital Assets',
    description:
      'Pitch decks, company profiles, presentation templates, and social media asset packs.',
    priceRange: '£300 – £1,200',
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    description:
      'Content creation, posting, community management, paid social, and video content.',
    priceRange: '£500 – £3,000/month',
  },
  {
    id: 'seo',
    name: 'SEO Services',
    description:
      'Monthly SEO retainers and one-off SEO audits to improve rankings and organic traffic.',
    priceRange: '£250 – £2,000/month',
  },
  {
    id: 'google-ads',
    name: 'Google Ads & PPC Management',
    description:
      'PPC management, campaign optimisation, and paid search audits.',
    priceRange: '£200 – £1,500/month',
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation Campaigns',
    description:
      'B2B lead generation campaigns designed to attract qualified enquiries.',
    priceRange: '£800 – £2,500/month',
  },
  {
    id: 'creative-retainers',
    name: 'Creative Design Retainers',
    description:
      'Ongoing graphic design support for marketing, social media, and sales materials.',
    priceRange: '£500 – £2,000/month',
  },
  {
    id: 'marketing-consultancy',
    name: 'Marketing Consultancy & Strategy',
    description:
      'One-off strategy sessions and ongoing advisory support.',
    priceRange: '£300 – £1,500/month',
  },
  {
    id: 'website-health-check',
    name: 'Free Website Health Check',
    description:
      'Get a professional review of your website\'s SEO, performance, user experience, and online presence.',
    priceRange: 'Usually £100 – £250',
    isFree: true,
  },
];
