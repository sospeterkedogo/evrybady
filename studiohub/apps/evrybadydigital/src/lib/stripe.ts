import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function createStripeClient(secretKey = process.env.STRIPE_SECRET_KEY) {
  const trimmedKey = secretKey?.trim();

  if (!trimmedKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  return new Stripe(trimmedKey, {
    typescript: true,
  });
}

export function getStripeClient(secretKey = process.env.STRIPE_SECRET_KEY) {
  if (!stripeClient) {
    stripeClient = createStripeClient(secretKey);
  }

  return stripeClient;
}
