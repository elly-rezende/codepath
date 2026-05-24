// Weekly Quests — challenges that refresh every Monday
// Each quest tracks progress and rewards coins/XP/items on completion.
// Pool of ~15 quest templates; each week we pick 3-4 randomly.

// Quest types determine how progress is tracked:
//   - lesson_count: complete N lessons (any track)
//   - track_lesson_count: complete N lessons in specific track
//   - minigame_count: play N mini-games (any type)
//   - minigame_specific: win N times in a specific mini-game
//   - xp_total: earn N XP total this week
//   - streak: maintain streak for N consecutive days
//   - coins_spend: spend N coins in the shop
//   - friend: add N friends
//   - perfect_lesson: complete N lessons without errors

export const QUEST_TEMPLATES = [
  // Easy (50-100 coin reward)
  {
    id: 'quest-3-lessons',
    title: 'Estudante Dedicado',
    description: 'Complete 3 lições esta semana',
    icon: '📚',
    type: 'lesson_count',
    target: 3,
    reward: { coins: 75, xp: 50 },
    difficulty: 'easy',
  },
  {
    id: 'quest-play-2-minigames',
    title: 'Jogador',
    description: 'Jogue 2 mini-jogos esta semana',
    icon: '🎮',
    type: 'minigame_count',
    target: 2,
    reward: { coins: 50, xp: 30 },
    difficulty: 'easy',
  },
  {
    id: 'quest-200-xp',
    title: 'Ganhador de XP',
    description: 'Acumule 200 XP esta semana',
    icon: '⚡',
    type: 'xp_total',
    target: 200,
    reward: { coins: 60, xp: 0 },
    difficulty: 'easy',
  },
  {
    id: 'quest-streak-3',
    title: 'Sequência Iniciante',
    description: 'Mantenha streak de 3 dias',
    icon: '🔥',
    type: 'streak',
    target: 3,
    reward: { coins: 75, xp: 40 },
    difficulty: 'easy',
  },

  // Medium (150-250 coin reward)
  {
    id: 'quest-5-lessons',
    title: 'Aluno Aplicado',
    description: 'Complete 5 lições esta semana',
    icon: '🎓',
    type: 'lesson_count',
    target: 5,
    reward: { coins: 150, xp: 100 },
    difficulty: 'medium',
  },
  {
    id: 'quest-cs-fundamentals',
    title: 'Mestre da Lógica',
    description: 'Complete 2 lições de CS Fundamentals',
    icon: '🧠',
    type: 'track_lesson_count',
    trackId: 'cs-fundamentals',
    target: 2,
    reward: { coins: 150, xp: 80 },
    difficulty: 'medium',
  },
  {
    id: 'quest-frontend',
    title: 'Designer Web',
    description: 'Complete 2 lições de Frontend & Web',
    icon: '🎨',
    type: 'track_lesson_count',
    trackId: 'frontend-web',
    target: 2,
    reward: { coins: 150, xp: 80 },
    difficulty: 'medium',
  },
  {
    id: 'quest-backend',
    title: 'Engenheiro Backend',
    description: 'Complete 2 lições de Backend & APIs',
    icon: '⚙️',
    type: 'track_lesson_count',
    trackId: 'backend-apis',
    target: 2,
    reward: { coins: 150, xp: 80 },
    difficulty: 'medium',
  },
  {
    id: 'quest-perfect-2',
    title: 'Sem Erros',
    description: 'Complete 2 lições sem nenhuma falha',
    icon: '✨',
    type: 'perfect_lesson',
    target: 2,
    reward: { coins: 200, xp: 100 },
    difficulty: 'medium',
  },
  {
    id: 'quest-play-5-minigames',
    title: 'Gamer Fanático',
    description: 'Jogue 5 mini-jogos esta semana',
    icon: '🕹️',
    type: 'minigame_count',
    target: 5,
    reward: { coins: 175, xp: 75 },
    difficulty: 'medium',
  },

  // Hard (300-500 coin reward + item drops)
  {
    id: 'quest-10-lessons',
    title: 'Maratonista do Código',
    description: 'Complete 10 lições esta semana',
    icon: '🏃‍♂️',
    type: 'lesson_count',
    target: 10,
    reward: { coins: 400, xp: 250, lootTier: 'rare' },
    difficulty: 'hard',
  },
  {
    id: 'quest-500-xp',
    title: 'Caçador de XP',
    description: 'Acumule 500 XP esta semana',
    icon: '🚀',
    type: 'xp_total',
    target: 500,
    reward: { coins: 300, xp: 0, lootTier: 'rare' },
    difficulty: 'hard',
  },
  {
    id: 'quest-streak-7',
    title: 'Em Chamas',
    description: 'Mantenha streak de 7 dias',
    icon: '🔥',
    type: 'streak',
    target: 7,
    reward: { coins: 350, xp: 150, lootTier: 'rare' },
    difficulty: 'hard',
  },
  {
    id: 'quest-add-friend',
    title: 'Faça um Amigo',
    description: 'Adicione 1 amigo esta semana',
    icon: '👥',
    type: 'friend',
    target: 1,
    reward: { coins: 250, xp: 100 },
    difficulty: 'medium',
  },
  {
    id: 'quest-spend-coins',
    title: 'Gastando os Trocados',
    description: 'Gaste 200 moedas na loja',
    icon: '🛒',
    type: 'coins_spend',
    target: 200,
    reward: { coins: 100, xp: 50, lootTier: 'common' },
    difficulty: 'medium',
  },
];

// Returns the ISO week start (Monday 00:00 UTC-3) for a given date
// Quests reset weekly at this boundary
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  d.setDate(diff);
  return d.getTime();
}

export function getWeekEnd(date = new Date()) {
  return getWeekStart(date) + 7 * 24 * 60 * 60 * 1000;
}

export function msUntilNextReset(date = new Date()) {
  return Math.max(0, getWeekEnd(date) - date.getTime());
}

// Deterministic weekly quest selection — same user gets same quests
// each week (no FOMO), but different users get different quests.
// Uses seed = (weekStart + userId) so it rotates predictably.
export function getWeeklyQuests(userId = 'guest', date = new Date()) {
  const weekStart = getWeekStart(date);
  const seed = weekStart + (userId ? userId.split('').reduce((s, c) => s + c.charCodeAt(0), 0) : 0);

  // Seeded shuffle
  const pool = [...QUEST_TEMPLATES];
  let curr = seed;
  for (let i = pool.length - 1; i > 0; i--) {
    curr = (curr * 1103515245 + 12345) & 0x7fffffff;
    const j = curr % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Pick: 2 easy, 1 medium, 1 hard
  const easy = pool.filter(q => q.difficulty === 'easy').slice(0, 2);
  const medium = pool.filter(q => q.difficulty === 'medium').slice(0, 1);
  const hard = pool.filter(q => q.difficulty === 'hard').slice(0, 1);

  return [...easy, ...medium, ...hard].map(q => ({ ...q, weekStart }));
}

// Format remaining time in human-readable PT-BR
export function formatTimeLeft(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days >= 1) return `${days}d ${hours}h`;
  if (hours >= 1) return `${hours}h`;
  const minutes = Math.floor(ms / (60 * 1000));
  return `${minutes} min`;
}

export const DIFFICULTY_COLORS = {
  easy:   '#4ADE80', // green
  medium: '#FBBF24', // amber
  hard:   '#EC4899', // pink
};
