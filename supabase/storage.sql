insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view portfolio images" on storage.objects;
create policy "Public can view portfolio images"
on storage.objects for select
using (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated admins upload portfolio images" on storage.objects;
create policy "Authenticated admins upload portfolio images"
on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated admins update portfolio images" on storage.objects;
create policy "Authenticated admins update portfolio images"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio-images')
with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated admins delete portfolio images" on storage.objects;
create policy "Authenticated admins delete portfolio images"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-images');
