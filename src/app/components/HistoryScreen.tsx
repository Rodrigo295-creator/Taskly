import { useState } from 'react';
import { Star, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { categoryChipClass } from '@/lib/categoryColors';

type Status = 'concluido' | 'cancelado' | 'em_andamento';

interface ServiceRecord {
  id: string;
  service: string;
  category: string;
  professionalName: string;
  professionalRole: string;
  professionalImage: string;
  date: string;
  duration: string;
  amountPaid: number;
  status: Status;
  rating?: number;
  description: string;
}

const HISTORY: ServiceRecord[] = [
  {
    id: '1',
    service: 'Troca de Disjuntor + Instalação de Tomadas',
    category: 'Elétrica',
    professionalName: 'Roberto Alves',
    professionalRole: 'Eletricista Residencial',
    professionalImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '13 mai. 2026',
    duration: '2h',
    amountPaid: 160,
    status: 'concluido',
    rating: 5,
    description: 'Troca do disjuntor 40A e instalação de duas tomadas novas na sala.',
  },
  {
    id: '2',
    service: 'Faxina Pesada Residencial',
    category: 'Limpeza',
    professionalName: 'Ana Beatriz',
    professionalRole: 'Diarista Especializada',
    professionalImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    date: '9 mai. 2026',
    duration: '1 dia',
    amountPaid: 150,
    status: 'concluido',
    rating: 5,
    description: 'Limpeza completa de 3 quartos, 2 banheiros, sala e cozinha.',
  },
  {
    id: '3',
    service: 'Conserto de Vazamento',
    category: 'Hidráulica',
    professionalName: 'João Oliveira',
    professionalRole: 'Encanador Certificado',
    professionalImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    date: '5 mai. 2026',
    duration: '1h30',
    amountPaid: 280,
    status: 'concluido',
    rating: 4,
    description: 'Troca de sifão e trecho de tubulação embaixo da pia da cozinha.',
  },
  {
    id: '4',
    service: 'Pintura de Quarto com Grafiato',
    category: 'Pintura',
    professionalName: 'Renata Melo',
    professionalRole: 'Pintora Residencial',
    professionalImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80',
    date: '28 abr. 2026',
    duration: '2 dias',
    amountPaid: 475,
    status: 'concluido',
    rating: 5,
    description: 'Pintura de quarto 19m² com grafiato azul. Materiais inclusos.',
  },
  {
    id: '5',
    service: 'Suporte em TI — Configuração de Rede',
    category: 'TI',
    professionalName: 'Felipe Torres',
    professionalRole: 'Suporte em TI',
    professionalImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&q=80',
    date: '20 abr. 2026',
    duration: '1h',
    amountPaid: 100,
    status: 'cancelado',
    description: 'Configuração de roteador e rede doméstica.',
  },
  {
    id: '6',
    service: 'Reparo Elétrico em Andamento',
    category: 'Elétrica',
    professionalName: 'Carlos Mendes',
    professionalRole: 'Eletricista Industrial',
    professionalImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    date: '14 mai. 2026',
    duration: '—',
    amountPaid: 0,
    status: 'em_andamento',
    description: 'Revisão completa do quadro elétrico.',
  },
];

const STATUS_STYLE: Record<Status, { icon: React.ElementType; color: string; bg: string; labelKey: string }> = {
  concluido:    { labelKey: 'status.completed', icon: CheckCircle, color: 'text-green-700',  bg: 'bg-green-50 border-green-100' },
  cancelado:    { labelKey: 'status.cancelled', icon: XCircle,     color: 'text-red-600',    bg: 'bg-red-50 border-red-100' },
  em_andamento: { labelKey: 'status.inProgress', icon: Clock,       color: 'text-[#0D9488]',  bg: 'bg-orange-50 border-orange-100' },
};


function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? 'fill-[#0D9488] text-[#0D9488]' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  );
}

function ServiceCard({ record }: { record: ServiceRecord }) {
  const [expanded, setExpanded] = useState(false);
  const { fmt, t } = useAppSettings();
  const { labelKey, icon: StatusIcon, color, bg } = STATUS_STYLE[record.status];
  const label = t(labelKey);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Main row */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={record.professionalImage}
            alt={record.professionalName}
            className="w-12 h-12 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-800 leading-snug truncate">{record.service}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{record.professionalName} · {record.professionalRole}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0 flex items-center gap-1 ${bg} ${color}`}>
                <StatusIcon className="w-3 h-3" />
                {label}
              </span>
            </div>

            {/* Info row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${categoryChipClass(record.category)}`}>
                {record.category}
              </span>
              <span className="text-xs text-slate-400">{record.date}</span>
              <span className="text-xs text-slate-400">⏱ {record.duration}</span>
            </div>
          </div>
        </div>

        {/* Payment + rating row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 mb-0.5">{t('history.paid')}</p>
            {record.status === 'em_andamento' ? (
              <p className="text-sm font-semibold text-slate-400">{t('history.open')}</p>
            ) : record.status === 'cancelado' ? (
              <p className="text-sm font-semibold text-slate-400">{t('history.notCharged')}</p>
            ) : (
              <p className="text-sm font-bold text-slate-800">
                {fmt(record.amountPaid)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {record.rating && record.status === 'concluido' && (
              <Stars rating={record.rating} />
            )}
            <button
              onClick={() => setExpanded(o => !o)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {expanded ? t('common.less') : t('common.details')}
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-50 pt-3 bg-slate-50/50">
          <p className="text-xs text-slate-500 leading-relaxed">{record.description}</p>
        </div>
      )}
    </div>
  );
}

export function HistoryScreen() {
  const { fmt, t } = useAppSettings();
  const [filter, setFilter] = useState<'todos' | Status>('todos');

  const filtered = filter === 'todos' ? HISTORY : HISTORY.filter(r => r.status === filter);

  const totalPaid = HISTORY
    .filter(r => r.status === 'concluido')
    .reduce((sum, r) => sum + r.amountPaid, 0);

  const completedCount = HISTORY.filter(r => r.status === 'concluido').length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-white border-b border-slate-100 flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-800 mb-4">{t('history.title')}</h2>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#ECFDF5] rounded-xl p-3">
            <p className="text-[10px] text-[#0D9488] font-semibold uppercase tracking-wide">{t('history.totalSpent')}</p>
            <p className="text-base font-bold text-slate-800 mt-1">
              {fmt(totalPaid)}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-[10px] text-green-700 font-semibold uppercase tracking-wide">{t('history.completed')}</p>
            <p className="text-base font-bold text-slate-800 mt-1">{t('history.completedCount', { count: completedCount })}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{t('history.professionals')}</p>
            <p className="text-base font-bold text-slate-800 mt-1">
              {t('history.uniqueCount', { count: new Set(HISTORY.map(r => r.professionalName)).size })}
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {(['todos', 'concluido', 'em_andamento', 'cancelado'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                filter === f
                  ? 'bg-[#0D9488] text-white border-[#0D9488]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488]'
              }`}
            >
              {f === 'todos' ? t('common.all') : t(STATUS_STYLE[f].labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">{t('history.empty')}</p>
            <p className="text-sm text-slate-400">{t('history.tryFilter')}</p>
          </div>
        ) : (
          filtered.map(record => <ServiceCard key={record.id} record={record} />)
        )}
      </div>
    </div>
  );
}
