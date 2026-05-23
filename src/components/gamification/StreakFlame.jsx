// StreakFlame — animated flame icon that grows and changes color based on streak days
// Tiers:
//   0:        gray ember (no flame)
//   1-2:      small yellow flame
//   3-6:      medium orange flame
//   7-29:     large red-orange flame with sparks
//   30-99:    huge blue-purple flame
//   100+:     legendary rainbow flame
// Used in navbar — clickable to show stats

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function getFlameTier(streak) {
  if (streak >= 100) return 'legendary';
  if (streak >= 30) return 'epic';
  if (streak >= 7) return 'large';
  if (streak >= 3) return 'medium';
  if (streak >= 1) return 'small';
  return 'cold';
}

const TIER_CONFIG = {
  cold:      { size: 0.6, colors: ['#475569', '#64748B'],            glow: 'rgba(100,116,139,0.2)',  emoji: '💨' },
  small:     { size: 0.75, colors: ['#FBBF24', '#FCD34D'],          glow: 'rgba(251,191,36,0.4)',   emoji: '🔥' },
  medium:    { size: 0.9, colors: ['#F59E0B', '#FB923C'],           glow: 'rgba(245,158,11,0.5)',   emoji: '🔥' },
  large:     { size: 1.1, colors: ['#EF4444', '#F97316'],           glow: 'rgba(239,68,68,0.6)',    emoji: '🔥' },
  epic:      { size: 1.3, colors: ['#8B5CF6', '#3B82F6'],           glow: 'rgba(139,92,246,0.7)',   emoji: '💜' },
  legendary: { size: 1.5, colors: ['#EC4899', '#F59E0B', '#10D9C4'], glow: 'rgba(236,72,153,0.8)',   emoji: '🌈' },
};

export default function StreakFlame({ streak = 0, showCount = true, size = 'normal', onClick }) {
  const containerRef = useRef(null);
  const flameRef = useRef(null);
  const sparkRefs = useRef([]);

  const tier = getFlameTier(streak);
  const config = TIER_CONFIG[tier];
  const baseSize = size === 'large' ? 48 : size === 'small' ? 22 : 32;
  const flameSize = baseSize * config.size;

  // Flicker animation
  useEffect(() => {
    if (!flameRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(flameRef.current, { scale: 1.08, duration: 0.25, ease: 'sine.inOut' })
      .to(flameRef.current, { scale: 0.96, duration: 0.18, ease: 'sine.inOut' })
      .to(flameRef.current, { scale: 1.03, duration: 0.22, ease: 'sine.inOut' });
    return () => tl.kill();
  }, [tier]);

  // Sparks float up for epic+ tiers
  useEffect(() => {
    if (tier !== 'epic' && tier !== 'legendary') return;
    sparkRefs.current.forEach((spark, i) => {
      if (!spark) return;
      gsap.set(spark, { x: 0, y: 0, opacity: 0 });
      gsap.to(spark, {
        y: -30 - Math.random() * 20,
        x: (Math.random() - 0.5) * 30,
        opacity: 1,
        duration: 1.2,
        delay: i * 0.4 + Math.random() * 0.5,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 0.8,
      });
      gsap.to(spark, {
        opacity: 0,
        duration: 0.4,
        delay: i * 0.4 + 0.8 + Math.random() * 0.5,
        repeat: -1,
        repeatDelay: 1.2,
      });
    });
  }, [tier]);

  // Pulse when streak goes up
  useEffect(() => {
    if (!containerRef.current || streak === 0) return;
    gsap.fromTo(
      containerRef.current,
      { scale: 1.4 },
      { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
    );
  }, [streak]);

  return (
    <div
      ref={containerRef}
      className={`streak-flame ${tier} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        filter: streak > 0 ? `drop-shadow(0 0 12px ${config.glow})` : 'none',
      }}
      title={`Sequência: ${streak} ${streak === 1 ? 'dia' : 'dias'}`}
    >
      {/* Sparks (only epic/legendary) */}
      {(tier === 'epic' || tier === 'legendary') && [0, 1, 2].map(i => (
        <div
          key={i}
          ref={(el) => (sparkRefs.current[i] = el)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: config.colors[i % config.colors.length],
            boxShadow: `0 0 8px ${config.glow}`,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
      ))}

      {/* Flame SVG */}
      <div ref={flameRef} style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>
        <svg width={flameSize} height={flameSize} viewBox="0 0 32 32">
          <defs>
            <radialGradient id={`flame-grad-${tier}`} cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor={config.colors[0]} />
              <stop offset="60%" stopColor={config.colors[1] || config.colors[0]} />
              <stop offset="100%" stopColor={config.colors[2] || config.colors[1] || config.colors[0]} stopOpacity="0.4" />
            </radialGradient>
          </defs>
          {streak === 0 ? (
            // Cold ember
            <circle cx="16" cy="22" r="6" fill={config.colors[0]} opacity="0.5" />
          ) : (
            <path
              d="M16 4 C20 10, 24 14, 22 20 C24 16, 26 18, 26 22 C26 27, 21 30, 16 30 C11 30, 6 27, 6 22 C6 18, 8 16, 10 20 C8 14, 12 10, 16 4 Z"
              fill={`url(#flame-grad-${tier})`}
            />
          )}
          {/* Inner highlight */}
          {streak > 0 && (
            <path
              d="M16 12 C18 16, 19 19, 17 22 C18 20, 20 21, 20 23 C20 26, 18 28, 16 28 C14 28, 12 26, 12 23 C12 21, 14 20, 15 22 C13 19, 14 16, 16 12 Z"
              fill="white"
              opacity="0.3"
            />
          )}
        </svg>
      </div>

      {showCount && (
        <div style={{
          fontSize: size === 'large' ? 22 : 15,
          fontWeight: 800,
          color: streak === 0 ? 'rgba(255,255,255,0.4)' : config.colors[0],
          fontFamily: 'var(--font-mono)',
          lineHeight: 1,
        }}>
          {streak}
        </div>
      )}
    </div>
  );
}
