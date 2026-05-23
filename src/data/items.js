// Collectible items dropped from loot boxes
// 4 rarities: common (50%), uncommon (30%), rare (15%), legendary (5%)
// Categories: mascot-skin, mascot-accessory, profile-frame, theme, emote, sticker

export const RARITIES = {
  common:    { label: 'Comum',    color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.4)',  weight: 50 },
  uncommon:  { label: 'Incomum',  color: '#10D9C4', glow: 'rgba(16, 217, 196, 0.5)',   weight: 30 },
  rare:      { label: 'Raro',     color: '#7C5CFF', glow: 'rgba(124, 92, 255, 0.6)',   weight: 15 },
  legendary: { label: 'Lendário', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.8)',   weight: 5  },
};

export const ITEMS = [
  // ====================================
  // MASCOT SKINS (alternate body colors)
  // ====================================
  { id: 'skin-cyber',     name: 'Bit Cyber',      icon: '🤖', category: 'mascot-skin', rarity: 'common',    description: 'Visual ciberpunk neon roxo' },
  { id: 'skin-aqua',      name: 'Bit Aqua',       icon: '💧', category: 'mascot-skin', rarity: 'common',    description: 'Cor azul oceano' },
  { id: 'skin-fire',      name: 'Bit Fire',       icon: '🔥', category: 'mascot-skin', rarity: 'uncommon',  description: 'Vermelho flamejante' },
  { id: 'skin-mint',      name: 'Bit Mint',       icon: '🌿', category: 'mascot-skin', rarity: 'uncommon',  description: 'Verde menta refrescante' },
  { id: 'skin-galaxy',    name: 'Bit Galaxy',     icon: '🌌', category: 'mascot-skin', rarity: 'rare',      description: 'Gradiente roxo-rosa-azul' },
  { id: 'skin-golden',    name: 'Bit Golden',     icon: '✨', category: 'mascot-skin', rarity: 'legendary', description: 'Versão dourada brilhante' },
  { id: 'skin-holo',      name: 'Bit Hologram',   icon: '🪩', category: 'mascot-skin', rarity: 'legendary', description: 'Holográfico com reflexos' },

  // ====================================
  // MASCOT ACCESSORIES (hats, glasses, etc.)
  // ====================================
  { id: 'acc-cap',        name: 'Boné Backwards', icon: '🧢', category: 'mascot-accessory', rarity: 'common',    description: 'Boné virado pra trás, estilo skatista' },
  { id: 'acc-glasses',    name: 'Óculos Cyber',   icon: '🕶️', category: 'mascot-accessory', rarity: 'common',    description: 'Óculos escuros futuristas' },
  { id: 'acc-headphones', name: 'Headphones Gamer', icon: '🎧', category: 'mascot-accessory', rarity: 'uncommon',  description: 'Headset com LED RGB' },
  { id: 'acc-crown',      name: 'Coroa Real',     icon: '👑', category: 'mascot-accessory', rarity: 'rare',      description: 'Coroa de ouro com gemas' },
  { id: 'acc-wizard',     name: 'Chapéu de Mago', icon: '🧙', category: 'mascot-accessory', rarity: 'rare',      description: 'Para os mestres do código' },
  { id: 'acc-wings',      name: 'Asas Anjo',      icon: '👼', category: 'mascot-accessory', rarity: 'legendary', description: 'Asas que brilham e batem' },
  { id: 'acc-cape',       name: 'Capa Super-Herói', icon: '🦸', category: 'mascot-accessory', rarity: 'legendary', description: 'Capa que voa ao vento' },

  // ====================================
  // PROFILE FRAMES (borders for avatar)
  // ====================================
  { id: 'frame-pixel',    name: 'Borda Pixel',    icon: '🟦', category: 'profile-frame', rarity: 'common',    description: 'Borda 8-bit retrô' },
  { id: 'frame-neon',     name: 'Borda Neon',     icon: '💜', category: 'profile-frame', rarity: 'uncommon',  description: 'Borda neon pulsante' },
  { id: 'frame-stars',    name: 'Borda Estelar',  icon: '⭐', category: 'profile-frame', rarity: 'rare',      description: 'Estrelas orbitando seu avatar' },
  { id: 'frame-rainbow',  name: 'Borda Arco-íris', icon: '🌈', category: 'profile-frame', rarity: 'legendary', description: 'Cores que mudam continuamente' },

  // ====================================
  // THEMES (UI color palettes)
  // ====================================
  { id: 'theme-sunset',   name: 'Tema Sunset',    icon: '🌅', category: 'theme', rarity: 'common',    description: 'Laranja e rosa do pôr do sol' },
  { id: 'theme-ocean',    name: 'Tema Oceano',    icon: '🌊', category: 'theme', rarity: 'uncommon',  description: 'Tons de azul profundo' },
  { id: 'theme-forest',   name: 'Tema Floresta',  icon: '🌲', category: 'theme', rarity: 'uncommon',  description: 'Verdes naturais' },
  { id: 'theme-aurora',   name: 'Tema Aurora',    icon: '🎆', category: 'theme', rarity: 'rare',      description: 'Aurora boreal animada' },
  { id: 'theme-midnight', name: 'Tema Midnight',  icon: '🌌', category: 'theme', rarity: 'legendary', description: 'Tema premium com estrelas cadentes' },

  // ====================================
  // EMOTES (usable reactions)
  // ====================================
  { id: 'emote-heart',    name: 'Coração Pulsante', icon: '❤️', category: 'emote', rarity: 'common',    description: 'Mande amor pros amigos' },
  { id: 'emote-fire',     name: 'Em Chamas',      icon: '🔥', category: 'emote', rarity: 'common',    description: 'Quando alguém arrasa' },
  { id: 'emote-mind',     name: 'Mente Explodida', icon: '🤯', category: 'emote', rarity: 'uncommon',  description: 'Quando aprende algo incrível' },
  { id: 'emote-100',      name: 'Cem Pontos',     icon: '💯', category: 'emote', rarity: 'rare',      description: 'Performance perfeita' },

  // ====================================
  // STICKERS (decorative)
  // ====================================
  { id: 'sticker-cat',    name: 'Sticker Gato',   icon: '🐱', category: 'sticker', rarity: 'common',    description: 'Gatinho fofo' },
  { id: 'sticker-rocket', name: 'Sticker Foguete', icon: '🚀', category: 'sticker', rarity: 'common',    description: 'Bora decolar!' },
  { id: 'sticker-trophy', name: 'Sticker Troféu', icon: '🏆', category: 'sticker', rarity: 'uncommon',  description: 'Para os campeões' },
];

// Roll a random item from a tier
// tier: 'common' | 'rare' | 'epic' — affects probability of rarities
const TIER_PROBABILITIES = {
  common: { common: 0.65, uncommon: 0.25, rare: 0.08, legendary: 0.02 },
  rare:   { common: 0.30, uncommon: 0.40, rare: 0.22, legendary: 0.08 },
  epic:   { common: 0.10, uncommon: 0.30, rare: 0.40, legendary: 0.20 },
};

export function rollItem(tier = 'common') {
  const probs = TIER_PROBABILITIES[tier] || TIER_PROBABILITIES.common;
  const roll = Math.random();
  let cumulative = 0;
  let chosenRarity = 'common';
  for (const [rarity, prob] of Object.entries(probs)) {
    cumulative += prob;
    if (roll < cumulative) {
      chosenRarity = rarity;
      break;
    }
  }
  const pool = ITEMS.filter(item => item.rarity === chosenRarity);
  if (pool.length === 0) return ITEMS[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Roll N items (used for opening a chest with multiple drops)
export function rollMultiple(count = 3, tier = 'common') {
  const drops = [];
  for (let i = 0; i < count; i++) drops.push(rollItem(tier));
  return drops;
}

export function getItemById(id) {
  return ITEMS.find(item => item.id === id);
}
