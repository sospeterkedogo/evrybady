import * as React from 'react';
import { BrandPartners } from '../../components/BrandPartners';
import { Heading } from '../../design-system/typography';

export default function PartnersPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <Heading level={1} className="mb-8 text-[--color-primary]">Our Brand Partnerships</Heading>
      <BrandPartners />
    </div>
  );
}