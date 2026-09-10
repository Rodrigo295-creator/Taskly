-- Plano do profissional: fonte de verdade no backend.
-- Colunas só podem ser alteradas pelo service role (futuro webhook do gateway de pagamento).

alter table public.professional_profiles
  add column if not exists plan_tier text not null default 'basic',
  add column if not exists plan_frequency text,
  add column if not exists plan_subscribed_at timestamptz;

alter table public.professional_profiles
  add constraint professional_profiles_plan_tier_check
    check (plan_tier in ('basic','pro','premium')),
  add constraint professional_profiles_plan_frequency_check
    check (plan_frequency is null or plan_frequency in ('monthly','quarterly','semiannual','yearly'));

create or replace function public.enforce_plan_guard()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'UPDATE' and (
      new.plan_tier is distinct from old.plan_tier
      or new.plan_frequency is distinct from old.plan_frequency
      or new.plan_subscribed_at is distinct from old.plan_subscribed_at
    ) then
      raise exception 'plan can only be changed by the service role' using errcode = '42501';
    end if;
    if tg_op = 'INSERT' and new.plan_tier <> 'basic' then
      raise exception 'plan can only be set by the service role' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function public.enforce_plan_guard() from public, anon, authenticated;

drop trigger if exists professional_profiles_plan_guard on public.professional_profiles;
create trigger professional_profiles_plan_guard
  before insert or update on public.professional_profiles
  for each row execute function public.enforce_plan_guard();
