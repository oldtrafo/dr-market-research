# DR Market Research App

Internal web app for managing Dominican Republic market research company records.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Auth + PostgreSQL)
- Zod validation

## Setup

### 1. Install dependencies

```bash
cd "Market research app"
npm install
```

### 2. Create Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run database SQL

In the Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Create the companies table
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  founded_year integer,
  about text,
  sector text,
  products text,
  factory text,
  contact text,
  score numeric(3,1) check (score >= 0 and score <= 10),
  created_by text,
  updated_by text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.companies enable row level security;

-- Allow authenticated users full access
create policy "Authenticated users can read companies"
  on public.companies for select
  to authenticated
  using (true);

create policy "Authenticated users can insert companies"
  on public.companies for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update companies"
  on public.companies for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete companies"
  on public.companies for delete
  to authenticated
  using (true);

-- Index for common queries
create index idx_companies_sector on public.companies (sector);
create index idx_companies_score on public.companies (score);
create index idx_companies_name on public.companies (company_name);
```

### 4. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these values in Supabase dashboard under **Settings > API**.

### 5. Configure Supabase Auth

In the Supabase dashboard under **Authentication > URL Configuration**, set:

- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/auth/callback`

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 7. Create your first user

Navigate to `/signup` and create an account.

**Note:** By default, Supabase requires email confirmation. To disable this for development, go to **Authentication > Providers > Email** and turn off "Confirm email".

## Assumptions

- All authenticated users have equal access (no admin roles).
- `created_by` and `updated_by` store the user's email address.
- Score is a decimal from 0 to 10 (e.g., 7.5).
- Sectors are a predefined list relevant to the Dominican Republic market.
- Email confirmation can be toggled in Supabase settings depending on your needs.
