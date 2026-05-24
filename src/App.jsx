import { useEffect, useRef, lazy, Suspense } from 'react'
import { useApp } from './context/AppContext'
import { useGamification } from './context/GamificationContext'
import { useAuth } from './context/AuthContext'
import { applyTheme } from './data/themes'
import { useNotifications } from './hooks/useNotifications'
import { useFriends } from './context/FriendsContext'
import { useQuests } from './context/QuestsContext'

// Eager imports — small, always shown, or critical
import Dashboard from './components/Dashboard'
import Mascot from './components/gamification/Mascot'
import ToastStack from './components/gamification/ToastStack'
import ConfettiBurst from './components/gamification/ConfettiBurst'
import InstallPrompt from './components/pwa/InstallPrompt'

// Lazy imports — only load when the user actually visits these views
// (cuts initial bundle by ~900KB by deferring Three.js + Profile dependencies)
const HeroSection = lazy(() => import('./components/ui/HeroSection'))    // Three.js
const LessonView = lazy(() => import('./components/LessonView'))
const Profile = lazy(() => import('./components/Profile'))               // 3D mascot
const TrackView = lazy(() => import('./components/TrackView'))
const OnboardingFlow = lazy(() => import('./components/onboarding/OnboardingFlow'))
const PricingPage = lazy(() => import('./components/pricing/PricingPage'))

// Modals — lazy because they only appear after user actions
const LootBox = lazy(() => import('./components/gamification/LootBox'))
const AchievementModal = lazy(() => import('./components/gamification/AchievementModal'))
const LevelUpModal = lazy(() => import('./components/gamification/LevelUpModal'))
const MiniGameLauncher = lazy(() => import('./components/minigames/MiniGameLauncher'))

// Fallback shown while lazy chunks load (briefly, 100-300ms typically)
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', color: 'var(--color-text-muted)',
      fontSize: 13, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{
        width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: 'var(--color-brand-primary)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

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
  const { friends } = useFriends();
  const { sendFriendActivity } = useNotifications(); // schedules daily + streak timers on mount
  const { trackLessonCompleted, trackXpEarned, trackStreakDay } = useQuests();

  // Cache previous friend XPs to detect when a friend levels up
  const prevFriendXps = useRef({});

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

  // Update streak quest progress whenever streak changes
  useEffect(() => {
    trackStreakDay(streak);
  }, [streak, trackStreakDay]);

  // Detect friend XP increases → fire "friend leveled up" notifications
  useEffect(() => {
    friends.forEach(f => {
      const prev = prevFriendXps.current[f.id];
      // First seen — just record, don't notify
      if (prev === undefined) {
        prevFriendXps.current[f.id] = f.xp;
        return;
      }
      // Significant XP jump (likely a level-up): send notification
      if (f.xp - prev >= 500) {
        sendFriendActivity(f.name, 'levelup', 'Intermediário');
      }
      prevFriendXps.current[f.id] = f.xp;
    });
  }, [friends, sendFriendActivity]);

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
      const xpGained = xp - prevXp.current;
      prevLessons.current = newCount;

      setMascot('celebrating', null, 4500);
      fireConfetti();
      addCoins(10);
      pushToast({ type: 'xp', amount: xpGained });
      play('allTestsPass');

      // Track for weekly quests
      // (trackId / wasPerfect unknown here without lesson context — pass undefined for trackId
      //  which only affects track-specific quests; generic lesson_count still increments)
      trackLessonCompleted(undefined, false);
      if (xpGained > 0) trackXpEarned(xpGained);

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
        <Suspense fallback={<LoadingScreen />}>
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </Suspense>
        <ToastStack />
        <ConfettiBurst />
      </div>
    );
  }

  // Normal app flow after onboarding
  const showMascot = mascotVisible && currentView !== 'landing';

  return (
    <div className="app">
      <Suspense fallback={<LoadingScreen />}>
        {currentView === 'landing' && <HeroSection onStart={() => setCurrentView('dashboard')} />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'lesson' && <LessonView />}
        {currentView === 'profile' && <Profile />}
        {currentView === 'track' && <TrackView />}
        {currentView === 'pricing' && <PricingPage />}
      </Suspense>

      {/* Gamification overlays — lazy modals wrapped in Suspense */}
      <ToastStack />
      <ConfettiBurst />
      <Suspense fallback={null}>
        <LootBox />
        <AchievementModal />
        <LevelUpModal />
        <MiniGameLauncher />
      </Suspense>
      <InstallPrompt />
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
