// Shop — spend coins on items
// Categorized grid, owned indicator, price display, featured/sale badges,
// purchase confirmation, insufficient-coins state.

import { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useQuests } from '../../context/QuestsContext';
import { getShopByCategory, SHOP_CATEGORIES, RARITIES } from '../../data/shop';

export default function Shop() {
  const { coins, inventory, addItem, spendCoins, play, pushToast, fireConfetti } = useGamification();
  const { trackCoinsSpent } = useQuests();
  const [activeCategory, setActiveCategory] = useState('mascot-skin');
  const [purchasing, setPurchasing] = useState(null); // item.id while transaction in flight

  const catalog = getShopByCategory();
  const itemsForCategory = catalog[activeCategory] || [];

  // Map of owned item IDs for quick lookup
  const ownedIds = new Set(inventory.map(i => i.id));

  const handleBuy = (item) => {
    if (coins < item.price) {
      pushToast({ title: 'Moedas insuficientes!', subtitle: `Faltam ${item.price - coins} 🪙` });
      play('wrong');
      return;
    }
    if (ownedIds.has(item.id) && ['theme', 'profile-frame'].includes(item.category)) {
      // Single-instance items (themes, frames) — can't buy twice
      pushToast({ title: 'Você já tem esse!', subtitle: 'Vai no inventário equipar' });
      return;
    }

    const confirmed = window.confirm(
      `Comprar "${item.name}" por ${item.price} moedas?\n\nVocê tem ${coins} 🪙`
    );
    if (!confirmed) return;

    setPurchasing(item.id);
    setTimeout(() => {
      spendCoins(item.price);
      addItem(item);
      trackCoinsSpent(item.price); // weekly quest progress
      if (item.rarity === 'legendary') fireConfetti();
      play(item.rarity === 'legendary' || item.rarity === 'rare' ? 'rare' : 'chestOpen');
      setPurchasing(null);
    }, 250);
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <div>
          <div className="shop-title">🛒 Loja de Moedas</div>
          <div className="shop-subtitle">Gaste suas moedas em items legais</div>
        </div>
        <div className="shop-balance">
          <span className="shop-balance-icon">🪙</span>
          <span className="shop-balance-value">{coins}</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="shop-tabs">
        {SHOP_CATEGORIES.map(cat => {
          const itemCount = catalog[cat.id]?.length || 0;
          return (
            <button
              key={cat.id}
              className={`shop-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); play('hover'); }}
              disabled={itemCount === 0}
            >
              <span className="shop-tab-icon">{cat.icon}</span>
              <span className="shop-tab-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      <div className="shop-grid">
        {itemsForCategory.map(item => {
          const rarity = RARITIES[item.rarity];
          const owned = ownedIds.has(item.id);
          const canAfford = coins >= item.price;
          const isPurchasing = purchasing === item.id;

          // For themes/frames: owned = unavailable. For skins/accessories/emotes: owned but can stack
          const isSingleInstance = ['theme', 'profile-frame'].includes(item.category);
          const isUnavailable = owned && isSingleInstance;

          return (
            <div
              key={item.id}
              className={`shop-item rarity-${item.rarity} ${isUnavailable ? 'owned-single' : ''}`}
              style={{ borderColor: rarity.color }}
            >
              {item.featured && !isUnavailable && (
                <div className="shop-badge sale">-30%</div>
              )}
              {owned && (
                <div className="shop-badge owned">✓ Tem</div>
              )}

              <div className="shop-item-icon">{item.icon}</div>
              <div className="shop-item-name">{item.name}</div>
              <div className="shop-item-rarity" style={{ color: rarity.color }}>
                {rarity.label}
              </div>
              <div className="shop-item-desc">{item.description}</div>

              <div className="shop-item-footer">
                <div className="shop-item-price">
                  <span className="price-icon">🪙</span>
                  {item.onSale && <span className="price-old">{item.basePrice}</span>}
                  <span className={`price-value ${!canAfford ? 'unaffordable' : ''}`}>
                    {item.price}
                  </span>
                </div>
                <button
                  className={`shop-buy-btn ${!canAfford ? 'disabled' : ''} ${isUnavailable ? 'owned' : ''}`}
                  onClick={() => handleBuy(item)}
                  disabled={isUnavailable || !canAfford || isPurchasing}
                  style={canAfford && !isUnavailable ? { background: rarity.color, color: '#000' } : {}}
                >
                  {isPurchasing
                    ? '...'
                    : isUnavailable
                      ? 'Tem'
                      : !canAfford
                        ? 'Faltam moedas'
                        : 'Comprar'
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop-tip">
        💡 Ganhe mais moedas completando lições, abrindo baús e jogando mini-jogos!
      </div>
    </div>
  );
}
