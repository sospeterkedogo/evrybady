'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { isStaffRole } from '@/lib/rbac';
import { fetchUserRole } from '@/hooks/useAuth';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (!supabase) {
        setError('Client not initialized. Check environment configuration.');
        setLoading(false);
        return;
      }
      const { data, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) {
        setError(signInErr.message);
        setLoading(false);
        return;
      }

      const token = data.session?.access_token;
      if (token) {
        const role = await fetchUserRole(token);
        const staff = isStaffRole(role ?? 'client');
        router.replace(staff ? next || '/admin' : next || '/client');
      } else {
        router.replace(next || '/client');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-alt text-ink px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-md shadow-black/5">
        <h1 className="mb-2 text-2xl font-semibold text-ink">Welcome back</h1>
        <p className="mb-8 text-sm text-ink-muted">Sign in to your client dashboard.</p>
        <form onSubmit={signIn} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="sr-only">Email</label>
            <input
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">Password</label>
            <input
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
          {message && (
            <p role="status" className="text-sm text-ink-muted">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          New to Evrybady?{' '}
          <Link href="/signup" className="text-brand underline hover:text-brand-dark">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-ink-muted">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
