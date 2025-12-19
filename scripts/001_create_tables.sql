-- Create pixel_artworks table to store student creations
create table if not exists public.pixel_artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  student_name text not null,
  grid_data jsonb not null,
  grid_size integer not null default 16,
  challenge_type text,
  created_at timestamptz default now()
);

-- Enable RLS for security
alter table public.pixel_artworks enable row level security;

-- Allow anyone to view artworks (for gallery)
create policy "pixel_artworks_select_all"
  on public.pixel_artworks for select
  using (true);

-- Allow anyone to insert artworks (students can submit)
create policy "pixel_artworks_insert_all"
  on public.pixel_artworks for insert
  with check (true);

-- Create an index for faster queries
create index if not exists pixel_artworks_created_at_idx 
  on public.pixel_artworks(created_at desc);
