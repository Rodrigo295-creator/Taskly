import { useState, useRef, useEffect } from 'react';
import { useAppSettings } from '../context/AppSettings';
import { ProPayoutBreakdown } from './ProPayoutBreakdown';
import {
  Send, ArrowLeft, Circle, CheckCircle,
  Clock, MapPin, DollarSign, X, ClipboardList, ChevronRight,
  Loader2, MessageCircle,
} from 'lucide-react';
import { supabaseConfigured } from '@/lib/supabase';
import { formatChatTime, useConversations, useMessages } from '@/hooks/useChat';

/* ── types ───────────────────────────────────────────────────────── */

type MsgType = 'text' | 'proposal' | 'proposal_accepted' | 'service_done';

interface Proposal {
  service: string;
  date: string;
  time: string;
  price: number;
  location: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface Message {
  id: string;
  text?: string;
  sender: 'pro' | 'client';
  time: string;
  type: MsgType;
  proposal?: Proposal;
}

interface PastService {
  id: string;
  service: string;
  date: string;
  value: number;
  rating: number;
}

interface ClientConvo {
  id: string;
  clientName: string;
  clientImage: string;
  isOnline: boolean;
  unread: number;
  lastMessage: string;
  lastTime: string;
  tag?: 'novo' | 'agendado' | 'concluido';
  messages: Message[];
  pastServices: PastService[];
}

/* ── data ────────────────────────────────────────────────────────── */

const INITIAL_CONVOS: ClientConvo[] = [
  {
    id: '1',
    clientName: 'Carlos Eduardo',
    clientImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
    isOnline: true,
    unread: 2,
    lastMessage: 'Ótimo! Pode confirmar o horário?',
    lastTime: '10:47',
    tag: 'novo',
    pastServices: [],
    messages: [
      { id: 'm1', sender: 'client', time: '10:30', type: 'text', text: 'Oi Roberto! Vi seu perfil e gostaria de contratar para instalar um ar-condicionado.' },
      { id: 'm2', sender: 'pro',    time: '10:33', type: 'text', text: 'Olá Carlos! Claro, posso sim. Qual a capacidade do aparelho e o endereço?' },
      { id: 'm3', sender: 'client', time: '10:35', type: 'text', text: '12.000 BTUs, split. Estou em Pinheiros, Rua Teodoro Sampaio.' },
      { id: 'm4', sender: 'pro',    time: '10:38', type: 'text', text: 'Perfeito! Mando uma proposta para você confirmar.' },
      {
        id: 'm5', sender: 'pro', time: '10:40', type: 'proposal',
        proposal: { service: 'Instalação de Ar-condicionado Split 12.000 BTUs', date: '15 mai. 2026', time: '14:00', price: 250, location: 'Pinheiros, SP', status: 'pending' },
      },
      { id: 'm6', sender: 'client', time: '10:47', type: 'text', text: 'Ótimo! Pode confirmar o horário?' },
    ],
  },
  {
    id: '2',
    clientName: 'Juliana Melo',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
    isOnline: true,
    unread: 0,
    lastMessage: 'Até amanhã então, obrigada!',
    lastTime: '09:15',
    tag: 'agendado',
    pastServices: [
      { id: 'ps1', service: 'Instalação de tomadas', date: 'Mar 2026', value: 160, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Ontem 16:00', type: 'text', text: 'Boa tarde Roberto, preciso de um reparo no painel elétrico.' },
      { id: 'm2', sender: 'pro',    time: 'Ontem 16:05', type: 'text', text: 'Boa tarde Juliana! Sem problema. Quando você quer que eu passe?' },
      { id: 'm3', sender: 'client', time: 'Ontem 16:08', type: 'text', text: 'Amanhã pela manhã está bom?' },
      {
        id: 'm4', sender: 'pro', time: 'Ontem 16:12', type: 'proposal',
        proposal: { service: 'Reparo em Painel Elétrico', date: '15 mai. 2026', time: '09:00', price: 220, location: 'Itaim Bibi, SP', status: 'accepted' },
      },
      { id: 'm5', sender: 'client', time: 'Ontem 16:14', type: 'proposal_accepted', text: '✅ Proposta aceita!' },
      { id: 'm6', sender: 'client', time: '09:15', type: 'text', text: 'Até amanhã então, obrigada!' },
    ],
  },
  {
    id: '3',
    clientName: 'Marcos Vinicius',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Ficou perfeito! Já deixei a avaliação.',
    lastTime: 'Ter',
    tag: 'concluido',
    pastServices: [
      { id: 'ps1', service: 'Instalação de tomadas externas', date: 'Mai 2026', value: 160, rating: 5 },
      { id: 'ps2', service: 'Troca de disjuntor', date: 'Jan 2026', value: 120, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Ter 08:00', type: 'text', text: 'Bom dia Roberto! O serviço de ontem ficou excelente.' },
      { id: 'm2', sender: 'pro',    time: 'Ter 08:10', type: 'text', text: 'Que bom saber, Marcos! Qualquer coisa pode me chamar.' },
      { id: 'm3', sender: 'client', time: 'Ter 08:12', type: 'service_done', text: '✅ Serviço confirmado como concluído.' },
      { id: 'm4', sender: 'client', time: 'Ter 08:15', type: 'text', text: 'Ficou perfeito! Já deixei a avaliação.' },
    ],
  },
  {
    id: '4',
    clientName: 'Fernanda Souza',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Você: Obrigado! Pode entrar em contato quando quiser.',
    lastTime: 'Sex',
    pastServices: [
      { id: 'ps1', service: 'Fiação completa apartamento', date: 'Abr 2026', value: 900, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Sex 17:00', type: 'text', text: 'Roberto, sua equipe fez um trabalho incrível na fiação!' },
      { id: 'm2', sender: 'pro',    time: 'Sex 17:10', type: 'text', text: 'Muito obrigado Fernanda! Foi um prazer trabalhar no seu apartamento.' },
      { id: 'm3', sender: 'client', time: 'Sex 17:12', type: 'text', text: 'Com certeza vou indicar para todo mundo.' },
      { id: 'm4', sender: 'pro',    time: 'Sex 17:15', type: 'text', text: 'Obrigado! Pode entrar em contato quando quiser.' },
    ],
  },
];

const TAG_CONFIG = {
  novo:      { label: 'Novo',      color: 'bg-[#ECFDF5] text-[#0D9488]' },
  agendado:  { label: 'Agendado',  color: 'bg-blue-50 text-blue-600' },
  concluido: { label: 'Concluído', color: 'bg-green-50 text-green-600' },
};

/* ── proposal modal ──────────────────────────────────────────────── */

function ProposalModal({ onSend, onClose }: {
  onSend: (p: Proposal) => void;
  onClose: () => void;
}) {
  const { t } = useAppSettings();
  const [form, setForm] = useState<Omit<Proposal, 'status'>>({
    service: '', date: '', time: '', price: 0, location: '',
  });
  const set = (k: keyof typeof form, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }));
  const valid = form.service && form.date && form.time && form.price > 0;

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-base">{t('prochat.newProposal')}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">{t('prochat.service')}</label>
            <input
              value={form.service}
              onChange={e => set('service', e.target.value)}
              placeholder={t('prochat.servicePh')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">{t('prochat.date')}</label>
              <input
                value={form.date}
                onChange={e => set('date', e.target.value)}
                placeholder="16 mai. 2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">{t('prochat.time')}</label>
              <input
                value={form.time}
                onChange={e => set('time', e.target.value)}
                placeholder="09:00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Valor (R$)</label>
              <input
                type="number"
                value={form.price || ''}
                onChange={e => set('price', Number(e.target.value))}
                placeholder="200"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Local</label>
              <input
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="Bairro, SP"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            disabled={!valid}
            onClick={() => valid && onSend({ ...form, status: 'pending' })}
            className="flex-1 py-2.5 rounded-xl bg-[#0D9488] disabled:opacity-50 text-white text-sm font-semibold hover:bg-[#0F766E] transition-colors"
          >
            {t('prochat.sendProposal')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── proposal bubble ─────────────────────────────────────────────── */

function ProposalBubble({ proposal, fromPro }: { proposal: Proposal; fromPro: boolean }) {
  const { fmt, t } = useAppSettings();
  const accepted  = proposal.status === 'accepted';
  const declined  = proposal.status === 'declined';
  return (
    <div className={`rounded-2xl border overflow-hidden text-sm w-[230px] ${
      accepted ? 'border-green-200 bg-green-50' :
      declined ? 'border-red-100 bg-red-50' :
      'border-[#0D9488]/30 bg-[#ECFDF5]/60'
    }`}>
      <div className={`px-3 py-2 flex items-center gap-2 border-b ${
        accepted ? 'border-green-200 bg-green-100/50' :
        declined ? 'border-red-100 bg-red-100/50' :
        'border-[#0D9488]/20 bg-[#0D9488]/10'
      }`}>
        <ClipboardList className={`w-3.5 h-3.5 flex-shrink-0 ${accepted ? 'text-green-600' : declined ? 'text-red-500' : 'text-[#0D9488]'}`} />
        <span className={`text-xs font-bold ${accepted ? 'text-green-700' : declined ? 'text-red-600' : 'text-[#0D9488]'}`}>
          {accepted ? t('prochat.proposalAccepted') : declined ? t('prochat.proposalDeclined') : t('prochat.proposal')}
        </span>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">
        <p className="font-semibold text-slate-800 text-xs leading-snug">{proposal.service}</p>
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="w-3 h-3" />
          {proposal.date} às {proposal.time}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="w-3 h-3" />
          {proposal.location}
        </div>
        {fromPro ? (
          <div className="mt-2">
            <ProPayoutBreakdown gross={proposal.price} />
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mt-1">
            <DollarSign className="w-3 h-3 text-[#0D9488]" />
            {fmt(proposal.price)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── past services panel ─────────────────────────────────────────── */

function PastServicesPanel({ services, clientName }: { services: PastService[]; clientName: string }) {
  const { t } = useAppSettings();
  if (services.length === 0) return (
    <div className="px-4 py-6 text-center">
      <p className="text-xs text-slate-400">{t('prochat.noHistory', { name: clientName.split(' ')[0] })}</p>
    </div>
  );
  const total = services.reduce((s, x) => s + x.value, 0);
  return (
    <div className="px-3 py-3">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">{t('prochat.historyWith', { name: clientName.split(' ')[0] })}</p>
      <div className="space-y-2">
        {services.map(s => (
          <div key={s.id} className="bg-white border border-slate-100 rounded-xl px-3 py-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{s.service}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{s.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-slate-800">R$ {s.value}</p>
                <p className="text-[10px] text-yellow-500">{'★'.repeat(s.rating)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[11px] text-slate-400">Total recebido</span>
        <span className="text-xs font-bold text-[#0D9488]">R$ {total}</span>
      </div>
    </div>
  );
}

/* ── main component ──────────────────────────────────────────────── */

interface ProChatScreenProps {
  /** Supabase user id — when present (and Supabase configured) the chat is live */
  userId?: string;
}

export function ProChatScreen({ userId }: ProChatScreenProps) {
  const { t, locale } = useAppSettings();
  const realMode = supabaseConfigured && Boolean(userId);
  const [convos, setConvos]       = useState<ClientConvo[]>(INITIAL_CONVOS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputText, setInputText]  = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const [showHistory, setShowHistory]  = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversations: realConvos,
    loading: convosLoading,
    error: convosError,
  } = useConversations(realMode ? userId : undefined);
  const {
    messages: realMessages,
    loading: messagesLoading,
    sending,
    sendMessage: sendRealMessage,
  } = useMessages(realMode ? selectedId ?? undefined : undefined, userId);

  const displayConvos: ClientConvo[] = realMode
    ? realConvos.map((c) => ({
        id: c.id,
        clientName: c.peer.name,
        clientImage: c.peer.avatarUrl ?? '',
        isOnline: false,
        unread: c.unread,
        lastMessage: c.lastMessage ?? '',
        lastTime: formatChatTime(c.lastMessageAt, locale),
        messages: [],
        pastServices: [],
      }))
    : convos;

  const selectedBase = displayConvos.find(c => c.id === selectedId) ?? null;
  const selected: ClientConvo | null = realMode
    ? selectedBase && {
        ...selectedBase,
        messages: realMessages.map((m): Message => ({
          id: m.id,
          text: m.content,
          sender: m.senderId === userId ? 'pro' : 'client',
          time: formatChatTime(m.createdAt, locale),
          type: 'text',
        })),
      }
    : selectedBase;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages.length, selectedId]);

  const openConvo = (id: string) => {
    setSelectedId(id);
    setShowHistory(false);
    if (!realMode) {
      setConvos(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    }
  };

  const pushMessage = (msg: Omit<Message, 'id'>) => {
    const newMsg = { ...msg, id: `m${Date.now()}` };
    setConvos(prev => prev.map(c =>
      c.id === selectedId
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: msg.text ?? '📋 Proposta enviada', lastTime: msg.time }
        : c
    ));
  };

  const sendText = () => {
    if (!inputText.trim() || !selectedId) return;
    if (realMode) {
      if (sending) return;
      const text = inputText.trim();
      setInputText('');
      void sendRealMessage(text).then((ok) => {
        if (!ok) setInputText(text);
      });
      return;
    }
    const t = now();
    pushMessage({ text: inputText.trim(), sender: 'pro', time: t, type: 'text' });
    setInputText('');
    setTimeout(() => {
      const replies = [
        'Entendido, pode confirmar!',
        'Ok, estarei lá no horário combinado.',
        'Perfeito, obrigado pela resposta rápida.',
        'Tudo certo! Qualquer dúvida me avisa.',
        'Combinado! Até lá.',
      ];
      pushMessage({ text: replies[Math.floor(Math.random() * replies.length)], sender: 'client', time: now(), type: 'text' });
    }, 1100);
  };

  const sendProposal = (proposal: Proposal) => {
    pushMessage({ sender: 'pro', time: now(), type: 'proposal', proposal });
    setShowProposal(false);
    setTimeout(() => {
      pushMessage({ text: '✅ Proposta aceita! Até lá.', sender: 'client', time: now(), type: 'proposal_accepted' });
      setConvos(prev => prev.map(c => {
        if (c.id !== selectedId) return c;
        const msgs = [...c.messages];
        const idx = msgs.findLastIndex(
          (m) => m.type === 'proposal' && m.proposal?.status === 'pending',
        );
        if (idx >= 0 && msgs[idx].proposal) msgs[idx] = { ...msgs[idx], proposal: { ...msgs[idx].proposal!, status: 'accepted' } };
        return { ...c, messages: msgs, tag: 'agendado' };
      }));
    }, 1400);
  };

  const totalUnread = displayConvos.reduce((s, c) => s + c.unread, 0);

  /* ── conversation list ─────────── */
  const SideList = (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      <div className="px-4 pt-5 pb-3 border-b border-slate-100 flex-shrink-0">
        <h2 className="text-base font-bold text-slate-800">{t('prochat.title')}</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {totalUnread > 0 ? `${totalUnread} não lida${totalUnread > 1 ? 's' : ''}` : 'Tudo em dia'}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {realMode && convosLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" />
          </div>
        )}
        {realMode && !convosLoading && convosError && (
          <p className="text-xs text-slate-400 text-center px-6 py-8">{t('chat.loadError')}</p>
        )}
        {realMode && !convosLoading && !convosError && displayConvos.length === 0 && (
          <div className="flex flex-col items-center text-center px-6 py-10">
            <div className="w-12 h-12 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5 text-[#0D9488]" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">{t('prochat.emptyTitle')}</p>
            <p className="text-xs text-slate-400">{t('prochat.emptyHint')}</p>
          </div>
        )}
        {displayConvos.map(conv => (
          <button
            key={conv.id}
            onClick={() => openConvo(conv.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-slate-50 transition-colors ${
              selectedId === conv.id ? 'bg-[#ECFDF5]' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img src={conv.clientImage} alt={conv.clientName} className="w-11 h-11 rounded-full object-cover" />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.isOnline ? 'bg-green-500' : 'bg-slate-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                  {conv.clientName}
                </span>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{conv.lastTime}</span>
              </div>
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-slate-700' : 'text-slate-400'}`}>{conv.lastMessage}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {conv.tag && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${TAG_CONFIG[conv.tag].color}`}>
                      {TAG_CONFIG[conv.tag].label}
                    </span>
                  )}
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-[#0D9488] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ── chat window ────────────────── */
  const ChatWindow = selected ? (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white flex-shrink-0">
        <button
          onClick={() => setSelectedId(null)}
          className="sm:hidden p-1 -ml-1 text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <img src={selected.clientImage} alt={selected.clientName} className="w-9 h-9 rounded-full object-cover" />
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selected.isOnline ? 'bg-green-500' : 'bg-slate-300'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-tight">{selected.clientName}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            {selected.isOnline
              ? <><Circle className="w-2 h-2 fill-green-500 text-green-500" />Online agora</>
              : 'Offline'}
          </p>
        </div>
        {/* History toggle (mock demo only — service history is not backed yet) */}
        {!realMode && (
        <button
          onClick={() => setShowHistory(h => !h)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
            showHistory
              ? 'bg-[#0D9488] text-white border-[#0D9488]'
              : 'bg-white text-slate-500 border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488]'
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Histórico</span>
        </button>
        )}
      </div>

      {/* History drawer */}
      {!realMode && showHistory && (
        <div className="border-b border-slate-100 bg-slate-50/70 max-h-48 overflow-y-auto flex-shrink-0">
          <PastServicesPanel services={selected.pastServices} clientName={selected.clientName} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white/40 dark:bg-slate-900/30 backdrop-blur-[2px]" style={{ scrollbarWidth: 'none' }}>
        {realMode && messagesLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-[#0D9488]" />
          </div>
        )}
        {realMode && !messagesLoading && selected.messages.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-8">{t('chat.noMessages')}</p>
        )}
        {selected.messages.map((msg, i) => {
          const isPro = msg.sender === 'pro';
          const prevSender = i > 0 ? selected.messages[i - 1].sender : null;
          const showAvatar = !isPro && msg.sender !== prevSender;

          if (msg.type === 'service_done') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">{t('prochat.serviceDone')}</span>
                </div>
              </div>
            );
          }

          if (msg.type === 'proposal_accepted' && !isPro) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="flex items-center gap-2 bg-[#ECFDF5] border border-[#0D9488]/30 rounded-full px-4 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span className="text-xs font-semibold text-[#0D9488]">{t('prochat.clientAccepted')}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isPro ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isPro && (
                <div className="w-7 h-7 flex-shrink-0">
                  {showAvatar && (
                    <img src={selected.clientImage} alt={selected.clientName} className="w-7 h-7 rounded-full object-cover" />
                  )}
                </div>
              )}
              <div className={`flex flex-col gap-1 ${isPro ? 'items-end' : 'items-start'} max-w-[72%]`}>
                {msg.type === 'proposal' && msg.proposal ? (
                  <ProposalBubble proposal={msg.proposal} fromPro={isPro} />
                ) : (
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isPro
                      ? 'bg-[#0D9488] text-white rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white flex-shrink-0 space-y-2">
        {/* Quick action (mock demo only — proposals are not backed yet) */}
        {!realMode && (
        <button
          onClick={() => setShowProposal(true)}
          className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] border border-[#0D9488]/30 bg-[#ECFDF5]/60 hover:bg-[#ECFDF5] rounded-xl px-3 py-1.5 transition-colors"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          {t('prochat.sendProposalBtn')}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        )}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/15 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder={t('prochat.messagePh', { name: selected.clientName.split(' ')[0] })}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={sendText}
            disabled={!inputText.trim() || (realMode && sending)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              inputText.trim() && !(realMode && sending)
                ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {realMode && sending
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Proposal modal */}
      {showProposal && (
        <ProposalModal onSend={sendProposal} onClose={() => setShowProposal(false)} />
      )}
    </div>
  ) : (
    <div className="hidden sm:flex flex-col items-center justify-center h-full text-center px-8 bg-white/35 dark:bg-slate-900/25 backdrop-blur-[2px]">
      <div className="w-16 h-16 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mb-4">
        <Send className="w-7 h-7 text-[#0D9488]" />
      </div>
      <p className="font-semibold text-slate-700 mb-1">{t('prochat.select')}</p>
      <p className="text-sm text-slate-400">{t('prochat.selectHintClient')}</p>
    </div>
  );

  return (
    <div className="flex h-full overflow-hidden">
      <div className={`${selectedId ? 'hidden sm:flex' : 'flex'} sm:w-[260px] w-full flex-col flex-shrink-0`}>
        {SideList}
      </div>
      <div className={`${selectedId ? 'flex' : 'hidden sm:flex'} flex-1 flex-col overflow-hidden`}>
        {ChatWindow}
      </div>
    </div>
  );
}

function now() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
