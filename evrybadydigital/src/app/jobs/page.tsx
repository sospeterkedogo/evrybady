import * as React from 'react';
import { getJobs } from '../../services/jobs';
import { Job } from '../../types';
import { Heading, Body } from '../../design-system/typography';

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <Heading level={1} className="mb-8 text-[--color-primary]">Open Positions</Heading>
      {loading && <div className="text-[--color-secondary]">Loading jobs...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-8">
        {jobs.map(job => (
          <div key={job.id} className="p-6 rounded-lg bg-[--color-surface] border border-[--color-border]">
            <Heading level={2} className="text-xl text-[--color-primary] mb-2">{job.title}</Heading>
            <Body className="mb-2 text-white">{job.description}</Body>
            <div className="text-sm text-[--color-secondary]">{job.location} &middot; {job.type} &middot; Posted: {new Date(job.posted_at).toLocaleDateString()}</div>
          </div>
        ))}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-[--color-secondary]">No jobs available at this time.</div>
        )}
      </div>
    </div>
  );
}