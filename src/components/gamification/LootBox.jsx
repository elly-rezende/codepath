// LootBox — animated treasure chest that reveals 3 items
// 3 phases: closed (idle shake) → opening (flash + shake) → revealed (items)

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGamification } from '../../context/GamificationContext';
import { rollMultiple, RARITIES } from '../../data/items';

const CHEST_EMOJI = {
  common: '🎁',
  rare: '📦',
  epic: '🎀',
};

const CHEST_LABEL = {
  common: 'Baú Comum',
  rare: 'Baú Raro',
  epic: 'Baú Épico',
};

export default function LootBox() {
  const { pendingLootBox, closeLootBox, addItem, play, addCoins, fireConfetti } = useGamification();
  const [phase, setPhase] = useState('closed'); // closed | opening | revealed
  const [drops, setDrops] = useState([]);
  const overlayRef = useRef(null);
  const chestRef = useRef(null);
  const flashRef = useRef(null);
  const itemsRef = useRef([]);

  // Reset when a new chest appears
  useEffect(() => {
    if (pendingLootBox) {
      setPhase('closed');
      setDrops([]);
    }
  }, [pendingLootBox]);

  // Entry animation
  useEffect(() => {
    if (overlayRef.current && pendingLootBox) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
    if (chestRef.current && pendingLootBox && phase === 'closed') {
      gsap.fromTo(
        chestRef.current,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [pendingLootBox, phase]);

  if (!pendingLootBox) return null;

  const tier = pendingLootBox.tier || 'common';

  const handleOpen = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    play('chestOpen');

    // Roll drops now so we know what to reveal
    const newDrops = rollMultiple(3, tier);
    setDrops(newDrops);

    // Shake animation then flash
    const tl = gsap.timeline();
    tl.to(chestRef.current, { rotation: -10, duration: 0.08 })
      .to(chestRef.current, { rotation: 10, duration: 0.08 })
      .to(chestRef.current, { rotation: -10, duration: 0.08 })
      .to(chestRef.current, { rotation: 10, duration: 0.08 })
      .to(chestRef.current, { rotation: 0, duration: 0.08 })
      .to(chestRef.current, { scale: 1.3, duration: 0.2, ease: 'power2.out' })
      .to(flashRef.current, { opacity: 1, duration: 0.15, ease: 'power2.out' }, '<')
      .to(chestRef.current, { opacity: 0, scale: 2, duration: 0.3 }, '+=0.1')
      .to(flashRef.current, { opacity: 0, duration: 0.5 }, '+=0.1')
      .call(() => {
        setPhase('revealed');
        // Add items to inventory + grant bonus coins
        newDrops.forEach((item, i) => {
          setTimeout(() => addItem(item), i * 250);
        });
        const bonusCoins = tier === 'epic' ? 100 : tier === 'rare' ? 50 : 25;
        setTimeout(() => addCoins(bonusCoins), 800);

        // Fire confetti if anything legendary/rare drops
        if (newDrops.some(d => d.rarity === 'legendary' || d.rarity === 'rare')) {
          fireConfetti();
        }
      });
  };

  // Animate items appearing on reveal
  useEffect(() => {
    if (phase === 'revealed' && itemsRef.current.length > 0) {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scale: 0, y: 50, rotation: -180, opacity: 0 },
          {
            scale: 1,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.2,
            ease: 'back.out(1.8)',
          }
        );
      });
    }
  }, [phase, drops]);

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: closeLootBox,
      });
    } else {
      closeLootBox();
    }
  };

  return (
    <div ref={overlayRef} className="lootbox-overlay" onClick={phase === 'revealed' ? handleClose : undefined}>
      <div className="lootbox-card" onClick={(e) => e.stopPropagation()}>
        {phase !== 'revealed' && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#FBBF24', textTransform: 'uppercase', marginBottom: 8 }}>
              Você ganhou um {CHEST_LABEL[tier]}!
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
              Clique no baú para abrir
            </div>

            <div ref={flashRef} style={{
              position: 'absolute', inset: 0, background: 'radial-gradient(circle, white, transparent)',
              opacity: 0, pointerEvents: 'none', borderRadius: 24,
            }} />

            <div ref={chestRef} className="lootbox-chest" onClick={handleOpen} style={{ position: 'relative' }}>
              {CHEST_EMOJI[tier]}
            </div>

            {phase === 'closed' && (
              <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Toque para abrir
              </div>
            )}
          </>
        )}

        {phase === 'revealed' && (
          <>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8 }}>
              ✨ Seus prêmios! ✨
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              Clique fora para fechar
            </div>

            <div className="lootbox-drops">
              {drops.map((item, i) => {
                const rarityInfo = RARITIES[item.rarity];
                return (
                  <div
                    key={i}
                    ref={(el) => (itemsRef.current[i] = el)}
                    className="lootbox-drop"
                    style={{
                      borderColor: rarityInfo.color,
                      boxShadow: `0 0 24px ${rarityInfo.glow}, 0 0 0 1px ${rarityInfo.color}`,
                    }}
                  >
                    <div className="lootbox-drop-icon">{item.icon}</div>
                    <div className="lootbox-drop-name">{item.name}</div>
                    <div className="lootbox-drop-rarity" style={{ color: rarityInfo.color }}>
                      {rarityInfo.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleClose}
              style={{
                marginTop: 32,
                background: 'linear-gradient(135deg, var(--color-brand-primary), color-mix(in srgb, var(--color-brand-primary) 70%, #000))',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 32px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124, 92, 255, 0.4)',
              }}
            >
              Continuar →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
