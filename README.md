# 🚀 CodePath

> App de programação para crianças e adolescentes (8-17 anos). 50 lições em PT-BR, mascote interativo, mini-jogos, sistema de amigos, modo professor, planos B2B.

[![Deploy Status](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![PWA](https://img.shields.io/badge/PWA-installable-brightgreen)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/license-private-red)]()

---

## 📋 O que é isto

**CodePath** é uma plataforma de ensino de programação inspirada no Duolingo, criada para o público brasileiro de 8-17 anos. Combina:

- **Rigor curricular** (CS50 Harvard adaptado)
- **Pedagogia DataCamp** (estrutura ALPA: Assess → Learn → Practice → Apply)
- **Gamificação Duolingo** (XP, streaks, missões, conquistas)
- **Estética kid/teen** (Mascote 3D, exemplos de TikTok/Roblox/Minecraft)

---

## 🚀 Como começar (5 minutos)

```bash
# Clona o projeto
git clone https://github.com/elly-rezende/codepath.git
cd codepath

# Instala dependências
npm install

# Roda em modo dev
npm run dev

# Abre http://localhost:5173
```

---

## 📚 Documentação completa

### 🎯 **Pra você, Elly (não-dev):**

| Arquivo | Pra quê |
|---|---|
| **[`docs/MANUAL-DEV.md`](./docs/MANUAL-DEV.md)** | 🛠 Como personalizar o app passo a passo |
| **[`docs/SNIPPETS.md`](./docs/SNIPPETS.md)** | 🧩 Códigos prontos pra copiar/colar |
| **[`docs/ROADMAP-90DIAS.md`](./docs/ROADMAP-90DIAS.md)** | 📅 Plano de aprendizado + crescimento |

### 🌐 **Deploy & infra:**

| Arquivo | Pra quê |
|---|---|
| **[`docs/DEPLOY.md`](./docs/DEPLOY.md)** | Deploy no Vercel (já feito automático via git push) |
| **[`docs/ANDROID-DEPLOY.md`](./docs/ANDROID-DEPLOY.md)** | Publicar na Google Play Store |
| **[`docs/IOS-DEPLOY.md`](./docs/IOS-DEPLOY.md)** | Publicar na Apple App Store |

### 💳 **Integração e backend:**

| Arquivo | Pra quê |
|---|---|
| **[`docs/STRIPE-SETUP.md`](./docs/STRIPE-SETUP.md)** | Ativar pagamentos reais |
| **[`docs/SUPABASE-SETUP.md`](./docs/SUPABASE-SETUP.md)** | Backend cloud (login + sync entre devices) |
| **[`docs/FIGMA-WORKFLOW.md`](./docs/FIGMA-WORKFLOW.md)** | Editar design no Figma |

---

## ⚡ Comandos úteis

```bash
# Desenvolvimento
npm run dev                # Servidor local em http://localhost:5173

# Build
npm run build              # Gera o app de produção em dist/
npm run preview            # Testa o build local

# Design tokens (se editar tokens.json)
npm run sync-tokens        # Gera tokens.css a partir de tokens.json

# Capacitor (apps nativos)
npm run cap:add:android    # Primeiro setup Android (só roda 1 vez)
npm run cap:add:ios        # Primeiro setup iOS (só roda 1 vez)
npm run cap:sync           # Build + copia pros apps nativos
npm run android:apk        # Gera APK assinado pra distribuição
npm run android:aab        # Gera Android Bundle pra Play Store

# Lint
npm run lint               # Checa erros de código
```

---

## 🏗 Arquitetura técnica

### Stack:
- **Frontend:** React 19 + Vite 8
- **Styling:** CSS Variables + Tailwind 4 (utilitário leve)
- **Animações:** GSAP 3.14 + canvas-confetti
- **3D:** Three.js (mascote 3D + landing page)
- **PWA:** vite-plugin-pwa (Workbox)
- **Auth:** localStorage (fallback) ou Supabase
- **Pagamentos:** Stripe Checkout (serverless functions)
- **Mobile:** Capacitor 8 (iOS + Android)
- **Hospedagem:** Vercel (serverless edge)

### Estrutura:
```
codepath/
├── api/                  # Serverless functions (Stripe webhook)
├── public/               # Assets estáticos (ícones, manifest)
├── src/
│   ├── components/       # UI React
│   ├── context/          # Estado global (8 contextos)
│   ├── data/             # Dados do app (lições, items, pricing)
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Helpers de bibliotecas externas
│   └── styles/           # CSS + design tokens
├── docs/                 # ⭐ Documentação completa
├── scripts/              # Scripts utilitários
└── supabase/             # Schema SQL (opt-in)
```

---

## 🎮 Features principais

### Conteúdo (50 lições em PT-BR)
- 🧠 CS Fundamentals (Big O, recursão, estruturas de dados)
- 🎨 Frontend & Web (HTML/CSS/JS, DOM, async)
- ⚙️ Backend & APIs (SQL, JOINs, auth)
- 🚀 DevOps (Git, Docker, CI/CD)
- 🏗 System Design (escalabilidade, microsserviços)

### Gamificação
- **Mascote Bit** (2D + 3D Three.js, 7 humores)
- **5 mini-jogos** (Memory, Code Sort, Bug Hunt, Code Typing, Variable Hunter)
- **30+ items colecionáveis** (skins, acessórios, temas, emotes)
- **25 conquistas**
- **Missões semanais** (15 quests rotativas)
- **Loot boxes** (3 tiers de raridade)
- **Loja de moedas**

### Social
- Código único de amigo (6 caracteres)
- Leaderboard entre amigos
- **Modo Professor** com turmas + dashboard
- Compartilhamento via Web Share API

### Acessibilidade & UX
- 🇧🇷 100% PT-BR (com fallback EN)
- 📱 PWA instalável
- 🔔 Notificações push locais
- 🎨 6 temas visuais (incluindo Halloween + Aurora)
- ♿ Suporte LGPD (consentimento parental para <13)
- 🌙 Tema dark nativo

### Comercialização
- **3 planos** (Free, Pro R$19,90/mês, Escola R$9,90/aluno/mês)
- **Stripe** com cards + boleto
- **Customer Portal** pra gerenciar assinatura
- **B2B** com turmas + nota fiscal corporativa

---

## 🔗 Links

- 🌐 **App ao vivo:** [https://codepath-elly.vercel.app](https://codepath-elly.vercel.app) (substitua pela sua URL real)
- 📦 **Repositório:** [github.com/elly-rezende/codepath](https://github.com/elly-rezende/codepath)
- 🎨 **Figma:** (link do seu Figma se já tiver)
- 📱 **Google Play:** (em breve)
- 🍎 **App Store:** (em breve)

---

## 🧑‍💻 Quem mantém

**Elly Rezende** — fundadora, designer e desenvolvedora.

Made with 💜 in Brazil.

---

## 📜 Licença

Privado. Todos os direitos reservados.

Pra licenciamento, parcerias ou perguntas comerciais: (contato@codepath.com.br)
