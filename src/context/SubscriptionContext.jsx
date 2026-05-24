// SubscriptionContext — manages the user's current plan + checkout flow
// Reads subscription from user.subscription (stored on AuthContext user object).
// In localStorage-only mode, the success URL trusts the user (good enough for MVP).
// In production with Supabase, the webhook is the source of truth.

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGamification } from './GamificationContext';
import { PLANS, getPlanById } from '../data/pricing';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const { user, updateUser } = useAuth();
  const { play, pushToast, fireConfetti } = useGamification();
  const [checkingOut, setCheckingOut] = useState(false);

  // Current plan — defaults to 'free' if user has no subscription
  const currentPlan = getPlanById(user?.subscription?.planId || 'free');
  const isPaid = currentPlan?.id !== 'free';

  // Check URL params for Stripe redirect (success/canceled)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const subStatus = params.get('subscription');

    if (subStatus === 'success') {
      const sessionId = params.get('session_id');
      // Trust the URL for MVP — in production this should hit your backend to verify
      // and read from Supabase. For now: optimistically mark user as Pro.
      handleCheckoutSuccess(sessionId);
      // Clean the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('subscription');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    } else if (subStatus === 'canceled') {
      pushToast({ title: 'Compra cancelada', subtitle: 'Sem problemas — você pode fazer depois.' });
      const url = new URL(window.location.href);
      url.searchParams.delete('subscription');
      window.history.replaceState({}, '', url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckoutSuccess = useCallback((sessionId) => {
    // For MVP: mark as Pro. In production this comes from the webhook → DB.
    const pending = sessionStorage.getItem('codepath_pending_plan');
    if (pending) {
      try {
        const { planId, billingCycle } = JSON.parse(pending);
        updateUser({
          subscription: {
            planId,
            billingCycle,
            stripeSessionId: sessionId,
            startedAt: Date.now(),
            status: 'active',
          },
        });
        sessionStorage.removeItem('codepath_pending_plan');
        play('levelUp');
        fireConfetti();
        pushToast({
          title: '🎉 Bem-vindo ao Pro!',
          subtitle: 'Todos os recursos premium liberados.',
        });
      } catch (e) { /* ignore */ }
    }
  }, [updateUser, play, fireConfetti, pushToast]);

  // Start checkout flow
  const startCheckout = useCallback(async (planId, billingCycle = 'monthly', seats = 1) => {
    const plan = getPlanById(planId);
    if (!plan || !plan.stripe) {
      pushToast({ title: 'Plano inválido', subtitle: '' });
      return;
    }
    if (!user) {
      pushToast({ title: 'Faça login primeiro', subtitle: 'Crie uma conta pra assinar' });
      return;
    }

    const priceId = billingCycle === 'yearly'
      ? plan.stripe.priceIdYearly
      : plan.stripe.priceIdMonthly;

    if (!priceId || priceId.startsWith('price_REPLACE')) {
      pushToast({
        title: 'Stripe não configurado ainda',
        subtitle: 'Veja docs/STRIPE-SETUP.md pra ativar pagamentos',
      });
      return;
    }

    setCheckingOut(true);
    play('click');
    sessionStorage.setItem('codepath_pending_plan', JSON.stringify({ planId, billingCycle }));

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          planId,
          billingCycle,
          seats,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        pushToast({ title: 'Erro ao iniciar checkout', subtitle: data.error || '' });
        play('wrong');
      }
    } catch (err) {
      pushToast({ title: 'Erro de conexão', subtitle: err.message });
      play('wrong');
    } finally {
      setCheckingOut(false);
    }
  }, [user, play, pushToast]);

  // Cancel subscription (Stripe Customer Portal — opens hosted page)
  const openManageSubscription = useCallback(() => {
    pushToast({
      title: 'Acessando portal...',
      subtitle: 'Você vai gerenciar sua assinatura na página segura do Stripe',
    });
    // In production: hit /api/create-portal-session and redirect there
    window.alert('Em produção: redirecionar pro Stripe Customer Portal');
  }, [pushToast]);

  // Check if a feature is available in the current plan
  // (Used by UI to gate premium features)
  const canAccess = useCallback((feature) => {
    // Free plan limits
    if (currentPlan.id === 'free') {
      switch (feature) {
        case 'all_lessons':    return false;
        case 'all_minigames':  return false;
        case 'all_themes':     return false;
        case 'ai_explainer':   return false;
        case 'unlimited_friends': return false;
        case 'no_ads':         return false;
        default:               return true;
      }
    }
    return true; // Pro/School unlock everything
  }, [currentPlan]);

  const value = {
    currentPlan,
    plans: PLANS,
    isPaid,
    isFree: !isPaid,
    checkingOut,
    startCheckout,
    openManageSubscription,
    canAccess,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}
