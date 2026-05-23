// ToastStack — floating notifications that slide in from the right
// Used for: coin gains, item drops, achievement unlocks
// GSAP-animated entry/exit, auto-dismiss after 4.5s

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGamification } from '../../context/GamificationContext';

function Toast({ toast, onDismiss }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { x: 400, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }
    );
  }, []);

  const handleDismiss = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 400,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => onDismiss(toast.id),
    });
  };

  let icon, title, subtitle, color;

  if (toast.type === 'coins') {
    icon = '🪙';
    title = `+${toast.amount}`;
    subtitle = toast.amount === 1 ? 'moeda!' : 'moedas!';
    color = '#FBBF24';
  } else if (toast.type === 'item') {
    icon = toast.item.icon || '🎁';
    title = toast.item.name;
    subtitle = toast.item.rarity === 'legendary' ? '✨ LENDÁRIO!' : toast.item.rarity === 'rare' ? '⭐ RARO!' : 'Novo item';
    color = {
      common: 'var(--color-rarity-common)',
      uncommon: 'var(--color-rarity-uncommon)',
      rare: 'var(--color-rarity-rare)',
      legendary: 'var(--color-rarity-legendary)',
    }[toast.item.rarity] || 'var(--color-rarity-common)';
  } else if (toast.type === 'achievement') {
    icon = toast.achievement.icon || '🏆';
    title = toast.achievement.name;
    subtitle = 'Conquista desbloqueada!';
    color = '#EC4899';
  } else if (toast.type === 'xp') {
    icon = '⚡';
    title = `+${toast.amount} XP`;
    subtitle = 'Continue assim!';
    color = '#7C5CFF';
  } else {
    icon = '✨';
    title = toast.title || 'Novidade';
    subtitle = toast.subtitle || '';
    color = '#7C5CFF';
  }

  return (
    <div
      ref={ref}
      className="toast"
      style={{ borderLeftColor: color }}
      onClick={handleDismiss}
      role="button"
    >
      <div className="toast-icon" style={{ background: `${color}22` }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
      </div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

export default function ToastStack() {
  const { toasts, dismissToast } = useGamification();

  if (!toasts.length) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
