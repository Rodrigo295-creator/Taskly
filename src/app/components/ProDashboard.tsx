import { useState } from 'react';
import {
  TrendingUp, Star, CheckCircle, Clock, Bell,
  ChevronRight, MessageCircle, MapPin, Calendar,
  Zap, Award, Target, ArrowUp, ArrowDown,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { ProPayoutBreakdown } from './ProPayoutBreakdown';
import { calcServicePayout, getProFeePercent } from '@/lib/pro-plan-session';

/* ── types & data ────────────────────────────────────────────────── */

type ServiceStatus = 'pendente' | 'agendado' | 'concluido';

interface Offer {
  id: string;
  clientName: string;
  clientImage: string;
  service: string;
  category: string;
  location: string;
  budget: number;
  postedAgo: string;
  description: string;
}

interface Job {
  id: string;
  clientName: string;
  clientImage: string;
  service: string;
  date: string;
  time?: string;
  location: string;
  value: number;
  status: ServiceStatus;
}

interface Notification {
  id: string;
  text: string;
  time: string;
  type: 'offer' | 'payment' | 'review' | 'message';
  read: boolean;
}

const OFFERS: Offer[] = [
  {
    id: 'o1',
    clientName: 'Carlos Eduardo',
    clientImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de ar-condicionado',
    category: 'Elétrica',
    location: 'Pinheiros, SP',
    budget: 250,
    postedAgo: 'há 20 min',
    description: 'Preciso instalar um split 12.000 BTUs. Já tenho o equipamento, só precisa da mão de obra.',
  },
  {
    id: 'o2',
    clientName: 'Fernanda Souza',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    service: 'Troca de fiação elétrica',
    category: 'Elétrica',
    location: 'Vila Madalena, SP',
    budget: 400,
    postedAgo: 'há 1h',
    description: 'Apartamento 70m², fiação antiga com problemas frequentes. Precisa substituição completa.',
  },
  {
    id: 'o3',
    clientName: 'Ricardo Lima',
    clientImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
    service: 'Revisão quadro elétrico',
    category: 'Elétrica',
    location: 'Moema, SP',
    budget: 180,
    postedAgo: 'há 3h',
    description: 'Disjuntor cai frequentemente. Necessário diagnóstico e eventual substituição.',
  },
];

const JOBS: Job[] = [
  {
    id: 'j1',
    clientName: 'Marcos Vinicius',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de tomadas externas',
    date: 'Hoje',
    time: '14:00',
    location: 'Brooklin, SP',
    value: 160,
    status: 'agendado',
  },
  {
    id: 'j2',
    clientName: 'Juliana Melo',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
    service: 'Reparo em painel elétrico',
    date: 'Amanhã',
    time: '09:00',
    location: 'Itaim Bibi, SP',
    value: 220,
    status: 'agendado',
  },
  {
    id: 'j3',
    clientName: 'Paulo Henrique',
    clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    service: 'Troca de disjuntor + tomadas',
    date: '16 mai.',
    location: 'Lapa, SP',
    value: 190,
    status: 'pendente',
  },
  {
    id: 'j4',
    clientName: 'Amanda Costa',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de chuveiro elétrico',
    date: '10 mai.',
    location: 'Perdizes, SP',
    value: 140,
    status: 'concluido',
  },
  {
    id: 'j5',
    clientName: 'Lucas Ferreira',
    clientImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80',
    service: 'Fiação sala e quartos',
    date: '7 mai.',
    location: 'Santo André, SP',
    value: 380,
    status: 'concluido',
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: 'Nova oferta de serviço em Pinheiros', time: 'há 20 min', type: 'offer', read: false },
  { id: 'n2', text: 'Pagamento de R$ 380,00 liberado — Lucas Ferreira', time: 'há 2h', type: 'payment', read: false },
  { id: 'n3', text: 'Amanda Costa avaliou seu serviço com ⭐ 5', time: 'há 3h', type: 'review', read: false },
  { id: 'n4', text: 'Juliana Melo enviou uma mensagem', time: 'ontem', type: 'message', read: true },
];

const STATUS_CONFIG: Record<ServiceStatus, { label: string; color: string; bg: string; dot: string }> = {
  agendado:  { label: 'Agendado',  color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-100',   dot: 'bg-blue-500' },
  pendente:  { label: 'Pendente',  color: 'text-[#FF5A12]',   bg: 'bg-orange-50 border-orange-100', dot: 'bg-[#FF5A12]' },
  concluido: { label: 'Concluído', color: 'text-green-700',   bg: 'bg-green-50 border-green-100',  dot: 'bg-green-500' },
};

const NOTIF_COLORS: Record<Notification['type'], string> = {
  offer:   'bg-[#FFF0E6] text-[#FF5A12]',
  payment: 'bg-green-50 text-green-600',
  review:  'bg-yellow-50 text-yellow-600',
  message: 'bg-blue-50 text-blue-500',
};

const NOTIF_ICONS: Record<Notification['type'], React.ElementType> = {
  offer:   Zap,
  payment: TrendingUp,
  review:  Star,
  message: MessageCircle,
};

/* ── sub-components ─────────────────────────────────────────────── */

function StatCard({
  label, value, sub, icon: Icon, trend, color,
}: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; trend?: number; color: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-xl font-extrabold text-slate-800 dark:text-white leading-none">{value}</p>
      {sub && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{label}</p>
    </div>
  );
}

function OfferCard({
  offer, onAccept, onIgnore,
}: { offer: Offer; onAccept: (id: string) => void; onIgnore: (id: string) => void }) {
  const { t } = useAppSettings();
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 hover:shadow-md dark:hover:border-slate-600 transition-shadow">
      <div className="flex items-start gap-3">
        <img src={offer.clientImage} alt={offer.clientName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">{offer.service}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{offer.clientName} · {offer.postedAgo}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{offer.location}</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{offer.description}</p>
          <div className="mt-3">
            <ProPayoutBreakdown gross={offer.budget} />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onAccept(offer.id)}
              className="flex-1 bg-[#FF5A12] hover:bg-[#E04E0E] text-white text-xs font-semibold py-2 rounded-xl transition-colors"
            >
              {t('pro.accept')}
            </button>
            <button
              onClick={() => onIgnore(offer.id)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold py-2 rounded-xl transition-colors"
            >
              {t('pro.ignore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobRow({ job }: { job: Job }) {
  const { fmt, t } = useAppSettings();
  const { label, color, bg, dot } = STATUS_CONFIG[job.status];
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <img src={job.clientImage} alt={job.clientName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{job.service}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">{job.clientName}</span>
          {job.time && (
            <>
              <span className="text-slate-200">·</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />{job.date} {job.time}
              </span>
            </>
          )}
          {!job.time && <span className="text-xs text-slate-400">{job.date}</span>}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${bg} ${color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          {label}
        </span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{fmt(job.value, { decimals: 0 })}</span>
      </div>
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────────── */

export function ProDashboard() {
  const { fmt, t } = useAppSettings();
  const [offers, setOffers] = useState<Offer[]>(OFFERS);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [jobFilter, setJobFilter] = useState<'todos' | ServiceStatus>('todos');

  const acceptOffer = (id: string) => setOffers(o => o.filter(x => x.id !== id));
  const ignoreOffer = (id: string) => setOffers(o => o.filter(x => x.id !== id));
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredJobs = jobFilter === 'todos' ? JOBS : JOBS.filter(j => j.status === jobFilter);
  const completedJobs = JOBS.filter(j => j.status === 'concluido');
  const totalEarned = completedJobs.reduce((s, j) => s + j.value, 0);
  const feePct = getProFeePercent();
  const totalNet = completedJobs.reduce((s, j) => s + calcServicePayout(j.value).net, 0);
  const upcomingJobs = JOBS.filter(j => j.status === 'agendado' || j.status === 'pendente');

  return (
    <article className="w-full bg-gradient-to-b from-slate-50 to-[#eef2f7] dark:from-slate-950 dark:to-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none">
      <header className="relative bg-[#0f172a] text-white px-6 py-10 sm:px-10 sm:py-12 lg:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(249,115,22,0.22),transparent)] pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5A12] mb-3">{t('pro.area')}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">{t('pro.panelTitle')}</h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Olá, Roberto 👋 Eletricista Residencial · <span className="text-green-400 font-semibold">online</span>
            </p>
          </div>
          <button
            type="button"
            className="relative shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/15 transition-colors"
            onClick={markAllRead}
          >
            <Bell className="w-[18px] h-[18px] text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#FF5A12] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="px-5 sm:px-8 lg:px-10 py-8 lg:py-12 space-y-10 lg:space-y-14">
        <section aria-labelledby="dash-kpi-heading">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
            <h2 id="dash-kpi-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('pro.overview')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('pro.overviewSub')}</p>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              label={t('pro.gross')}
              value={fmt(totalEarned, { decimals: 0 })}
              sub={t('pro.grossSub')}
              icon={TrendingUp}
              trend={12}
              color="bg-[#FFF0E6] text-[#FF5A12]"
            />
            <StatCard
              label={t('pro.net')}
              value={fmt(totalNet, { decimals: 0 })}
              sub={t('pro.netSub', { percent: feePct })}
              icon={Target}
              trend={12}
              color="bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
            />
            <StatCard
              label={t('pro.completedServices')}
              value={String(completedJobs.length)}
              sub={t('pro.thisMonth')}
              icon={CheckCircle}
              color="bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
            />
            <StatCard
              label={t('pro.avgRating')}
              value="4.9"
              sub={t('pro.ratingSub')}
              icon={Star}
              color="bg-yellow-50 text-yellow-500 dark:bg-yellow-950/40 dark:text-yellow-400"
            />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF5A12]" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('pro.performance')}</h2>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">Maio 2026</span>
          </div>
          <div className="space-y-4">
            {[
              { label: t('pro.acceptRate'), value: 78, color: 'bg-[#FF5A12]' },
              { label: t('pro.onTime'), value: 95, color: 'bg-green-500' },
              { label: t('pro.satisfaction'), value: 98, color: 'bg-blue-500' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid xl:grid-cols-12 gap-10 xl:gap-12 items-start">
          <div className="xl:col-span-7 space-y-10 lg:space-y-12">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FF5A12]" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{t('pro.offers')}</h2>
                  {offers.length > 0 && (
                    <span className="min-w-[22px] h-[22px] px-1.5 bg-[#FF5A12] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                      {offers.length}
                    </span>
                  )}
                </div>
                <span className="text-sm text-slate-400 dark:text-slate-500">{t('pro.inYourArea')}</span>
              </div>
              {offers.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center">
                  <CheckCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('pro.noOffers')}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} onAccept={acceptOffer} onIgnore={ignoreOffer} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#FF5A12]" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{t('pro.myServices')}</h2>
                </div>
                {upcomingJobs.length > 0 && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {upcomingJobs.length > 1
                      ? t('pro.upcomingPlural', { count: upcomingJobs.length })
                      : t('pro.upcoming', { count: upcomingJobs.length })}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {(['todos', 'agendado', 'pendente', 'concluido'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setJobFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                      jobFilter === f
                        ? 'bg-[#FF5A12] text-white border-[#FF5A12]'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-[#FF5A12]/60'
                    }`}
                  >
                    {f === 'todos' ? t('common.all') : t(f === 'agendado' ? 'status.scheduled' : f === 'pendente' ? 'status.pending' : 'status.completed')}
                  </button>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 shadow-sm dark:shadow-none">
                {filteredJobs.length === 0 ? (
                  <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">{t('pro.noJobsInFilter')}</p>
                ) : (
                  filteredJobs.map((job) => <JobRow key={job.id} job={job} />)
                )}
              </div>
            </section>
          </div>

          <div className="xl:col-span-5 space-y-10 lg:space-y-12">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#FF5A12]" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{t('pro.notifications')}</h2>
                  {unreadCount > 0 && (
                    <span className="min-w-[22px] h-[22px] px-1.5 bg-[#EF4444] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button type="button" onClick={markAllRead} className="text-xs text-[#FF5A12] font-semibold hover:underline">
                    {t('pro.markAllRead')}
                  </button>
                )}
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                {notifications.map((n) => {
                  const Icon = NOTIF_ICONS[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                        !n.read ? 'bg-slate-50/80 dark:bg-slate-800/40' : ''
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${NOTIF_COLORS[n.type]} dark:opacity-90`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!n.read ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {n.text}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-[#FF5A12] rounded-full flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">{t('pro.shortcuts')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                {[
                  { label: t('pro.viewMessages'), icon: MessageCircle, sub: t('pro.unreadOne'), color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400' },
                  { label: t('pro.mySchedule'), icon: Calendar, sub: t('pro.upcomingPlural', { count: upcomingJobs.length }), color: 'text-[#FF5A12] bg-[#FFF0E6] dark:bg-[#FF5A12]/15' },
                  { label: t('pro.reviews'), icon: Star, sub: t('pro.avg49'), color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 dark:text-yellow-400' },
                  { label: t('pro.statement'), icon: TrendingUp, sub: t('pro.netAmount', { amount: fmt(totalNet, { decimals: 0 }) }), color: 'text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400' },
                ].map(({ label, icon: Icon, sub, color }) => (
                  <button
                    key={label}
                    type="button"
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-left hover:shadow-md dark:hover:border-slate-600 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon className="w-[18px] h-[18px]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
