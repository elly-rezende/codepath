// Theme helpers — read live CSS variable values so JS-driven components
// (Mascot SVG fills, gradients, etc.) reflect token changes immediately.

/**
 * Get the current value of a CSS custom property from :root.
 * Re-reads every call, so components that call this on render
 * will automatically pick up token changes (e.g. after `npm run sync-tokens`).
 *
 * @param {string} name - CSS variable name including the `--` prefix
 * @param {string} fallback - Default value if the variable isn't defined
 * @returns {string} The trimmed CSS value (e.g. "#3B82F6")
 */
export function cssVar(name, fallback = '') {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * Returns the current theme palette — all main brand/state colors.
 * Use inside React components so they re-read tokens on each render.
 */
export function getThemePalette() {
  return {
    brandPrimary:    cssVar('--color-brand-primary',   '#7C5CFF'),
    brandSecondary:  cssVar('--color-brand-secondary', '#10D9C4'),
    brandAccent:     cssVar('--color-brand-accent',    '#EC4899'),
    success:         cssVar('--color-semantic-success','#4ADE80'),
    warning:         cssVar('--color-semantic-warning','#FBBF24'),
    error:           cssVar('--color-semantic-error',  '#F56565'),
    info:            cssVar('--color-semantic-info',   '#61DAFB'),
    rarityCommon:    cssVar('--color-rarity-common',   '#94A3B8'),
    rarityUncommon:  cssVar('--color-rarity-uncommon', '#10D9C4'),
    rarityRare:      cssVar('--color-rarity-rare',     '#7C5CFF'),
    rarityLegendary: cssVar('--color-rarity-legendary','#F59E0B'),
  };
}

/**
 * Lighter accent variant of the brand color, derived dynamically.
 * Used for SVG body accents (the lighter highlight on the mascot).
 */
export function lightenColor(hex, percent = 25) {
  if (!hex || !hex.startsWith('#')) return hex;
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * percent / 100));
  const g = Math.min(255, ((num >> 8) & 0xFF) + Math.round(255 * percent / 100));
  const b = Math.min(255, (num & 0xFF) + Math.round(255 * percent / 100));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
