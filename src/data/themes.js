// Visual themes — alternative color palettes that override design tokens
// Themes are unlocked via loot boxes (theme.* items). When equipped, they
// inject a <style> tag that overrides the brand colors live.
//
// Adding a new theme:
//   1. Create matching item in items.js (category: 'theme')
//   2. Add entry below mapping item.id → palette
//   3. Theme will auto-appear in the picker once the user owns it

export const THEMES = {
  // Default theme — what the app looks like out of the box (no item needed)
  default: {
    id: 'default',
    name: 'Padrão',
    icon: '🌈',
    preview: ['#3B82F6', '#10D9C4', '#EC4899'],
    overrides: {}, // no overrides — uses tokens.css defaults
  },

  // Item-unlocked themes (must own the corresponding item to equip)
  'theme-sunset': {
    id: 'theme-sunset',
    name: 'Pôr do Sol',
    icon: '🌅',
    preview: ['#F97316', '#EC4899', '#FBBF24'],
    overrides: {
      '--color-brand-primary':   '#F97316', // orange
      '--color-brand-secondary': '#EC4899', // pink
      '--color-brand-accent':    '#FBBF24', // amber
      '--color-bg-primary':      '#1A0A14',
      '--color-bg-secondary':    '#22101A',
      '--color-bg-tertiary':     '#2D1622',
      '--color-bg-card':         '#241420',
    },
  },

  'theme-ocean': {
    id: 'theme-ocean',
    name: 'Oceano',
    icon: '🌊',
    preview: ['#0EA5E9', '#06B6D4', '#14B8A6'],
    overrides: {
      '--color-brand-primary':   '#0EA5E9', // sky blue
      '--color-brand-secondary': '#06B6D4', // cyan
      '--color-brand-accent':    '#14B8A6', // teal
      '--color-bg-primary':      '#0A1929',
      '--color-bg-secondary':    '#0F2138',
      '--color-bg-tertiary':     '#142C47',
      '--color-bg-card':         '#11243D',
    },
  },

  'theme-forest': {
    id: 'theme-forest',
    name: 'Floresta',
    icon: '🌲',
    preview: ['#22C55E', '#10B981', '#84CC16'],
    overrides: {
      '--color-brand-primary':   '#22C55E', // green
      '--color-brand-secondary': '#10B981', // emerald
      '--color-brand-accent':    '#84CC16', // lime
      '--color-bg-primary':      '#0A1F14',
      '--color-bg-secondary':    '#0F2A1B',
      '--color-bg-tertiary':     '#143524',
      '--color-bg-card':         '#11301F',
    },
  },

  'theme-aurora': {
    id: 'theme-aurora',
    name: 'Aurora Boreal',
    icon: '🎆',
    preview: ['#A855F7', '#06B6D4', '#10B981'],
    overrides: {
      '--color-brand-primary':   '#A855F7', // purple
      '--color-brand-secondary': '#06B6D4', // cyan
      '--color-brand-accent':    '#10B981', // emerald
      '--color-bg-primary':      '#0B0A1F',
      '--color-bg-secondary':    '#13112D',
      '--color-bg-tertiary':     '#1B173B',
      '--color-bg-card':         '#161433',
    },
  },

  'theme-midnight': {
    id: 'theme-midnight',
    name: 'Meia-Noite',
    icon: '🌌',
    preview: ['#6366F1', '#8B5CF6', '#FBBF24'],
    overrides: {
      '--color-brand-primary':   '#6366F1', // indigo
      '--color-brand-secondary': '#8B5CF6', // violet
      '--color-brand-accent':    '#FBBF24', // golden stars
      '--color-bg-primary':      '#020617',
      '--color-bg-secondary':    '#0F172A',
      '--color-bg-tertiary':     '#1E293B',
      '--color-bg-card':         '#131D31',
    },
  },
};

// Returns array of theme objects, with 'unlocked' flag based on inventory
export function getThemesWithUnlockStatus(inventory) {
  const ownedIds = new Set(inventory.map(i => i.id));
  return Object.values(THEMES).map(theme => ({
    ...theme,
    unlocked: theme.id === 'default' || ownedIds.has(theme.id),
  }));
}

// Applies a theme by injecting CSS variable overrides into a <style> tag
export function applyTheme(themeId) {
  const theme = THEMES[themeId] || THEMES.default;
  let styleEl = document.getElementById('codepath-theme-overrides');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'codepath-theme-overrides';
    document.head.appendChild(styleEl);
  }
  const declarations = Object.entries(theme.overrides)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  styleEl.textContent = declarations ? `:root {\n${declarations}\n}` : '';
}
