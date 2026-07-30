import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    await sendEmail({
      to: 'evrybadydigital@gmail.com',
      replyTo: email,
      subject: 'New newsletter signup',
      html: `<p>New newsletter signup:</p><p><strong>${email}</strong></p>`,
      text: `New newsletter signup: ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter signup error', error);
    return NextResponse.json({ error: 'Unable to submit signup right now.' }, { status: 500 });
  }
}
