# 💳 Setup Stripe — Pagamentos no CodePath

Guia rápido pra ativar pagamentos reais via Stripe.

> ⚠️ A pricing page já está funcionando como **vitrine**. Mas pra cobrar de verdade, você precisa criar uma conta Stripe e plugar as chaves. Sem isso, o botão "Comprar" mostra um aviso amigável.

---

## 1. Criar conta Stripe

1. https://stripe.com/br → "Comece agora"
2. Cria conta com seu email
3. **Modo Teste vs Live**: o painel já abre no **Modo Teste** (transações fictícias). Use isso pra desenvolver. Quando estiver pronto, ative o modo Live preenchendo os dados da sua empresa.

---

## 2. Criar os produtos e preços

No painel do Stripe:

### Produto 1: CodePath Pro
1. **Catálogo de produtos → Adicionar produto**
2. **Nome:** `CodePath Pro`
3. **Imagem:** opcional (você pode colocar o ícone do Bit)
4. **Preço 1: Mensal**
   - Valor: `R$ 19,90`
   - Período: **Recorrente → Mensal**
   - Moeda: BRL
   - Salvar → copie o **Price ID** (formato `price_1QrXYZ...`)
5. **Preço 2: Anual**
   - Valor: `R$ 179,00`
   - Período: **Recorrente → Anual**
   - Salvar → copie o Price ID

### Produto 2: CodePath Escola
1. **Adicionar produto** → `CodePath Escola`
2. **Preço Mensal por aluno**: `R$ 9,90/mês`
3. **Preço Anual por aluno**: `R$ 89,00/ano`
4. ✅ Marque **Por unidade** ("per seat") nos dois preços
5. Copie os 2 Price IDs

---

## 3. Colar os Price IDs no código

Abra `src/data/pricing.js` e substitua os placeholders:

```js
// Antes (placeholders):
priceIdMonthly: 'price_REPLACE_WITH_MONTHLY_ID',
priceIdYearly:  'price_REPLACE_WITH_YEARLY_ID',

// Depois (seus IDs reais):
priceIdMonthly: 'price_1QrXYZ...',   // do Stripe Dashboard
priceIdYearly:  'price_1QrABC...',
```

Faça pro plano `pro` E pro plano `school`.

---

## 4. Configurar chaves no Vercel

### a) Pegue as chaves do Stripe
- Painel Stripe → **Desenvolvedores → Chaves de API**
- Copie a **Chave secreta** (começa com `sk_test_...` em modo teste, ou `sk_live_...` em produção)
- ⚠️ **Não copie a Chave publicável** — não precisamos dela, e a secreta nunca deve ir pro frontend

### b) Adicione no Vercel
- Vercel Dashboard → seu projeto → **Settings → Environment Variables**
- Adicione:
  - Name: `STRIPE_SECRET_KEY`
  - Value: `sk_test_...` (sua chave)
  - Environment: ✅ Production, Preview, Development
- Clica "Save"

### c) (Para uso local) Adicione no `.env`

```bash
STRIPE_SECRET_KEY=sk_test_...
```

> Note que o `STRIPE_SECRET_KEY` NÃO começa com `VITE_`. Isso é proposital — essa chave fica só no servidor (serverless functions), nunca exposta no browser.

---

## 5. Configurar webhook (opcional mas recomendado)

Webhooks dizem pra sua app: "este usuário acabou de pagar / cancelou / falhou pagamento".

1. Painel Stripe → **Desenvolvedores → Webhooks → Adicionar endpoint**
2. **URL do endpoint:** `https://seu-app.vercel.app/api/stripe-webhook`
3. **Eventos a ouvir:**
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Salve e clique no webhook criado → veja **"Signing secret"** (começa com `whsec_...`)
5. Copie e adicione no Vercel: `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 6. Testar

### Cartão de teste do Stripe (não cobra de verdade):
- **Número:** `4242 4242 4242 4242`
- **Validade:** qualquer futuro (ex: `12/30`)
- **CVV:** qualquer 3 dígitos
- **CEP:** qualquer

### Fluxo:
1. Abre o app, faz login
2. Vai pra pricing page (`?view=pricing` ou via menu)
3. Clica "Virar Pro"
4. Você é redirecionada pro Stripe Checkout
5. Coloca o cartão de teste
6. Volta pro app com `?subscription=success`
7. Toast "Bem-vindo ao Pro!" + recursos liberados

---

## 7. Ir para Live

Quando estiver pronta pra cobrar de verdade:

1. No painel Stripe, **complete o cadastro da empresa** (CNPJ, conta bancária, etc.)
2. **Ative o modo Live**
3. **Crie de novo os produtos e preços** no modo Live (eles são separados do teste)
4. Atualize `pricing.js` com os Price IDs do modo Live
5. Atualize o env var `STRIPE_SECRET_KEY` no Vercel com `sk_live_...`
6. Configure webhook do modo Live (URL igual, mas signing secret diferente)
7. Redeploy

---

## 📊 Preços sugeridos vs concorrência

| Plataforma | Preço mensal | O que oferece |
|---|---|---|
| **CodePath Pro** | R$ 19,90 | 50 lições, 5 mini-jogos, IA, comunidade |
| Mimo Premium | R$ 49,90 | Conteúdo mais raso, em inglês |
| Sololearn Pro | R$ 35,00 | Sem gamificação real |
| Codecademy Plus | R$ 99,90 | Web only, sem mobile bom |

Você tá **bem posicionada** — preço acessível pra mercado BR + features que custariam o dobro lá fora.

---

## 🆘 Problemas comuns

**"Stripe não configurado no servidor":**
- Vercel não tem `STRIPE_SECRET_KEY` → adiciona no Settings → Env Vars → Redeploy

**Checkout abre mas não volta:**
- Confere se o domínio do success_url está autorizado no Stripe (Settings → Branding → Domínios)

**Webhook falha com "signature verification":**
- O `STRIPE_WEBHOOK_SECRET` está errado, ou você está usando o de teste em produção (ou vice-versa)
