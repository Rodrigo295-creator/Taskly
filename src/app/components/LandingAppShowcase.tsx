import type { ReactNode } from 'react';
import {
  Home,
  Search,
  MessageCircle,
  History,
  Sparkles,
  Wrench,
  Scissors,
  Star,
  Bell,
  User,
  LayoutDashboard,
  Wallet,
  FileText,
  Zap,
  Calendar,
  TrendingUp,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  Truck,
  Laptop,
} from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { LogoMark } from './Logo';

const MOCK = {
  pro: {
    name: 'Roberto Alves',
    role: 'Eletricista Residencial',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80',
    plan: 'Pro',
    rating: 4.9,
    reviews: 143,
    gross: 'R$ 2.840',
    net: 'R$ 2.641',
    completed: 12,
    acceptRate: 94,
    online: true,
  },
  offer: {
    client: 'Carlos Eduardo',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
    service: 'Instalação de ar-condicionado',
    location: 'Pinheiros, SP',
    budget: 'R$ 250',
    net: 'R$ 232',
    ago: 'há 20 min',
  },
  jobs: [
    {
      client: 'Marcos Vinicius',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      service: 'Tomadas externas',
      when: 'Hoje · 14:00',
      value: 'R$ 160',
      status: 'Agendado',
      statusColor: 'bg-blue-100 text-blue-700',
    },
    {
      client: 'Juliana Melo',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
      service: 'Painel elétrico',
      when: 'Amanhã · 09:00',
      value: 'R$ 220',
      status: 'Agendado',
      statusColor: 'bg-blue-100 text-blue-700',
    },
  ],
  client: {
    name: 'Lucas Ferreira',
    greeting: 'Boa tarde, Lucas',
  },
  categories: [
    { icon: Sparkles, label: 'Limpeza', color: 'bg-[#D9F5F0] text-[#0F766E]' },
    { icon: Wrench, label: 'Reparos', color: 'bg-[#DBEAFE] text-[#B45309]' },
    { icon: Scissors, label: 'Beleza', color: 'bg-[#FCE7F3] text-[#BE185D]' },
    { icon: Truck, label: 'Mudanças', color: 'bg-[#D1FAE5] text-[#047857]' },
    { icon: Laptop, label: 'Tecnologia', color: 'bg-[#E4E7FF] text-[#3730A3]' },
    { icon: Zap, label: 'Elétrica', color: 'bg-[#D1FAE5] text-[#115E59]' },
    { icon: LayoutDashboard, label: 'Montagem', color: 'bg-[#D9F3F8] text-[#0E7490]' },
    { icon: Star, label: 'Outros', color: 'bg-[#EEEAE6] text-[#57534E]' },
  ],
  professionals: [
    {
      name: 'Ana Silva',
      role: 'Diarista Profissional',
      rating: 4.9,
      price: 'R$ 120/h',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      online: true,
      desc: 'Limpeza residencial e pós-obra. Materiais inclusos.',
    },
    {
      name: 'Pedro Costa',
      role: 'Encanador',
      rating: 4.8,
      price: 'R$ 95/h',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
      online: true,
      desc: 'Vazamentos, torneiras e caixa d\'água. Atendo em 2h.',
    },
    {
      name: 'Mariana Lima',
      role: 'Cabeleireira',
      rating: 5.0,
      price: 'R$ 150',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      online: false,
      desc: 'Corte, coloração e escova. Studio em Pinheiros.',
    },
  ],
  chat: {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
    last: 'Confirmado para sábado às 10h!',
    time: '14:32',
    unread: 2,
  },
} as const;

function ProSidebarMini({ active = 'pro-dashboard' }: { active?: string }) {
  const { t } = useAppSettings();
  const links = [
    { id: 'pro-dashboard', icon: LayoutDashboard, label: t('nav.pro.dashboard') },
    { id: 'opportunities', icon: Zap, label: t('nav.opportunities') },
    { id: 'pro-chat', icon: MessageCircle, label: t('nav.pro.chat') },
    { id: 'agenda', icon: Calendar, label: t('nav.agenda') },
    { id: 'pro-financial', icon: Wallet, label: t('nav.pro.financial') },
    { id: 'pro-contracts', icon: FileText, label: t('nav.pro.contracts') },
    { id: 'pro-reviews', icon: Star, label: t('nav.pro.reviews') },
  ];

  return (
    <aside className="flex h-full w-[19%] min-w-[72px] max-w-[140px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
        <LogoMark size={24} />
        <span className="text-[11px] font-bold text-[#0D9488]">Taskly</span>
      </div>
      <div className="border-b border-slate-100 px-3 py-2">
        <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#0D9488]">
          {t('nav.proArea')}
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {links.map(({ id, icon: Icon, label }) => (
          <div
            key={id}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[9px] font-semibold ${
              id === active ? 'bg-[#ECFDF5] text-[#0D9488]' : 'text-slate-500'
            }`}
          >
            <Icon className="h-3 w-3 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-2">
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <img src={MOCK.pro.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold text-slate-800">{MOCK.pro.name}</p>
            <p className="truncate text-[7px] text-slate-400">{MOCK.pro.plan}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function AppPreviewDesktop() {
  const { t } = useAppSettings();

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#EEF2F7] text-left select-none">
        <ProSidebarMini />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-9 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4">
            <span className="text-[10px] font-semibold text-slate-600">{t('nav.pro.dashboard')}</span>
            <div className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-[#ECFDF5]">
              <Bell className="h-3 w-3 text-[#0D9488]" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[6px] font-bold text-white">
                3
              </span>
            </div>
          </header>

          <div className="flex-1 overflow-hidden">
            <div className="bg-[#0F172A] px-5 py-5 text-white">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#0D9488]">{t('pro.area')}</p>
              <h1 className="mt-1 text-[18px] font-bold leading-tight">{t('pro.panelTitle')}</h1>
              <div className="mt-2 flex items-center gap-2">
                <img src={MOCK.pro.avatar} alt="" className="h-8 w-8 rounded-full border-2 border-white/20 object-cover" />
                <div>
                  <p className="text-[10px] font-semibold">
                    {t('pro.greeting')}{' '}
                    <span className="text-green-400">online</span>
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-[8px] text-slate-300">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      {MOCK.pro.rating} · {MOCK.pro.reviews} avaliações
                    </span>
                    <span className="rounded-full bg-[#0D9488]/20 px-1.5 py-0.5 text-[7px] font-bold text-[#5EEAD4]">
                      Plano {MOCK.pro.plan}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 overflow-hidden px-4 py-3">
              <div>
                <p className="text-[10px] font-bold text-slate-800">{t('pro.overview')}</p>
                <p className="text-[8px] text-slate-500">{t('pro.overviewSub')}</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: t('pro.gross'), value: MOCK.pro.gross, sub: t('pro.grossSub'), icon: TrendingUp, color: 'bg-[#D1FAE5] text-[#115E59]', trend: 18 },
                  { label: t('pro.net'), value: MOCK.pro.net, sub: t('pro.netSub', { percent: 7 }), icon: Wallet, color: 'bg-[#D1FAE5] text-[#047857]' },
                  { label: t('pro.completedServices'), value: String(MOCK.pro.completed), sub: t('pro.thisMonth'), icon: CheckCircle, color: 'bg-[#DCEBFF] text-[#1D4ED8]', trend: 8 },
                  { label: t('pro.avgRating'), value: String(MOCK.pro.rating), sub: t('pro.ratingSub'), icon: Star, color: 'bg-[#DBEAFE] text-[#B45309]' },
                ].map(({ label, value, sub, icon: Icon, color, trend }) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                    <div className="mb-1.5 flex items-start justify-between">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${color}`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      {trend !== undefined && (
                        <span className="text-[7px] font-bold text-green-600">+{trend}%</span>
                      )}
                    </div>
                    <p className="text-[13px] font-extrabold text-slate-800">{value}</p>
                    <p className="text-[7px] text-slate-400">{sub}</p>
                    <p className="mt-1 text-[8px] text-slate-500">{label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[9px] font-bold text-slate-800">{t('pro.offers')}</p>
                    <span className="rounded-full bg-[#0D9488] px-1.5 py-0.5 text-[7px] font-bold text-white">1 nova</span>
                  </div>
                  <div className="rounded-lg border border-slate-100 p-2">
                    <div className="flex gap-2">
                      <img src={MOCK.offer.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-bold text-slate-800">{MOCK.offer.service}</p>
                        <p className="text-[7px] text-slate-500">{MOCK.offer.client} · {MOCK.offer.ago}</p>
                        <div className="mt-1 flex items-center gap-1 text-[7px] text-slate-400">
                          <MapPin className="h-2 w-2" />
                          {MOCK.offer.location}
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-[8px] font-bold text-slate-700">{MOCK.offer.budget}</span>
                          <span className="text-[7px] text-emerald-600">Recebe {MOCK.offer.net}</span>
                        </div>
                        <div className="mt-1.5 flex gap-1">
                          <span className="flex-1 rounded-md bg-[#0D9488] py-1 text-center text-[7px] font-bold text-white">
                            {t('pro.accept')}
                          </span>
                          <span className="flex-1 rounded-md bg-slate-100 py-1 text-center text-[7px] font-semibold text-slate-600">
                            {t('pro.ignore')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                  <p className="mb-2 text-[9px] font-bold text-slate-800">{t('pro.upcomingPlural', { count: 2 })}</p>
                  <div className="space-y-1.5">
                    {MOCK.jobs.map((job) => (
                      <div key={job.client} className="flex items-center gap-2 border-b border-slate-50 pb-1.5 last:border-0">
                        <img src={job.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[8px] font-semibold text-slate-800">{job.service}</p>
                          <p className="text-[7px] text-slate-400">{job.client} · {job.when}</p>
                        </div>
                        <div className="text-right">
                          <span className={`rounded-full px-1.5 py-0.5 text-[6px] font-bold ${job.statusColor}`}>
                            {job.status}
                          </span>
                          <p className="mt-0.5 text-[7px] font-bold text-slate-700">{job.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <p className="mb-2 text-[9px] font-bold text-slate-800">{t('pro.performance')}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: t('pro.acceptRate'), value: `${MOCK.pro.acceptRate}%`, width: '94%' },
                    { label: t('pro.onTime'), value: '98%', width: '98%' },
                    { label: t('pro.satisfaction'), value: '4,9/5', width: '96%' },
                  ].map(({ label, value, width }) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-[7px]">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-bold text-slate-700">{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-[#0D9488]" style={{ width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

function AppPreviewMobileClient() {
  const { t } = useAppSettings();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#E8EDF3] text-left select-none">
        <div className="bg-[#0F172A] px-3 pb-3 pt-2 text-white">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold text-white">Taskly</p>
              <p className="text-[9px] text-slate-300">{MOCK.client.greeting} 👋</p>
            </div>
            <div className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold">3</span>
            </div>
          </div>
          <div className="flex h-8 items-center rounded-full bg-[#F5F4F0] px-3">
            <Search className="h-3 w-3 text-slate-400" />
            <span className="ml-2 text-[9px] text-slate-400">{t('hdr.searchPh')}</span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-3 py-2">
          <div className="mb-2 flex items-center justify-between rounded-xl border border-[#0D9488]/10 bg-gradient-to-r from-[#0D9488]/10 to-transparent p-2.5">
            <div>
              <p className="text-[10px] font-bold text-[#0D9488]">Taskly</p>
              <p className="text-[8px] leading-snug text-slate-600">{t('home.banner')}</p>
            </div>
            <Sparkles className="h-4 w-4 text-[#0D9488]/70" />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#0D9488]">{t('home.categories')}</p>
            <span className="text-[8px] font-semibold text-[#0D9488]">{t('home.seeAll')}</span>
          </div>
          <div className="mb-3 grid grid-cols-4 gap-1.5">
            {MOCK.categories.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1 rounded-lg bg-white p-1.5 shadow-sm">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-center text-[7px] font-medium leading-tight text-slate-600">{label}</span>
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#0F172A] p-2.5 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D9488]/20">
              <MapPin className="h-3.5 w-3.5 text-[#0D9488]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[8px] text-slate-300">{t('order.inProgress')}</p>
              <p className="text-[9px] font-semibold">{t('order.sample')}</p>
            </div>
            <span className="rounded-lg bg-white/10 px-2 py-1 text-[7px] font-semibold">{t('order.viewChat')}</span>
          </div>

          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#0D9488]">{t('home.nearby')}</p>
            <span className="text-[8px] text-slate-500">{t('home.recommended')}</span>
          </div>
          <div className="space-y-2">
            {MOCK.professionals.map((pro) => (
              <div key={pro.name} className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <img src={pro.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                    <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${pro.online ? 'bg-green-500' : 'bg-slate-300'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-[9px] font-bold text-slate-900">{pro.name}</p>
                        <p className="text-[7px] text-slate-500">{pro.role}</p>
                      </div>
                      <div className="flex items-center gap-0.5 rounded-md bg-slate-50 px-1 py-0.5">
                        <Star className="h-2.5 w-2.5 fill-[#0D9488] text-[#0D9488]" />
                        <span className="text-[7px] font-semibold">{pro.rating}</span>
                      </div>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[7px] leading-snug text-slate-600">{pro.desc}</p>
                    <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5">
                      <span className="text-[8px] font-bold text-slate-800">{pro.price}</span>
                      <span className="rounded-lg bg-[#0D9488] px-2 py-1 text-[7px] font-bold text-white">
                        {t('common.hire')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav className="flex shrink-0 items-center justify-around border-t border-slate-200 bg-white px-2 py-2">
          {[
            { icon: Home, label: t('nav.home'), active: true },
            { icon: Search, label: t('nav.searchTab') },
            { icon: Bell, label: t('nav.chat'), badge: true },
            { icon: User, label: t('nav.profile') },
          ].map(({ icon: Icon, label, active, badge }) => (
            <div key={label} className="relative flex flex-col items-center gap-0.5">
              <Icon className={`h-4 w-4 ${active ? 'text-[#0D9488]' : 'text-slate-400'}`} />
              <span className={`text-[7px] ${active ? 'font-semibold text-[#0D9488]' : 'text-slate-400'}`}>{label}</span>
              {badge && <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-red-500" />}
            </div>
          ))}
        </nav>
    </div>
  );
}

function AppPreviewMobilePro() {
  const { t } = useAppSettings();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#EEF2F7] text-left select-none">
        <div className="bg-[#0F172A] px-3 py-3 text-white">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[#0D9488]">{t('pro.area')}</span>
            <Bell className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <img src={MOCK.pro.avatar} alt="" className="h-9 w-9 rounded-full border-2 border-white/20 object-cover" />
            <div>
              <p className="text-[10px] font-bold">{MOCK.pro.name}</p>
              <p className="text-[8px] text-slate-300">{MOCK.pro.role}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-[7px] text-green-400 font-semibold">● online</span>
                <span className="rounded bg-[#0D9488]/20 px-1 py-0.5 text-[6px] font-bold text-[#5EEAD4]">Plano Pro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-3 py-2">
          <p className="mb-2 text-[10px] font-bold text-slate-800">{t('pro.overview')}</p>
          <div className="mb-3 grid grid-cols-2 gap-1.5">
            {[
              { label: t('pro.net'), value: MOCK.pro.net, icon: Wallet, color: 'text-emerald-600 bg-emerald-50' },
              { label: t('pro.completedServices'), value: String(MOCK.pro.completed), icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
              { label: t('pro.avgRating'), value: String(MOCK.pro.rating), icon: Star, color: 'text-sky-600 bg-sky-50' },
              { label: t('pro.acceptRate'), value: `${MOCK.pro.acceptRate}%`, icon: Award, color: 'text-violet-600 bg-violet-50' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-2">
                <div className={`mb-1 flex h-5 w-5 items-center justify-center rounded-md ${color}`}>
                  <Icon className="h-2.5 w-2.5" />
                </div>
                <p className="text-[11px] font-extrabold text-slate-800">{value}</p>
                <p className="text-[7px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="mb-2 flex items-center justify-between">
            <p className="text-[9px] font-bold text-slate-800">{t('pro.offers')}</p>
            <span className="rounded-full bg-[#0D9488] px-1.5 py-0.5 text-[6px] font-bold text-white">1</span>
          </div>
          <div className="mb-3 rounded-xl border border-slate-200 bg-white p-2">
            <div className="flex gap-2">
              <img src={MOCK.offer.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold text-slate-800">{MOCK.offer.service}</p>
                <p className="text-[7px] text-slate-500">{MOCK.offer.client}</p>
                <div className="mt-1 flex items-center gap-1 text-[7px] text-slate-400">
                  <MapPin className="h-2 w-2" />{MOCK.offer.location}
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-bold">{MOCK.offer.budget}</span>
                  <span className="text-[7px] text-emerald-600">→ {MOCK.offer.net}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-1">
              <span className="flex-1 rounded-lg bg-[#0D9488] py-1.5 text-center text-[7px] font-bold text-white">{t('pro.accept')}</span>
              <span className="flex-1 rounded-lg bg-slate-100 py-1.5 text-center text-[7px] font-semibold text-slate-600">{t('pro.ignore')}</span>
            </div>
          </div>

          <p className="mb-1.5 text-[9px] font-bold text-slate-800">{t('pro.upcomingPlural', { count: 1 })}</p>
          {MOCK.jobs.slice(0, 1).map((job) => (
            <div key={job.client} className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2">
              <img src={job.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-semibold text-slate-800">{job.service}</p>
                <p className="flex items-center gap-1 text-[7px] text-slate-400">
                  <Clock className="h-2 w-2" />{job.when}
                </p>
              </div>
              <span className="text-[8px] font-bold text-slate-700">{job.value}</span>
            </div>
          ))}

          <div className="rounded-xl border border-slate-200 bg-white p-2">
            <p className="mb-1.5 text-[8px] font-bold text-slate-700">{t('nav.pro.chat')}</p>
            <div className="flex items-center gap-2">
              <img src={MOCK.chat.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-semibold text-slate-800">{MOCK.chat.name}</p>
                <p className="truncate text-[7px] text-slate-500">{MOCK.chat.last}</p>
              </div>
              <div className="text-right">
                <p className="text-[6px] text-slate-400">{MOCK.chat.time}</p>
                <span className="mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0D9488] text-[6px] font-bold text-white">
                  {MOCK.chat.unread}
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className="grid shrink-0 grid-cols-4 border-t border-slate-200 bg-white px-1 py-2">
          {[
            { icon: LayoutDashboard, label: t('nav.pro.dashboard'), active: true },
            { icon: Zap, label: t('nav.opportunities') },
            { icon: MessageCircle, label: t('nav.pro.chat'), badge: true },
            { icon: Wallet, label: t('nav.pro.financial') },
          ].map(({ icon: Icon, label, active, badge }) => (
            <div key={label} className="relative flex flex-col items-center gap-0.5">
              <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#0D9488]' : 'text-slate-400'}`} />
              <span className={`max-w-full truncate text-[6px] ${active ? 'font-semibold text-[#0D9488]' : 'text-slate-400'}`}>{label}</span>
              {badge && <span className="absolute right-2 top-0 h-1.5 w-1.5 rounded-full bg-red-500" />}
            </div>
          ))}
        </nav>
    </div>
  );
}

function MacBookPro16Frame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-t-[1.25rem] border border-[#3f3f46] bg-gradient-to-b from-[#52525b] via-[#3f3f46] to-[#27272a] p-[0.45rem] pb-[0.35rem] shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[0.65rem] border border-black/80 bg-black">
          <div className="relative aspect-[16/10] w-full bg-[#0F172A]">
            <div className="absolute left-1/2 top-[0.35rem] z-20 h-[0.45rem] w-[3.5rem] -translate-x-1/2 rounded-full bg-[#18181b]" />
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-[0.55rem] w-[92%] rounded-b-lg bg-gradient-to-b from-[#27272a] to-[#18181b]" />
      <div className="mx-auto h-[0.2rem] w-[38%] rounded-b-xl bg-[#09090b]" />
    </div>
  );
}

function IPhone17ProMaxFrame({
  children,
  label,
  sublabel,
}: {
  children: ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[11.5rem] sm:w-[12.5rem]">
        <div className="rounded-[2rem] border-[3px] border-[#a8a29e] bg-gradient-to-br from-[#d6d3d1] via-[#a8a29e] to-[#78716c] p-[0.35rem] shadow-2xl shadow-black/40">
          <div className="absolute -left-[2px] top-[4.5rem] h-8 w-[3px] rounded-l bg-[#78716c]" />
          <div className="absolute -left-[2px] top-[6.5rem] h-5 w-[3px] rounded-l bg-[#78716c]" />
          <div className="absolute -left-[2px] top-[8.25rem] h-5 w-[3px] rounded-l bg-[#78716c]" />
          <div className="absolute -right-[2px] top-[6rem] h-10 w-[3px] rounded-r bg-[#78716c]" />
          <div className="overflow-hidden rounded-[1.65rem] border border-black/50 bg-black">
            <div className="relative aspect-[9/19.5] w-full bg-[#0F172A]">
              <div className="absolute left-1/2 top-[0.4rem] z-20 h-[0.55rem] w-[3.2rem] -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute inset-0 overflow-hidden pt-[1.1rem]">{children}</div>
              <div className="pointer-events-none absolute bottom-[0.22rem] left-1/2 z-20 h-[0.18rem] w-[4rem] -translate-x-1/2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-300">{label}</p>
      {sublabel && <p className="mt-0.5 text-[10px] text-slate-500">{sublabel}</p>}
    </div>
  );
}

function GalaxyS25UltraFrame({
  children,
  label,
  sublabel,
}: {
  children: ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[11rem] sm:w-[12rem]">
        <div className="rounded-[1.35rem] border-[3px] border-[#1e293b] bg-gradient-to-br from-[#334155] via-[#1e293b] to-[#0f172a] p-[0.3rem] shadow-2xl shadow-black/40">
          <div className="absolute -right-[2px] top-[5rem] h-12 w-[3px] rounded-r bg-[#0f172a]" />
          <div className="overflow-hidden rounded-[1.05rem] border border-black/60 bg-black">
            <div className="relative aspect-[9/19.8] w-full bg-[#0F172A]">
              <div className="absolute left-1/2 top-[0.45rem] z-20 h-[0.45rem] w-[0.45rem] -translate-x-1/2 rounded-full bg-[#111827] ring-1 ring-[#374151]" />
              <div className="absolute inset-0 overflow-hidden pt-[0.85rem]">{children}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[1.1rem] left-1/2 h-[0.35rem] w-[2.5rem] -translate-x-1/2 rounded-sm bg-[#475569]/80" />
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-300">{label}</p>
      {sublabel && <p className="mt-0.5 text-[10px] text-slate-500">{sublabel}</p>}
    </div>
  );
}

export function LandingAppShowcase() {
  const { t } = useAppSettings();

  return (
    <section
      id="app-preview"
      className="scroll-mt-20 border-y border-white/5 bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A] py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0D9488]/30 bg-[#0D9488]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#5EEAD4]">
            {t('landing.showcase.badge')}
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">{t('landing.showcase.title')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{t('landing.showcase.subtitle')}</p>
        </div>

        <div className="mb-16">
          <div className="mb-5 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('landing.showcase.desktop')}</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
              {t('landing.showcase.desktopDevice')}
            </span>
            <span className="rounded-full bg-[#0D9488]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#5EEAD4]">
              {t('landing.showcase.desktopPro')}
            </span>
          </div>
          <MacBookPro16Frame>
            <AppPreviewDesktop />
          </MacBookPro16Frame>
        </div>

        <div>
          <div className="mb-8 flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('landing.showcase.mobile')}</span>
            <p className="text-center text-xs text-slate-500">{t('landing.showcase.mobileHint')}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-end sm:gap-10 lg:gap-14">
            <IPhone17ProMaxFrame label={t('landing.showcase.iphone')} sublabel={t('landing.showcase.mobileClient')}>
              <AppPreviewMobileClient />
            </IPhone17ProMaxFrame>
            <GalaxyS25UltraFrame label={t('landing.showcase.android')} sublabel={t('landing.showcase.mobilePro')}>
              <AppPreviewMobilePro />
            </GalaxyS25UltraFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
