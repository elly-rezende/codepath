// AnimatedXPBar — animated progress bar for current level XP
// Fills smoothly via GSAP when XP changes
// Emits floating "+N XP" text when XP increases
// Shows current level + next level threshold

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function AnimatedXPBar({ xp, level, height = 12, showLabels = true }) {
  const fillRef = useRef(null);
  const floatRef = useRef(null);
  const prevXp = useRef(xp);
  const [floatingXP, setFloatingXP] = useState(null);

  const minXP = level?.minXP ?? 0;
  const maxXP = level?.maxXP === Infinity ? minXP + 5000 : (level?.maxXP ?? 1000);
  const range = Math.max(1, maxXP - minXP);
  const progress = Math.min(100, Math.max(0, ((xp - minXP) / range) * 100));

  // Smooth fill animation when XP changes
  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${progress}%`,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, [progress]);

  // Show floating "+N XP" when XP increases
  useEffect(() => {
    if (xp > prevXp.current) {
      const gained = xp - prevXp.current;
      setFloatingXP(gained);
      if (floatRef.current) {
        gsap.fromTo(
          floatRef.current,
          { y: 0, opacity: 0, scale: 0.5 },
          { y: -40, opacity: 1, scale: 1.2, duration: 0.4, ease: 'back.out(2)' }
        );
        gsap.to(floatRef.current, {
          opacity: 0,
          y: -70,
          duration: 0.8,
          delay: 0.6,
          onComplete: () => setFloatingXP(null),
        });
      }
    }
    prevXp.current = xp;
  }, [xp]);

  return (
    <div className="xp-bar-container" style={{ position: 'relative', width: '100%' }}>
      {showLabels && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}>
          <span style={{ color: level?.color, fontWeight: 700 }}>
            {level?.name || 'Beginner'}
          </span>
          <span>
            <strong style={{ color: 'var(--text)' }}>{xp}</strong> / {maxXP === Infinity ? '∞' : maxXP} XP
          </span>
        </div>
      )}

      <div
        className="xp-bar-track"
        style={{
          width: '100%',
          height,
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: height / 2,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: '100%',
            width: '0%',
            background: `linear-gradient(90deg, ${level?.color || '#7C5CFF'}, ${level?.color || '#7C5CFF'}cc, white)`,
            backgroundSize: '200% 100%',
            borderRadius: height / 2,
            position: 'relative',
            boxShadow: `0 0 12px ${level?.color || '#7C5CFF'}66`,
            animation: 'xpShine 2s linear infinite',
          }}
        />
      </div>

      {/* Floating "+N XP" indicator */}
      {floatingXP && (
        <div
          ref={floatRef}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: 'var(--accent-amber, #FBBF24)',
            fontWeight: 800,
            fontSize: 16,
            fontFamily: 'var(--font-mono)',
            pointerEvents: 'none',
            textShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
          }}
        >
          +{floatingXP} XP
        </div>
      )}
    </div>
  );
}
