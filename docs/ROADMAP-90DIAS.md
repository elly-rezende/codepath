# 📅 Roadmap de 90 dias — Codificando sozinha

> Plano realista pra você aprender o que precisa **enquanto evolui o produto**. Cada bloco mistura **aprendizado** + **task concreta no app** + **valor comercial gerado**.

---

## 🎯 Filosofia: aprender fazendo

❌ **Errado:** estudar 3 meses de teoria, depois mexer no app.
✅ **Certo:** mexer no app TODO DIA, aprendendo só o que precisa pra cada mudança.

---

## 🗓 MÊS 1 — Confortável editando conteúdo (sem programar)

**Meta:** Você consegue mudar textos, cores, preços, lições, sem mexer em lógica.

### Semana 1 — Setup + primeiros commits

**Dia 1-2: Instala ferramentas**
- [ ] Instala **VS Code** (editor) + extensões: ESLint, Prettier, Tailwind CSS IntelliSense
- [ ] Instala **GitHub Desktop** (mais visual que terminal pra git)
- [ ] Cria atalho no celular pro app deployado (`codepath-elly.vercel.app`)
- [ ] Lê `docs/MANUAL-DEV.md` inteiro

**Dia 3-4: Primeira mudança real**
- [ ] Muda 1 cor no `tokens.json` (ex: troca o verde por outro tom)
- [ ] Roda `npm run sync-tokens`
- [ ] Roda `npm run dev`, vê a mudança local
- [ ] `git add . && git commit -m "muda verde do app"` + `git push`
- [ ] Espera 2min, abre no celular pra ver no ar

**Dia 5-7: Conteúdo das lições**
- [ ] Lê **1 lição inteira** de `csf-track.js`
- [ ] Muda o `title` e o `hook` de 1 lição
- [ ] Deploy
- [ ] Verifica no app

**🎯 Resultado da semana:** 3+ commits no GitHub, primeira sensação de "eu consigo".

---

### Semana 2 — Conteúdo + cores

**Dias 8-10: Refinar texto das 50 lições**
- [ ] Lê todas as 50 lições. Anota quais frases ficaram esquisitas.
- [ ] Corrige 10-20 frases ruins.
- [ ] Adiciona seu próprio toque na escrita (sua personalidade).

**Dias 11-14: Identidade visual sua**
- [ ] Decide as cores oficiais da sua marca (2-3 cores).
- [ ] Edita `src/styles/tokens.json` pra usar essas cores.
- [ ] Cria 1 tema novo customizado (siga snippet em `SNIPPETS.md` seção 4).
- [ ] Troca o `og:image` (preview quando compartilha link) — cria um banner no Canva 1200x630.

**📚 Estudo (1h/dia opcional):**
- Curso em Vídeo: **"HTML5 e CSS3 Módulo 1"** do Guanabara (gratuito no YouTube)
- Foco: entender só sintaxe básica de HTML e CSS

---

### Semana 3 — Preços + marketing

**Dias 15-17: Strategy de preços**
- [ ] Pesquisa preços dos concorrentes (Mimo, Sololearn, Codecademy)
- [ ] Ajusta `src/data/pricing.js` com SEUS preços
- [ ] Atualiza textos da `PricingPage.jsx` pra falar como SUA marca fala

**Dias 18-21: Landing page (marketing)**
- [ ] Cria uma landing page real (substitui o HeroSection atual)
- [ ] Inclui: hero impactante, depoimentos (mesmo que fictícios pra começar), feature comparison, CTA forte
- [ ] **Compre o domínio** se ainda não comprou (Registro.br, ~R$ 40/ano)
- [ ] Configura no Vercel (Settings → Domains)

**🎯 Resultado da semana:** seu app tem nome, identidade visual e está em `seuapp.com.br`.

---

### Semana 4 — Primeiros usuários

**Dias 22-24: Beta fechado**
- [ ] Manda o link pro WhatsApp pra **10 amigos/familiares** com filhos de 8-17 anos
- [ ] Pede feedback honesto. Anota tudo.
- [ ] Cria um formulário no Google Forms pra coletar feedback.

**Dias 25-28: Iterações baseadas no feedback**
- [ ] Conserta os 3 problemas mais reclamados
- [ ] Adiciona 1 feature pedida (se for simples)
- [ ] Comunica pros beta testers que a versão 2 está no ar

**Dias 29-30: Marketing inicial**
- [ ] Cria Instagram `@seuapp`
- [ ] Cria TikTok `@seuapp`
- [ ] Posta 5 conteúdos: screenshots, "behind the scenes", uma lição em vídeo curto

**🎯 Resultado do mês 1:**
- App no ar com domínio próprio ✅
- Sua identidade visual definida ✅
- 10 beta testers reais ✅
- Conta no Instagram/TikTok pra crescer ✅

---

## 🗓 MÊS 2 — Aprende a programar (light)

**Meta:** Você entende o que cada `useState` e `useEffect` faz, e consegue criar componentes simples sozinha.

### Semana 5 — Fundamentos JavaScript

**Estudo (2h/dia):**
- Curso em Vídeo **"JavaScript Módulo A"** — Aulas 1-10
  - Variáveis, tipos, operadores
  - Condicionais (if/else)
  - Loops (for/while)
  - Funções

**Aplicação no app:**
- [ ] Lê 5 funções pequenas no projeto e tenta explicar pra si mesma o que cada linha faz
- [ ] Edita 3 funções existentes pra mudar comportamento (ex: o reward dos mini-jogos)

---

### Semana 6 — JavaScript moderno (ES6+)

**Estudo:**
- Arrow functions: `const f = (x) => x * 2`
- Destructuring: `const { name, age } = pessoa`
- Spread: `[...arr1, ...arr2]`
- Template strings: `` `Oi, ${nome}!` ``
- Métodos de array: `map`, `filter`, `find`, `reduce`

**Aplicação:**
- [ ] No `Profile.jsx`, escreve uma função que filtra `inventory` por raridade
- [ ] Mostra essa info numa nova seção do perfil

---

### Semana 7 — React básico

**Estudo:**
- Vídeo "React em 1h" do Filipe Deschamps
- Doc oficial React em PT: https://react.dev/learn (faz o tutorial)
- Conceitos: props, state, useState, useEffect

**Aplicação:**
- [ ] Cria seu **primeiro componente do zero** seguindo snippet 15
- [ ] Adiciona no Dashboard
- [ ] Faz ele exibir algo dinâmico (ex: hora atual)

---

### Semana 8 — Pequenas features sozinha

**Aplicação prática (1 feature por dia):**
- [ ] **Dia 1:** botão "compartilhar progresso" que copia "Estou em X XP no CodePath!" pro clipboard
- [ ] **Dia 2:** contador "X dias desde que começou" no perfil
- [ ] **Dia 3:** botão "exportar dados" que baixa um JSON com tudo
- [ ] **Dia 4:** página "Sobre" com sua história + missão do app
- [ ] **Dia 5:** modal "novidades da semana" no Dashboard

**🎯 Resultado do mês 2:**
- Você entende React básico ✅
- Conseguiu adicionar 5 features pequenas SOZINHA ✅
- Tem 50-100 betas testers ✅
- Comunidade Instagram crescendo ✅

---

## 🗓 MÊS 3 — Comercialização + escala

**Meta:** App publicado nas lojas, primeiros R$ no banco, processo de aquisição funcionando.

### Semana 9 — Ativar Stripe (cobrar de verdade)

- [ ] Cria conta no **Stripe BR**
- [ ] Cria os produtos no Stripe (segue `docs/STRIPE-SETUP.md`)
- [ ] Cola os Price IDs em `pricing.js`
- [ ] Configura env vars no Vercel
- [ ] **Testa com cartão de teste** (4242 4242 4242 4242)
- [ ] Quando estiver perfeito, ativa **modo Live**
- [ ] Posta nas redes: "CodePath Pro está disponível!"

**Meta da semana:** primeira venda real (mesmo que seja R$ 19,90 de alguém da família).

---

### Semana 10 — App Android (Play Store)

- [ ] Instala Android Studio
- [ ] Segue `docs/ANDROID-DEPLOY.md`
- [ ] Cria conta Play Console (R$ 130)
- [ ] Gera o AAB
- [ ] Submete pra review
- [ ] **Aprovação em 1-3 dias** → app no ar

**Promoção:** posta no Instagram: "Baixe agora na Google Play!"

---

### Semana 11 — Analytics + retenção

- [ ] Instala **PostHog** (gratuito até 1M eventos/mês)
- [ ] Adiciona events: `lesson_completed`, `purchase`, `share_click`
- [ ] Vê onde users param/desistem
- [ ] Conserta os 3 funis com maior drop-off

**Ferramentas:**
- PostHog: https://posthog.com (grátis)
- Plausible (alternativa): https://plausible.io
- Google Analytics 4 (gratuito mas complexo)

---

### Semana 12 — Suporte + crescimento

- [ ] Cria WhatsApp Business pra suporte
- [ ] Cria FAQ na pricing page (já tem base)
- [ ] Implementa botão "Reportar bug" no perfil
- [ ] Faz parceria com 1-2 influencers de educação infantil
- [ ] Roda primeira campanha de Google Ads (R$ 100 de teste)

**🎯 Resultado do mês 3:**
- Pagamentos funcionando ✅
- App na Google Play ✅
- Primeiros R$ no banco ✅
- Funil de aquisição definido ✅
- 500-1000 usuários ✅

---

## 📊 Indicadores de sucesso (KPIs)

Acompanha esses números toda semana:

| Métrica | Onde vê | Meta mês 1 | Meta mês 3 |
|---|---|---|---|
| Usuários totais | Vercel Analytics ou PostHog | 50 | 1.000 |
| Lições completas | localStorage ou backend | 200 | 5.000 |
| Tempo médio na sessão | PostHog | 5 min | 10 min |
| Conversão Free→Pro | Stripe Dashboard | — | 3-5% |
| Retenção D7 (volta após 7 dias) | PostHog | 30% | 50% |
| Notas Play Store | Play Console | — | 4.5+ |

---

## 🛑 Quando NÃO mudar nada

**Trava em pequenas features se:**
- ❌ Você ainda não validou com usuários reais
- ❌ Mudou algo grande sem testar local
- ❌ Está tentando aprender programação ANTES de mexer

**Faça primeiro:**
- ✅ Mostra pra 10 pessoas e ouve elas
- ✅ Roda local antes de commitar
- ✅ Mexe enquanto aprende

---

## 💸 Custos previstos nos 90 dias

| Item | Quando | Custo |
|---|---|---|
| Dominio.com.br | Mês 1 | R$ 40/ano |
| Conta Play Store | Mês 3 | R$ 130 (vitalício) |
| Apple Developer (opcional) | Mês 3+ | $99/ano (~R$ 550) |
| PostHog | Mês 3 | Grátis (até 1M eventos) |
| Stripe | Mês 3 | 5,99% por transação (sem mensalidade) |
| Google Ads inicial | Mês 3 | R$ 100-500 (teste) |
| **TOTAL pra ativar Brasil only** | — | **~R$ 170 + 5,99% das vendas** |

> ✅ É possível ir até a primeira venda com **menos de R$ 200**.

---

## 🔮 Pós-90 dias (mês 4+)

Quando os 90 dias terminarem, você já deve ter sinais:

**Se tá funcionando** (50+ vendas/mês, retenção boa):
- Investe em conteúdo: vídeo curto pro TikTok diário
- Ativa Supabase (cloud sync)
- Lança iOS (App Store)
- Contrata 1 designer freelancer pra refinar visual
- Aumenta budget de Ads

**Se tá lento** (menos de 10 vendas/mês):
- Conversa com 10 usuários que pararam — entende por quê
- Refaz onboarding baseado no feedback
- Foca em 1 canal só (escolhe: TikTok OR escolas OR Google Ads)
- Considera pivotar (mudar público, mudar preço, mudar promessa)

---

## 🎓 Filosofia de aprendizado

1. **80/20 sempre:** 20% do código que você toca dá 80% do resultado. Foca em `data/`, `styles/`, `components/Profile.jsx`.

2. **Pergunta tudo pra IA.** Cole código e fala "explica". Sem vergonha.

3. **Aprende erros com calma.** Quando algo quebra, é onde você aprende mais. Não estressa.

4. **Commits pequenos, frequentes.** Cada mudança pequena = 1 commit. Se quebrar, você sabe o que quebrou.

5. **Não busque perfeição cedo.** App "feio mas funcional" > "lindo mas crasha". Validamos com usuários reais primeiro, refinamos depois.

---

## 📞 Quando me chamar (Claude/IA)

✅ **Vale a pena perguntar:**
- "Como faço X?"
- "Esse código tá quebrado, vê: [cola erro]"
- "Esse componente tá grande demais, como divido?"
- "Cria uma lição sobre [TÓPICO]"
- "Refatora esse arquivo pra ficar mais limpo"

❌ **Resolve sozinha primeiro:**
- "Como mudo a cor X?" → leia `MANUAL-DEV.md`
- "Onde fica Y?" → procura no projeto (Cmd+P no VS Code)
- "Quanto tá custando?" → olha Vercel/Stripe Dashboard

---

## ✨ Mensagem final

Você já tem um produto **incrivelmente sofisticado** pra um MVP — 50 lições, 5 mini-jogos, 6 temas, sistema de amigos, mascote 3D, planos B2B, PWA instalável, doc completa.

A maioria dos founders gasta 6 meses pra chegar onde você chegou. Você está no jogo.

**Próximo passo é validar com humanos reais.** Tudo o mais (código bonito, otimizações, novas features) é secundário a isso.

Manda bala! 🚀

— Claude
