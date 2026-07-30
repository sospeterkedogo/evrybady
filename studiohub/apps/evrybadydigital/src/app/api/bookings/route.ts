import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
    };

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Name, email, and service are required.' }, { status: 400 });
    }

    const cleanPhone = phone?.trim() || 'Not provided';
    const cleanMessage = message?.trim() || 'No additional details provided';

    const businessMailText = [
      'New consultation booking',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${cleanPhone}`,
      `Service: ${service}`,
      `Message: ${cleanMessage}`,
    ].join('\n');

    const clientMailText = [
      `Hi ${name},`,
      '',
      'Thanks for booking a consultation with Evrybady Digital.',
      'We have received your request and will be in touch shortly to confirm your session.',
      '',
      `Selected service: ${service}`,
      `Email provided: ${email}`,
      `Phone provided: ${cleanPhone}`,
      `Project details: ${cleanMessage}`,
      '',
      'To get started, please visit our services page: https://evrybady.digital/services',
      '',
      'Best regards,',
      'Evrybady Digital',
    ].join('\n');

    await sendEmail({
      to: 'evrybadydigital@gmail.com',
      replyTo: email,
      subject: `Consultation booking request: ${service}`,
      html: `<h2>New consultation booking</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${cleanPhone}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong> ${cleanMessage}</p>`,
      text: businessMailText,
    });

    await sendEmail({
      to: email,
      replyTo: 'evrybadydigital@gmail.com',
      subject: 'Your consultation booking request has been received',
      html: `<p>Hi ${name},</p><p>Thanks for booking a consultation with Evrybady Digital. We have received your request and will be in touch shortly to confirm your session.</p><p><strong>Selected service:</strong> ${service}</p><p><strong>Email provided:</strong> ${email}</p><p><strong>Phone provided:</strong> ${cleanPhone}</p><p><strong>Project details:</strong> ${cleanMessage}</p><p>To get started, please visit our services page: <a href="https://evrybady.digital/services">https://evrybady.digital/services</a></p><p>Best regards,<br />Evrybady Digital</p>`,
      text: clientMailText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error', error);
    return NextResponse.json({ error: 'Unable to send booking confirmation right now.' }, { status: 500 });
  }
}
