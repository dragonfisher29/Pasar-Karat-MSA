create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.marketplace_users (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null,
  phone_number text not null unique,
  password_hash text not null
);

create table if not exists public.marketplace_sessions (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references public.marketplace_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null
);

alter table public.marketplace_users enable row level security;
alter table public.marketplace_sessions enable row level security;

insert into public.marketplace_users (display_name, phone_number, password_hash)
values ('Imported seller', '600000000000', 'disabled')
on conflict (phone_number) do nothing;

alter table public.listings
  add column if not exists user_id uuid references public.marketplace_users(id) on delete cascade;

update public.listings
set user_id = (
  select id from public.marketplace_users where phone_number = '600000000000'
)
where user_id is null;

alter table public.listings
  alter column user_id set not null;

alter table public.listings
  drop column if exists seller_manage_code_hash;

drop function if exists public.get_seller_dashboard_listings(text, text);
drop function if exists public.mark_listing_sold(uuid, text, text);

drop policy if exists "Public can view approved available listings" on public.listings;
drop policy if exists "Public can create available listings" on public.listings;

create policy "Public can view approved available listings"
on public.listings
for select
using (status = 'available' and moderation_status = 'approved');
