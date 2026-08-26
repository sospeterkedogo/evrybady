-- Client portal: roles, client profiles, and booking status pipeline.
-- Run in the Supabase SQL editor (in order with the other migrations).

-- ── Roles for RBAC (admin = full control, staff = internal staff, client = end user) ──
create table if not exists user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('admin','staff','client')),
  created_at timestamptz not null default now()
);

create index if not exists user_roles_role_idx on user_roles(role);

-- ── Client profiles ──
create table if not exists client_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  company text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Bookings / consultations with a staff-controlled status pipeline ──
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id) on delete set null,
  client_email text not null,
  client_name text not null,
  phone text,
  company text,
  services text[] not null default '{}',
  message text,
  status text not null default 'booked' check (status in ('booked','pending_call','proposal_sent','in_progress','delivered','cancelled')),
  project_name text,
  staff_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_client_id_idx on bookings(client_id);
create index if not exists bookings_status_idx on bookings(status);

-- ── Helper: is the current user internal staff/admin? ──
create or replace function public.is_staff()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
      and role in ('staff','admin')
  );
$$;

-- ── Auto-provision profile + client role on signup ──
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.client_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;

  -- New signups always start as clients; staff/admin are promoted via the seed script
  insert into public.user_roles (user_id, role)
  values (new.id, 'client')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ── Row Level Security ──
alter table user_roles enable row level security;
alter table client_profiles enable row level security;
alter table bookings enable row level security;

-- user_roles: users can read their own role; staff can manage everyone
drop policy if exists "Users can read own role" on user_roles;
create policy "Users can read own role" on user_roles
  for select using (user_id = auth.uid() or public.is_staff());

drop policy if exists "Staff manage roles" on user_roles;
create policy "Staff manage roles" on user_roles
  for all using (public.is_staff()) with check (public.is_staff());

-- client_profiles: users manage their own profile; staff can manage all
drop policy if exists "Users can read own profile" on client_profiles;
create policy "Users can read own profile" on client_profiles
  for select using (id = auth.uid() or public.is_staff());

drop policy if exists "Users can create own profile" on client_profiles;
create policy "Users can create own profile" on client_profiles
  for insert with check (id = auth.uid());

drop policy if exists "Users can update own profile" on client_profiles;
create policy "Users can update own profile" on client_profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "Staff manage profiles" on client_profiles;
create policy "Staff manage profiles" on client_profiles
  for all using (public.is_staff()) with check (public.is_staff());

-- bookings: anyone may create (attached to them if signed in), clients see only
-- their own, staff see/manage all
drop policy if exists "Anyone can create a booking" on bookings;
create policy "Anyone can create a booking" on bookings
  for insert with check (client_id is null or client_id = auth.uid() or public.is_staff());

drop policy if exists "Clients and staff can read bookings" on bookings;
create policy "Clients and staff can read bookings" on bookings
  for select using (client_id = auth.uid() or public.is_staff());

drop policy if exists "Clients can update own bookings" on bookings;
create policy "Clients can update own bookings" on bookings
  for update using (client_id = auth.uid()) with check (client_id = auth.uid());

drop policy if exists "Clients can delete own bookings" on bookings;
create policy "Clients can delete own bookings" on bookings
  for delete using (client_id = auth.uid());

drop policy if exists "Staff manage bookings" on bookings;
create policy "Staff manage bookings" on bookings
  for all using (public.is_staff()) with check (public.is_staff());

-- ── Guard: only staff may change status / staff fields (clients may cancel their own booking) ──
create or replace function public.guard_booking_status_change()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    if new.status is distinct from old.status then
      if new.status <> 'cancelled' then
        raise exception 'Only staff can update booking status';
      end if;
    end if;
    if new.staff_note is distinct from old.staff_note
       or new.project_name is distinct from old.project_name then
      raise exception 'Only staff can update booking status';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_guard_status on bookings;
create trigger bookings_guard_status
before update on bookings
for each row execute function public.guard_booking_status_change();
