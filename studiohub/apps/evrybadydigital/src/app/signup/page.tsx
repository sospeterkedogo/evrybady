'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Client not initialized. Check environment configuration.');
      setLoading(false);
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim(), company: company.trim(), phone: phone.trim() },
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // When the user is confirmed immediately (Supabase setting), sign them in
    if (data.session) {
      router.replace('/client');
      return;
    }

    setNeedsConfirmation(true);
    setLoading(false);
  }

  if (needsConfirmation) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface-alt text-ink px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-md shadow-black/5">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-ink">Check your email</h1>
          <p className="mt-4 text-ink-muted leading-7">
            We&apos;ve sent a confirmation link to <strong className="text-ink">{email}</strong>. Click it to activate your account, then sign in to access your client dashboard.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-alt text-ink px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-md shadow-black/5">
        <h1 className="mb-2 text-2xl font-semibold text-ink">Create your account</h1>
        <p className="mb-8 text-sm text-ink-muted">
          Sign up to book services, track consultations, and manage your projects.
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="sr-only">Full name</label>
            <input
              id="signup-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="sr-only">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="sr-only">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 8 characters)"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-company" className="sr-only">Company (optional)</label>
              <input
                id="signup-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (optional)"
                autoComplete="organization"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="signup-phone" className="sr-only">Phone (optional)</label>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                autoComplete="tel"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
              />
            </div>
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-brand underline hover:text-brand-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
