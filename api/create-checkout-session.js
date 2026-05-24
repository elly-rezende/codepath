// Vercel Serverless Function — creates a Stripe Checkout Session
// Called from the client when user clicks "Upgrade".
//
// Required env vars (set in Vercel Dashboard → Project Settings → Env Vars):
//   STRIPE_SECRET_KEY=sk_live_... (or sk_test_... while developing)
//
// POST /api/create-checkout-session
// Body: { priceId, planId, userId, userEmail, billingCycle: 'monthly'|'yearly', seats? }
// Returns: { url: 'https://checkout.stripe.com/...' }

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Stripe não configurado no servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { priceId, planId, userId, userEmail, billingCycle, seats = 1 } = body || {};

  if (!priceId || !userId) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(apiKey, { apiVersion: '2024-12-18.acacia' });

  // Build the success/cancel URLs — relative paths work because Stripe
  // appends the host from the Origin header
  const origin = req.headers.get('origin') || req.headers.get('referer') || 'https://codepath.app';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'boleto'],
      line_items: [{
        price: priceId,
        quantity: seats,
      }],
      customer_email: userEmail || undefined,
      client_reference_id: userId,
      metadata: {
        userId,
        planId,
        billingCycle,
        seats: String(seats),
      },
      subscription_data: {
        metadata: { userId, planId },
      },
      // Allow promotion codes (kid-friendly coupons!)
      allow_promotion_codes: true,

      // Brazilian-friendly UX
      locale: 'pt-BR',

      // Where the user lands after success/cancel
      success_url: `${origin}/?subscription=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?subscription=canceled`,
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Stripe error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
