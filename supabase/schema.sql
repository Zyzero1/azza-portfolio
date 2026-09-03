create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  tagline text not null,
  bio text not null,
  location text not null,
  education text not null,
  experience text not null,
  image text,
  skills jsonb not null default '[]'::jsonb,
  tools jsonb not null default '[]'::jsonb,
  soft_skills jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  technologies jsonb not null default '[]'::jsonb,
  image text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Development',
  excerpt text not null default '',
  content text not null default '',
  published boolean not null default true,
  date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists about_bio text;
alter table public.profiles add column if not exists email text default 'azza.alkausar@gmail.com';
alter table public.profiles add column if not exists availability text default 'Available for Work';
alter table public.profiles add column if not exists linkedin text default 'https://www.linkedin.com/in/m-azza-alkausar/';
alter table public.profiles add column if not exists cv_url text default '/uploads/img_686a5952b576b.jpg';

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null default '',
  period text not null default '',
  badge text default '',
  description jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.articles enable row level security;
alter table public.experiences enable row level security;

drop policy if exists "Public can read profiles" on public.profiles;
create policy "Public can read profiles" on public.profiles for select using (true);
drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects for select using (true);
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles" on public.articles for select using (published = true);
drop policy if exists "Public can read experiences" on public.experiences;
create policy "Public can read experiences" on public.experiences for select using (true);

-- Admin CRUD policies. These require a signed-in Supabase Auth user.
drop policy if exists "Authenticated admins manage profiles" on public.profiles;
create policy "Authenticated admins manage profiles" on public.profiles for all to authenticated using (true) with check (true);
drop policy if exists "Authenticated admins manage projects" on public.projects;
create policy "Authenticated admins manage projects" on public.projects for all to authenticated using (true) with check (true);
drop policy if exists "Authenticated admins manage articles" on public.articles;
create policy "Authenticated admins manage articles" on public.articles for all to authenticated using (true) with check (true);
drop policy if exists "Authenticated admins manage experiences" on public.experiences;
create policy "Authenticated admins manage experiences" on public.experiences for all to authenticated using (true) with check (true);

insert into public.profiles (name, role, tagline, bio, about_bio, location, education, experience, image, skills, tools, soft_skills)
select 
  'Muhammad Azza Al Kausar', 
  'Front-End and Back-End Developer', 
  'Crafting Digital Experiences & Innovative Solutions', 
  'Informatics Engineering student passionate about developing practical software solutions that combine clean design with functional technology.', 
  'Informatics Engineering student at Raja Ali Haji Maritime University (UMRAH) specializing in modern software engineering, high-performance web development, and mobile applications. Experienced in architecting end-to-end digital solutions—from responsive user interfaces to integrated backends and maritime AI/Machine Learning data analytics. Dedicated to delivering functional, clean, and user-centric digital experiences.',
  'Tanjung Balai Karimun, Indonesia', 
  'Informatics Engineering · UMRAH', 
  'Class Representative Council Chair · SMAN 04 Karimun', 
  '/uploads/img_686a5952b576b.jpg', 
  '[["HTML/CSS",90],["JavaScript",80],["PHP",80],["Python",67],["Dart",60],["C++",50]]'::jsonb, 
  '["Git","Docker","Flutter","Figma"]'::jsonb, 
  '["Teamwork","Problem solving"]'::jsonb
where not exists (select 1 from public.profiles);

insert into public.experiences (title, company, period, badge, description)
select 
  'Frontend & Mobile Developer',
  'Independent & Project-based Development · Riau Islands, Indonesia',
  '2023 - Present',
  'Active',
  '["Architecting and building responsive mobile applications with Flutter (Dart) and Firebase with efficient state management.","Developing modern high-performance single-page web applications (SPA) using React, Vite, and Tailwind CSS.","Optimizing UI rendering performance, component accessibility, and seamless RESTful API backend integrations."]'::jsonb
where not exists (select 1 from public.experiences);

insert into public.experiences (title, company, period, badge, description)
select 
  'Full-Stack Web Developer (Academic & Port Projects)',
  'Maritime Logistics Platform & Smart Portal System',
  '2024 - 2025',
  '',
  '["Designed relational MySQL database schemas for managing maritime port logistics and vessel schedules.","Engineered backend services with PHP and Laravel handling secure authentication and role-based data distribution.","Applied clean code principles, modular software architecture, and Git/GitHub version control workflows."]'::jsonb
where (select count(*) from public.experiences) < 2;

-- Supabase Storage configuration for portfolio assets & documents (CV, etc.)
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view portfolio assets" on storage.objects;
create policy "Public can view portfolio assets"
on storage.objects for select
using (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated users can upload portfolio assets" on storage.objects;
create policy "Authenticated users can upload portfolio assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated users can update portfolio assets" on storage.objects;
create policy "Authenticated users can update portfolio assets"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated users can delete portfolio assets" on storage.objects;
create policy "Authenticated users can delete portfolio assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'portfolio-images');

