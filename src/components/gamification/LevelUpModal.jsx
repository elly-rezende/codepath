// LevelUpModal — full-screen cinematic celebration when user levels up
// Triggered from App.jsx when getLevel() returns a different level than before
// Auto-dismisses after 6s or click anywhere

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGamification } from '../../context/GamificationContext';
import { useLang } from '../../context/LanguageContext';

export default function LevelUpModal() {
  const { levelUpData, closeLevelUp } = useGamification();
  const { t } = useLang();
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const levelNumberRef = useRef(null);
  const burstRef = useRef(null);
  const rayRefs = useRef([]);

  useEffect(() => {
    if (!levelUpData || !cardRef.current) return;

    // Big timeline entry
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        burstRef.current,
        { scale: 0, opacity: 0.9 },
        { scale: 4, opacity: 0, duration: 1.5, ease: 'power2.out' },
        '<'
      )
      .fromTo(
        cardRef.current,
        { scale: 0, y: 100, rotation: -10 },
        { scale: 1, y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=1.2'
      )
      .fromTo(
        levelNumberRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      );

    // Animate rays rotating
    rayRefs.current.forEach((ray, i) => {
      if (!ray) return;
      gsap.to(ray, {
        rotation: 360,
        duration: 8 + i * 2,
        repeat: -1,
        ease: 'none',
      });
    });

    const timer = setTimeout(handleDismiss, 6000);
    return () => clearTimeout(timer);
  }, [levelUpData]);

  const handleDismiss = () => {
    if (!levelUpData) return;
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: closeLevelUp,
      });
    } else {
      closeLevelUp();
    }
  };

  if (!levelUpData) return null;

  return (
    <div ref={overlayRef} className="levelup-overlay" onClick={handleDismiss}>
      {/* Animated rays in background */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          ref={(el) => (rayRefs.current[i] = el)}
          className="levelup-rays"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${levelUpData.color || '#FBBF24'}33 30deg, transparent 60deg, ${levelUpData.color || '#FBBF24'}22 90deg, transparent 120deg)`,
            opacity: 0.4 - i * 0.1,
          }}
        />
      ))}

      <div
        ref={burstRef}
        className="levelup-burst"
        style={{ background: `radial-gradient(circle, ${levelUpData.color || '#FBBF24'}, transparent 70%)` }}
      />

      <div ref={cardRef} className="levelup-card" onClick={(e) => e.stopPropagation()}>
        <div className="levelup-title">⬆ Subiu de Nível! ⬆</div>

        <div ref={levelNumberRef} className="levelup-level" style={{
          background: `linear-gradient(135deg, ${levelUpData.color || '#FBBF24'}, #F59E0B)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {levelUpData.levelNumber || '?'}
        </div>

        <div className="levelup-name" style={{ color: levelUpData.color || 'white' }}>
          {levelUpData.name || 'Beginner'}
        </div>

        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28, maxWidth: 360 }}>
          {levelUpData.message || `Você acumulou ${levelUpData.xp || 0} XP! Continue codando, lenda!`}
        </div>

        <button
          onClick={handleDismiss}
          style={{
            background: `linear-gradient(135deg, ${levelUpData.color || '#FBBF24'}, #F59E0B)`,
            color: '#1A1B2E',
            border: 'none',
            borderRadius: 14,
            padding: '14px 36px',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: `0 8px 24px ${levelUpData.color || '#FBBF24'}66`,
            letterSpacing: 0.5,
          }}
        >
          {t('continueBtn')}
        </button>
      </div>
    </div>
  );
}
