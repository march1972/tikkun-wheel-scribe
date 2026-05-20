create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  dob date not null,
  email text not null,
  sign_id text not null,
  newsletter_opt_in boolean not null default false,
  source text not null default 'reading_form',
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
create policy "anyone can insert lead" on public.leads for insert to anon, authenticated with check (true);
create index leads_email_idx on public.leads(email);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'history_page',
  created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "anyone can subscribe" on public.newsletter_subscribers for insert to anon, authenticated with check (true);