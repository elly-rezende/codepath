-- ============================================================
-- CodePath — Supabase database schema
-- Run this entire file in the Supabase SQL Editor after creating your project.
--   Dashboard → SQL Editor → New query → paste this → Run.
-- ============================================================

-- ============================================================
-- 1. PROFILES — extends auth.users with app-specific fields
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text not null,
  age int not null check (age between 5 and 100),
  age_group text,                       -- 'kids' | 'tweens' | 'teens'
  avatar_url text,                      -- supabase storage path or external URL
  friend_code text unique not null,     -- 6-char unique invite code
  experience text,                      -- 'none' | 'beginner' | 'some' | 'experienced'
  interests text[] default '{}',        -- ['games','apps','websites',...]
  motivation text,
  time_per_day text,                    -- '10min' | '30min' | '1hour' | 'weekend'
  parental_email text,                  -- required if age <= 12
  parental_consent_at timestamptz,
  requires_parental_consent boolean default false,
  equipped jsonb default '{}',          -- { skin, accessory, frame, theme }
  recommended_tracks text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

-- ============================================================
-- 2. PROGRESS — XP, streak, completed lessons, etc.
-- ============================================================
create table if not exists public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp int default 0 not null check (xp >= 0),
  streak int default 0 not null check (streak >= 0),
  coins int default 0 not null check (coins >= 0),
  last_active_date date,
  completed_lessons text[] default '{}',
  fail_counts jsonb default '{}',
  instant_correct_counts jsonb default '{}',
  earned_badges text[] default '{}',
  unlocked_achievements text[] default '{}',
  updated_at timestamptz default now()
);

drop trigger if exists progress_updated_at on public.progress;
create trigger progress_updated_at before update on public.progress
for each row execute function public.set_updated_at();

-- ============================================================
-- 3. INVENTORY — items dropped from loot boxes / bought in shop
-- ============================================================
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,                -- e.g. 'skin-cyber', 'theme-sunset'
  acquired_at timestamptz default now(),
  source text,                          -- 'lootbox', 'shop', 'gift'
  -- Composite index for fast inventory lookups
  unique (user_id, id)
);
create index if not exists inventory_user_idx on public.inventory(user_id);

-- ============================================================
-- 4. FRIENDS — accepted friendships (bidirectional)
-- ============================================================
create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references auth.users(id) on delete cascade,
  user_b uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  -- A user can only be friends with someone once, regardless of direction
  unique (user_a, user_b),
  check (user_a < user_b)               -- enforce canonical ordering
);
create index if not exists friendships_a_idx on public.friendships(user_a);
create index if not exists friendships_b_idx on public.friendships(user_b);

-- Helper: returns the friend pair (always in canonical order)
create or replace function public.canonical_pair(a uuid, b uuid)
returns table(user_a uuid, user_b uuid) as $$
  select least(a, b), greatest(a, b);
$$ language sql immutable;

-- ============================================================
-- 5. NOTIFICATIONS — log of notifications sent to a user
-- ============================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,                   -- 'daily', 'streak', 'friend-levelup', etc.
  title text not null,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);
create index if not exists notifications_user_idx on public.notifications(user_id, read, created_at desc);

-- ============================================================
-- 6. AUTO-CREATE profile + progress on user signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
  generated_code text;
begin
  -- Generate a unique 6-char friend code (retry if collision)
  loop
    generated_code := upper(substring(md5(random()::text || new.id::text) from 1 for 6));
    exit when not exists (select 1 from public.profiles where friend_code = generated_code);
  end loop;

  -- Create profile row (will be filled in by onboarding flow)
  insert into public.profiles (id, email, name, age, friend_code)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'age')::int, 18),
    generated_code
  )
  on conflict (id) do nothing;

  -- Initialize progress row
  insert into public.progress (user_id) values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles      enable row level security;
alter table public.progress      enable row level security;
alter table public.inventory     enable row level security;
alter table public.friendships   enable row level security;
alter table public.notifications enable row level security;

-- === Profiles ===
-- Read: anyone can see public fields of any profile (for leaderboards/friend lookup)
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated using (true);

-- Update: only your own profile
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- === Progress ===
-- Read: your own, OR a friend's (limited fields handled in view)
drop policy if exists "progress_select" on public.progress;
create policy "progress_select" on public.progress
  for select to authenticated using (
    auth.uid() = user_id
    OR exists (
      select 1 from public.friendships f
      where (f.user_a = auth.uid() and f.user_b = user_id)
         or (f.user_b = auth.uid() and f.user_a = user_id)
    )
  );

-- Update / insert: only your own
drop policy if exists "progress_modify_own" on public.progress;
create policy "progress_modify_own" on public.progress
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- === Inventory ===
drop policy if exists "inventory_own" on public.inventory;
create policy "inventory_own" on public.inventory
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- === Friendships ===
-- Read: only ones you're part of
drop policy if exists "friendships_select" on public.friendships;
create policy "friendships_select" on public.friendships
  for select to authenticated using (
    auth.uid() = user_a OR auth.uid() = user_b
  );

-- Insert: only friendships including yourself
drop policy if exists "friendships_insert" on public.friendships;
create policy "friendships_insert" on public.friendships
  for insert to authenticated with check (
    auth.uid() = user_a OR auth.uid() = user_b
  );

-- Delete: only your own
drop policy if exists "friendships_delete" on public.friendships;
create policy "friendships_delete" on public.friendships
  for delete to authenticated using (
    auth.uid() = user_a OR auth.uid() = user_b
  );

-- === Notifications ===
drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own" on public.notifications
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- 8. STORAGE BUCKET for avatars
-- ============================================================
-- Run separately in Supabase Storage UI OR via the dashboard:
--   1. Storage → Create new bucket: name='avatars', public=true
--   2. Then run these policies:

-- (Uncomment after creating the bucket)
-- create policy "Avatar images are publicly accessible"
--   on storage.objects for select using (bucket_id = 'avatars');
-- create policy "Users can upload their own avatar"
--   on storage.objects for insert with check (
--     bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
--   );
-- create policy "Users can update their own avatar"
--   on storage.objects for update using (
--     bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- ============================================================
-- DONE!
-- ============================================================
-- After running this:
--   1. Go to Project Settings → API and copy your URL + anon key
--   2. Paste them into your .env file as:
--        VITE_SUPABASE_URL=https://xxxxx.supabase.co
--        VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
--   3. Restart the dev server. The app will automatically connect.
-- ============================================================
