// PricingPage — 3-tier plan comparison with monthly/yearly toggle
// Triggers Stripe Checkout when user clicks Upgrade.

import { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/pricing';

export default function PricingPage() {
  const { plans, currentPlan, startCheckout, checkingOut, openManageSubscription } = useSubscription();
  const { user } = useAuth();
  const { setCurrentView } = useApp();
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [seats, setSeats] = useState(10);

  const handleSelect = (plan) => {
    if (plan.id === 'free') {
      // Already free — just go to dashboard
      setCurrentView('dashboard');
      return;
    }
    if (plan.id === 'school') {
      // For school plan, use seats; for individual Pro, always 1
      startCheckout(plan.id, billingCycle, plan.id === 'school' ? seats : 1);
    } else {
      startCheckout(plan.id, billingCycle, 1);
    }
  };

  const getDisplayPrice = (plan) => {
    if (plan.id === 'free') return { price: 0, label: 'pra sempre' };
    const price = billingCycle === 'yearly'
      ? plan.priceYearly / 12   // show as monthly equivalent
      : plan.priceMonthly;
    return {
      price,
      label: billingCycle === 'yearly' ? '/mês (anual)' : '/mês',
      yearlyTotal: plan.priceYearly,
    };
  };

  return (
    <div className="pricing-page">
      {/* Header */}
      <button className="pricing-back" onClick={() => setCurrentView('dashboard')}>
        ← Voltar
      </button>

      <div className="pricing-hero">
        <div className="pricing-emoji">💎</div>
        <h1 className="pricing-title">Vire Pro e libere TUDO</h1>
        <p className="pricing-subtitle">
          Acesso ilimitado a todas as lições, jogos, skins e atualizações futuras.
          Cancela quando quiser.
        </p>

        {/* Billing toggle */}
        <div className="billing-toggle">
          <button
            className={`billing-opt ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Mensal
          </button>
          <button
            className={`billing-opt ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Anual <span className="save-tag">economize 25%</span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="pricing-grid">
        {plans.map(plan => {
          const { price, label, yearlyTotal } = getDisplayPrice(plan);
          const isCurrent = currentPlan.id === plan.id;
          const showSeats = plan.id === 'school';

          return (
            <div
              key={plan.id}
              className={`pricing-card ${plan.id === 'pro' ? 'featured' : ''} ${isCurrent ? 'current' : ''}`}
              style={{ borderColor: plan.color }}
            >
              {plan.badge && (
                <div className="pricing-badge" style={{ background: plan.color, color: plan.id === 'school' ? 'white' : '#000' }}>
                  {plan.badge}
                </div>
              )}

              <div className="pricing-card-header">
                <h3 className="pricing-card-name" style={{ color: plan.color }}>
                  {plan.name}
                </h3>
                <p className="pricing-card-sub">{plan.subtitle}</p>
              </div>

              <div className="pricing-price-row">
                <span className="pricing-price">{formatPrice(price)}</span>
                <span className="pricing-price-unit">
                  {plan.perUnit ? `/${plan.perUnit}` : ''}{label}
                </span>
              </div>

              {plan.id !== 'free' && billingCycle === 'yearly' && (
                <div className="pricing-yearly-note">
                  {formatPrice(yearlyTotal)} cobrado anualmente
                </div>
              )}

              {showSeats && (
                <div className="seats-picker">
                  <label className="seats-label">Número de alunos:</label>
                  <div className="seats-input-row">
                    <button
                      className="seats-btn"
                      onClick={() => setSeats(s => Math.max(plan.minSeats, s - 5))}
                    >−</button>
                    <input
                      type="number"
                      className="seats-input"
                      value={seats}
                      onChange={e => setSeats(Math.max(plan.minSeats, parseInt(e.target.value) || plan.minSeats))}
                      min={plan.minSeats}
                    />
                    <button
                      className="seats-btn"
                      onClick={() => setSeats(s => s + 5)}
                    >+</button>
                  </div>
                  <div className="seats-total">
                    Total: <strong>{formatPrice(price * seats)}{label}</strong>
                  </div>
                </div>
              )}

              <ul className="pricing-features">
                {plan.features.map((f, i) => (
                  <li key={i} className={f.included ? 'included' : 'excluded'}>
                    <span className="feature-icon">
                      {f.included ? '✓' : '✗'}
                    </span>
                    <span className="feature-text">{f.text}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button className="pricing-cta current">
                  ✓ Seu plano atual
                </button>
              ) : (
                <button
                  className="pricing-cta"
                  onClick={() => handleSelect(plan)}
                  disabled={checkingOut}
                  style={{ background: plan.color, color: plan.id === 'free' ? 'white' : '#000' }}
                >
                  {checkingOut ? 'Carregando...' : plan.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {currentPlan.id !== 'free' && (
        <div className="pricing-manage">
          <button className="manage-link" onClick={openManageSubscription}>
            Gerenciar assinatura
          </button>
        </div>
      )}

      <div className="pricing-faq">
        <h2 className="faq-title">Perguntas frequentes</h2>
        <details className="faq-item">
          <summary>Posso cancelar quando quiser?</summary>
          <p>Sim! Cancela em 1 clique pelo painel do Stripe. Você continua tendo acesso até o fim do período pago.</p>
        </details>
        <details className="faq-item">
          <summary>Existe trial grátis?</summary>
          <p>O plano Gratuito já permite testar tudo. Quando quiser destravar o conteúdo completo, vira Pro.</p>
        </details>
        <details className="faq-item">
          <summary>Aceita boleto / cartão?</summary>
          <p>Aceita cartão de crédito (Visa, Master, Amex, Elo) e boleto bancário (via Stripe). PIX em breve.</p>
        </details>
        <details className="faq-item">
          <summary>É seguro?</summary>
          <p>Todo pagamento passa pelo Stripe, certificado PCI-DSS Level 1 (a mais alta segurança). A gente nunca vê seus dados de cartão.</p>
        </details>
        <details className="faq-item">
          <summary>E pra escolas/empresas?</summary>
          <p>O plano Escola tem nota fiscal corporativa, painel de professor, e suporte por WhatsApp. Mínimo 10 alunos.</p>
        </details>
      </div>
    </div>
  );
}
