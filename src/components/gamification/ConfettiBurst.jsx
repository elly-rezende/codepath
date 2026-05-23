// ConfettiBurst — fires confetti whenever the context triggers it
// Listens to confettiTrigger counter in GamificationContext
// Uses canvas-confetti for kid-friendly burst animations

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useGamification } from '../../context/GamificationContext';

const COLORS = ['#7C5CFF', '#10D9C4', '#F59E0B', '#EC4899', '#3B82F6', '#FBBF24'];

export default function ConfettiBurst() {
  const { confettiTrigger } = useGamification();
  const lastTrigger = useRef(0);

  useEffect(() => {
    if (confettiTrigger === 0 || confettiTrigger === lastTrigger.current) return;
    lastTrigger.current = confettiTrigger;

    // First burst — wide spread from center
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: COLORS,
      gravity: 0.8,
      ticks: 250,
    });

    // Side bursts after a moment for extra impact
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: COLORS,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: COLORS,
      });
    }, 200);
  }, [confettiTrigger]);

  return null;
}
