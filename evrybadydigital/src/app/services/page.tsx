import * as React from 'react';
import { Heading, Body } from '../../design-system/typography';

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <Heading level={1} className="mb-8 text-[--color-primary]">Our Services</Heading>
      <div className="space-y-8">
        <div className="p-6 rounded-lg bg-[--color-surface] border border-[--color-border]">
          <Heading level={2} className="text-xl text-[--color-primary] mb-2">Web Design & Development</Heading>
          <Body className="mb-2 text-white">Custom websites and landing pages that convert visitors into customers, built for speed and SEO.</Body>
        </div>
        <div className="p-6 rounded-lg bg-[--color-surface] border border-[--color-border]">
          <Heading level={2} className="text-xl text-[--color-primary] mb-2">SEO & PPC</Heading>
          <Body className="mb-2 text-white">Get found on Google and drive targeted traffic with expert search engine optimization and pay-per-click campaigns.</Body>
        </div>
        <div className="p-6 rounded-lg bg-[--color-surface] border border-[--color-border]">
          <Heading level={2} className="text-xl text-[--color-primary] mb-2">Ongoing Support</Heading>
          <Body className="mb-2 text-white">We’re here for you after launch, offering ongoing support, updates, and digital strategy to keep you ahead.</Body>
        </div>
      </div>
    </div>
  );
}