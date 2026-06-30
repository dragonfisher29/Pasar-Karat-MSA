create extension if not exists "pgcrypto" with schema extensions;

alter table public.listings
  add column if not exists category text,
  add column if not exists location text,
  add column if not exists seller_name text,
  add column if not exists whatsapp_number text,
  add column if not exists gallery_image_urls text[] not null default '{}',
  add column if not exists moderation_status text not null default 'approved',
  add column if not exists seller_manage_code_hash text not null default '',
  add column if not exists sold_at timestamptz;

update public.listings
set
  category = coalesce(category, 'Other'),
  location = coalesce(location, 'Community meetup'),
  seller_name = coalesce(seller_name, 'Community seller'),
  whatsapp_number = coalesce(whatsapp_number, '60123456789'),
  gallery_image_urls = case
    when cardinality(gallery_image_urls) > 0 then gallery_image_urls
    else array[image_url]
  end,
  moderation_status = coalesce(moderation_status, 'approved'),
  seller_manage_code_hash = case
    when seller_manage_code_hash <> '' then seller_manage_code_hash
    else encode(extensions.digest(id::text, 'sha256'), 'hex')
  end;

alter table public.listings
  alter column category set not null,
  alter column location set not null,
  alter column seller_name set not null,
  alter column whatsapp_number set not null;

drop policy if exists "Public can view available listings" on public.listings;
drop policy if exists "Public can create listings" on public.listings;
drop policy if exists "Public can view approved available listings" on public.listings;
drop policy if exists "Public can create available listings" on public.listings;

create policy "Public can view approved available listings"
on public.listings
for select
using (status = 'available' and moderation_status = 'approved');

create policy "Public can create available listings"
on public.listings
for insert
with check (status = 'available');

create or replace function public.get_seller_dashboard_listings(
  p_whatsapp_number text,
  p_manage_code text
)
returns table (
  id uuid,
  created_at timestamptz,
  name text,
  description text,
  price numeric,
  condition text,
  rating integer,
  payment_method text,
  category text,
  location text,
  seller_name text,
  whatsapp_number text,
  image_url text,
  gallery_image_urls text[],
  status text,
  moderation_status text,
  sold_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    l.id,
    l.created_at,
    l.name,
    l.description,
    l.price,
    l.condition,
    l.rating,
    l.payment_method,
    l.category,
    l.location,
    l.seller_name,
    l.whatsapp_number,
    l.image_url,
    l.gallery_image_urls,
    l.status,
    l.moderation_status,
    l.sold_at
  from public.listings l
  where l.whatsapp_number = p_whatsapp_number
    and l.seller_manage_code_hash = encode(extensions.digest(p_manage_code, 'sha256'), 'hex')
  order by l.created_at desc;
end;
$$;

create or replace function public.mark_listing_sold(
  p_listing_id uuid,
  p_whatsapp_number text,
  p_manage_code text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.listings
  set status = 'sold',
      sold_at = now()
  where id = p_listing_id
    and whatsapp_number = p_whatsapp_number
    and seller_manage_code_hash = encode(extensions.digest(p_manage_code, 'sha256'), 'hex');

  get diagnostics updated_count = row_count;
  return updated_count > 0;
end;
$$;

grant execute on function public.get_seller_dashboard_listings(text, text) to anon, authenticated;
grant execute on function public.mark_listing_sold(uuid, text, text) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('listing-media', 'listing-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view listing media" on storage.objects;
drop policy if exists "Public can upload listing media" on storage.objects;

create policy "Public can view listing media"
on storage.objects
for select
using (bucket_id = 'listing-media');

create policy "Public can upload listing media"
on storage.objects
for insert
with check (bucket_id = 'listing-media');
