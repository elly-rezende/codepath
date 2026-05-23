// Lightweight sound system using Web Audio API
// No external audio files — synthesizes tones on demand
// Respects user preference (toggle on/off, stored in localStorage)

import { useCallback, useRef, useEffect, useState } from 'react';

const STORAGE_KEY = 'codepath_sound_enabled';

let _ctx = null;
function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  return _ctx;
}

// Plays a single tone with envelope shaping for natural sound
function tone(freq, duration = 0.15, type = 'sine', volume = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  // ADSR envelope: quick attack, decay, sustain, release
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

// Plays a sequence of notes (a "melody")
function melody(notes, baseDur = 0.12, type = 'sine', volume = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  notes.forEach(([freq, delayMs, dur], i) => {
    setTimeout(() => tone(freq, dur || baseDur, type, volume), delayMs);
  });
}

// Predefined sound effects — designed to feel kid-friendly + game-like
const SOUNDS = {
  // UI feedback
  click: () => tone(800, 0.05, 'sine', 0.08),
  hover: () => tone(600, 0.03, 'sine', 0.05),

  // Quiz / answer feedback
  correct: () => melody([[523, 0], [659, 80], [784, 160]], 0.12, 'sine', 0.18), // C-E-G major triad
  wrong: () => melody([[330, 0], [277, 100]], 0.18, 'sawtooth', 0.12), // E down to C# (sad)

  // Coding tests
  testPass: () => tone(880, 0.1, 'sine', 0.15),
  testFail: () => tone(220, 0.15, 'square', 0.1),
  allTestsPass: () => melody([[523, 0], [659, 80], [784, 160], [1047, 280], [1319, 400]], 0.12, 'sine', 0.2),

  // Progression / rewards
  xpGain: () => melody([[523, 0], [659, 60], [784, 120]], 0.08, 'triangle', 0.15),
  levelUp: () => melody([[523, 0], [659, 100], [784, 200], [1047, 350], [1319, 500], [1568, 650]], 0.15, 'square', 0.18),
  streakUp: () => melody([[659, 0], [784, 80], [988, 160], [1175, 240]], 0.1, 'sine', 0.18),
  badge: () => melody([[784, 0], [1047, 100], [1319, 200], [1568, 350]], 0.15, 'triangle', 0.2),

  // Loot box / treasure
  chestOpen: () => melody([[392, 0], [523, 100], [659, 200], [784, 300], [1047, 400]], 0.14, 'sine', 0.2),
  rare: () => melody([[1319, 0], [1568, 100], [1976, 200], [2349, 350]], 0.18, 'sine', 0.22),

  // Mascot reactions
  mascotHappy: () => melody([[698, 0], [784, 60], [880, 120]], 0.08, 'sine', 0.12),
  mascotSad: () => melody([[440, 0], [392, 100], [349, 200]], 0.15, 'sine', 0.1),
  mascotWave: () => melody([[523, 0], [784, 100]], 0.08, 'sine', 0.1),

  // Page transitions
  swipe: () => tone(900, 0.08, 'sine', 0.06),
  pop: () => tone(700, 0.06, 'triangle', 0.1),
};

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    }
  }, [enabled]);

  const play = useCallback((soundName) => {
    if (!enabled) return;
    const fn = SOUNDS[soundName];
    if (fn) {
      try { fn(); } catch (e) { /* sound failures are non-fatal */ }
    }
  }, [enabled]);

  const toggle = useCallback(() => setEnabled(e => !e), []);

  return { play, enabled, toggle };
}

// Direct play function for non-component contexts
export function playSound(soundName) {
  if (typeof window === 'undefined') return;
  const enabled = localStorage.getItem(STORAGE_KEY);
  if (enabled === 'false') return;
  const fn = SOUNDS[soundName];
  if (fn) {
    try { fn(); } catch (e) { /* fail silently */ }
  }
}
