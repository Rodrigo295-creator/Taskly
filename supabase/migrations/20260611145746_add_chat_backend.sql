-- =====================================================================
-- Chat backend for conversations/messages:
-- - integrity checks + participant indexes
-- - last_message_at bump trigger (SECURITY DEFINER, RPC-locked)
-- - tightened INSERT policy (target must be a professional)
-- - chat_peers() / start_conversation() / mark_conversation_read() RPCs
-- - Realtime publication membership
-- Tables, FKs, unique pair, self-chat check and participant SELECT/INSERT
-- policies already existed from the base schema.
-- Applied to project pnygzbfeuovauwzlluys as version 20260611145746.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) Indexes for participant lookups
--    (messages (conversation_id, created_at) already exists)
-- ---------------------------------------------------------------------
create index if not exists conversations_client_idx
  on public.conversations (client_id);
create index if not exists conversations_professional_idx
  on public.conversations (professional_id);

-- ---------------------------------------------------------------------
-- 2) Content integrity. `content` stays nullable because the schema
--    supports non-text message_type (proposal); text messages must
--    carry 1..4000 chars.
-- ---------------------------------------------------------------------
alter table public.messages
  add constraint messages_content_length
    check (content is null or char_length(content) between 1 and 4000);
alter table public.messages
  add constraint messages_text_requires_content
    check (message_type <> 'text'::public.message_type or content is not null);

-- ---------------------------------------------------------------------
-- 3) Bump conversations.last_message_at on every new message.
--    SECURITY DEFINER on purpose: users have no UPDATE policy on
--    conversations, so the trigger must bypass RLS. Not callable via
--    PostgREST RPC (EXECUTE revoked, same pattern as other guards).
-- ---------------------------------------------------------------------
create or replace function public.bump_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

revoke execute on function public.bump_conversation_last_message()
  from public, anon, authenticated;

drop trigger if exists messages_bump_conversation on public.messages;
create trigger messages_bump_conversation
  after insert on public.messages
  for each row execute function public.bump_conversation_last_message();

-- ---------------------------------------------------------------------
-- 4) Tighten conversation INSERT: only as yourself AND only towards a
--    real professional (exists in professional_profiles).
-- ---------------------------------------------------------------------
drop policy if exists "Cliente inicia conversa" on public.conversations;
create policy conversations_insert_as_client
  on public.conversations
  for insert
  to authenticated
  with check (
    (select auth.uid()) = client_id
    and exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id
    )
  );

-- Deny-by-default belt and suspenders: no direct UPDATE/DELETE for API
-- roles (read receipts go through mark_conversation_read below).
revoke update, delete on public.conversations from anon, authenticated;
revoke update, delete on public.messages from anon, authenticated;
revoke all on public.conversations from anon;
revoke all on public.messages from anon;

-- ---------------------------------------------------------------------
-- 5) chat_peers(): id/name/avatar (+ public professional title) only
--    for users who share a conversation with the caller. SECURITY
--    DEFINER so it can read profiles without re-opening profiles RLS.
-- ---------------------------------------------------------------------
create or replace function public.chat_peers()
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  professional_title text
)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, p.full_name, p.avatar_url, pp.title
  from public.profiles p
  left join public.professional_profiles pp on pp.id = p.id
  where p.id <> auth.uid()
    and exists (
      select 1
      from public.conversations c
      where (c.client_id = auth.uid() and c.professional_id = p.id)
         or (c.professional_id = auth.uid() and c.client_id = p.id)
    );
$$;

revoke execute on function public.chat_peers() from public, anon;
grant execute on function public.chat_peers() to authenticated;

-- ---------------------------------------------------------------------
-- 6) start_conversation(): create-or-get on the unique
--    (client_id, professional_id) pair. SECURITY DEFINER so "get" works
--    even when the row already exists; validates the same invariants as
--    the INSERT policy.
-- ---------------------------------------------------------------------
create or replace function public.start_conversation(target_professional uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  conv_id uuid;
begin
  if uid is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;
  if uid = target_professional then
    raise exception 'cannot start a conversation with yourself'
      using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.professional_profiles pp
    where pp.id = target_professional
  ) then
    raise exception 'target is not a professional' using errcode = '22023';
  end if;

  insert into public.conversations (client_id, professional_id)
  values (uid, target_professional)
  on conflict (client_id, professional_id) do nothing;

  select c.id into conv_id
  from public.conversations c
  where c.client_id = uid and c.professional_id = target_professional;

  return conv_id;
end;
$$;

revoke execute on function public.start_conversation(uuid) from public, anon;
grant execute on function public.start_conversation(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- 7) mark_conversation_read(): recipient-only read receipts. Replaces a
--    column-restricted UPDATE policy (harder to get right) with a narrow
--    SECURITY DEFINER RPC: only messages of conversations the caller
--    participates in, only messages sent by the other party.
-- ---------------------------------------------------------------------
create or replace function public.mark_conversation_read(target_conversation uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.messages m
  set read_at = now()
  where m.conversation_id = target_conversation
    and m.read_at is null
    and m.sender_id <> auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = target_conversation
        and auth.uid() in (c.client_id, c.professional_id)
    );
$$;

revoke execute on function public.mark_conversation_read(uuid) from public, anon;
grant execute on function public.mark_conversation_read(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- 8) Realtime: postgres_changes respects RLS, so participants only ever
--    receive events for their own conversations/messages.
-- ---------------------------------------------------------------------
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.messages;
