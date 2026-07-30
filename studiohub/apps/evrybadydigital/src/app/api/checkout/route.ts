import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body as {
      name: string;
      email: string;
      phone: string;
      service: string;
      message?: string;
    };

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Name, email, and service are required.' },
        { status: 400 },
      );
    }

    const feeGbp = Number(process.env.NEXT_PUBLIC_BOOKING_FEE_GBP ?? 5000);
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const paymentLinkUrl = process.env.STRIPE_PAYMENT_LINK_URL || 'https://buy.stripe.com/7sY8wP2GtdE87zhfpFes000';

    let checkoutUrl = paymentLinkUrl;

    if (!process.env.STRIPE_PAYMENT_LINK_URL && process.env.STRIPE_SECRET_KEY) {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: `Consultation Booking — ${service}`,
                description: `Booking fee for a ${service} consultation with Evrybady Digital.`,
              },
              unit_amount: feeGbp,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/booking?cancelled=1`,
        metadata: {
          service,
          name,
          phone: phone ?? '',
          message: message ?? '',
        },
      });
      checkoutUrl = session.url || checkoutUrl;
    }

    await sendEmail({
      to: 'evrybadydigital@gmail.com',
      replyTo: email,
      subject: `New consultation booking request: ${service}`,
      html: `<h2>New consultation booking</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone ?? 'Not provided'}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong> ${message ?? 'No additional details provided'}</p>`,
      text: `New consultation booking\nName: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'Not provided'}\nService: ${service}\nMessage: ${message ?? 'No additional details provided'}`,
    });

    await sendEmail({
      to: email,
      replyTo: 'evrybadydigital@gmail.com',
      subject: 'Your consultation booking request has been received',
      html: `<p>Hi ${name},</p><p>Thanks for booking a consultation with Evrybady Digital. Your payment session is ready and we have received your request.</p><p>Please visit our services page here: <a href="https://evrybady.digital/services">https://evrybady.digital/services</a></p><p>Best regards,<br />Evrybady Digital</p>`,
      text: `Hi ${name},\n\nThanks for booking a consultation with Evrybady Digital. Your payment session is ready and we have received your request.\n\nPlease visit our services page here: https://evrybady.digital/services\n\nBest regards,\nEvrybady Digital`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Unable to create checkout session.' },
      { status: 500 },
    );
  }
}
