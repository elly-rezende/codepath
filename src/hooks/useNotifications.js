// useNotifications — local-only push notification system
// No server needed — schedules notifications via setTimeout/setInterval.
// In a future Supabase version, these become real push messages from the backend.
//
// Notification types:
//   - daily-reminder: "Hora de codar! 💻" at user's preferred study time
//   - streak-warning: "Não perde sua streak de {N} dias!" at 21:00 if no lesson today
//   - friend-levelup: "{friend} subiu de nível! Você tá perdendo terreno 👀"
//   - lesson-celebration: "Mandou bem! +{xp} XP ⚡" (in-foreground only)

import { useCallback, useEffect, useState } from 'react';

const PREFS_KEY = 'codepath_notification_prefs';
const LAST_DAILY_KEY = 'codepath_last_daily_notif';
const LAST_STREAK_KEY = 'codepath_last_streak_notif';

const DEFAULT_PREFS = {
  enabled: true,             // master toggle
  dailyReminder: true,       // "vamos codar?" once a day
  dailyTime: '19:00',        // 24h time (HH:MM)
  streakWarning: true,       // 21:00 warning if streak in danger
  friendActivity: true,      // friend levelups, achievements
  lessonCelebration: true,   // foreground celebrations (in-app)
};

function loadPrefs() {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const stored = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    return { ...DEFAULT_PREFS, ...stored };
  } catch { return DEFAULT_PREFS; }
}

function savePrefs(prefs) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

// Returns 'default' (not asked), 'granted', 'denied', or 'unsupported'
function getPermissionState() {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

// Show a notification right now (uses native API)
function showNotification(title, options = {}) {
  if (getPermissionState() !== 'granted') return null;
  try {
    const notif = new Notification(title, {
      icon: '/icon-192.svg',
      badge: '/icon-192.svg',
      lang: 'pt-BR',
      vibrate: [100, 50, 100],
      ...options,
    });
    return notif;
  } catch (e) {
    // Some browsers block direct Notification() outside of SW
    return null;
  }
}

// Returns ms until next occurrence of the given HH:MM today (or tomorrow if passed)
function msUntilTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

// Has the user already received a daily-reminder today?
function alreadySentToday(storageKey) {
  const last = localStorage.getItem(storageKey);
  if (!last) return false;
  const sentDate = new Date(parseInt(last, 10)).toDateString();
  return sentDate === new Date().toDateString();
}

export function useNotifications() {
  const [prefs, setPrefs] = useState(loadPrefs);
  const [permission, setPermission] = useState(getPermissionState);

  // Save prefs whenever they change
  useEffect(() => savePrefs(prefs), [prefs]);

  // Request permission from the user
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'unsupported';
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (e) {
      return 'denied';
    }
  }, []);

  // Update a preference
  const updatePref = useCallback((key, value) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  }, []);

  // === Notification senders (called by other parts of the app) ===

  // Daily study reminder
  const sendDailyReminder = useCallback(() => {
    if (!prefs.enabled || !prefs.dailyReminder) return;
    if (alreadySentToday(LAST_DAILY_KEY)) return;
    const messages = [
      { title: '🎯 Hora de codar!', body: 'O Bit tá esperando pra praticar com você.' },
      { title: '⚡ Bora aprender algo novo?', body: 'Só 10 minutos por dia já é mágico.' },
      { title: '💻 Tua próxima lição te chama!', body: 'Continua de onde parou.' },
      { title: '🚀 Bora subir de nível?', body: 'Faltam X XP pro próximo level.' },
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    showNotification(msg.title, { body: msg.body, tag: 'daily-reminder' });
    localStorage.setItem(LAST_DAILY_KEY, String(Date.now()));
  }, [prefs]);

  // Streak warning (sent if user hasn't studied today by 21:00)
  const sendStreakWarning = useCallback((currentStreak, lastActiveDate) => {
    if (!prefs.enabled || !prefs.streakWarning) return;
    if (!currentStreak || currentStreak === 0) return;
    if (alreadySentToday(LAST_STREAK_KEY)) return;
    const today = new Date().toISOString().split('T')[0];
    if (lastActiveDate === today) return; // already studied today

    showNotification(`🔥 Sua sequência de ${currentStreak} dias tá em perigo!`, {
      body: `Faz uma lição rapidinho pra não perder. Só falta hoje!`,
      tag: 'streak-warning',
      requireInteraction: true,
    });
    localStorage.setItem(LAST_STREAK_KEY, String(Date.now()));
  }, [prefs]);

  // Friend leveled up
  const sendFriendActivity = useCallback((friendName, eventType, detail) => {
    if (!prefs.enabled || !prefs.friendActivity) return;
    const presets = {
      levelup: {
        title: `🎊 ${friendName} subiu de nível!`,
        body: `Agora está como ${detail}. Você não vai ficar pra trás, né?`,
      },
      achievement: {
        title: `🏆 ${friendName} desbloqueou: ${detail}`,
        body: `Conquista nova! Você tem essa?`,
      },
      streak: {
        title: `🔥 ${friendName} tá em ${detail} dias seguidos!`,
        body: `Cuidado com a competição 👀`,
      },
    };
    const msg = presets[eventType] || { title: `🔔 ${friendName}`, body: detail };
    showNotification(msg.title, { body: msg.body, tag: `friend-${eventType}` });
  }, [prefs]);

  // === Schedule daily/streak notifications ===

  useEffect(() => {
    if (!prefs.enabled || permission !== 'granted') return;

    // Daily reminder scheduler
    const dailyTimer = setTimeout(() => {
      sendDailyReminder();
    }, msUntilTime(prefs.dailyTime));

    // Streak warning at 21:00
    const streakTimer = setTimeout(() => {
      // Read latest streak data from app state (via localStorage)
      try {
        const state = JSON.parse(localStorage.getItem('codepath_state') || '{}');
        sendStreakWarning(state.streak, state.lastActiveDate);
      } catch { /* ignore */ }
    }, msUntilTime('21:00'));

    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(streakTimer);
    };
  }, [prefs, permission, sendDailyReminder, sendStreakWarning]);

  return {
    permission,
    prefs,
    requestPermission,
    updatePref,
    sendDailyReminder,
    sendStreakWarning,
    sendFriendActivity,
    showNotification,
  };
}
