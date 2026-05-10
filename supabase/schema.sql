create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path text not null default 'addition',
  current_level int not null default 1,
  highest_unlocked_level int not null default 1,
  placement_completed boolean not null default false,
  placement_level int,
  completed_levels int[] not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id, path)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_attempt_id text not null,
  path text not null default 'addition',
  level int not null,
  skill_id text not null,
  score int not null,
  total int not null,
  duration_ms int,
  can_advance boolean not null default false,
  created_at timestamptz not null default now(),
  unique(user_id, client_attempt_id)
);

create table if not exists public.answer_logs (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question text not null,
  selected_answer int not null,
  correct_answer int not null,
  is_correct boolean not null,
  skill_id text,
  focus text,
  mistake_type text,
  duration_ms int
);

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.answer_logs enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can manage own progress" on public.user_progress;
drop policy if exists "Users can manage own attempts" on public.quiz_attempts;
drop policy if exists "Users can view own answer logs" on public.answer_logs;
drop policy if exists "Users can insert own answer logs" on public.answer_logs;

create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can manage own progress"
on public.user_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own attempts"
on public.quiz_attempts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can view own answer logs"
on public.answer_logs
for select
using (
  exists (
    select 1
    from public.quiz_attempts
    where quiz_attempts.id = answer_logs.attempt_id
      and quiz_attempts.user_id = auth.uid()
  )
);

create policy "Users can insert own answer logs"
on public.answer_logs
for insert
with check (
  exists (
    select 1
    from public.quiz_attempts
    where quiz_attempts.id = answer_logs.attempt_id
      and quiz_attempts.user_id = auth.uid()
  )
);
