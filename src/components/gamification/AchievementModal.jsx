// AchievementModal — cinematic full-screen reveal when a milestone is unlocked
// Listens for unlockedAchievements changes and shows the most recent one
// Auto-dismisses after 5s, or click anywhere to dismiss

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGamification } from '../../context/GamificationContext';
import { RARITIES } from '../../data/items';

export default function AchievementModal() {
  const { play } = useGamification();
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const burstRef = useRef(null);

  // Process queue: when current is null and queue has items, show next
  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [current, queue]);

  // Entry animation when showing
  useEffect(() => {
    if (!current || !cardRef.current) return;

    play('badge');

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        cardRef.current,
        { scale: 0, y: 100, rotation: -15 },
        { scale: 1, y: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.8)' },
        '<'
      )
      .fromTo(
        iconRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2.2)' },
        '-=0.4'
      )
      .fromTo(
        burstRef.current,
        { scale: 0, opacity: 1 },
        { scale: 3, opacity: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.7'
      );

    // Auto-dismiss after 5s
    const timer = setTimeout(handleDismiss, 5000);
    return () => clearTimeout(timer);
  }, [current, play]);

  const handleDismiss = () => {
    if (!current) return;
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setCurrent(null),
      });
    } else {
      setCurrent(null);
    }
  };

  // Expose a method to queue achievements (called externally)
  useEffect(() => {
    window.__codepathAchievementQueue = (achievement) => {
      setQueue(prev => [...prev, achievement]);
    };
    return () => { delete window.__codepathAchievementQueue; };
  }, []);

  if (!current) return null;

  const rarityInfo = RARITIES[current.rarity] || RARITIES.common;

  return (
    <div
      ref={overlayRef}
      className="achievement-overlay"
      onClick={handleDismiss}
    >
      <div
        ref={cardRef}
        className="achievement-card"
        style={{ borderColor: rarityInfo.color, boxShadow: `0 24px 64px ${rarityInfo.glow}, 0 0 0 2px ${rarityInfo.color}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={burstRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle, ${rarityInfo.color} 0%, transparent 70%)`,
            borderRadius: 24,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: rarityInfo.color, textTransform: 'uppercase', marginBottom: 8, position: 'relative' }}>
          🏆 Conquista Desbloqueada
        </div>

        <div ref={iconRef} className="achievement-icon" style={{ borderColor: rarityInfo.color, boxShadow: `0 0 32px ${rarityInfo.glow}` }}>
          {current.icon}
        </div>

        <div className="achievement-name" style={{ color: rarityInfo.color }}>
          {current.name}
        </div>

        <div className="achievement-desc">
          {current.description}
        </div>

        <div className="achievement-rewards">
          <div className="achievement-reward">
            <span style={{ fontSize: 18 }}>⚡</span>
            <span style={{ fontWeight: 700 }}>+{current.xpReward} XP</span>
          </div>
          <div className="achievement-reward">
            <span style={{ fontSize: 18 }}>🪙</span>
            <span style={{ fontWeight: 700 }}>+{current.coinReward}</span>
          </div>
        </div>

        <button onClick={handleDismiss} className="achievement-dismiss">
          Continuar →
        </button>
      </div>
    </div>
  );
}
