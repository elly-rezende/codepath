# 🧩 Snippets — Códigos prontos para copiar

> Códigos prontos pra você colar no projeto. Cada snippet vem com:
> - **O que faz**
> - **Onde colar** (qual arquivo)
> - **Como adaptar**

---

## 📚 ÍNDICE

1. [Adicionar uma nova lição inteira](#1-adicionar-uma-nova-lição-inteira)
2. [Adicionar uma trilha nova (6ª trilha)](#2-adicionar-uma-trilha-nova)
3. [Criar um novo mini-jogo](#3-criar-um-novo-mini-jogo)
4. [Tema visual novo (dia/sazonal)](#4-tema-visual-novo)
5. [Nova conquista personalizada](#5-nova-conquista-personalizada)
6. [Nova missão semanal](#6-nova-missão-semanal)
7. [Botão personalizado](#7-botão-personalizado)
8. [Modal/popup customizado](#8-modal-popup-customizado)
9. [Animação suave de entrada](#9-animação-suave-de-entrada)
10. [Conectar uma chamada de API externa](#10-conectar-uma-api-externa)
11. [Ler/salvar do localStorage](#11-lersalvar-do-localstorage)
12. [Detectar mobile vs desktop](#12-detectar-mobile-vs-desktop)
13. [Confetti customizado](#13-confetti-customizado)
14. [Som customizado](#14-som-customizado)
15. [Componente totalmente novo](#15-componente-totalmente-novo)

---

## 1. Adicionar uma nova lição inteira

**Onde:** `src/data/csf-track.js` (ou outra trilha)
**O que faz:** cria uma 11ª lição na trilha CS Fundamentals.

```js
// Adiciona dentro do array csfLessons, antes do ];
{
  id: 'csf-11-loops-aninhados',
  title: 'Loops Aninhados: Quando Usar e Quando Fugir',
  week: 4,
  xp: 75,
  difficulty: 'Intermediate',
  priority: '⭐⭐',
  hook: 'Loop dentro de loop = perigo. Aprende quando vale a pena.',

  assess: {
    type: 'multipleChoice',
    question: 'Loop aninhado pode ficar muito lento. Por quê?',
    options: [
      { text: 'Porque executa cada item N vezes', correct: true, feedback: '✓ Isso mesmo! Cresce N×N.' },
      { text: 'Porque consome internet', feedback: 'Não. Loop é só CPU.' },
      { text: 'Porque o computador trava', feedback: 'Quase. Travamento é consequência, não causa.' },
      { text: 'Porque usa muito disco', feedback: 'Não. Loop não escreve no disco.' },
    ],
  },

  learn: {
    hook: 'Você já fez um for dentro de outro for? É um superpoder — e um superperigo.',
    conceptVideo: {
      url: 'https://cs50.harvard.edu/x/2024/weeks/3/',
      title: 'CS50 Week 3: Algorithms',
      duration: '~20 min',
      yourTakeaway: 'Foca em como loops aninhados explodem.',
    },
    conceptText: `**Loop aninhado** = um loop dentro de outro.

Exemplo: você tem uma lista de jogadores do TikTok e quer comparar cada um com todos os outros. Vai precisar de 2 loops.

Mas se a lista tem 100 pessoas, você faz **100×100 = 10.000** comparações.
Se tem 1.000 pessoas → 1.000.000 comparações.

Por isso loop aninhado é "O(n²)" — quando duplica a entrada, quadruplica o tempo.`,
    realWorldExample: 'O TikTok não compara cada usuário com cada outro usuário — eles usam técnicas mais espertas (índices, agrupamentos). É por isso que o feed carrega em milissegundos mesmo com 1 bilhão de usuários.',
  },

  practice: [
    {
      type: 'multipleChoice',
      title: 'Quantas iterações?',
      question: 'Um loop de 5 dentro de outro de 5. Quantas vezes o código interno roda?',
      options: [
        { text: '5', feedback: 'Quase. Repensa.' },
        { text: '10', feedback: 'Não — é multiplicação, não soma.' },
        { text: '25', correct: true, feedback: '✓ 5 × 5 = 25. Multiplicação.' },
        { text: '125', feedback: 'Demais. Só 2 loops.' },
      ],
    },
    {
      type: 'dragDrop',
      title: 'Ordem de execução',
      description: 'Coloca em ordem o que acontece num loop duplo:',
      items: [
        'Loop externo começa com i=0',
        'Loop interno roda do 0 ao N',
        'Loop externo passa pra i=1',
        'Loop interno roda do 0 ao N de novo',
      ],
      correctOrder: [0, 1, 2, 3],
      feedback: '✓ O loop interno completa pra cada iteração do externo.',
    },
    {
      type: 'multipleChoiceWithConsole',
      title: 'Roda na cabeça',
      instructions: 'Lê o código abaixo, conta quantos console.log acontecem:',
      code: `for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    console.log(i, j);
  }
}`,
      question: 'Quantas linhas vão imprimir?',
      options: [
        { text: '3', feedback: 'Esse é só o loop externo.' },
        { text: '7', feedback: 'Isso seria 3+4. É multiplicação.' },
        { text: '12', correct: true, feedback: '✓ 3 × 4 = 12 iterações.' },
        { text: '24', feedback: 'Quase o dobro. Confere as condições.' },
      ],
      feedback: '✓ Cada vez que i muda, j roda do 0 ao 3 (4 vezes).',
    },
  ],

  apply: [
    {
      level: 1,
      title: 'Tabuada',
      instructions: ['Escreva uma função `tabuada(n)`', 'Retorna array com tabuada de n de 1 a 10'],
      sampleCode: `function tabuada(n) {
  // TODO: cria array com n*1, n*2, ..., n*10
}`,
      solution: `function tabuada(n) {
  const resultado = [];
  for (let i = 1; i <= 10; i++) {
    resultado.push(n * i);
  }
  return resultado;
}`,
      tests: [
        { input: 'tabuada(2)', expected: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], desc: 'tabuada do 2' },
        { input: 'tabuada(5)', expected: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], desc: 'tabuada do 5' },
      ],
      hints: ['Use um loop for de 1 a 10', 'Multiplica n pelo contador', 'Empurra no array com .push'],
    },
    // ... mais 2 níveis aqui (nível 2 e 3)
  ],

  assessFinal: {
    type: 'sequential',
    title: 'Avaliação: Loops',
    steps: [
      {
        type: 'coding',
        title: 'Matriz de zeros',
        instructions: 'Crie matriz N×N preenchida com 0.',
        sampleCode: `function matrizZeros(n) {
  // TODO
}`,
        solution: `function matrizZeros(n) {
  const m = [];
  for (let i = 0; i < n; i++) {
    const linha = [];
    for (let j = 0; j < n; j++) {
      linha.push(0);
    }
    m.push(linha);
  }
  return m;
}`,
        tests: [
          { input: 'matrizZeros(2)', expected: [[0, 0], [0, 0]], desc: '2x2' },
          { input: 'matrizZeros(3)', expected: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], desc: '3x3' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'Loop aninhado de N=1000 com N=1000 dá...?',
        options: [
          { text: '2.000 operações', feedback: 'Não. Não é soma.' },
          { text: '1.000.000 operações', correct: true, feedback: '✓ N² = 1 milhão.' },
          { text: '1.000 operações', feedback: 'Esse é só 1 loop.' },
        ],
      },
    ],
  },

  goDeeper: {
    prompt: 'Quando devo evitar loops aninhados? Tem alternativa?',
    systemPrompt: 'Você é um professor brasileiro descolado ensinando crianças/adolescentes. Use exemplos do TikTok, Roblox, Discord. Seja direto.',
  },
  resources: [
    { title: 'CS50 Week 3', url: 'https://cs50.harvard.edu/x/2024/weeks/3/' },
  ],
},
```

---

## 2. Adicionar uma trilha nova

Imagina que você quer criar uma 6ª trilha sobre **Inteligência Artificial**.

**Passo 1:** Cria o arquivo `src/data/ai-track.js`:

```js
export const aiLessons = [
  // 10 lições aqui (copia o formato das outras)
];
```

**Passo 2:** Em `src/data/curriculum.js`, importa e adiciona ao array `tracks`:

```js
import { aiLessons } from './ai-track.js';

export const tracks = [
  // ... trilhas existentes
  {
    id: 'ai-fundamentals',
    title: 'IA & Machine Learning',
    icon: '🧠',
    color: '#FF6B9D',
    description: 'Como funciona o ChatGPT, Midjourney e os algoritmos de recomendação',
    lessons: aiLessons,
  },
];
```

**Passo 3:** Adiciona uma badge correspondente:

```js
export const badges = [
  // ... badges existentes
  {
    id: 'ai-pioneer',
    trackId: 'ai-fundamentals',
    name: 'AI Pioneer',
    icon: '🧠',
    description: 'Completou a trilha de IA & Machine Learning'
  },
];
```

**Passo 4:** Adiciona a cor da trilha em `src/styles/tokens.json`:

```json
"tracks": {
  "aiFundamentals": {
    "value": "#FF6B9D",
    "type": "color",
    "description": "AI track color"
  }
}
```

Roda: `npm run sync-tokens` → pronto!

---

## 3. Criar um novo mini-jogo

Vou criar **"Adivinhe o Output"** — mostra um código e pergunta o que ele imprime.

**Arquivo novo:** `src/components/minigames/GuessOutput.jsx`

```jsx
import { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';

const CHALLENGES = [
  {
    code: 'console.log(2 + "2");',
    options: ['4', '22', 'NaN', 'erro'],
    correctIndex: 1,
    explanation: 'JS converte 2 em string e concatena: "2" + "2" = "22".',
  },
  {
    code: 'console.log([1, 2, 3].length);',
    options: ['1', '2', '3', 'undefined'],
    correctIndex: 2,
    explanation: 'O array tem 3 elementos.',
  },
  {
    code: 'console.log(typeof null);',
    options: ['null', 'undefined', 'object', 'string'],
    correctIndex: 2,
    explanation: 'Famoso bug histórico do JS: typeof null retorna "object".',
  },
];

export default function GuessOutput({ onComplete }) {
  const { play, addCoins } = useGamification();
  const [challenge] = useState(() => CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(0);

  const handleSelect = (idx) => {
    if (finished) return;
    setSelected(idx);
    const isCorrect = idx === challenge.correctIndex;
    if (isCorrect) {
      const r = 30;
      setReward(r);
      addCoins(r);
      play('allTestsPass');
    } else {
      play('wrong');
    }
    setFinished(true);
  };

  return (
    <div className="guess-output">
      <div className="mg-header center">
        <div>
          <div className="cs-title">🔮 Adivinhe o Output</div>
          <div className="cs-subtitle">O que esse código vai imprimir?</div>
        </div>
      </div>

      <pre className="code-display">{challenge.code}</pre>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 16 }}>
        {challenge.options.map((opt, i) => {
          const isCorrect = finished && i === challenge.correctIndex;
          const isWrong = finished && i === selected && i !== challenge.correctIndex;
          return (
            <button
              key={i}
              className={`option-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => handleSelect(i)}
              disabled={finished}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="mg-result">
          <div className="mg-result-emoji">{selected === challenge.correctIndex ? '🎯' : '😅'}</div>
          <div className="mg-result-title">
            {selected === challenge.correctIndex ? 'Acertou!' : 'Quase!'}
          </div>
          <div className="mg-result-subtitle">{challenge.explanation}</div>
          {reward > 0 && (
            <div className="mg-result-reward">
              <span>🪙</span>
              <span>+{reward} moedas</span>
            </div>
          )}
          <button className="mg-result-btn" onClick={onComplete}>Continuar →</button>
        </div>
      )}
    </div>
  );
}
```

**Registra no launcher** (`src/components/minigames/MiniGameLauncher.jsx`):

```jsx
import GuessOutput from './GuessOutput';

const GAMES = [
  // ... games existentes
  {
    id: 'guessoutput',
    title: 'Adivinhe o Output',
    icon: '🔮',
    description: 'Você consegue prever o que o código imprime?',
    estimatedTime: '~30s',
    Component: GuessOutput,
  },
];
```

Pronto. O sistema vai alternar entre os jogos automaticamente.

---

## 4. Tema visual novo

Cria um tema "Halloween" com laranja + preto.

**Arquivo:** `src/data/themes.js`

```js
export const THEMES = {
  // ... temas existentes
  'theme-halloween': {
    id: 'theme-halloween',
    name: 'Halloween',
    icon: '🎃',
    preview: ['#F97316', '#1A1B2E', '#A855F7'],
    overrides: {
      '--color-brand-primary':   '#F97316',  // laranja
      '--color-brand-secondary': '#A855F7',  // roxo
      '--color-brand-accent':    '#FBBF24',  // âmbar
      '--color-bg-primary':      '#0A0A0A',  // preto
      '--color-bg-secondary':    '#1A1A1A',
      '--color-bg-card':         '#181818',
    },
  },
};
```

E adiciona o item correspondente em `src/data/items.js`:

```js
{
  id: 'theme-halloween',
  name: 'Tema Halloween',
  icon: '🎃',
  category: 'theme',
  rarity: 'rare',
  description: 'Laranja e preto pra outubro'
},
```

---

## 5. Nova conquista personalizada

**Arquivo:** `src/data/achievements.js`

```js
{
  id: 'curioso',
  name: 'Curioso',
  description: 'Abriu 10 perfis de amigos',
  icon: '🔍',
  rarity: 'uncommon',
  xpReward: 100,
  coinReward: 150,
  check: (state) => (state.profileViews || 0) >= 10,
},
```

Pra essa funcionar, você precisa **rastrear `profileViews`** em algum lugar. Por exemplo, no componente do leaderboard, quando alguém clica no amigo:

```jsx
// dentro do FriendsList.jsx, no clique do amigo
import { useApp } from '../../context/AppContext';

const { incrementCustomStat } = useApp();

// quando clicar:
incrementCustomStat('profileViews');
```

> 💡 Você vai precisar adicionar `incrementCustomStat` no `AppContext.jsx`. Padrão: leia o state atual, soma 1, salva.

---

## 6. Nova missão semanal

**Arquivo:** `src/data/quests.js`

```js
{
  id: 'quest-speed-coder',
  title: 'Velocista',
  description: 'Complete 3 lições em menos de 5 minutos cada',
  icon: '⚡',
  type: 'lesson_speed',     // tipo novo! veja abaixo
  target: 3,
  reward: { coins: 200, xp: 150 },
  difficulty: 'medium',
},
```

Pra isso funcionar, em `src/context/QuestsContext.jsx`, adiciona um novo helper:

```js
const trackLessonSpeed = useCallback((minutesTaken) => {
  if (minutesTaken < 5) {
    incrementProgress(q => q.type === 'lesson_speed');
  }
}, [incrementProgress]);
```

E exporta no `value`:
```js
trackLessonSpeed,
```

---

## 7. Botão personalizado

Botão reutilizável com variantes:

**Arquivo:** `src/components/ui/Button.jsx`

```jsx
export default function Button({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'md',          // 'sm' | 'md' | 'lg'
  loading = false,
  ...props
}) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`].join(' ');
  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? '...' : children}
    </button>
  );
}
```

E o CSS:

```css
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary { background: var(--color-brand-primary); color: white; }
.btn-secondary { background: var(--color-bg-tertiary); color: var(--color-text-primary); }
.btn-danger { background: var(--color-semantic-error); color: white; }
.btn-ghost { background: transparent; border: 1px solid var(--color-ui-border); color: var(--color-text-secondary); }
.btn-sm { padding: 6px 14px; font-size: 12px; }
.btn-lg { padding: 16px 32px; font-size: 16px; }
.btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

Usa assim:
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Salvar
</Button>
```

---

## 8. Modal/popup customizado

```jsx
// src/components/ui/Modal.jsx
import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children }) {
  // ESC fecha o modal
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
```

CSS:
```css
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  padding: 24px;
  max-width: 500px; width: 90%;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.modal-close {
  background: none; border: none;
  color: var(--color-text-muted);
  cursor: pointer; font-size: 20px;
}
```

Usa:
```jsx
const [openModal, setOpenModal] = useState(false);

<button onClick={() => setOpenModal(true)}>Abrir</button>
<Modal open={openModal} onClose={() => setOpenModal(false)} title="Meu Modal">
  <p>Conteúdo aqui</p>
</Modal>
```

---

## 9. Animação suave de entrada

Use GSAP (já instalado):

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function MeuComponente() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, []);

  return <div ref={ref}>Vai aparecer com fade + slide up</div>;
}
```

Animar lista com stagger:
```jsx
gsap.from('.item', {
  opacity: 0,
  y: 20,
  duration: 0.4,
  stagger: 0.1,    // cada item entra com 0.1s de delay
});
```

---

## 10. Conectar uma API externa

Exemplo: pegar uma frase do dia de uma API gratuita.

```js
// src/hooks/useQuoteOfTheDay.js
import { useState, useEffect } from 'react';

export function useQuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.exemplo.com/quote-of-the-day')
      .then(res => res.json())
      .then(data => {
        setQuote(data.quote);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { quote, loading, error };
}
```

Usa:
```jsx
function Dashboard() {
  const { quote, loading } = useQuoteOfTheDay();
  if (loading) return <p>Carregando...</p>;
  return <p className="quote">"{quote}"</p>;
}
```

---

## 11. Ler/salvar do localStorage

Hook reutilizável:

```js
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

Usa:
```jsx
const [favoriteColor, setFavoriteColor] = useLocalStorage('favColor', 'blue');
```

---

## 12. Detectar mobile vs desktop

```js
// src/hooks/useIsMobile.js
import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [breakpoint]);

  return isMobile;
}
```

Usa:
```jsx
const isMobile = useIsMobile();
return isMobile ? <MobileLayout /> : <DesktopLayout />;
```

---

## 13. Confetti customizado

```js
import confetti from 'canvas-confetti';

// Confete simples
confetti();

// Confete só do brand color
confetti({
  particleCount: 80,
  spread: 100,
  colors: ['#3B82F6', '#10D9C4', '#EC4899'],
});

// Confete em forma de coração (mais avançado)
confetti({
  shapes: ['heart'],
  scalar: 2,
  particleCount: 50,
});
```

---

## 14. Som customizado

Use o hook existente:
```js
import { useSoundEffects } from '../hooks/useSoundEffects';

function MeuBotao() {
  const { play } = useSoundEffects();
  return <button onClick={() => play('correct')}>Clica</button>;
}
```

Sons disponíveis: `click`, `hover`, `correct`, `wrong`, `testPass`, `testFail`, `allTestsPass`, `xpGain`, `levelUp`, `streakUp`, `badge`, `chestOpen`, `rare`, `mascotHappy`, `mascotSad`, `mascotWave`, `swipe`, `pop`.

Pra adicionar um novo som, edita `src/hooks/useSoundEffects.js` no objeto `SOUNDS`.

---

## 15. Componente totalmente novo

Esqueleto pra qualquer componente:

```jsx
// src/components/ui/MeuComponente.jsx
import { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';

export default function MeuComponente({ titulo, onAcao }) {
  const [estado, setEstado] = useState(null);
  const { play, pushToast } = useGamification();

  useEffect(() => {
    // roda ao montar
    console.log('Componente montado');
    return () => {
      // roda ao desmontar (cleanup)
      console.log('Componente desmontado');
    };
  }, []);

  const handleClique = () => {
    play('click');
    pushToast({ title: 'Cliquei!', subtitle: '' });
    if (onAcao) onAcao();
  };

  return (
    <div className="meu-componente">
      <h2>{titulo}</h2>
      <button onClick={handleClique}>Clicar</button>
    </div>
  );
}
```

Importa e usa em qualquer outro lugar:
```jsx
import MeuComponente from './ui/MeuComponente';

<MeuComponente titulo="Oi" onAcao={() => console.log('clicado')} />
```

---

## 📌 Padrão de nomenclatura

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componente | PascalCase | `MeuComponente.jsx` |
| Hook | camelCase com `use` | `useMinhaCoisa.js` |
| Context | PascalCase + Context | `MeuContext.jsx` |
| Arquivo de dados | kebab-case ou camelCase | `my-data.js` ou `myData.js` |
| CSS class | kebab-case | `.meu-componente` |
| Variável JS | camelCase | `meuValor` |
| Constante | UPPER_SNAKE | `MAX_RETRIES` |
