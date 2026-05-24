// Vercel Serverless Function — Stripe webhook handler
// Receives events from Stripe (payment succeeded, subscription updated, etc.)
//
// Setup in Stripe Dashboard → Developers → Webhooks → Add endpoint:
//   URL: https://your-app.vercel.app/api/stripe-webhook
//   Events to listen: checkout.session.completed, customer.subscription.updated,
//                     customer.subscription.deleted, invoice.payment_failed
//   Copy the "Signing secret" → set as STRIPE_WEBHOOK_SECRET env var.
//
// In production this should update Supabase. In localStorage-only mode,
// we can't really process server→client events, so we log and rely on
// the success-URL flow as a fallback.

import Stripe from 'stripe';

export const config = {
  runtime: 'edge',
  // Webhooks must NOT be parsed as JSON automatically — we need the raw body
  // to verify the signature.
};

async function readBody(req) {
  const reader = req.body.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!apiKey || !webhookSecret) {
    return new Response('Stripe not configured', { status: 500 });
  }

  const stripe = new Stripe(apiKey, { apiVersion: '2024-12-18.acacia' });
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle relevant events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, planId, billingCycle } = session.metadata || {};
        console.log(`✓ User ${userId} subscribed to ${planId} (${billingCycle})`);
        // In production: update Supabase:
        //   await supabase.from('subscriptions').upsert({
        //     user_id: userId, plan: planId, status: 'active',
        //     stripe_subscription_id: session.subscription,
        //     current_period_end: ...
        //   });
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        console.log(`↺ Subscription ${sub.id} updated to ${sub.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        console.log(`✗ Subscription ${sub.id} canceled`);
        // In production: downgrade user to free plan
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`⚠ Payment failed for invoice ${invoice.id}`);
        // Optionally email the user, send a notification
        break;
      }

      default:
        // Many events fire — silently ignore the ones we don't care about
        console.log(`ℹ Ignoring event ${event.type}`);
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return new Response('Internal error', { status: 500 });
  }

  return new Response('ok', { status: 200 });
}
