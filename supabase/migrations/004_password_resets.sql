create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.marketplace_password_resets (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references public.marketplace_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_ip text
);

create index if not exists marketplace_password_resets_user_id_idx
  on public.marketplace_password_resets(user_id);

create index if not exists marketplace_password_resets_expires_at_idx
  on public.marketplace_password_resets(expires_at);

alter table public.marketplace_password_resets enable row level security;
