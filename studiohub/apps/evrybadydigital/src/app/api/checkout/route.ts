import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';

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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Unable to create checkout session.' },
      { status: 500 },
    );
  }
}
