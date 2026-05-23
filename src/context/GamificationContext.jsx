// GamificationContext — global state for the kid/teen gamification layer
// Orchestrates mascot mood, sound preference, achievements, rewards, etc.
// Persists user-facing preferences (sound on/off, age group) in localStorage.

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { findNewlyEarned } from '../data/achievements';

const GamificationContext = createContext(null);

const AGE_GROUP_KEY = 'codepath_age_group';
const COINS_KEY = 'codepath_coins';
const ACHIEVEMENTS_KEY = 'codepath_achievements';
const INVENTORY_KEY = 'codepath_inventory';

// Age groups affect visual style, vocabulary, exemplo references
export const AGE_GROUPS = {
  KIDS: 'kids',          // 8-12: Minecraft/Roblox examples, more visual, simpler vocab
  TWEENS: 'tweens',      // 13-15: TikTok/Instagram/games, blend of fun + real
  TEENS: 'teens',        // 16-17: Real projects, apps, more mature aesthetic
  AUTO: 'auto',          // Adaptive — detect from onboarding answers
};

export function GamificationProvider({ children }) {
  // Mascot state
  const [mascotMood, setMascotMood] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState(null);
  const [mascotVisible, setMascotVisible] = useState(true);

  // Sound
  const { play, enabled: soundEnabled, toggle: toggleSound } = useSoundEffects();

  // Currency (gold coins earned alongside XP — spendable in shop)
  const [coins, setCoins] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(COINS_KEY) || '0', 10);
  });

  // Inventory (items collected from loot boxes)
  const [inventory, setInventory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(INVENTORY_KEY) || '[]'); } catch { return []; }
  });

  // Unlocked achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]'); } catch { return []; }
  });

  // Age group (set via onboarding)
  const [ageGroup, setAgeGroup] = useState(() => {
    if (typeof window === 'undefined') return AGE_GROUPS.AUTO;
    return localStorage.getItem(AGE_GROUP_KEY) || AGE_GROUPS.AUTO;
  });

  // Active toast / floating notification queue
  const [toasts, setToasts] = useState([]);

  // Pending loot box (shown after lesson completion)
  const [pendingLootBox, setPendingLootBox] = useState(null);

  // Level up modal
  const [levelUpData, setLevelUpData] = useState(null);

  // Confetti trigger
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // Pending mini-game (shown between lessons)
  const [pendingMiniGame, setPendingMiniGame] = useState(null);

  // Persist state
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(COINS_KEY, String(coins));
  }, [coins]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  }, [inventory]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(AGE_GROUP_KEY, ageGroup);
  }, [ageGroup]);

  // === Mascot control ===
  const setMascot = useCallback((mood, message = null, durationMs = 4000) => {
    setMascotMood(mood);
    setMascotMessage(message);
    if (durationMs && mood !== 'idle') {
      setTimeout(() => {
        setMascotMood('idle');
        setMascotMessage(null);
      }, durationMs);
    }
  }, []);

  // === Coins ===
  const addCoins = useCallback((amount) => {
    setCoins(c => c + amount);
    play('xpGain');
    pushToast({ type: 'coins', amount });
  }, [play]);

  const spendCoins = useCallback((amount) => {
    setCoins(c => Math.max(0, c - amount));
  }, []);

  // === Inventory ===
  const addItem = useCallback((item) => {
    setInventory(inv => [...inv, { ...item, acquiredAt: Date.now() }]);
    play(item.rarity === 'rare' || item.rarity === 'legendary' ? 'rare' : 'chestOpen');
    pushToast({ type: 'item', item });
  }, [play]);

  // === Achievements ===
  const unlockAchievement = useCallback((achievement) => {
    if (unlockedAchievements.includes(achievement.id)) return false;
    setUnlockedAchievements(prev => [...prev, achievement.id]);
    // Queue a full-screen achievement modal (handled by AchievementModal component)
    if (typeof window !== 'undefined' && window.__codepathAchievementQueue) {
      window.__codepathAchievementQueue(achievement);
    }
    // Grant rewards
    if (achievement.coinReward) setCoins(c => c + achievement.coinReward);
    return true;
  }, [unlockedAchievements]);

  // Check and unlock all newly-earned achievements based on app state
  const checkAchievements = useCallback((appState, tracks) => {
    const stateWithInventory = { ...appState, inventoryCount: inventory.length };
    const newly = findNewlyEarned(stateWithInventory, unlockedAchievements, tracks);
    newly.forEach(a => unlockAchievement(a));
    return newly;
  }, [unlockedAchievements, inventory.length, unlockAchievement]);

  // === Toasts ===
  const pushToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // === Loot Box ===
  const triggerLootBox = useCallback((tier = 'common') => {
    setPendingLootBox({ tier, opened: false });
  }, []);

  const closeLootBox = useCallback(() => setPendingLootBox(null), []);

  // === Level Up ===
  const triggerLevelUp = useCallback((data) => {
    setLevelUpData(data);
    play('levelUp');
    setConfettiTrigger(t => t + 1);
  }, [play]);

  const closeLevelUp = useCallback(() => setLevelUpData(null), []);

  // === Confetti ===
  const fireConfetti = useCallback(() => setConfettiTrigger(t => t + 1), []);

  // === Mini-games ===
  const triggerMiniGame = useCallback(() => {
    setPendingMiniGame({ openedAt: Date.now() });
  }, []);
  const closeMiniGame = useCallback(() => setPendingMiniGame(null), []);

  const value = {
    // Mascot
    mascotMood,
    mascotMessage,
    mascotVisible,
    setMascot,
    setMascotVisible,

    // Sound
    play,
    soundEnabled,
    toggleSound,

    // Currency
    coins,
    addCoins,
    spendCoins,

    // Inventory
    inventory,
    addItem,

    // Achievements
    unlockedAchievements,
    unlockAchievement,
    checkAchievements,

    // Age group
    ageGroup,
    setAgeGroup,

    // Toasts
    toasts,
    pushToast,
    dismissToast,

    // Loot box
    pendingLootBox,
    triggerLootBox,
    closeLootBox,

    // Level up
    levelUpData,
    triggerLevelUp,
    closeLevelUp,

    // Confetti
    confettiTrigger,
    fireConfetti,

    // Mini-games
    pendingMiniGame,
    triggerMiniGame,
    closeMiniGame,
  };

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}
