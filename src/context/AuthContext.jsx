// AuthContext — user authentication + onboarding state
// Currently uses localStorage (drop-in replacement for Supabase later — same API surface).
// User shape: { id, email, name, ageGroup, experience, interests, motivation, timePerDay, recommendedTracks, createdAt, avatarUrl }

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const USER_KEY = 'codepath_current_user';
const USERS_KEY = 'codepath_users';        // "DB" of all users (local stub)
const ONBOARDING_KEY = 'codepath_onboarding_complete';

// Simple hash for passwords (NOT cryptographically secure — replace with bcrypt server-side later)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return btoa(String(hash) + '_' + str.length);
}

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); }
  catch { return {}; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem(USER_KEY)); }
    catch { return null; }
  });

  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  // Persist user
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ONBOARDING_KEY, String(onboardingComplete));
  }, [onboardingComplete]);

  const signUp = useCallback(async ({ email, password, name, onboardingData }) => {
    const users = loadUsers();
    if (users[email]) {
      return { error: 'Esse email já está cadastrado. Tente fazer login.' };
    }
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      email,
      passwordHash: simpleHash(password),
      name,
      ...onboardingData,
      createdAt: new Date().toISOString(),
      avatarUrl: null,
    };
    users[email] = newUser;
    saveUsers(users);
    // Strip password before setting as current user
    const { passwordHash, ...publicUser } = newUser;
    setUser(publicUser);
    // NOTE: don't mark onboarding complete here — OnboardingFlow shows the plan step first
    return { user: publicUser };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const users = loadUsers();
    const found = users[email];
    if (!found) return { error: 'Conta não encontrada. Quer criar uma?' };
    if (found.passwordHash !== simpleHash(password)) return { error: 'Senha incorreta.' };
    const { passwordHash, ...publicUser } = found;
    setUser(publicUser);
    // Returning users: skip the plan step, mark onboarding done
    setOnboardingComplete(true);
    return { user: publicUser };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setOnboardingComplete(false);
    // Don't wipe lessons progress on signOut — only wipe on explicit reset
  }, []);

  // Continue without account — anonymous user (still saves onboarding answers)
  const continueAsGuest = useCallback((onboardingData) => {
    const guestUser = {
      id: `guest_${Date.now()}`,
      email: null,
      name: onboardingData.name || 'Visitante',
      isGuest: true,
      ...onboardingData,
      createdAt: new Date().toISOString(),
      avatarUrl: null,
    };
    setUser(guestUser);
    // OnboardingFlow handles completeOnboarding() after showing plan
    return { user: guestUser };
  }, []);

  // Update profile (avatar, name, etc.)
  const updateUser = useCallback((updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      // Persist to "DB" if not guest
      if (!prev.isGuest && prev.email) {
        const users = loadUsers();
        if (users[prev.email]) {
          users[prev.email] = { ...users[prev.email], ...updates };
          saveUsers(users);
        }
      }
      return updated;
    });
  }, []);

  // Mark onboarding done without creating account (e.g. resumed user)
  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
  }, []);

  // Reset onboarding (re-trigger the flow)
  const resetOnboarding = useCallback(() => {
    setOnboardingComplete(false);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isGuest: user?.isGuest || false,
    onboardingComplete,
    signUp,
    signIn,
    signOut,
    continueAsGuest,
    updateUser,
    completeOnboarding,
    resetOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
