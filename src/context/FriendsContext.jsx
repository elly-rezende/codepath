// FriendsContext — friend system with unique invite codes
// Each user has a 6-char code (e.g. "BIT4K9"). Sharing the code lets others add them.
// Friend data stored in localStorage as cached snapshots (no real-time sync yet,
// but the API surface matches Supabase Realtime for future migration).
//
// Schema: user.friendCode (6 chars), user.friends = [{id, code, name, avatarUrl,
//          xp, streak, level, lastSeen, addedAt}]

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const FriendsContext = createContext(null);

// Generate a 6-char invite code from user id + random salt
function generateFriendCode(userId) {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit easily-confused chars
  let code = '';
  // Seeded by userId so the same user always gets the same code
  let seed = 0;
  for (let i = 0; i < userId.length; i++) {
    seed = (seed * 31 + userId.charCodeAt(i)) >>> 0;
  }
  for (let i = 0; i < 6; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    code += charset[seed % charset.length];
  }
  return code;
}

// Look up a user in the "DB" (localStorage codepath_users) by their friend code
function findUserByCode(code) {
  try {
    const users = JSON.parse(localStorage.getItem('codepath_users') || '{}');
    for (const userRecord of Object.values(users)) {
      if (generateFriendCode(userRecord.id) === code.toUpperCase()) {
        return userRecord;
      }
    }
  } catch (e) { /* ignore */ }
  return null;
}

export function FriendsProvider({ children }) {
  const { user, updateUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Ensure the current user has a friend code (generate if missing)
  useEffect(() => {
    if (user && !user.friendCode) {
      updateUser({ friendCode: generateFriendCode(user.id) });
    }
  }, [user, updateUser]);

  const friends = user?.friends || [];
  const friendCode = user?.friendCode || (user ? generateFriendCode(user.id) : '');

  // Add a friend by their invite code
  const addFriend = useCallback(async (code) => {
    if (!user) return { error: 'Faça login primeiro' };
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.length !== 6) return { error: 'Código precisa ter 6 letras' };
    if (cleanCode === friendCode) return { error: 'Esse é o seu próprio código!' };

    const friendUser = findUserByCode(cleanCode);
    if (!friendUser) return { error: 'Código não encontrado. Confere com seu amigo.' };

    // Already added?
    if (friends.some(f => f.id === friendUser.id)) {
      return { error: 'Vocês já são amigos!' };
    }

    const newFriend = {
      id: friendUser.id,
      code: cleanCode,
      name: friendUser.name,
      avatarUrl: friendUser.avatarUrl || null,
      xp: friendUser.xp || 0,
      streak: friendUser.streak || 0,
      addedAt: Date.now(),
      lastSeen: Date.now(),
    };

    updateUser({ friends: [...friends, newFriend] });
    return { friend: newFriend };
  }, [user, friends, friendCode, updateUser]);

  // Remove a friend
  const removeFriend = useCallback((friendId) => {
    if (!user) return;
    updateUser({ friends: friends.filter(f => f.id !== friendId) });
  }, [user, friends, updateUser]);

  // Refresh friend stats (read latest values from localStorage "DB")
  // In production this would be a Supabase query/realtime subscription
  const refreshFriends = useCallback(() => {
    if (!user || friends.length === 0) return;
    setRefreshing(true);
    try {
      const users = JSON.parse(localStorage.getItem('codepath_users') || '{}');
      const usersById = Object.values(users).reduce((acc, u) => { acc[u.id] = u; return acc; }, {});

      const updated = friends.map(f => {
        const latest = usersById[f.id];
        if (latest) {
          return {
            ...f,
            name: latest.name || f.name,
            avatarUrl: latest.avatarUrl || f.avatarUrl,
            xp: latest.xp || 0,
            streak: latest.streak || 0,
            lastSeen: Date.now(),
          };
        }
        return f;
      });
      updateUser({ friends: updated });
    } catch (e) { /* ignore */ }
    setTimeout(() => setRefreshing(false), 400);
  }, [user, friends, updateUser]);

  // Auto-refresh on mount
  useEffect(() => {
    if (user && friends.length > 0) {
      refreshFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Leaderboard: friends + you, sorted by XP descending
  const getLeaderboard = useCallback((selfXp, selfStreak) => {
    const all = [
      ...friends.map(f => ({ ...f, isSelf: false })),
      {
        id: user?.id || 'self',
        name: user?.name || 'Você',
        avatarUrl: user?.avatarUrl,
        xp: selfXp || 0,
        streak: selfStreak || 0,
        isSelf: true,
      },
    ];
    return all.sort((a, b) => b.xp - a.xp);
  }, [friends, user]);

  const value = {
    friendCode,
    friends,
    addFriend,
    removeFriend,
    refreshFriends,
    refreshing,
    getLeaderboard,
  };

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export function useFriends() {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error('useFriends must be used within FriendsProvider');
  return ctx;
}
