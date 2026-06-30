create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.listings (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  description text not null,
  price numeric not null check (price > 0),
  condition text not null,
  rating integer not null check (rating between 1 and 5),
  payment_method text not null,
  image_url text not null,
  status text not null default 'available'
);

alter table public.listings enable row level security;

create policy "Public can view available listings"
on public.listings
for select
using (status = 'available');

create policy "Public can create listings"
on public.listings
for insert
with check (status = 'available');
