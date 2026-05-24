// Supabase client — lazy-loaded singleton
// Reads credentials from Vite env (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY).
// If credentials are missing, the app falls back to localStorage mode.
//
// Usage:
//   import { supabase, isSupabaseEnabled } from '@/lib/supabase';
//   if (isSupabaseEnabled()) await supabase.from('profiles').select('*');
//   else { /* fallback to localStorage */ }

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let _client = null;

export function isSupabaseEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Returns the Supabase client singleton, or null if not configured.
 * Components and contexts should call this and gracefully fall back to
 * localStorage if it returns null.
 */
export function getSupabase() {
  if (!isSupabaseEnabled()) return null;
  if (_client) return _client;

  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true, // for OAuth callbacks (Google, GitHub)
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      storageKey: 'codepath_supabase_auth',
    },
    realtime: {
      params: {
        eventsPerSecond: 5, // rate-limit realtime to be polite
      },
    },
  });
  return _client;
}

// Convenience export — null in localStorage-only mode
export const supabase = getSupabase();

// Helper: returns the current authenticated user, or null if not signed in
export async function getCurrentUser() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.auth.getUser();
  if (error) return null;
  return data.user;
}

// Log diagnostic info on import (only in dev mode)
if (import.meta.env.DEV) {
  if (isSupabaseEnabled()) {
    console.info('🟢 Supabase: connected to', SUPABASE_URL);
  } else {
    console.info('🟡 Supabase: not configured — using localStorage fallback. See docs/SUPABASE-SETUP.md to enable cloud sync.');
  }
}
