// Inventory — displays all items the user has collected from loot boxes
// Grouped by category, filterable, equippable for mascot skins/accessories.
// Equipped items are saved to user.equipped = { skin, accessory, frame, theme }

import { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useAuth } from '../../context/AuthContext';
import { RARITIES, ITEMS } from '../../data/items';

const CATEGORIES = [
  { id: 'all',             label: 'Tudo',           icon: '🎒' },
  { id: 'mascot-skin',     label: 'Skins do Bit',   icon: '🤖' },
  { id: 'mascot-accessory',label: 'Acessórios',     icon: '🎩' },
  { id: 'profile-frame',   label: 'Bordas',         icon: '🖼️' },
  { id: 'theme',           label: 'Temas',          icon: '🌈' },
  { id: 'emote',           label: 'Emotes',         icon: '❤️' },
  { id: 'sticker',         label: 'Stickers',       icon: '✨' },
];

// Categories that are equippable (one active at a time)
const EQUIPPABLE = ['mascot-skin', 'mascot-accessory', 'profile-frame', 'theme'];

export default function Inventory() {
  const { inventory, play, pushToast } = useGamification();
  const { user, updateUser } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');

  // Group inventory items by id, count duplicates
  const ownedById = inventory.reduce((acc, inv) => {
    acc[inv.id] = (acc[inv.id] || 0) + 1;
    return acc;
  }, {});

  const equipped = user?.equipped || {};

  // Decide what to render based on filter
  const visibleItems = ITEMS.filter(item => {
    if (activeCategory === 'all') return ownedById[item.id] > 0;
    return item.category === activeCategory && ownedById[item.id] > 0;
  });

  const handleEquip = (item) => {
    if (!EQUIPPABLE.includes(item.category)) return;
    const slot = item.category;
    const currentlyEquipped = equipped[slot] === item.id;

    const newEquipped = { ...equipped };
    if (currentlyEquipped) {
      delete newEquipped[slot];
      pushToast({ title: `${item.name} desequipado`, subtitle: 'Voltou ao padrão' });
    } else {
      newEquipped[slot] = item.id;
      pushToast({ title: `${item.name} equipado!`, subtitle: 'Tá brilhando ✨' });
    }
    updateUser({ equipped: newEquipped });
    play('pop');
  };

  const ownedCount = Object.values(ownedById).reduce((a, b) => a + b, 0);
  const uniqueCount = Object.keys(ownedById).length;

  return (
    <div className="inventory">
      <div className="inventory-header">
        <div>
          <div className="inventory-title">🎒 Seu Inventário</div>
          <div className="inventory-subtitle">
            {uniqueCount} {uniqueCount === 1 ? 'item único' : 'items únicos'} · {ownedCount} {ownedCount === 1 ? 'item total' : 'items totais'}
          </div>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="inventory-filters">
        {CATEGORIES.map(cat => {
          const count = cat.id === 'all'
            ? uniqueCount
            : ITEMS.filter(i => i.category === cat.id && ownedById[i.id] > 0).length;
          return (
            <button
              key={cat.id}
              className={`inv-filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); play('hover'); }}
              disabled={cat.id !== 'all' && count === 0}
            >
              <span className="chip-icon">{cat.icon}</span>
              <span className="chip-label">{cat.label}</span>
              {count > 0 && <span className="chip-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      {visibleItems.length === 0 ? (
        <div className="inventory-empty">
          <div className="empty-icon">📦</div>
          <div className="empty-title">Nada por aqui ainda</div>
          <div className="empty-desc">
            Complete lições pra ganhar baús e desbloquear items.<br />
            <strong>A cada 3 lições</strong> você ganha um baú comum 🎁
          </div>
        </div>
      ) : (
        <div className="inventory-grid">
          {visibleItems.map(item => {
            const count = ownedById[item.id];
            const rarity = RARITIES[item.rarity];
            const isEquipped = equipped[item.category] === item.id;
            const canEquip = EQUIPPABLE.includes(item.category);

            return (
              <div
                key={item.id}
                className={`inv-item ${isEquipped ? 'equipped' : ''} rarity-${item.rarity}`}
                style={{
                  borderColor: rarity.color,
                  boxShadow: isEquipped ? `0 0 24px ${rarity.glow}, inset 0 0 0 2px ${rarity.color}` : 'none',
                }}
              >
                {isEquipped && (
                  <div className="inv-equipped-badge" style={{ background: rarity.color }}>
                    ✓ Em uso
                  </div>
                )}
                {count > 1 && (
                  <div className="inv-count-badge">×{count}</div>
                )}

                <div className="inv-item-icon">{item.icon}</div>
                <div className="inv-item-name">{item.name}</div>
                <div className="inv-item-rarity" style={{ color: rarity.color }}>
                  {rarity.label}
                </div>
                <div className="inv-item-desc">{item.description}</div>

                {canEquip && (
                  <button
                    className={`inv-equip-btn ${isEquipped ? 'unequip' : ''}`}
                    onClick={() => handleEquip(item)}
                    style={isEquipped ? {} : { background: rarity.color, color: '#000' }}
                  >
                    {isEquipped ? 'Tirar' : 'Equipar'}
                  </button>
                )}
                {!canEquip && (
                  <div className="inv-item-meta">
                    {item.category === 'emote' ? 'Use ao mandar reações' : 'Decorativo'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
