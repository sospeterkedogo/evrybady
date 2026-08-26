import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';

function toServices(services: unknown, service: unknown): string[] {
  if (Array.isArray(services) && services.length > 0) {
    return services.map((s) => String(s)).filter(Boolean);
  }
  if (service) return [String(service)];
  return [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, services, service, message } = body as {
      name: string;
      email: string;
      phone: string;
      services?: string[];
      service?: string;
      message?: string;
    };

    const selectedServices = toServices(services, service);

    if (!name || !email || selectedServices.length === 0) {
      return NextResponse.json(
        { error: 'Name, email, and at least one service are required.' },
        { status: 400 },
      );
    }

    const feeGbp = Number(process.env.NEXT_PUBLIC_BOOKING_FEE_GBP ?? 10000);
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const paymentLinkUrl = process.env.STRIPE_PAYMENT_LINK_URL || 'https://buy.stripe.com/7sY8wP2GtdE87zhfpFes000';
    const serviceLabel = selectedServices.join(', ');
    const cleanPhone = phone?.trim() || 'Not provided';
    const cleanMessage = message?.trim() || 'No additional details provided';

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
                name: 'Onboarding Consultation with Evrybady Digital',
                description: `Consultation booking fee. Services of interest: ${serviceLabel}.`,
              },
              unit_amount: feeGbp,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/booking?cancelled=1`,
        metadata: {
          services: serviceLabel,
          name,
          phone: cleanPhone,
          message: cleanMessage,
        },
      });
      checkoutUrl = session.url || checkoutUrl;
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Unable to create checkout session.' },
      { status: 500 },
    );
  }
}
