import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tracks, levels, badges } from '../data/curriculum';

const AppContext = createContext();

const STORAGE_KEY = 'codepath_state';

const defaultState = {
  completedLessons: [],
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  failCounts: {},
  instantCorrectCounts: {},
  lessonAttempts: {},
  earnedBadges: [],
  helpfulRatings: {},
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch (e) { /* ignore */ }
  return { ...defaultState };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      setState(prev => ({
        ...prev,
        streak: prev.lastActiveDate === yesterday ? prev.streak + 1 : (prev.lastActiveDate === today ? prev.streak : 1),
        lastActiveDate: today,
      }));
    }
  }, []);

  const completeLesson = useCallback((lessonId, xpEarned) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newCompleted = [...prev.completedLessons, lessonId];
      const newXP = prev.xp + xpEarned;

      // Check for new badges
      const newBadges = [...prev.earnedBadges];
      tracks.forEach(track => {
        const trackLessonIds = track.lessons.map(l => l.id);
        const allCompleted = trackLessonIds.every(id => newCompleted.includes(id));
        const badge = badges.find(b => b.trackId === track.id);
        if (allCompleted && badge && !newBadges.includes(badge.id)) {
          newBadges.push(badge.id);
        }
      });

      return {
        ...prev,
        completedLessons: newCompleted,
        xp: newXP,
        earnedBadges: newBadges,
      };
    });
  }, []);

  const recordFail = useCallback((lessonId) => {
    setState(prev => ({
      ...prev,
      failCounts: {
        ...prev.failCounts,
        [lessonId]: (prev.failCounts[lessonId] || 0) + 1,
      },
    }));
  }, []);

  const recordInstantCorrect = useCallback((lessonId) => {
    setState(prev => ({
      ...prev,
      instantCorrectCounts: {
        ...prev.instantCorrectCounts,
        [lessonId]: (prev.instantCorrectCounts[lessonId] || 0) + 1,
      },
    }));
  }, []);

  const rateHelpful = useCallback((lessonId, helpful) => {
    setState(prev => ({
      ...prev,
      helpfulRatings: { ...prev.helpfulRatings, [lessonId]: helpful },
    }));
  }, []);

  const getLevel = useCallback(() => {
    return levels.find(l => state.xp >= l.minXP && state.xp < l.maxXP) || levels[levels.length - 1];
  }, [state.xp]);

  const getTrackProgress = useCallback((trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return 0;
    const completed = track.lessons.filter(l => state.completedLessons.includes(l.id)).length;
    return Math.round((completed / track.lessons.length) * 100);
  }, [state.completedLessons]);

  const shouldSimplify = useCallback((lessonId) => {
    return (state.failCounts[lessonId] || 0) >= 2;
  }, [state.failCounts]);

  const shouldIncreaseDifficulty = useCallback((lessonId) => {
    return (state.instantCorrectCounts[lessonId] || 0) >= 3;
  }, [state.instantCorrectCounts]);

  const getNextLesson = useCallback(() => {
    for (const track of tracks) {
      for (const lesson of track.lessons) {
        if (!state.completedLessons.includes(lesson.id)) {
          return { track, lesson };
        }
      }
    }
    return null;
  }, [state.completedLessons]);

  const getWeakSpots = useCallback(() => {
    const weakSpots = [];
    const now = Date.now();
    tracks.forEach(track => {
      track.lessons.forEach(lesson => {
        if (state.completedLessons.includes(lesson.id)) {
          const fails = state.failCounts[lesson.id] || 0;
          if (fails >= 2) {
            weakSpots.push({ track, lesson, reason: 'Multiple failures' });
          }
        }
      });
    });
    return weakSpots;
  }, [state.completedLessons, state.failCounts]);

  const resetProgress = useCallback(() => {
    setState({ ...defaultState });
  }, []);

  const value = {
    ...state,
    tracks,
    levels,
    badges,
    currentView,
    setCurrentView,
    currentLesson,
    setCurrentLesson,
    currentTrack,
    setCurrentTrack,
    completeLesson,
    recordFail,
    recordInstantCorrect,
    rateHelpful,
    getLevel,
    getTrackProgress,
    shouldSimplify,
    shouldIncreaseDifficulty,
    getNextLesson,
    getWeakSpots,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
