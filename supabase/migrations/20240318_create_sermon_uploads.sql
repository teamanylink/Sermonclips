-- Drop existing table if it exists
drop table if exists public.sermon_uploads;

-- Create the sermon_uploads table
create table public.sermon_uploads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    url text not null,
    duration text not null default '0:00',
    status text not null default 'processing' check (status in ('processing', 'transcribed')),
    cloudinary_id text,
    supabase_path text,
    transcript text,
    summary text,
    key_points jsonb,
    thumbnail_url text
);

-- Enable Row Level Security
alter table public.sermon_uploads enable row level security;

-- Create policy to allow all operations for all users (since we don't have auth yet)
create policy "Enable all operations for all users" on public.sermon_uploads
    for all
    using (true)
    with check (true);

-- Create indexes for better performance
create index sermon_uploads_created_at_idx on public.sermon_uploads (created_at desc);
create index sermon_uploads_status_idx on public.sermon_uploads (status);

-- Add updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at
    before update on public.sermon_uploads
    for each row
    execute procedure public.handle_updated_at();