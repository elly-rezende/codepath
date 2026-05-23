import { useEffect, useRef } from 'react'
import { useApp } from './context/AppContext'
import { useGamification } from './context/GamificationContext'
import { useAuth } from './context/AuthContext'
import { applyTheme } from './data/themes'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Profile from './components/Profile'
import TrackView from './components/TrackView'
import HeroSection from './components/ui/HeroSection'
import Mascot from './components/gamification/Mascot'
import ToastStack from './components/gamification/ToastStack'
import ConfettiBurst from './components/gamification/ConfettiBurst'
import LootBox from './components/gamification/LootBox'
import AchievementModal from './components/gamification/AchievementModal'
import LevelUpModal from './components/gamification/LevelUpModal'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import MiniGameLauncher from './components/minigames/MiniGameLauncher'

function App() {
  const appState = useApp();
  const {
    currentView, setCurrentView,
    completedLessons, xp, streak, tracks, levels, getLevel,
  } = appState;
  const {
    mascotMood, mascotMessage, mascotVisible,
    setMascot, fireConfetti, addCoins, pushToast, play,
    triggerLootBox, triggerLevelUp, checkAchievements,
    setAgeGroup, triggerMiniGame,
  } = useGamification();
  const { onboardingComplete, user, completeOnboarding } = useAuth();

  const prevLessons = useRef(completedLessons.length);
  const prevXp = useRef(xp);
  const prevLevelName = useRef(null);
  const greeted = useRef(false);

  // Legacy user protection: if they already have progress from before onboarding existed,
  // skip onboarding silently (we don't want to interrupt existing users)
  useEffect(() => {
    if (!onboardingComplete && completedLessons.length > 0) {
      completeOnboarding();
    }
  }, [onboardingComplete, completedLessons.length, completeOnboarding]);

  // Restore the user's saved visual theme on every render
  // (covers initial load + theme changes from Profile)
  useEffect(() => {
    const themeId = user?.equipped?.theme || 'default';
    applyTheme(themeId);
  }, [user?.equipped?.theme]);

  // === ONBOARDING ===
  // Show the onboarding wizard on first launch, before anything else
  const handleOnboardingComplete = (plan) => {
    // Apply age group from onboarding to gamification context
    if (plan?.ageGroup) {
      setAgeGroup(plan.ageGroup);
    }
    // Jump straight to the user's recommended starting track
    if (plan?.firstTrackId && tracks?.length) {
      const recommendedTrack = tracks.find(t => t.id === plan.firstTrackId);
      if (recommendedTrack) {
        appState.setCurrentTrack(recommendedTrack);
        setCurrentView('track');
        return;
      }
    }
    setCurrentView('dashboard');
  };

  // Initialize prev level on first render
  useEffect(() => {
    if (prevLevelName.current === null) {
      prevLevelName.current = getLevel().name;
    }
  }, [getLevel]);

  // Greet on first dashboard entry per session
  useEffect(() => {
    if (currentView === 'dashboard' && !greeted.current && onboardingComplete) {
      greeted.current = true;
      setTimeout(() => setMascot('waving', user?.name ? `Oi, ${user.name}! Pronto pra codar?` : null, 4000), 600);
    }
  }, [currentView, setMascot, onboardingComplete, user]);

  // Detect lesson completion → celebrate + lootbox + coins
  useEffect(() => {
    if (completedLessons.length > prevLessons.current) {
      const newCount = completedLessons.length;
      prevLessons.current = newCount;

      setMascot('celebrating', null, 4500);
      fireConfetti();
      addCoins(10);
      pushToast({ type: 'xp', amount: xp - prevXp.current });
      play('allTestsPass');

      setTimeout(() => {
        if (newCount % 25 === 0) triggerLootBox('epic');
        else if (newCount % 10 === 0) triggerLootBox('rare');
        else if (newCount % 3 === 0) triggerLootBox('common');
      }, 1500);

      // 33% chance of a mini-game on lessons that don't already drop a loot box
      const dropsLoot = newCount % 3 === 0;
      if (!dropsLoot && Math.random() < 0.33) {
        setTimeout(() => triggerMiniGame(), 3000);
      }
    }
    prevXp.current = xp;
  }, [completedLessons.length, xp, setMascot, fireConfetti, addCoins, pushToast, play, triggerLootBox, triggerMiniGame]);

  // Detect level up
  useEffect(() => {
    const currentLevel = getLevel();
    if (prevLevelName.current && prevLevelName.current !== currentLevel.name) {
      const levelIndex = levels.findIndex(l => l.name === currentLevel.name);
      triggerLevelUp({
        levelNumber: levelIndex + 1,
        name: currentLevel.name,
        color: currentLevel.color,
        xp,
        message: `Você agora é ${currentLevel.name}! Continue codando, lenda!`,
      });
      setMascot('celebrating', `🎊 NÍVEL ${currentLevel.name.toUpperCase()}!`, 6000);
    }
    prevLevelName.current = currentLevel.name;
  }, [xp, getLevel, levels, triggerLevelUp, setMascot]);

  // Achievement detection
  useEffect(() => {
    const hour = new Date().getHours();
    const stateSnapshot = {
      completedLessons,
      xp,
      streak,
      failCounts: appState.failCounts,
      instantCorrectCounts: appState.instantCorrectCounts,
      studiedLate: hour >= 22 || hour < 2,
      studiedEarly: hour >= 5 && hour < 7,
    };
    checkAchievements(stateSnapshot, tracks);
  }, [completedLessons.length, xp, streak, checkAchievements, tracks, appState.failCounts, appState.instantCorrectCounts]);

  // ============================================================
  // RENDER
  // ============================================================

  // FIRST PRIORITY: if onboarding not complete, show the wizard
  if (!onboardingComplete) {
    return (
      <div className="app">
        <OnboardingFlow onComplete={handleOnboardingComplete} />
        <ToastStack />
        <ConfettiBurst />
      </div>
    );
  }

  // Normal app flow after onboarding
  const showMascot = mascotVisible && currentView !== 'landing';

  return (
    <div className="app">
      {currentView === 'landing' && <HeroSection onStart={() => setCurrentView('dashboard')} />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'lesson' && <LessonView />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'track' && <TrackView />}

      {/* Gamification overlays */}
      <ToastStack />
      <ConfettiBurst />
      <LootBox />
      <AchievementModal />
      <LevelUpModal />
      <MiniGameLauncher />
      {showMascot && (
        <Mascot
          mood={mascotMood}
          message={mascotMessage}
          position="fixed-bottom-right"
          size={84}
        />
      )}
    </div>
  );
}

export default App
