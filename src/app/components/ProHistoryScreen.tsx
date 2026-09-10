import { useState } from 'react';
import {
  Clock, MapPin, Star, ChevronDown, ChevronUp,
  TrendingUp, CheckCircle, XCircle, Banknote, Timer,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { categoryChipClass } from '@/lib/categoryColors';

/* ── types & data ────────────────────────────────────────────────── */

type Status = 'concluido' | 'cancelado';

interface ServiceRecord {
  id: string;
  clientName: string;
  clientImage: string;
  service: string;
  category: string;
  date: string;
  durationMin: number;
  charged: number;
  netReceived: number;
  location: string;
  status: Status;
  rating?: number;
  ratingComment?: string;
  materials?: string;
  notes?: string;
}

const RECORDS: ServiceRecord[] = [
  {
    id: 'r1',
    clientName: 'Marcos Vinicius',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de tomadas externas',
    category: 'Elétrica',
    date: '13 mai. 2026',
    durationMin: 90,
    charged: 160,
    netReceived: 148.8,
    location: 'Brooklin, SP',
    status: 'concluido',
    rating: 5,
    ratingComment: 'Serviço impecável, pontual e muito profissional. Super recomendo!',
    materials: 'Tomadas externas (2 un.), caixinhas de sobrepor, fios 2,5mm',
    notes: 'Cliente solicitou tomadas de alto padrão. Instalação em parede de concreto com furação dupla.',
  },
  {
    id: 'r2',
    clientName: 'Juliana Melo',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
    service: 'Reparo em painel elétrico',
    category: 'Elétrica',
    date: '10 mai. 2026',
    durationMin: 75,
    charged: 220,
    netReceived: 204.6,
    location: 'Itaim Bibi, SP',
    status: 'concluido',
    rating: 5,
    ratingComment: 'Identificou o problema em minutos. Nota 10!',
    materials: 'Disjuntor 40A, barramento, fios terra',
    notes: 'Disjuntor estava com folga nos contatos. Substituição completa do disjuntor principal.',
  },
  {
    id: 'r3',
    clientName: 'Amanda Costa',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de chuveiro elétrico',
    category: 'Elétrica',
    date: '7 mai. 2026',
    durationMin: 50,
    charged: 140,
    netReceived: 130.2,
    location: 'Perdizes, SP',
    status: 'concluido',
    rating: 4,
    ratingComment: 'Rápido e bem feito. Chegou um pouco atrasado, mas compensou.',
    materials: 'Fio 6mm², disjuntor 40A bipolar',
    notes: 'Instalação de chuveiro 7.500W. Fiação anterior subdimensionada. Necessária troca do circuito.',
  },
  {
    id: 'r4',
    clientName: 'Lucas Ferreira',
    clientImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80',
    service: 'Fiação completa sala e quartos',
    category: 'Elétrica',
    date: '5 mai. 2026',
    durationMin: 480,
    charged: 380,
    netReceived: 353.4,
    location: 'Santo André, SP',
    status: 'concluido',
    rating: 5,
    ratingComment: 'Trabalho excelente! Casa toda nova. Valeu cada centavo.',
    materials: 'Fios 2,5mm² e 4mm² (80m), eletrodutos, tomadas, interruptores, caixinhas',
    notes: 'Obra de reforma. Três quartos + sala. Passagem de eletroduto em parede de alvenaria.',
  },
  {
    id: 'r5',
    clientName: 'Ricardo Lima',
    clientImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
    service: 'Diagnóstico e revisão elétrica',
    category: 'Elétrica',
    date: '28 abr. 2026',
    durationMin: 60,
    charged: 180,
    netReceived: 167.4,
    location: 'Moema, SP',
    status: 'concluido',
    rating: 5,
    ratingComment: 'Muito detalhista. Identificou problemas que outros não viram.',
    materials: 'Disjuntor 20A (substituição), fita isolante, abraçadeiras',
    notes: 'Revisão preventiva em apartamento de 80m². Detectado curto em circuito de iluminação.',
  },
  {
    id: 'r6',
    clientName: 'Fernanda Souza',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de ar-condicionado split',
    category: 'Elétrica',
    date: '20 abr. 2026',
    durationMin: 120,
    charged: 250,
    netReceived: 232.5,
    location: 'Vila Madalena, SP',
    status: 'concluido',
    rating: 5,
    ratingComment: 'Ótimo serviço, muito cuidadoso com a limpeza do ambiente.',
    materials: 'Fio 4mm² (12m), disjuntor 20A bipolar, suporte externo',
    notes: 'Split 12.000 BTUs. Furação na parede de 13cm para passagem do duto.',
  },
  {
    id: 'r7',
    clientName: 'Paulo Henrique',
    clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    service: 'Troca de disjuntor + 3 tomadas',
    category: 'Elétrica',
    date: '14 abr. 2026',
    durationMin: 85,
    charged: 190,
    netReceived: 176.7,
    location: 'Lapa, SP',
    status: 'cancelado',
    notes: 'Cliente cancelou 2h antes do horário por motivo pessoal. Taxa de cancelamento não aplicada a pedido.',
  },
  {
    id: 'r8',
    clientName: 'Carlos Eduardo',
    clientImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
    service: 'Revisão elétrica pré-vistoria',
    category: 'Elétrica',
    date: '9 abr. 2026',
    durationMin: 100,
    charged: 200,
    netReceived: 186,
    location: 'Pinheiros, SP',
    status: 'concluido',
    rating: 4,
    ratingComment: 'Bom trabalho, comunicação poderia ser melhor.',
    materials: 'Interruptores (3 un.), espelhos, tomadas ABNT',
    notes: 'Adequação para laudo elétrico imobiliário. Substituição de componentes fora da norma ABNT NBR 5410.',
  },
];


function fmtDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= n ? 'fill-[#0D9488] text-[#0D9488]' : 'fill-slate-200 text-slate-200'}`} />
      ))}
    </div>
  );
}

function RecordCard({ rec }: { rec: ServiceRecord }) {
  const { fmt } = useAppSettings();
  const [open, setOpen] = useState(false);
  const done = rec.status === 'concluido';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img src={rec.clientImage} alt={rec.clientName}
            className="w-11 h-11 rounded-2xl object-cover border border-slate-100 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-800 leading-snug truncate">{rec.service}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{rec.clientName}</p>
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0 ${
                done ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {done ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {done ? 'Concluído' : 'Cancelado'}
              </span>
            </div>

            {/* meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryChipClass(rec.category)}`}>
                {rec.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />{rec.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Timer className="w-3 h-3" />{fmtDuration(rec.durationMin)}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="w-3 h-3" />{rec.location}
              </span>
            </div>
          </div>
        </div>

        {/* bottom row: financials + rating + expand */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] text-slate-400">Cobrado</p>
              <p className="text-sm font-bold text-slate-800">{fmt(rec.charged)}</p>
            </div>
            {done && (
              <div>
                <p className="text-[10px] text-slate-400">Líquido (−7%)</p>
                <p className="text-sm font-semibold text-green-600">{fmt(rec.netReceived)}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {rec.rating && <Stars n={rec.rating} />}
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {open ? 'Menos' : 'Detalhes'}
              {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* expanded */}
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-4 space-y-3">
          {rec.ratingComment && (
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Avaliação do cliente</p>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rec.ratingComment}"</p>
            </div>
          )}
          {rec.materials && (
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Materiais utilizados</p>
              <p className="text-xs text-slate-600 leading-relaxed">{rec.materials}</p>
            </div>
          )}
          {rec.notes && (
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Observações técnicas</p>
              <p className="text-xs text-slate-600 leading-relaxed">{rec.notes}</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-white border border-slate-100 rounded-xl p-2 text-center">
              <p className="text-[10px] text-slate-400">Duração</p>
              <p className="text-xs font-bold text-slate-700 mt-0.5">{fmtDuration(rec.durationMin)}</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-2 text-center">
              <p className="text-[10px] text-slate-400">Cobrado</p>
              <p className="text-xs font-bold text-slate-700 mt-0.5">{fmt(rec.charged, { decimals: 0 })}</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-2 text-center">
              <p className="text-[10px] text-slate-400">Por hora</p>
              <p className="text-xs font-bold text-[#0D9488] mt-0.5">
                {fmt(rec.charged / (rec.durationMin / 60), { decimals: 0 })}/h
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────────── */

type Filter = 'todos' | 'concluido' | 'cancelado';

export function ProHistoryScreen() {
  const { fmt, t } = useAppSettings();
  const [filter, setFilter] = useState<Filter>('todos');

  const done    = RECORDS.filter(r => r.status === 'concluido');
  const visible = filter === 'todos' ? RECORDS : RECORDS.filter(r => r.status === filter);

  const totalCharged  = done.reduce((s, r) => s + r.charged, 0);
  const totalNet      = done.reduce((s, r) => s + r.netReceived, 0);
  const totalMinutes  = done.reduce((s, r) => s + r.durationMin, 0);
  const avgRating     = done.filter(r => r.rating).reduce((s, r) => s + (r.rating ?? 0), 0) / (done.filter(r => r.rating).length || 1);
  const avgHourlyRate = totalCharged / (totalMinutes / 60);

  return (
    <div className="flex flex-col min-h-0 w-full -mx-4 sm:mx-0 sm:rounded-2xl sm:border sm:border-slate-200/80 dark:sm:border-slate-700/80 overflow-hidden bg-white/50 dark:bg-slate-900/35 backdrop-blur-[2px]">

      {/* header + summary */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 pt-5 pb-4 flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{t('pro.historyTitle')}</h2>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-[#ECFDF5] rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Banknote className="w-3.5 h-3.5 text-[#0D9488]" />
              <p className="text-[10px] font-semibold text-[#0D9488] uppercase tracking-wide">Faturado</p>
            </div>
            <p className="text-base font-extrabold text-slate-800">{fmt(totalCharged)}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Líq. {fmt(totalNet)}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">Concluídos</p>
            </div>
            <p className="text-base font-extrabold text-slate-800">{done.length} serviços</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{RECORDS.filter(r=>r.status==='cancelado').length} cancelado(s)</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Timer className="w-3.5 h-3.5 text-blue-500" />
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">Tempo total</p>
            </div>
            <p className="text-base font-extrabold text-slate-800">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min</p>
            <p className="text-[10px] text-slate-500 mt-0.5">média {fmtDuration(Math.round(totalMinutes / (done.length || 1)))} /serviço</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-yellow-500" />
              <p className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wide">Média hora</p>
            </div>
            <p className="text-base font-extrabold text-slate-800">{fmt(avgHourlyRate, { decimals: 0 })}/h</p>
            <p className="text-[10px] text-slate-500 mt-0.5">avaliação {avgRating.toFixed(1)} ★</p>
          </div>
        </div>

        {/* filter tabs */}
        <div className="flex gap-2">
          {(['todos', 'concluido', 'cancelado'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                filter === f
                  ? 'bg-[#0D9488] text-white border-[#0D9488]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488]'
              }`}
            >
              {f === 'todos' ? 'Todos' : f === 'concluido' ? 'Concluídos' : 'Cancelados'}
              <span className="ml-1.5 opacity-70">
                ({f === 'todos' ? RECORDS.length : RECORDS.filter(r => r.status === f).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="flex-1 min-h-[280px] overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Clock className="w-10 h-10 text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-500">Nenhum registro aqui.</p>
          </div>
        ) : (
          visible.map(rec => <RecordCard key={rec.id} rec={rec} />)
        )}
      </div>
    </div>
  );
}
