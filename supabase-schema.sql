create extension if not exists pgcrypto;

create table if not exists public.app_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_state'
  ) then
    alter publication supabase_realtime add table public.app_state;
  end if;
end
$$;

alter table public.app_state enable row level security;

drop policy if exists "Users can read their own app_state" on public.app_state;
create policy "Users can read their own app_state"
on public.app_state
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own app_state" on public.app_state;
create policy "Users can insert their own app_state"
on public.app_state
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own app_state" on public.app_state;
create policy "Users can update their own app_state"
on public.app_state
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
