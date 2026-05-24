// Pricing tiers — Free, Pro Individual, Escola
// Prices in BRL (centavos at the Stripe level, but displayed as R$ here).
// stripe.priceId values must match what you create in your Stripe Dashboard.

export const PLANS = [
  {
    id: 'free',
    name: 'Gratuito',
    subtitle: 'Pra experimentar',
    priceMonthly: 0,
    priceYearly: 0,
    badge: null,
    color: '#94A3B8',
    features: [
      { text: '5 lições por semana', included: true },
      { text: '1 trilha por vez', included: true },
      { text: 'Mascote Bit básico', included: true },
      { text: 'Acesso ao Memory Match', included: true },
      { text: 'Conquistas e moedas', included: true },
      { text: 'Adicionar até 3 amigos', included: true },
      { text: 'Acesso a TODAS as 50 lições', included: false },
      { text: 'Todos os mini-jogos (5)', included: false },
      { text: 'Skins do Bit + temas premium', included: false },
      { text: 'Explicações com IA (ChatGPT)', included: false },
      { text: 'Sem anúncios', included: false },
    ],
    cta: 'Começar grátis',
    stripe: null, // no Stripe needed for free
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Pra quem quer evoluir rápido',
    priceMonthly: 19.90,
    priceYearly: 179.00,        // ~25% desconto anual
    badge: '⭐ Mais Popular',
    color: '#3B82F6',
    features: [
      { text: 'Lições ILIMITADAS', included: true },
      { text: 'Acesso a TODAS as 50 lições', included: true },
      { text: 'Todas as 5 trilhas', included: true },
      { text: 'TODOS os 5 mini-jogos', included: true },
      { text: 'Mascote Bit em 3D + skins', included: true },
      { text: 'Todos os temas visuais', included: true },
      { text: 'Explicações com IA ilimitadas', included: true },
      { text: 'Amigos ilimitados', included: true },
      { text: 'Sem anúncios', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Próximas atualizações grátis', included: true },
    ],
    cta: 'Virar Pro',
    stripe: {
      priceIdMonthly: 'price_REPLACE_WITH_MONTHLY_ID',
      priceIdYearly:  'price_REPLACE_WITH_YEARLY_ID',
    },
  },
  {
    id: 'school',
    name: 'Escola',
    subtitle: 'Pra educadores',
    priceMonthly: 9.90,         // por aluno/mês
    priceYearly: 89.00,         // por aluno/ano
    perUnit: 'aluno',
    minSeats: 10,
    badge: '🏫 B2B',
    color: '#10D9C4',
    features: [
      { text: 'TUDO do plano Pro', included: true },
      { text: 'Painel de professor', included: true },
      { text: 'Múltiplas turmas', included: true },
      { text: 'Dashboard de progresso da turma', included: true },
      { text: 'Atribuir lições obrigatórias', included: true },
      { text: 'Relatórios em PDF', included: true },
      { text: 'Onboarding personalizado', included: true },
      { text: 'Treinamento pra professores', included: true },
      { text: 'Suporte por WhatsApp', included: true },
      { text: 'Nota fiscal corporativa', included: true },
      { text: 'Mínimo 10 alunos', included: true },
    ],
    cta: 'Falar com vendas',
    stripe: {
      priceIdMonthly: 'price_REPLACE_WITH_SCHOOL_MONTHLY',
      priceIdYearly:  'price_REPLACE_WITH_SCHOOL_YEARLY',
    },
  },
];

// Format BRL price string
export function formatPrice(value) {
  if (value === 0) return 'Grátis';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function getPlanById(id) {
  return PLANS.find(p => p.id === id);
}
