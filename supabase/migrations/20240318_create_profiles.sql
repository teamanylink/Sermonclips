-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null,
    first_name text,
    last_name text,
    organization text,
    website text,
    avatar_url text
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- Create indexes
create index profiles_email_idx on public.profiles (email);

-- Set up triggers for updated_at
create trigger handle_updated_at before update on profiles
    for each row execute procedure public.handle_updated_at();

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();