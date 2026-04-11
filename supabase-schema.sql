-- ROOTS Interview App – Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Main table: one row per interview session
create table if not exists interviews (
  id uuid default gen_random_uuid() primary key,
  session_id text not null unique,
  kandidat text not null default '',
  interviewer text not null default '',
  datum text not null default '',
  runde text not null default 'erst',
  erst jsonb not null default '{}'::jsonb,
  zweit jsonb not null default '{}'::jsonb,
  recommendation text,
  weighted_overall numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast dashboard queries
create index if not exists idx_interviews_created on interviews (created_at desc);
create index if not exists idx_interviews_kandidat on interviews (kandidat);
create index if not exists idx_interviews_session on interviews (session_id);

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on interviews;
create trigger set_updated_at
  before update on interviews
  for each row execute function update_updated_at();

-- Enable Row Level Security (RLS) but allow all operations via anon key
-- (no user auth needed – the app is open for all interviewers)
alter table interviews enable row level security;

-- Policy: anyone with the anon key can read, insert, update, delete
create policy "Allow all access" on interviews
  for all
  using (true)
  with check (true);

-- Enable Realtime for the interviews table
alter publication supabase_realtime add table interviews;
