import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Create a client only when running in the browser and envs are present.
// This avoids calling createClient at module-eval time on the server when
// NEXT_PUBLIC envs may not be available (which caused `supabaseUrl is required`).
export const supabase = (typeof window !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY)
	? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true } })
	: null as unknown as ReturnType<typeof createClient> | null;

// Factory for server-side admin client. Requires SUPABASE_SERVICE_ROLE_KEY.
export function createServerSupabase() {
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in server environment");
	if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL in server environment");
	return createClient(SUPABASE_URL, key);
}

// Factory for a server client acting as a specific user (JWT from the browser).
// Queries run under that user's RLS context so triggers and policies apply.
export function createUserSupabase(token: string) {
	const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!token) throw new Error("Missing user access token");
	if (!url) throw new Error("Missing SUPABASE_URL in server environment");
	if (!anonKey) throw new Error("Missing anon key in server environment");
	return createClient(url, anonKey, {
		global: { headers: { Authorization: `Bearer ${token}` } },
	});
}
