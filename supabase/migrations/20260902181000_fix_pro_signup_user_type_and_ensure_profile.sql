-- Recognize app login mode user_type=pro on signup, and allow dual-mode
-- accounts to ensure a professional_profiles row when entering as pro.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    case
      when new.raw_user_meta_data->>'role' = 'professional'
        or new.raw_user_meta_data->>'user_type' = 'pro'
        then 'professional'::public.user_role
      else 'client'::public.user_role
    end
  );
  return new;
end;
$$;

create or replace function public.ensure_professional_profile()
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  update public.profiles
  set role = 'professional'::public.user_role
  where id = uid
    and role is distinct from 'admin_master'::public.user_role
    and role is distinct from 'professional'::public.user_role;

  insert into public.professional_profiles (id, title, price_amount, price_unit, plan_tier)
  values (uid, 'Profissional', 0, 'hora', 'basic')
  on conflict (id) do nothing;
end;
$$;

revoke all on function public.ensure_professional_profile() from public, anon;
grant execute on function public.ensure_professional_profile() to authenticated;
