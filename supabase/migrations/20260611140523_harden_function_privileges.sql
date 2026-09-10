-- =====================================================================
-- Hardening follow-up (security advisors):
-- - Trigger functions must not be callable via PostgREST RPC.
-- - is_admin_master stays executable by authenticated (required by RLS
--   policies on profiles/categories) but not by anon.
-- - Pin search_path on set_updated_at.
-- Applied to project pnygzbfeuovauwzlluys as version 20260611140523.
-- =====================================================================

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.refresh_professional_rating() from public, anon, authenticated;
revoke execute on function public.enforce_profiles_role_guard() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

revoke execute on function public.is_admin_master(uuid) from public, anon;

alter function public.set_updated_at() set search_path = public;
