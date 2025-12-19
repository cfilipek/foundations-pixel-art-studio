-- Add RLS policy to allow deletion of artworks
-- This allows teachers to delete inappropriate submissions
create policy "pixel_artworks_delete_all"
  on public.pixel_artworks for delete
  using (true);
