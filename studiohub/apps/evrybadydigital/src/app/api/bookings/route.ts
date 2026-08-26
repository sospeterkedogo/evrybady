import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase, createUserSupabase } from '@/lib/supabaseClient';
import { isStaffRole, normalizeRole, BOOKING_STATUSES } from '@/lib/rbac';
import { sendEmail } from '@/lib/email';

const VALID_STATUSES = new Set<string>([...BOOKING_STATUSES, 'cancelled']);

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  return token || null;
}

async function getRole(client: ReturnType<typeof createUserSupabase>, userId: string) {
  const { data } = await client
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();
  return normalizeRole(data?.role);
}

/** Resolve a registered user id from an email address (returns null when not found). */
async function resolveUserIdByEmail(email: string): Promise<string | null> {
  try {
    const server = createServerSupabase();
    const { data } = await server.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const match = data?.users?.find(
      (u) => u.email?.toLowerCase() === email.trim().toLowerCase(),
    );
    return match?.id ?? null;
  } catch (err) {
    console.warn('Could not resolve user id by email', err);
    return null;
  }
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

  const url = new URL(req.url);
  const all = url.searchParams.get('all') === 'true';
  const role = await getRole(client, user.id);

  let query = client.from('bookings').select('*');
  if (all) {
    if (!isStaffRole(role)) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }
    query = query.order('created_at', { ascending: false });
  } else {
    query = query.eq('client_id', user.id).order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data ?? [], role });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    name,
    email,
    phone,
    services,
    service,
    message,
    company,
    clientEmail,
    clientName,
  } = body as {
    name?: string;
    email?: string;
    phone?: string;
    services?: string[];
    service?: string;
    message?: string;
    company?: string;
    clientEmail?: string;
    clientName?: string;
  };

  const selectedServices = Array.isArray(services) && services.length > 0
    ? services.map((s) => String(s).trim()).filter(Boolean)
    : service
      ? [String(service).trim()]
      : [];

  const token = getToken(req);
  const server = createServerSupabase();

  const finalName = (clientName || name || '').trim();
  const finalEmail = (clientEmail || email || '').trim();

  if (!finalName || !finalEmail || selectedServices.length === 0) {
    return NextResponse.json(
      { error: 'Name, email, and at least one service are required.' },
      { status: 400 },
    );
  }

  // Link the booking to the registered user who owns this email, if one exists
  const resolvedClientId = await resolveUserIdByEmail(finalEmail);
  const insert = {
    client_id: null,
    client_email: finalEmail,
    client_name: finalName,
    phone: phone?.trim() || null,
    company: company?.trim() || null,
    services: selectedServices,
    message: message?.trim() || null,
    status: 'booked',
  };

  // Authenticated writes go through the user's RLS context; anonymous writes use the service role
  let result;
  if (token) {
    const client = createUserSupabase(token);
    const { data: userData, error: userErr } = await client.auth.getUser(token);
    if (userErr || !userData?.user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const role = await getRole(client, userData.user.id);
    // Staff may attach bookings to any registered client; clients are always self-linked
    const clientIdForInsert = isStaffRole(role)
      ? resolvedClientId
      : userData.user.id;
    result = await client
      .from('bookings')
      .insert({ ...insert, client_id: clientIdForInsert })
      .select()
      .single();
  } else {
    // Anonymous insert (no RETURNING — the new row is invisible to the anon role)
    const { error: anonErr } = await server
      .from('bookings')
      .insert({ ...insert, client_id: resolvedClientId });
    if (anonErr) {
      return NextResponse.json({ error: anonErr.message || 'Unable to create booking' }, { status: 500 });
    }
    result = { data: null, error: null };
  }

  const { data: booking, error } = result;
  if (error) {
    return NextResponse.json({ error: error.message || 'Unable to create booking' }, { status: 500 });
  }

  // Notifications
  const serviceLabel = selectedServices.join(', ');
  const cleanPhone = phone?.trim() || 'Not provided';
  const cleanMessage = message?.trim() || 'No additional details provided';
  const toEmail = finalEmail;

  try {
    await sendEmail({
      to: 'evrybadydigital@gmail.com',
      replyTo: toEmail,
      subject: `Consultation booking request: ${serviceLabel}`,
      html: `<h2>New consultation booking</h2><p><strong>Name:</strong> ${finalName}</p><p><strong>Email:</strong> ${finalEmail}</p><p><strong>Phone:</strong> ${cleanPhone}</p><p><strong>Services:</strong> ${serviceLabel}</p><p><strong>Message:</strong> ${cleanMessage}</p><p><strong>Company:</strong> ${company || 'Not provided'}</p>`,
      text: [
        'New consultation booking',
        '',
        `Name: ${finalName}`,
        `Email: ${finalEmail}`,
        `Phone: ${cleanPhone}`,
        `Services: ${serviceLabel}`,
        `Company: ${company || 'Not provided'}`,
        `Message: ${cleanMessage}`,
      ].join('\n'),
    });

    await sendEmail({
      to: toEmail,
      replyTo: 'evrybadydigital@gmail.com',
      subject: 'Your consultation booking request has been received',
      html: `<p>Hi ${finalName},</p><p>Thanks for booking a consultation with Evrybady Digital. We have received your request and will be in touch shortly to confirm your session.</p><p><strong>Selected services:</strong> ${serviceLabel}</p><p>Track the progress of your booking anytime from your client dashboard: <a href="https://evrybady.digital/client">https://evrybady.digital/client</a></p><p>Best regards,<br />Evrybady Digital</p>`,
      text: [
        `Hi ${finalName},`,
        '',
        'Thanks for booking a consultation with Evrybady Digital.',
        'We have received your request and will be in touch shortly to confirm your session.',
        '',
        `Selected services: ${serviceLabel}`,
        'Track progress anytime: https://evrybady.digital/client',
        '',
        'Best regards,',
        'Evrybady Digital',
      ].join('\n'),
    });
  } catch (emailErr) {
    console.error('Booking notification email error', emailErr);
  }

  return NextResponse.json({ success: true, booking });
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
  const role = await getRole(client, user.id);
  const isStaff = isStaffRole(role);

  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ message: 'Missing booking id' }, { status: 400 });

  const { data: existing } = await client
    .from('bookings')
    .select('*')
    .eq('id', body.id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });

  if (!isStaff && existing.client_id !== user.id) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

  // Clients may only edit their contact details / message, and cancel their own booking
  if (!isStaff) {
    if (body.message !== undefined) update.message = String(body.message).trim();
    if (body.phone !== undefined) update.phone = String(body.phone).trim();
    if (body.company !== undefined) update.company = String(body.company).trim();
    if (body.status !== undefined && body.status !== 'cancelled') {
      return NextResponse.json({ message: 'Only staff can change booking status' }, { status: 403 });
    }
    if (body.status === 'cancelled') update.status = 'cancelled';
  } else {
    if (body.status !== undefined) {
      if (!VALID_STATUSES.has(String(body.status))) {
        return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
      }
      update.status = String(body.status);
    }
    if (body.staff_note !== undefined) update.staff_note = String(body.staff_note).trim();
    if (body.project_name !== undefined) update.project_name = String(body.project_name).trim();
    if (body.client_name !== undefined) update.client_name = String(body.client_name).trim();
    if (body.client_email !== undefined) update.client_email = String(body.client_email).trim();
    if (body.phone !== undefined) update.phone = String(body.phone).trim();
    if (body.company !== undefined) update.company = String(body.company).trim();
    if (body.message !== undefined) update.message = String(body.message).trim();
    if (body.services !== undefined) {
      update.services = Array.isArray(body.services) ? body.services.map((s: unknown) => String(s)) : [];
    }
  }

  const { data, error } = await client
    .from('bookings')
    .update(update)
    .eq('id', body.id)
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ booking: data });
}

export async function DELETE(req: NextRequest) {
  const token = getToken(req);
  if (!token) return NextResponse.json({ message: 'Missing token' }, { status: 401 });

  const client = createUserSupabase(token);
  const { data: userData, error: userErr } = await client.auth.getUser(token);
  if (userErr || !userData?.user) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  const user = userData.user;
  const role = await getRole(client, user.id);
  const isStaff = isStaffRole(role);

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });

  const { data: existing } = await client
    .from('bookings')
    .select('id, client_id')
    .eq('id', id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  if (!isStaff && existing.client_id !== user.id) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const { error } = await client.from('bookings').delete().eq('id', id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
