-- Estudio Sangría: tablas y permisos. Pegar entero en Supabase > SQL Editor > Run.

-- Tu documento de trabajo (privado: solo tú puedes leerlo y escribirlo).
create table proyectos (
  user_id uuid primary key references auth.users on delete cascade,
  contenido jsonb not null,
  updated_at timestamptz not null default now()
);
alter table proyectos enable row level security;
create policy "la propietaria gestiona su proyecto" on proyectos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- La versión publicada para compartir (sin el cuaderno de ideas).
-- Se actualiza solo cuando tú pulsas "Publicar" en la app.
create table vistas_publicas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users on delete cascade,
  contenido jsonb not null,
  activa boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table vistas_publicas enable row level security;
create policy "la propietaria gestiona su vista" on vistas_publicas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "cualquiera lee una vista activa" on vistas_publicas
  for select using (activa);
