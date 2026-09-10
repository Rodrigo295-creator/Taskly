import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase, supabaseConfigured } from '@/lib/supabase';

/* ── types ───────────────────────────────────────────────────────── */

export interface ChatPeer {
  id: string;
  name: string;
  avatarUrl: string | null;
  /** Public professional title (null when the peer is a client) */
  title: string | null;
}

export interface ChatConversation {
  id: string;
  peer: ChatPeer;
  lastMessageAt: string | null;
  lastMessage: string | null;
  lastMessageFromMe: boolean;
  unread: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80';

function devWarn(scope: string, message: string) {
  if (import.meta.env.DEV) console.warn(`[Taskly] ${scope}:`, message);
}

/* ── start / open a conversation with a professional ─────────────── */

/**
 * Create-or-get the conversation between the current user and a
 * professional (unique pair enforced by the DB; `start_conversation`
 * RPC validates the target). Returns the conversation id or null.
 */
export async function startConversation(professionalId: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('start_conversation', {
    target_professional: professionalId,
  });
  if (error) {
    devWarn('startConversation', error.message);
    return null;
  }
  return (data as string | null) ?? null;
}

/* ── conversation list ───────────────────────────────────────────── */

type ConversationRow = {
  id: string;
  client_id: string;
  professional_id: string;
  last_message_at: string | null;
  created_at: string;
};

type PeerRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  professional_title: string | null;
};

type PreviewRow = {
  conversation_id: string;
  sender_id: string;
  content: string | null;
  created_at: string;
  read_at: string | null;
};

export function useConversations(userId: string | undefined): {
  conversations: ChatConversation[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
} {
  const enabled = supabaseConfigured && Boolean(userId);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!supabase || !userId) return;

    const [convRes, peersRes] = await Promise.all([
      supabase
        .from('conversations')
        .select('id, client_id, professional_id, last_message_at, created_at')
        .order('last_message_at', { ascending: false, nullsFirst: false }),
      supabase.rpc('chat_peers'),
    ]);

    if (convRes.error || peersRes.error) {
      devWarn('useConversations', convRes.error?.message ?? peersRes.error?.message ?? '');
      setError(true);
      setLoading(false);
      return;
    }

    const convRows = (convRes.data ?? []) as ConversationRow[];
    const peerRows = (peersRes.data ?? []) as PeerRow[];

    if (convRows.length === 0) {
      setConversations([]);
      setError(false);
      setLoading(false);
      return;
    }

    // Latest message preview + unread count (most recent 300 messages
    // across all conversations is plenty for the list screen).
    const { data: previewData, error: previewErr } = await supabase
      .from('messages')
      .select('conversation_id, sender_id, content, created_at, read_at')
      .in('conversation_id', convRows.map((c) => c.id))
      .order('created_at', { ascending: false })
      .limit(300);

    if (previewErr) {
      devWarn('useConversations', previewErr.message);
      setError(true);
      setLoading(false);
      return;
    }

    const previews = (previewData ?? []) as PreviewRow[];
    const peerById = new Map(peerRows.map((p) => [p.id, p]));

    const list: ChatConversation[] = convRows.map((conv) => {
      const peerId = conv.client_id === userId ? conv.professional_id : conv.client_id;
      const peer = peerById.get(peerId);
      const convMessages = previews.filter((m) => m.conversation_id === conv.id);
      const last = convMessages[0];
      const unread = convMessages.filter(
        (m) => m.sender_id !== userId && m.read_at === null,
      ).length;
      return {
        id: conv.id,
        peer: {
          id: peerId,
          name: peer?.full_name?.trim() || 'Taskly',
          avatarUrl: peer?.avatar_url?.trim() || FALLBACK_AVATAR,
          title: peer?.professional_title ?? null,
        },
        lastMessageAt: conv.last_message_at,
        lastMessage: last?.content ?? null,
        lastMessageFromMe: last ? last.sender_id === userId : false,
        unread,
      };
    });

    setConversations(list);
    setError(false);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!enabled || !supabase) return;
    void fetchAll();

    // RLS applies to postgres_changes: only events for the user's own
    // conversations/messages are delivered.
    const channel = supabase
      .channel(`chat-list-${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        () => void fetchAll(),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversations' },
        () => void fetchAll(),
      )
      .subscribe();

    return () => {
      void supabase?.removeChannel(channel);
    };
  }, [enabled, userId, fetchAll]);

  return { conversations, loading, error, refetch: () => void fetchAll() };
}

/* ── single conversation thread ──────────────────────────────────── */

type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  created_at: string;
  read_at: string | null;
};

function rowToMessage(row: MessageRow): ChatMessage {
  return {
    id: row.id,
    conversationId: row.conversation_id,
    senderId: row.sender_id,
    content: row.content ?? '',
    createdAt: row.created_at,
    readAt: row.read_at,
  };
}

export function useMessages(
  conversationId: string | undefined,
  userId: string | undefined,
): {
  messages: ChatMessage[];
  loading: boolean;
  error: boolean;
  sending: boolean;
  sendMessage: (content: string) => Promise<boolean>;
} {
  const enabled = supabaseConfigured && Boolean(conversationId) && Boolean(userId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const userIdRef = useRef(userId);
  userIdRef.current = userId;

  const markRead = useCallback(async () => {
    if (!supabase || !conversationId) return;
    const { error: rpcErr } = await supabase.rpc('mark_conversation_read', {
      target_conversation: conversationId,
    });
    if (rpcErr) devWarn('markConversationRead', rpcErr.message);
  }, [conversationId]);

  useEffect(() => {
    if (!enabled || !supabase || !conversationId) {
      setMessages([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    void (async () => {
      const { data, error: qErr } = await supabase!
        .from('messages')
        .select('id, conversation_id, sender_id, content, created_at, read_at')
        .eq('conversation_id', conversationId)
        .not('content', 'is', null)
        .order('created_at', { ascending: true });

      if (cancelled) return;
      if (qErr) {
        devWarn('useMessages', qErr.message);
        setError(true);
        setLoading(false);
        return;
      }
      setMessages(((data ?? []) as MessageRow[]).map(rowToMessage));
      setLoading(false);
      void markRead();
    })();

    const channel = supabase
      .channel(`chat-thread-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as MessageRow;
          if (!row.content) return;
          setMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, rowToMessage(row)],
          );
          // Incoming message while the thread is open → mark as read.
          if (row.sender_id !== userIdRef.current) void markRead();
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase?.removeChannel(channel);
    };
  }, [enabled, conversationId, markRead]);

  const sendMessage = useCallback(
    async (content: string): Promise<boolean> => {
      const text = content.trim();
      if (!supabase || !conversationId || !userId || !text) return false;
      setSending(true);
      const { data, error: insErr } = await supabase
        .from('messages')
        .insert({ conversation_id: conversationId, sender_id: userId, content: text })
        .select('id, conversation_id, sender_id, content, created_at, read_at')
        .single();
      setSending(false);
      if (insErr) {
        devWarn('sendMessage', insErr.message);
        return false;
      }
      const row = data as MessageRow;
      setMessages((prev) =>
        prev.some((m) => m.id === row.id) ? prev : [...prev, rowToMessage(row)],
      );
      return true;
    },
    [conversationId, userId],
  );

  return { messages, loading, error, sending, sendMessage };
}

/* ── shared time formatting for chat lists/threads ───────────────── */

export function formatChatTime(iso: string | null, locale: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (sameDay) {
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString(locale, { day: '2-digit', month: 'short' });
}
