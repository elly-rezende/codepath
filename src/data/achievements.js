// Achievements — milestone-based unlockables
// Each achievement has: id, name, description, icon, rarity, xpReward, coinReward
// + a check(state) function that returns true when the user has earned it

export const ACHIEVEMENTS = [
  // ====================================
  // FIRST STEPS
  // ====================================
  {
    id: 'first-blood',
    name: 'Primeiro Passo',
    description: 'Complete sua primeira lição',
    icon: '🎯',
    rarity: 'common',
    xpReward: 25,
    coinReward: 50,
    check: (s) => s.completedLessons.length >= 1,
  },
  {
    id: 'curious-mind',
    name: 'Mente Curiosa',
    description: 'Complete 5 lições',
    icon: '🧠',
    rarity: 'common',
    xpReward: 50,
    coinReward: 100,
    check: (s) => s.completedLessons.length >= 5,
  },
  {
    id: 'getting-serious',
    name: 'Coisa Séria',
    description: 'Complete 10 lições',
    icon: '📚',
    rarity: 'uncommon',
    xpReward: 100,
    coinReward: 200,
    check: (s) => s.completedLessons.length >= 10,
  },
  {
    id: 'dedicated',
    name: 'Dedicado',
    description: 'Complete 25 lições',
    icon: '🎓',
    rarity: 'rare',
    xpReward: 250,
    coinReward: 500,
    check: (s) => s.completedLessons.length >= 25,
  },
  {
    id: 'completionist',
    name: 'Completista',
    description: 'Complete TODAS as 50 lições',
    icon: '👑',
    rarity: 'legendary',
    xpReward: 1000,
    coinReward: 2000,
    check: (s) => s.completedLessons.length >= 50,
  },

  // ====================================
  // STREAK
  // ====================================
  {
    id: 'streak-3',
    name: 'Em Chamas',
    description: 'Streak de 3 dias',
    icon: '🔥',
    rarity: 'common',
    xpReward: 50,
    coinReward: 75,
    check: (s) => (s.streak || 0) >= 3,
  },
  {
    id: 'streak-7',
    name: 'Semana Sem Parar',
    description: 'Streak de 7 dias',
    icon: '⚡',
    rarity: 'uncommon',
    xpReward: 150,
    coinReward: 200,
    check: (s) => (s.streak || 0) >= 7,
  },
  {
    id: 'streak-30',
    name: 'Mês Imparável',
    description: 'Streak de 30 dias',
    icon: '🌟',
    rarity: 'rare',
    xpReward: 500,
    coinReward: 1000,
    check: (s) => (s.streak || 0) >= 30,
  },
  {
    id: 'streak-100',
    name: 'Lenda do Código',
    description: '100 dias seguidos!!!',
    icon: '💎',
    rarity: 'legendary',
    xpReward: 2500,
    coinReward: 5000,
    check: (s) => (s.streak || 0) >= 100,
  },

  // ====================================
  // XP MILESTONES
  // ====================================
  {
    id: 'xp-100',
    name: 'Cem Pontos',
    description: 'Acumule 100 XP',
    icon: '💯',
    rarity: 'common',
    xpReward: 25,
    coinReward: 50,
    check: (s) => (s.xp || 0) >= 100,
  },
  {
    id: 'xp-500',
    name: 'Subindo Rápido',
    description: 'Acumule 500 XP — vire Intermediário',
    icon: '📈',
    rarity: 'uncommon',
    xpReward: 100,
    coinReward: 150,
    check: (s) => (s.xp || 0) >= 500,
  },
  {
    id: 'xp-2000',
    name: 'Avançado',
    description: 'Acumule 2000 XP',
    icon: '🚀',
    rarity: 'rare',
    xpReward: 300,
    coinReward: 500,
    check: (s) => (s.xp || 0) >= 2000,
  },
  {
    id: 'xp-5000',
    name: 'Plena',
    description: 'Acumule 5000 XP — o topo!',
    icon: '🏆',
    rarity: 'legendary',
    xpReward: 1000,
    coinReward: 2500,
    check: (s) => (s.xp || 0) >= 5000,
  },

  // ====================================
  // TRACK MASTERY
  // ====================================
  {
    id: 'track-csf',
    name: 'CS Master',
    description: 'Complete toda a trilha CS Fundamentals',
    icon: '🧠',
    rarity: 'rare',
    xpReward: 400,
    coinReward: 750,
    check: (s, tracks) => {
      const t = tracks?.find(tr => tr.id === 'cs-fundamentals');
      if (!t) return false;
      return t.lessons.every(l => s.completedLessons.includes(l.id));
    },
  },
  {
    id: 'track-fw',
    name: 'Web Wizard',
    description: 'Complete toda a trilha Frontend & Web',
    icon: '🎨',
    rarity: 'rare',
    xpReward: 400,
    coinReward: 750,
    check: (s, tracks) => {
      const t = tracks?.find(tr => tr.id === 'frontend-web');
      if (!t) return false;
      return t.lessons.every(l => s.completedLessons.includes(l.id));
    },
  },
  {
    id: 'track-be',
    name: 'Backend Boss',
    description: 'Complete toda a trilha Backend & APIs',
    icon: '⚙️',
    rarity: 'rare',
    xpReward: 400,
    coinReward: 750,
    check: (s, tracks) => {
      const t = tracks?.find(tr => tr.id === 'backend-apis');
      if (!t) return false;
      return t.lessons.every(l => s.completedLessons.includes(l.id));
    },
  },
  {
    id: 'track-do',
    name: 'DevOps Ninja',
    description: 'Complete toda a trilha DevOps',
    icon: '🚀',
    rarity: 'rare',
    xpReward: 400,
    coinReward: 750,
    check: (s, tracks) => {
      const t = tracks?.find(tr => tr.id === 'devops-infrastructure');
      if (!t) return false;
      return t.lessons.every(l => s.completedLessons.includes(l.id));
    },
  },
  {
    id: 'track-sd',
    name: 'Architect',
    description: 'Complete toda a trilha System Design',
    icon: '🏗️',
    rarity: 'rare',
    xpReward: 400,
    coinReward: 750,
    check: (s, tracks) => {
      const t = tracks?.find(tr => tr.id === 'system-design');
      if (!t) return false;
      return t.lessons.every(l => s.completedLessons.includes(l.id));
    },
  },

  // ====================================
  // PERFECTIONIST / SPEED
  // ====================================
  {
    id: 'flawless',
    name: 'Impecável',
    description: 'Complete 3 lições sem nenhum erro',
    icon: '✨',
    rarity: 'uncommon',
    xpReward: 100,
    coinReward: 200,
    check: (s) => {
      const counts = s.instantCorrectCounts || {};
      return Object.values(counts).filter(c => c >= 1).length >= 3;
    },
  },
  {
    id: 'persistent',
    name: 'Persistente',
    description: 'Não desistiu mesmo errando muitas vezes',
    icon: '💪',
    rarity: 'uncommon',
    xpReward: 100,
    coinReward: 150,
    check: (s) => {
      const fails = s.failCounts || {};
      return Object.values(fails).filter(c => c >= 3).length >= 2;
    },
  },

  // ====================================
  // COLLECTION
  // ====================================
  {
    id: 'collector-10',
    name: 'Colecionador',
    description: 'Colete 10 items',
    icon: '🎒',
    rarity: 'common',
    xpReward: 50,
    coinReward: 100,
    check: (s) => (s.inventoryCount || 0) >= 10,
  },
  {
    id: 'collector-25',
    name: 'Caçador de Tesouros',
    description: 'Colete 25 items',
    icon: '💎',
    rarity: 'rare',
    xpReward: 200,
    coinReward: 400,
    check: (s) => (s.inventoryCount || 0) >= 25,
  },

  // ====================================
  // SPECIAL / EASTER EGGS
  // ====================================
  {
    id: 'mascot-friend',
    name: 'Amigo do Bit',
    description: 'Clique no Bit 20 vezes',
    icon: '🤖',
    rarity: 'common',
    xpReward: 30,
    coinReward: 50,
    check: (s) => (s.mascotClicks || 0) >= 20,
  },
  {
    id: 'night-owl',
    name: 'Coruja',
    description: 'Estude depois das 22h',
    icon: '🦉',
    rarity: 'common',
    xpReward: 30,
    coinReward: 50,
    check: (s) => (s.studiedLate || false),
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Estude antes das 7h',
    icon: '🐦',
    rarity: 'common',
    xpReward: 30,
    coinReward: 50,
    check: (s) => (s.studiedEarly || false),
  },
];

export function getAchievementById(id) {
  return ACHIEVEMENTS.find(a => a.id === id);
}

// Check which achievements have just been earned by comparing current state
// vs. already-unlocked list. Returns array of newly-earned achievements.
export function findNewlyEarned(state, alreadyUnlocked, tracks) {
  return ACHIEVEMENTS.filter(a =>
    !alreadyUnlocked.includes(a.id) && a.check(state, tracks)
  );
}
