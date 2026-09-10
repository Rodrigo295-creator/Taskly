-- =====================================================================
-- RLS hardening: profiles, professional_profiles, categories,
-- kv_store_e1d2e976. Closes admin_master privilege-escalation paths
-- and removes public exposure of private profile columns.
-- Applied to project pnygzbfeuovauwzlluys as version 20260611135849.
-- =====================================================================

-- 0) Ensure RLS is enabled (idempotent)
alter table public.profiles enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.categories enable row level security;
alter table public.kv_store_e1d2e976 enable row level security;

-- ---------------------------------------------------------------------
-- 1) profiles.role protection
-- ---------------------------------------------------------------------

-- 1a. Trigger guard. NOT security definer on purpose: current_user must
--     reflect the API role (anon/authenticated) of the caller. Requests
--     through service_role / postgres / auth triggers are unaffected.
create or replace function public.enforce_profiles_role_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'UPDATE' and new.role is distinct from old.role then
      raise exception 'profiles.role can only be changed by the service role'
        using errcode = '42501';
    end if;
    if tg_op = 'INSERT' and new.role = 'admin_master'::public.user_role then
      raise exception 'profiles.role admin_master cannot be self-assigned'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_role_guard on public.profiles;
create trigger profiles_role_guard
  before insert or update on public.profiles
  for each row execute function public.enforce_profiles_role_guard();

-- 1b. Harden handle_new_user: auth metadata is client-controlled, so it
--     may never grant admin_master (closes signup escalation).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    case
      when new.raw_user_meta_data->>'role' = 'professional'
        then 'professional'::public.user_role
      else 'client'::public.user_role
    end
  );
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- 2) profiles policies: own row only (admin_master keeps read-all)
-- ---------------------------------------------------------------------

-- Removes public full-row read of professional profiles (leaked phone/bio/city).
drop policy if exists "Perfis de profissionais visíveis publicamente" on public.profiles;

-- Kept as-is:
--   "profiles_admin_master_select_all" (SELECT: is_admin_master(auth.uid()) OR id = auth.uid())
--   "Usuário atualiza o próprio perfil" (UPDATE own row; role change blocked by trigger)

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

-- ---------------------------------------------------------------------
-- 3) professional_profiles: directory exposed via narrow view only
-- ---------------------------------------------------------------------

drop policy if exists "Perfis profissionais visíveis publicamente" on public.professional_profiles;
-- Kept as-is: "Profissional gerencia o próprio perfil" (ALL, auth.uid() = id)

-- Security-definer view (owner bypasses RLS) restricted to directory-safe
-- columns: no PII beyond the professional's public display name/avatar.
create or replace view public.professional_directory as
select
  pp.id,
  pp.title,
  pp.description,
  pp.price_amount,
  pp.price_unit,
  pp.location,
  pp.is_online,
  pp.rating_avg,
  pp.completed_jobs_count,
  p.full_name,
  p.avatar_url,
  c.label as category_label,
  c.slug as category_slug
from public.professional_profiles pp
join public.profiles p on p.id = pp.id
left join public.categories c on c.id = pp.category_id;

revoke all on public.professional_directory from anon, authenticated;
grant select on public.professional_directory to anon, authenticated;

-- ---------------------------------------------------------------------
-- 4) categories: public read, admin-only writes
-- ---------------------------------------------------------------------

-- Kept as-is: "Categorias visíveis publicamente" (public SELECT using true)
-- public.is_admin_master(uuid) already exists as STABLE SECURITY DEFINER,
-- which avoids recursive RLS evaluation on profiles.

drop policy if exists categories_admin_insert on public.categories;
create policy categories_admin_insert
  on public.categories
  for insert
  to authenticated
  with check (public.is_admin_master((select auth.uid())));

drop policy if exists categories_admin_update on public.categories;
create policy categories_admin_update
  on public.categories
  for update
  to authenticated
  using (public.is_admin_master((select auth.uid())))
  with check (public.is_admin_master((select auth.uid())));

drop policy if exists categories_admin_delete on public.categories;
create policy categories_admin_delete
  on public.categories
  for delete
  to authenticated
  using (public.is_admin_master((select auth.uid())));

-- ---------------------------------------------------------------------
-- 5) kv_store_e1d2e976: service-role only
-- ---------------------------------------------------------------------
-- RLS enabled with zero policies = deny-all for anon/authenticated.
-- Belt and suspenders: also revoke table privileges from API roles.
revoke all on table public.kv_store_e1d2e976 from anon, authenticated;
