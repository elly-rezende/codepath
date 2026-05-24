# 🛠 Manual de Desenvolvimento — CodePath

> **Pra quem é este manual:** você (Elly), que quer continuar evoluindo o app sozinha, sem precisar virar dev profissional. Foco em **resultados práticos**: "quero fazer X" → "abre o arquivo Y, muda a linha Z".

---

## 📌 Antes de qualquer coisa

### ⚡ O essencial (decora isso):

```bash
# 1. Sempre antes de começar a trabalhar — baixa as últimas mudanças
git pull

# 2. Roda o app localmente pra ver mudanças em tempo real
npm run dev
# → abre http://localhost:5173

# 3. Quando terminar uma mudança boa, salva
git add .
git commit -m "fix: ajustei cor do botão de login"
git push

# Pronto! Em ~2min Vercel re-deploya automaticamente.
```

### 🧰 Setup recomendado da máquina:

| Ferramenta | Custo | Pra quê |
|---|---|---|
| **VS Code** | Grátis | Editor de código principal |
| **Cursor** (alternativa) | Grátis até X | Editor com IA built-in — você fala em PT-BR e ele gera código |
| **GitHub Desktop** | Grátis | Interface visual de git (sem usar terminal) |
| **Chrome DevTools** | Grátis (já no Chrome) | F12 pra inspecionar elementos |
| **Vercel Dashboard** | Grátis | Ver deploys + analytics |
| **Figma** | Grátis | Editar design tokens visualmente |

### 🤖 IA como sua par-programmer:

Você **não precisa saber tudo de código**. Use a IA assim:

- **Claude.ai** (browser): cole um arquivo, peça "explica o que faz" ou "muda X pra Y"
- **Cursor**: dentro do editor, `Cmd+K` → fala em PT-BR "muda essa cor pra azul"
- **GitHub Copilot**: $10/mês, sugere código enquanto você digita

**Prompt que sempre funciona:**
> "Estou olhando o arquivo `src/data/curriculum.js`. Quero adicionar uma nova lição sobre [TÓPICO] na trilha [TRILHA]. Pode me dar o objeto completo seguindo o mesmo formato das outras lições?"

---

## 🗺 Mapa mental do projeto

Pense no app como uma cidade dividida em **bairros**:

```
codepath/
├── src/
│   ├── components/        ← Os "prédios" que aparecem na tela
│   │   ├── Dashboard.jsx        (página principal)
│   │   ├── LessonView.jsx       (tela de uma lição)
│   │   ├── Profile.jsx          (perfil do usuário)
│   │   ├── exercises/           (5 tipos de exercício)
│   │   ├── gamification/        (mascote, conquistas, modais)
│   │   ├── minigames/           (5 mini-jogos)
│   │   ├── onboarding/          (wizard de boas-vindas)
│   │   ├── pricing/             (página de planos)
│   │   ├── profile/             (subseções do perfil)
│   │   └── pwa/                 (botão "instalar app")
│   │
│   ├── context/           ← Os "serviços públicos" (estado global)
│   │   ├── AppContext.jsx       (XP, streak, lições completadas)
│   │   ├── AuthContext.jsx      (login, signup)
│   │   ├── GamificationContext.jsx (moedas, items, conquistas)
│   │   ├── SubscriptionContext.jsx (planos, Stripe)
│   │   ├── TeacherContext.jsx   (turmas, alunos)
│   │   ├── QuestsContext.jsx    (missões semanais)
│   │   ├── FriendsContext.jsx   (amigos, leaderboard)
│   │   └── LanguageContext.jsx  (traduções PT/EN)
│   │
│   ├── data/              ← Os "dados" do app (vai mexer MUITO aqui)
│   │   ├── csf-track.js         (10 lições CS Fundamentals)
│   │   ├── fw-track.js          (10 lições Frontend & Web)
│   │   ├── be-track.js          (10 lições Backend & APIs)
│   │   ├── do-track.js          (10 lições DevOps)
│   │   ├── sd-track.js          (10 lições System Design)
│   │   ├── curriculum.js        (combina todas as 50 lições)
│   │   ├── items.js             (30+ items colecionáveis)
│   │   ├── achievements.js      (25 conquistas)
│   │   ├── themes.js            (6 temas visuais)
│   │   ├── pricing.js           (planos: Free/Pro/Escola)
│   │   ├── quests.js            (15 missões semanais)
│   │   └── shop.js              (preços da loja)
│   │
│   ├── styles/            ← Os "estilos" visuais
│   │   ├── tokens.json          (FONTE DA VERDADE — cores, fontes, espaçamentos)
│   │   ├── tokens.css           (auto-gerado, NÃO edita)
│   │   └── *.css                (outros estilos específicos)
│   │
│   └── hooks/             ← Pequenas "ferramentas" reutilizáveis
│       ├── useNotifications.js
│       └── useSoundEffects.js
│
├── api/                   ← Funções no servidor (Stripe)
│   ├── create-checkout-session.js
│   └── stripe-webhook.js
│
├── public/                ← Arquivos estáticos (ícones, manifest)
│
├── docs/                  ← Documentação (este arquivo!)
│
└── scripts/sync-tokens.mjs  ← Script utilitário
```

### 🎯 Regra de ouro: **80% do que você vai mudar está em `src/data/` e `src/styles/tokens.json`**

---

## 🔥 As 15 mudanças mais comuns (com código pronto)

### 1. Mudar o texto de uma lição

**Arquivo:** `src/data/csf-track.js` (ou fw, be, do, sd)

Procure pela lição. Cada lição tem campos como `title`, `hook`, `conceptText`. Mude o que quiser.

```js
{
  id: 'csf-3-big-o',
  title: 'Big O Notation',           // ← muda aqui pra renomear
  hook: 'Texto curto que aparece no dashboard',  // ← teaser
  learn: {
    conceptText: 'Texto longo da lição...',     // ← conteúdo principal
  },
  // ...
}
```

> 💡 **Dica:** depois de editar, abre o app local (`npm run dev`) e procura a lição pra ver se ficou legal.

---

### 2. Adicionar uma lição totalmente nova

**Mais fácil:** copia uma lição existente como modelo, muda os campos.

```js
// Em src/data/csf-track.js, dentro do array csfLessons, adiciona:
{
  id: 'csf-11-nova-licao',           // ID único! Não pode ter 2 iguais.
  title: 'Aprenda Sobre X',
  week: 6,
  xp: 70,
  difficulty: 'Intermediate',
  priority: '⭐',
  hook: 'Teaser curto',

  assess: { /* pergunta de pré-teste */ },
  learn: { /* explicação */ },
  practice: [ /* 3 exercícios */ ],
  apply: [ /* 3 níveis de coding */ ],
  assessFinal: { /* avaliação final */ },
  goDeeper: { /* prompt pra IA */ },
  resources: [],
},
```

> 🤖 **Tip:** copia esse template pra Claude/ChatGPT e fala: "preencha esta lição sobre [TÓPICO]". Em 30 segundos você tem uma lição completa.

---

### 3. Mudar uma cor no app

**Arquivo:** `src/styles/tokens.json`

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#3B82F6" }  // ← muda pra qualquer hex
    }
  }
}
```

Depois roda no terminal:
```bash
npm run sync-tokens
```

Pronto. A cor mudou em **todo o app** automaticamente.

---

### 4. Mudar preço de um plano

**Arquivo:** `src/data/pricing.js`

```js
{
  id: 'pro',
  priceMonthly: 19.90,    // ← R$/mês
  priceYearly: 179.00,    // ← R$/ano
  // ...
}
```

> ⚠️ **Importante:** se você já tem Stripe configurado, também muda o preço lá no Stripe Dashboard, senão fica desincronizado.

---

### 5. Adicionar uma nova conquista

**Arquivo:** `src/data/achievements.js`

```js
{
  id: 'minha-conquista',
  name: 'Hacker do Bairro',
  description: 'Complete 50 lições em 30 dias',
  icon: '🧑‍💻',
  rarity: 'rare',
  xpReward: 500,
  coinReward: 200,
  check: (state) => state.completedLessons.length >= 50,
  // ↑ função que retorna true quando a pessoa ganha
},
```

---

### 6. Mudar mensagem do mascote Bit

**Arquivo:** `src/components/gamification/Mascot.jsx`

Procure por `MOOD_MESSAGES`:

```js
const MOOD_MESSAGES = {
  idle: ['Oi! Pronto pra codar?', 'Vamos aprender algo legal!', /* ... */],
  happy: ['Mandou bem! 🎉', /* ... */],
  // ↑ adiciona/muda mensagens aqui
};
```

---

### 7. Trocar o ícone do app

**Arquivos:**
- `public/icon-192.svg` (Android)
- `public/icon-512.svg` (Android grande)
- `public/icon-maskable.svg` (Android adaptável)
- `public/favicon.svg` (browser tab)

> 💡 Pra criar todos os tamanhos automaticamente, usa https://www.appicon.co/

---

### 8. Adicionar um novo idioma (ex: inglês completo)

**Arquivo:** `src/context/LanguageContext.jsx`

Adiciona um novo bloco junto com `pt` e `en` (já existe `en`):

```js
const translations = {
  en: { /* ... */ },
  pt: { /* ... */ },
  es: {                  // ← novo: espanhol
    dashboard: 'Tablero',
    profile: 'Perfil',
    // ... todas as chaves
  }
};
```

---

### 9. Mudar uma mensagem do onboarding

**Arquivo:** `src/components/onboarding/OnboardingFlow.jsx`

Procura pela tela que quer mudar (ex: `step === 'welcome'`):

```jsx
{step === 'welcome' && (
  <div className="onboarding-step">
    <h1>Oi! Eu sou o Bit!</h1>     {/* ← muda aqui */}
    <p>Vou te ajudar...</p>          {/* ← muda aqui */}
  </div>
)}
```

---

### 10. Adicionar um novo item colecionável

**Arquivo:** `src/data/items.js`

```js
{
  id: 'skin-rainbow',
  name: 'Bit Rainbow',
  icon: '🌈',
  category: 'mascot-skin',
  rarity: 'legendary',      // 'common' | 'uncommon' | 'rare' | 'legendary'
  description: 'Versão arco-íris do Bit'
},
```

E se for um skin, adiciona a cor em `src/components/gamification/Mascot.jsx`:
```js
const SKIN_COLOR_MAP = {
  // ... outros
  'skin-rainbow': '#FF6B9D',
};
```

---

### 11. Adicionar uma nova missão semanal

**Arquivo:** `src/data/quests.js`

```js
{
  id: 'quest-minha-missao',
  title: 'Aluno Estrela',
  description: 'Adicione 3 amigos novos',
  icon: '⭐',
  type: 'friend',         // tipo já suportado
  target: 3,
  reward: { coins: 200, xp: 100 },
  difficulty: 'medium',
},
```

---

### 12. Mudar o título/descrição do app (SEO + redes sociais)

**Arquivo:** `index.html`

```html
<title>CodePath — Seu novo título</title>
<meta name="description" content="Sua nova descrição..." />

<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

---

### 13. Mudar texto da página de planos

**Arquivo:** `src/components/pricing/PricingPage.jsx`

```jsx
<h1 className="pricing-title">Vire Pro e libere TUDO</h1>   {/* ← */}
<p className="pricing-subtitle">Acesso ilimitado...</p>      {/* ← */}
```

---

### 14. Esconder uma seção temporariamente

Adiciona `{false &&` antes do JSX e `}` depois:

```jsx
{false && (
  <div className="card">
    <h2>Essa seção tá oculta</h2>
  </div>
)}
```

Pra reabilitar: tira o `{false &&` e o `}`.

---

### 15. Ver erros do app

**No browser:** F12 → aba **Console** → vai aparecer erros em vermelho

**Comandos úteis no console:**
```js
localStorage.clear()           // Reseta TUDO (cuidado!)
localStorage.getItem('codepath_state')  // Ver estado salvo
```

---

## 🚀 Workflow recomendado pra mudanças seguras

```bash
# 1. Sempre começa atualizando
git pull

# 2. Cria uma "branch" pra suas mudanças (opcional mas recomendado)
git checkout -b mudanca/novo-tema-halloween

# 3. Faz suas mudanças no código
# (edita arquivos, salva)

# 4. Roda local pra testar
npm run dev
# Abre http://localhost:5173, testa, verifica se ficou bom

# 5. Se ficou bom, salva
git add .
git commit -m "feat: tema halloween com laranja e preto"

# 6. Manda pro GitHub
git push origin mudanca/novo-tema-halloween

# Se você não quer branches, simplesmente:
git add .
git commit -m "..."
git push
# (vai direto pra master, deploy automático)
```

> ⚠️ **Cuidado:** se você commitar algo errado, o deploy vai pro ar quebrado. **Sempre testa local primeiro com `npm run dev`!**

---

## 🆘 Se algo der errado

### "O app tá quebrado depois que eu mudei algo"

**Solução 1 — Desfazer última mudança:**
```bash
git diff                  # ver o que mudou
git checkout .            # CUIDADO: desfaz TUDO que não foi commitado
```

**Solução 2 — Voltar pro último commit:**
```bash
git log --oneline -5      # ver commits recentes
git reset --hard <commit-id>   # volta pra um commit específico
git push -f origin master      # força no GitHub
```

> ⚠️ **`git reset --hard` apaga mudanças não commitadas.** Use com cuidado.

### "Não consigo rodar `npm run dev`"

```bash
# Reinstala dependências
rm -rf node_modules package-lock.json
npm install

# Tenta de novo
npm run dev
```

### "Deploy do Vercel falhou"

1. Vai em vercel.com → seu projeto → Deployments → clica no commit que falhou
2. Lê os **Build Logs** — vai apontar o erro
3. Manda o erro pra IA: "esse erro do Vercel: [cole aqui]. Como conserto?"

---

## 🎓 Como pedir ajuda da IA (prompts que funcionam)

**Pra explicar código:**
> "Estou olhando este arquivo. Explica em português, simples, o que cada parte faz: [cola código]"

**Pra adicionar feature:**
> "No meu projeto React (Vite + React 19), quero adicionar [FEATURE]. Aqui está o arquivo onde precisa ser feito: [cola]. Me mostra o código completo modificado."

**Pra debugar erro:**
> "Esse erro apareceu quando rodei `npm run build`: [cola erro completo]. Como conserto?"

**Pra refatorar:**
> "Esse componente tá muito grande [cola]. Sugere como dividir em componentes menores."

**Pra criar conteúdo:**
> "Crie uma lição sobre [TÓPICO] seguindo este formato [cola Big O lesson]. Para crianças de 10-13 anos. Use exemplos de Minecraft/Roblox."

---

## 📅 Cronograma sugerido (próximos 90 dias)

Veja `docs/ROADMAP-90DIAS.md` pra um plano detalhado de aprendizado + features prioritárias.

---

## 📚 Onde aprender mais

### Cursos GRÁTIS (PT-BR):

| Curso | Por que | Tempo |
|---|---|---|
| **HTML5/CSS3** (Curso em Vídeo, Guanabara) | Base do que aparece na tela | 20h |
| **JavaScript** (Curso em Vídeo) | Linguagem do app | 30h |
| **React em 1 hora** (Filipe Deschamps) | Visão geral rápida | 1h |
| **React + Vite** (Rocketseat free trial) | Stack que você usa | 10h |

### Documentação oficial:
- **React:** https://react.dev/learn (interativo, tem em PT-BR)
- **Vite:** https://vite.dev/guide/
- **MDN Web Docs:** https://developer.mozilla.org/pt-BR/ (referência de tudo)

### Comunidades BR:
- **Rocketseat Discord** (gratuito, super ativo)
- **Bossabox** Telegram
- **Frontend Brasil** Discord
- **r/programacao** no Reddit

---

## 🎯 Filosofia: o que importa pra um app comercial

1. **App não pode quebrar.** Antes de commit, testa local.
2. **Performance no celular é tudo.** Brasileiro acessa principalmente do celular, muitas vezes em 3G/4G.
3. **Texto > Design.** Crianças/teens veem texto antes de design — frases legais > visual elaborado.
4. **Feedback constante.** Toda ação deve ter resposta visual ou sonora (já tá feito).
5. **Onboarding curto.** Quanto menos perguntas no primeiro acesso, melhor (já reduzimos).
6. **Suporte rápido.** Crie um Instagram @codepath.app + WhatsApp pra atendimento.
7. **Conteúdo é diferencial.** Suas 50 lições em PT-BR com refs Minecraft/TikTok valem MAIS que código bonito.

---

## 🔮 Próximos arquivos pra ler

1. **`docs/SNIPPETS.md`** — Códigos prontos pra copiar/colar
2. **`docs/ROADMAP-90DIAS.md`** — Cronograma de aprendizado + features
3. **`docs/FIGMA-WORKFLOW.md`** — Editar visual no Figma
4. **`docs/STRIPE-SETUP.md`** — Ativar pagamentos
5. **`docs/SUPABASE-SETUP.md`** — Ativar backend cloud
6. **`docs/DEPLOY.md`** — Deploy detalhado
7. **`docs/ANDROID-DEPLOY.md`** — App pro Google Play
8. **`docs/IOS-DEPLOY.md`** — App pra Apple Store
