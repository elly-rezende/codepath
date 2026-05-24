// QuestsContext — tracks weekly quest progress
// State shape:
//   weekStart: timestamp of current week's Monday
//   progress: { [questId]: { count, claimed, completed } }
//
// Resets every Monday (replaces progress with fresh tracking)

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useGamification } from './GamificationContext';
import { getWeeklyQuests, getWeekStart } from '../data/quests';

const QuestsContext = createContext(null);
const STORAGE_KEY = 'codepath_quest_progress';

function loadState() {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
  catch { return null; }
}

function saveState(state) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function QuestsProvider({ children }) {
  const { user } = useAuth();
  const { addCoins, addItem, fireConfetti, pushToast, play, triggerLootBox } = useGamification();

  // Lazy init from localStorage
  const [questState, setQuestState] = useState(() => {
    const stored = loadState();
    const currentWeek = getWeekStart();
    if (!stored || stored.weekStart !== currentWeek) {
      return { weekStart: currentWeek, progress: {} };
    }
    return stored;
  });

  // Persist on change
  useEffect(() => { saveState(questState); }, [questState]);

  // This week's quest list (derived from user.id + current week)
  const weeklyQuests = useMemo(
    () => getWeeklyQuests(user?.id || 'guest'),
    [user?.id, questState.weekStart]
  );

  // Reset progress at week boundary
  useEffect(() => {
    const currentWeek = getWeekStart();
    if (questState.weekStart !== currentWeek) {
      setQuestState({ weekStart: currentWeek, progress: {} });
    }
  }, [questState.weekStart]);

  // === Progress tracking API ===
  // Called by the rest of the app whenever a relevant event happens.

  const incrementProgress = useCallback((questIdOrPredicate, amount = 1) => {
    setQuestState(prev => {
      const newProgress = { ...prev.progress };
      weeklyQuests.forEach(quest => {
        // Allow caller to pass either a quest ID or a predicate matching the quest
        const matches = typeof questIdOrPredicate === 'function'
          ? questIdOrPredicate(quest)
          : quest.id === questIdOrPredicate;
        if (!matches) return;
        const current = newProgress[quest.id] || { count: 0, claimed: false, completed: false };
        const newCount = Math.min(quest.target, current.count + amount);
        const justCompleted = !current.completed && newCount >= quest.target;
        newProgress[quest.id] = {
          count: newCount,
          claimed: current.claimed,
          completed: justCompleted || current.completed,
        };
      });
      return { ...prev, progress: newProgress };
    });
  }, [weeklyQuests]);

  // Public event helpers (called by other contexts/components)
  const trackLessonCompleted = useCallback((trackId, wasPerfect) => {
    // Generic count
    incrementProgress(q => q.type === 'lesson_count');
    // Track-specific count
    incrementProgress(q => q.type === 'track_lesson_count' && q.trackId === trackId);
    // Perfect lesson count
    if (wasPerfect) {
      incrementProgress(q => q.type === 'perfect_lesson');
    }
  }, [incrementProgress]);

  const trackXpEarned = useCallback((amount) => {
    incrementProgress(q => q.type === 'xp_total', amount);
  }, [incrementProgress]);

  const trackMinigamePlayed = useCallback((gameId) => {
    incrementProgress(q => q.type === 'minigame_count');
    incrementProgress(q => q.type === 'minigame_specific' && q.gameId === gameId);
  }, [incrementProgress]);

  const trackStreakDay = useCallback((currentStreak) => {
    // Set the streak count directly (not incremental)
    setQuestState(prev => {
      const newProgress = { ...prev.progress };
      weeklyQuests.forEach(quest => {
        if (quest.type !== 'streak') return;
        const current = newProgress[quest.id] || { count: 0, claimed: false, completed: false };
        const newCount = Math.min(quest.target, Math.max(current.count, currentStreak));
        newProgress[quest.id] = {
          count: newCount,
          claimed: current.claimed,
          completed: newCount >= quest.target,
        };
      });
      return { ...prev, progress: newProgress };
    });
  }, [weeklyQuests]);

  const trackCoinsSpent = useCallback((amount) => {
    incrementProgress(q => q.type === 'coins_spend', amount);
  }, [incrementProgress]);

  const trackFriendAdded = useCallback(() => {
    incrementProgress(q => q.type === 'friend');
  }, [incrementProgress]);

  // === Claim rewards ===
  const claimQuest = useCallback((quest) => {
    const status = questState.progress[quest.id];
    if (!status || !status.completed || status.claimed) return false;

    // Grant rewards
    if (quest.reward.coins) addCoins(quest.reward.coins);
    if (quest.reward.xp) {
      pushToast({ type: 'xp', amount: quest.reward.xp });
      // (XP is added to the user's total elsewhere — by AppContext)
      // For now just toast; the quest XP boost is a bonus on top
    }
    if (quest.reward.lootTier) {
      setTimeout(() => triggerLootBox(quest.reward.lootTier), 800);
    }

    fireConfetti();
    play('badge');
    pushToast({
      title: `🎁 ${quest.title} concluída!`,
      subtitle: `Recompensa: ${quest.reward.coins} 🪙${quest.reward.xp ? ` + ${quest.reward.xp} XP` : ''}`,
    });

    setQuestState(prev => ({
      ...prev,
      progress: { ...prev.progress, [quest.id]: { ...status, claimed: true } },
    }));
    return true;
  }, [questState, addCoins, pushToast, fireConfetti, play, triggerLootBox]);

  // Stats
  const stats = useMemo(() => {
    const total = weeklyQuests.length;
    const completed = weeklyQuests.filter(q => questState.progress[q.id]?.completed).length;
    const claimed = weeklyQuests.filter(q => questState.progress[q.id]?.claimed).length;
    return { total, completed, claimed, allDone: claimed === total };
  }, [weeklyQuests, questState]);

  const value = {
    weeklyQuests,
    questState,
    stats,
    trackLessonCompleted,
    trackXpEarned,
    trackMinigamePlayed,
    trackStreakDay,
    trackCoinsSpent,
    trackFriendAdded,
    claimQuest,
  };

  return <QuestsContext.Provider value={value}>{children}</QuestsContext.Provider>;
}

export function useQuests() {
  const ctx = useContext(QuestsContext);
  if (!ctx) throw new Error('useQuests must be used within QuestsProvider');
  return ctx;
}
