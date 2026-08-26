'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ImageUploader({ businessId, onUpload }: { businessId: string; onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    const bucket = 'section-content';
    const path = `${businessId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    try {
      if (!supabase) throw new Error('Client not initialized');
      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {cacheControl: '3600', upsert: false});
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      const url = data?.publicUrl ?? '';
      if (!url) throw new Error('No public URL returned');
      onUpload(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
        id="image-upload-input"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-ink hover:bg-gray-200 transition"
      >
        Upload image
      </button>
      {uploading && <span className="text-sm text-ink-faint" aria-live="polite">Uploading…</span>}
      {error && <span className="text-sm text-red-700" role="alert">{error}</span>}
    </div>
  );
}
