import { NextRequest, NextResponse } from 'next/server';
import { createUserSupabase } from '@/lib/supabaseClient';
import { normalizeRole } from '@/lib/rbac';

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  return token || null;
}

export async function GET(req: NextRequest) {
  const token = getToken(req);
  if (!token) return NextResponse.json({ message: 'Missing token' }, { status: 401 });

  const client = createUserSupabase(token);
  const { data: userData, error: userErr } = await client.auth.getUser(token);
  if (userErr || !userData?.user) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  const user = userData.user;

  const [profileRes, roleRes] = await Promise.all([
    client.from('client_profiles').select('*').eq('id', user.id).maybeSingle(),
    client.from('user_roles').select('role').eq('user_id', user.id).maybeSingle(),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    profile: profileRes.data ?? null,
    role: normalizeRole(roleRes.data?.role),
  });
}

export async function PATCH(req: NextRequest) {
  const token = getToken(req);
  if (!token) return NextResponse.json({ message: 'Missing token' }, { status: 401 });

  const client = createUserSupabase(token);
  const { data: userData, error: userErr } = await client.auth.getUser(token);
  if (userErr || !userData?.user) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  const user = userData.user;

  const body = await req.json().catch(() => ({}));
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.full_name !== undefined) update.full_name = String(body.full_name).trim();
  if (body.phone !== undefined) update.phone = String(body.phone).trim();
  if (body.company !== undefined) update.company = String(body.company).trim();

  if (Object.keys(update).length === 1) {
    return NextResponse.json({ message: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await client
    .from('client_profiles')
    .upsert({ id: user.id, email: user.email ?? null, ...update }, { onConflict: 'id' })
    .select()
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ profile: data });
}
