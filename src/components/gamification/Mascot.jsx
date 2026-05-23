// Bit — the CodePath mascot
// A friendly robot character that reacts to user progress.
// Pure SVG + GSAP animations — no external assets needed.
// Modes: idle (default), happy, sad, celebrating, sleeping, thinking, waving

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useAuth } from '../../context/AuthContext';
import { cssVar, lightenColor } from '../../utils/theme';

// Skin overrides — when the user equips a skin item, the mascot's idle color changes
const SKIN_COLOR_MAP = {
  'skin-cyber':  '#7C5CFF', // Default purple (cyberpunk)
  'skin-aqua':   '#06B6D4', // Ocean blue
  'skin-fire':   '#EF4444', // Flame red
  'skin-mint':   '#10D9C4', // Mint green
  'skin-galaxy': '#A855F7', // Galaxy purple
  'skin-golden': '#F59E0B', // Golden
  'skin-holo':   '#EC4899', // Holographic pink
};

// Build mood colors at render-time so they reflect the current design tokens
// AND the user's equipped skin. When user edits tokens or equips a new skin,
// the mascot updates live.
function getMoodColors(equippedSkin) {
  const brand = SKIN_COLOR_MAP[equippedSkin] || cssVar('--color-brand-primary', '#7C5CFF');
  const teal  = cssVar('--color-brand-secondary', '#10D9C4');
  const pink  = cssVar('--color-brand-accent', '#EC4899');
  const amber = cssVar('--color-semantic-warning', '#F59E0B');

  return {
    idle:        { body: brand,     accent: lightenColor(brand, 20), eye: '#FFFFFF', pupil: '#1A1B2E' },
    happy:       { body: teal,      accent: lightenColor(teal, 20),  eye: '#FFFFFF', pupil: '#1A1B2E' },
    sad:         { body: '#6B7280', accent: '#9CA3AF',               eye: '#FFFFFF', pupil: '#1A1B2E' },
    celebrating: { body: amber,     accent: lightenColor(amber, 20), eye: '#FFFFFF', pupil: '#1A1B2E' },
    sleeping:    { body: '#475569', accent: '#64748B',               eye: '#1A1B2E', pupil: '#1A1B2E' },
    thinking:    { body: '#3B82F6', accent: '#60A5FA',               eye: '#FFFFFF', pupil: '#1A1B2E' },
    waving:      { body: pink,      accent: lightenColor(pink, 20),  eye: '#FFFFFF', pupil: '#1A1B2E' },
  };
}

// Accessory overlays — small SVG decorations rendered on top of the mascot
const ACCESSORY_OVERLAYS = {
  'acc-cap':        { emoji: '🧢', x: 50, y: 12, size: 26, rotation: -15 },
  'acc-glasses':    { emoji: '🕶️', x: 50, y: 46, size: 30, rotation: 0 },
  'acc-headphones': { emoji: '🎧', x: 50, y: 25, size: 36, rotation: 0 },
  'acc-crown':      { emoji: '👑', x: 50, y: 6,  size: 28, rotation: 0 },
  'acc-wizard':     { emoji: '🧙', x: 50, y: 4,  size: 30, rotation: -10 },
  'acc-wings':      { emoji: '👼', x: 50, y: 50, size: 100, rotation: 0 },
  'acc-cape':       { emoji: '🦸', x: 50, y: 55, size: 60, rotation: 0 },
};

const MOOD_MESSAGES = {
  idle: ['Oi! Pronto pra codar?', 'Vamos aprender algo legal hoje!', 'Eu sou o Bit, seu parceiro de código 🤖', 'Curte uma lição?'],
  happy: ['Mandou bem! 🎉', 'Você é demais!', 'Continua assim!', 'Que orgulho!'],
  sad: ['Não desiste!', 'Cada erro te ensina algo', 'Vamos tentar de novo?', 'Eu acredito em você'],
  celebrating: ['INCRÍVEL!! 🎊', 'VOCÊ É UM GÊNIO!', 'AEEEE!! 🚀', 'VOCÊ ARRASOU!'],
  sleeping: ['Zzz... cadê você?', 'Volta logo!', 'Tô com saudade...'],
  thinking: ['Hmm, deixa eu pensar...', 'Posso te dar uma dica?', 'Tá difícil? Eu te ajudo'],
  waving: ['Oiii! 👋', 'Bem-vindo de volta!', 'Que bom te ver!'],
};

export default function Mascot({
  mood = 'idle',
  message,           // optional override
  size = 80,
  position = 'fixed-bottom-right',  // 'fixed-bottom-right' | 'inline' | 'fixed-bottom-left'
  showBubble = true,
  onClick,
}) {
  const containerRef = useRef(null);
  const bodyRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const antennaRef = useRef(null);
  const bubbleRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const { play } = useSoundEffects();
  const { user } = useAuth();

  // Read user's equipped skin + accessory so the mascot reflects customization
  const equipped = user?.equipped || {};
  const equippedSkin = equipped['mascot-skin'];
  const equippedAccessory = equipped['mascot-accessory'];

  // Re-read tokens on each render so live token updates reflect immediately
  const moodColors = getMoodColors(equippedSkin);
  const colors = moodColors[mood] || moodColors.idle;
  const accessoryConfig = equippedAccessory ? ACCESSORY_OVERLAYS[equippedAccessory] : null;

  // Update message when mood changes
  useEffect(() => {
    const messages = MOOD_MESSAGES[mood] || MOOD_MESSAGES.idle;
    const next = message || messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(next);
    if (showBubble) {
      setBubbleVisible(true);
      const timer = setTimeout(() => setBubbleVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [mood, message, showBubble]);

  // Idle breathing animation (always running)
  useEffect(() => {
    if (!bodyRef.current) return;
    const tl = gsap.to(bodyRef.current, {
      scaleY: 0.96,
      transformOrigin: 'bottom center',
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    return () => tl.kill();
  }, []);

  // Antenna wobble
  useEffect(() => {
    if (!antennaRef.current) return;
    const tl = gsap.to(antennaRef.current, {
      rotation: 8,
      transformOrigin: 'bottom center',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    return () => tl.kill();
  }, []);

  // Blinking
  useEffect(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;
    const blink = () => {
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        scaleY: 0.1,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Mood-specific animations
  useEffect(() => {
    if (mood === 'celebrating' && containerRef.current) {
      const tl = gsap.timeline();
      tl.to(containerRef.current, { y: -20, duration: 0.3, ease: 'power2.out' })
        .to(containerRef.current, { y: 0, duration: 0.4, ease: 'bounce.out' })
        .to(containerRef.current, { rotation: 10, duration: 0.15 })
        .to(containerRef.current, { rotation: -10, duration: 0.3 })
        .to(containerRef.current, { rotation: 0, duration: 0.15 });
      play('mascotHappy');
    } else if (mood === 'happy' && containerRef.current) {
      gsap.fromTo(containerRef.current, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
      play('mascotHappy');
    } else if (mood === 'sad' && containerRef.current) {
      gsap.to(containerRef.current, { y: 5, duration: 0.6, ease: 'power2.inOut', yoyo: true, repeat: 1 });
      play('mascotSad');
    } else if (mood === 'waving' && armRightRef.current) {
      const tl = gsap.timeline();
      tl.to(armRightRef.current, { rotation: -45, transformOrigin: 'top left', duration: 0.2 })
        .to(armRightRef.current, { rotation: -25, duration: 0.2 })
        .to(armRightRef.current, { rotation: -45, duration: 0.2 })
        .to(armRightRef.current, { rotation: 0, duration: 0.3 });
      play('mascotWave');
    } else if (mood === 'thinking' && containerRef.current) {
      gsap.to(containerRef.current, { rotation: -5, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 2 });
    }
  }, [mood, play]);

  const handleClick = () => {
    play('pop');
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' });
    }
    // Show random message
    const messages = MOOD_MESSAGES[mood] || MOOD_MESSAGES.idle;
    setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    setBubbleVisible(true);
    setTimeout(() => setBubbleVisible(false), 3500);
    if (onClick) onClick();
  };

  const positionClass = {
    'fixed-bottom-right': 'mascot-fixed-br',
    'fixed-bottom-left': 'mascot-fixed-bl',
    'inline': 'mascot-inline',
  }[position];

  return (
    <div ref={containerRef} className={`mascot ${positionClass}`} onClick={handleClick} role="button" tabIndex={0} aria-label={`Mascote Bit - ${mood}`}>
      {bubbleVisible && currentMessage && (
        <div ref={bubbleRef} className="mascot-bubble">
          {currentMessage}
        </div>
      )}
      <svg width={size} height={size * 1.1} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        {/* Antenna */}
        <g ref={antennaRef} transform="translate(50, 15)">
          <line x1="0" y1="0" x2="0" y2="-10" stroke={colors.body} strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-12" r="3" fill={colors.accent} />
        </g>

        {/* Left arm */}
        <g ref={armLeftRef}>
          <rect x="12" y="50" width="8" height="20" rx="4" fill={colors.body} />
          <circle cx="16" cy="72" r="5" fill={colors.accent} />
        </g>

        {/* Right arm */}
        <g ref={armRightRef}>
          <rect x="80" y="50" width="8" height="20" rx="4" fill={colors.body} />
          <circle cx="84" cy="72" r="5" fill={colors.accent} />
        </g>

        {/* Body / Head (rounded rectangle) */}
        <g ref={bodyRef}>
          <rect x="20" y="20" width="60" height="60" rx="14" fill={colors.body} />
          {/* Screen face */}
          <rect x="28" y="32" width="44" height="32" rx="6" fill={colors.pupil} />

          {/* Eyes */}
          <circle ref={leftEyeRef} cx="40" cy="46" r="5" fill={colors.eye} />
          <circle ref={rightEyeRef} cx="60" cy="46" r="5" fill={colors.eye} />
          {mood !== 'sleeping' && (
            <>
              <circle cx="40" cy="47" r="1.5" fill={colors.pupil} />
              <circle cx="60" cy="47" r="1.5" fill={colors.pupil} />
            </>
          )}

          {/* Mouth based on mood */}
          {mood === 'happy' || mood === 'celebrating' || mood === 'waving' ? (
            <path d="M 42 56 Q 50 62 58 56" stroke={colors.eye} strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : mood === 'sad' ? (
            <path d="M 42 60 Q 50 54 58 60" stroke={colors.eye} strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : mood === 'thinking' ? (
            <circle cx="50" cy="58" r="2" fill={colors.eye} />
          ) : (
            <line x1="44" y1="58" x2="56" y2="58" stroke={colors.eye} strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Cheek glows when happy */}
          {(mood === 'happy' || mood === 'celebrating') && (
            <>
              <circle cx="32" cy="54" r="3" fill="#FF6B9D" opacity="0.5" />
              <circle cx="68" cy="54" r="3" fill="#FF6B9D" opacity="0.5" />
            </>
          )}
        </g>

        {/* Legs */}
        <rect x="35" y="82" width="8" height="14" rx="3" fill={colors.body} />
        <rect x="57" y="82" width="8" height="14" rx="3" fill={colors.body} />
        <ellipse cx="39" cy="98" rx="7" ry="3" fill={colors.accent} />
        <ellipse cx="61" cy="98" rx="7" ry="3" fill={colors.accent} />

        {/* Equipped accessory overlay (cap, glasses, crown, etc.) */}
        {accessoryConfig && (
          <text
            x={accessoryConfig.x}
            y={accessoryConfig.y + accessoryConfig.size * 0.7}
            fontSize={accessoryConfig.size}
            textAnchor="middle"
            transform={accessoryConfig.rotation ? `rotate(${accessoryConfig.rotation} ${accessoryConfig.x} ${accessoryConfig.y})` : undefined}
            style={{ userSelect: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
          >
            {accessoryConfig.emoji}
          </text>
        )}
      </svg>
    </div>
  );
}
