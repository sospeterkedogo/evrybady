import * as React from 'react';
import { Heading, Body } from '../../design-system/typography';

export default function CareersPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <Heading level={1} className="mb-8 text-[--color-primary]">Careers with Creative</Heading>
      <Body className="mb-4 text-white">Our Creative team works closely with businesses to design and create the resources they need to stand out. Designers and developers collaborate on advertising, websites, and full branding projects.</Body>
      <Body className="mb-8 text-white">If you’re passionate about design, development, or digital strategy, we’d love to hear from you. Check out our open positions or contact us to learn more about joining our team.</Body>
      <a href="/jobs" className="inline-block py-2 px-4 rounded bg-[--color-primary] text-white font-bold hover:bg-[--color-secondary] transition-colors">View Open Jobs</a>
    </div>
  );
}