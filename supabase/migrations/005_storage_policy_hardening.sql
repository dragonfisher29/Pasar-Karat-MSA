drop policy if exists "Public can view listing media" on storage.objects;
drop policy if exists "Public can upload listing media" on storage.objects;

create policy "Public can view listing media"
on storage.objects
for select
using (bucket_id = 'listing-media' and name like 'listings/%');
