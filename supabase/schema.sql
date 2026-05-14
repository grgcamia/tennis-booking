create table bookings (
  id uuid primary key default gen_random_uuid(),
  court_id text not null,
  court_name text not null,
  date date not null,
  start_time text not null,
  end_time text not null,
  player_name text not null,
  booked_at timestamptz default now()
);

alter table bookings enable row level security;

create policy "public access"
  on bookings for all
  using (true)
  with check (true);
