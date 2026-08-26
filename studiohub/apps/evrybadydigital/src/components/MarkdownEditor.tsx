'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import ImageUploader from './ImageUploader';

export default function MarkdownEditor({
  value,
  onChange,
  businessId,
}: {
  value: string;
  onChange: (next: string) => void;
  businessId: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="md-editor" className="text-sm font-medium">Content (Markdown)</label>
      </div>
      <textarea id="md-editor" value={value} onChange={(e) => onChange(e.target.value)} className="w-full border rounded-lg p-2.5 bg-white border-gray-300 text-ink focus:outline-none focus:ring-2 focus:ring-brand" style={{ minHeight: 120 }} />

      <div className="mt-2 flex items-center justify-between">
        <ImageUploader businessId={businessId} onUpload={(url) => onChange(`${value}\n\n![](${url})`)} />
        <div className="text-sm text-ink-faint">Preview below</div>
      </div>

      <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-surface-alt prose max-w-none">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ReactMarkdown remarkPlugins={[remarkGfm as any]} rehypePlugins={[rehypeSanitize as any]}>{value || ''}</ReactMarkdown>
      </div>
    </div>
  );
}
