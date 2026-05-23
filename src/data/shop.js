// Coin Shop catalog — items you can buy with coins earned from lessons + mini-games
// Each shop item references an ITEMS entry plus pricing & availability rules.
// Items rotate weekly (could be implemented later) — for now, a fixed catalog.

import { ITEMS, RARITIES } from './items.js';

// Pricing model (in coins):
//   common: 50, uncommon: 150, rare: 400, legendary: 1000
const PRICE_BY_RARITY = {
  common:    50,
  uncommon:  150,
  rare:      400,
  legendary: 1000,
};

// Featured / on-sale items get a discount (visible in the shop)
const FEATURED = new Set(['skin-fire', 'theme-sunset', 'acc-glasses']);
const SALE_MULTIPLIER = 0.7; // 30% off

export function getShopCatalog() {
  return ITEMS.map(item => {
    const basePrice = PRICE_BY_RARITY[item.rarity] || 100;
    const isFeatured = FEATURED.has(item.id);
    const price = isFeatured ? Math.round(basePrice * SALE_MULTIPLIER) : basePrice;
    return {
      ...item,
      basePrice,
      price,
      featured: isFeatured,
      onSale: isFeatured,
    };
  });
}

// Group catalog by category for shop sections
export function getShopByCategory() {
  const catalog = getShopCatalog();
  const grouped = {};
  for (const item of catalog) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }
  // Sort each category by price ascending
  for (const category of Object.keys(grouped)) {
    grouped[category].sort((a, b) => a.price - b.price);
  }
  return grouped;
}

// Category labels and order for the UI
export const SHOP_CATEGORIES = [
  { id: 'mascot-skin',     label: 'Skins do Bit',  icon: '🤖' },
  { id: 'mascot-accessory',label: 'Acessórios',    icon: '🎩' },
  { id: 'theme',           label: 'Temas',         icon: '🌈' },
  { id: 'profile-frame',   label: 'Bordas',        icon: '🖼️' },
  { id: 'emote',           label: 'Emotes',        icon: '❤️' },
  { id: 'sticker',         label: 'Stickers',      icon: '✨' },
];

export { RARITIES, PRICE_BY_RARITY };
