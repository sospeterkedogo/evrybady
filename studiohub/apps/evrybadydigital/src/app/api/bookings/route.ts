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

    const mailText = [
      'New consultation booking',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service: ${service}`,
      `Message: ${message || 'No additional details provided'}`,
    ].join('\n');

    await sendEmail({
      to: 'evrybadydigital@gmail.com',
      replyTo: email,
      subject: `Consultation booking request: ${service}`,
      html: `<h2>New consultation booking</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'Not provided'}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong> ${message || 'No additional details provided'}</p>`,
      text: mailText,
    });

    await sendEmail({
      to: email,
      replyTo: 'evrybadydigital@gmail.com',
      subject: 'Your consultation booking request has been received',
      html: `<p>Hi ${name},</p><p>Thanks for booking a consultation with Evrybady Digital. We've received your request and will be in touch soon.</p><p>To get started, please visit our services page: <a href="https://evrybady.digital/services">https://evrybady.digital/services</a></p><p>Best regards,<br />Evrybady Digital</p>`,
      text: `Hi ${name},\n\nThanks for booking a consultation with Evrybady Digital. We've received your request and will be in touch soon.\n\nTo get started, please visit our services page: https://evrybady.digital/services\n\nBest regards,\nEvrybady Digital`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error', error);
    return NextResponse.json({ error: 'Unable to send booking confirmation right now.' }, { status: 500 });
  }
}
