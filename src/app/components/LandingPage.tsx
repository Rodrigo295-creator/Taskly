import { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  MessageCircle,
  Search,
  Shield,
  Star,
  Sparkles,
  Wrench,
  Truck,
  Scissors,
  Laptop,
  PawPrint,
  Wallet,
  LayoutDashboard,
  UserCheck,
  ChevronRight,
  ChevronDown,
  Percent,
  User,
  Clock,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { HERO_SLIDES, LandingAnimatedBackground } from './LandingAnimatedBackground';
import { LandingAppShowcase } from './LandingAppShowcase';
import { Logo, LogoMark, BrandName } from './Logo';
import { useAppSettings } from '../context/AppSettings';
import { PLANS } from '@/data/plans';
import { calcServicePayout } from '@/lib/pro-plan-session';
import { INSTAGRAM_URL, TIKTOK_URL } from '@/lib/social-links';
import type { AuthUserType } from '@/lib/auth-session';

interface Props {
  onSignIn: () => void;
  onStart: (userType: AuthUserType, mode: 'login' | 'signup') => void;
  onEnterApp?: () => void;
}

const FEATURE_KEYS = [
  { icon: MessageCircle, title: 'landing.features.chat.title', desc: 'landing.features.chat.desc', accent: 'from-teal-600 to-teal-800' },
  { icon: Wallet, title: 'landing.features.pay.title', desc: 'landing.features.pay.desc', accent: 'from-emerald-600 to-teal-700' },
  { icon: Search, title: 'landing.features.track.title', desc: 'landing.features.track.desc', accent: 'from-sky-600 to-blue-700' },
  { icon: Shield, title: 'landing.features.verify.title', desc: 'landing.features.verify.desc', accent: 'from-amber-500 to-[#FF5A12]' },
  { icon: LayoutDashboard, title: 'landing.features.dash.title', desc: 'landing.features.dash.desc', accent: 'from-rose-500 to-[#E04E0E]' },
  { icon: Star, title: 'landing.features.grow.title', desc: 'landing.features.grow.desc', accent: 'from-[#FF5A12] to-amber-500' },
] as const;

const CATEGORIES = [
  {
    key: 'landing.cat.cleaning',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop',
    tint: 'from-teal-700/90 to-teal-950/80',
  },
  {
    key: 'landing.cat.repair',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504149922750-4d6b49f71155?w=800&q=80&auto=format&fit=crop',
    tint: 'from-amber-600/90 to-orange-900/80',
  },
  {
    key: 'landing.cat.beauty',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop',
    tint: 'from-rose-600/90 to-rose-950/80',
  },
  {
    key: 'landing.cat.moving',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1600518464441-956588961cff?w=800&q=80&auto=format&fit=crop',
    tint: 'from-emerald-600/90 to-teal-900/80',
  },
  {
    key: 'landing.cat.tech',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop',
    tint: 'from-slate-700/90 to-[#0F172A]/90',
  },
  {
    key: 'landing.cat.pet',
    icon: PawPrint,
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80&auto=format&fit=crop',
    tint: 'from-[#FF5A12]/90 to-amber-900/80',
  },
] as const;

const PLAN_LABELS: Record<string, string> = {
  basic: 'landing.fees.planBasic',
  pro: 'landing.fees.planPro',
  premium: 'landing.fees.planPremium',
};

const FAQ_KEYS = [
  { q: 'landing.faq.q1', a: 'landing.faq.a1' },
  { q: 'landing.faq.q2', a: 'landing.faq.a2' },
  { q: 'landing.faq.q3', a: 'landing.faq.a3' },
  { q: 'landing.faq.q4', a: 'landing.faq.a4' },
  { q: 'landing.faq.q5', a: 'landing.faq.a5' },
  { q: 'landing.faq.q6', a: 'landing.faq.a6' },
  { q: 'landing.faq.q7', a: 'landing.faq.a7' },
  { q: 'landing.faq.q8', a: 'landing.faq.a8' },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.71 4.71 0 0 1-1-.48z" />
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm sm:text-base text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <span className="pr-2">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#FF5A12] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
          {answer}
        </p>
      )}
    </div>
  );
}

export function LandingPage({ onSignIn, onStart, onEnterApp }: Props) {
  const { t, resolvedTheme, fmt, reduceMotion, animations } = useAppSettings();
  const isDark = resolvedTheme === 'dark';
  const motionEnabled = animations && !reduceMotion;
  const year = new Date().getFullYear();
  const [slideIndex, setSlideIndex] = useState(0);

  const exampleGross = 200;
  const examplePayout = calcServicePayout(exampleGross, 7);

  const stats = [
    { value: '2.400+', label: t('landing.stats.verified'), color: 'text-[#FF5A12]' },
    { value: '40+', label: t('landing.stats.categories'), color: 'text-teal-600' },
    { value: '100%', label: t('landing.stats.secure'), color: 'text-emerald-600' },
    { value: '4,8', label: t('landing.stats.rating'), color: 'text-amber-600' },
  ];

  const steps = [
    { icon: Search, n: '01', title: 'landing.how.step1.title', desc: 'landing.how.step1.desc', ring: 'ring-teal-500/30 bg-teal-500/10 text-teal-700' },
    { icon: MessageCircle, n: '02', title: 'landing.how.step2.title', desc: 'landing.how.step2.desc', ring: 'ring-[#FF5A12]/30 bg-[#FFF0E6] text-[#C2410C]' },
    { icon: Shield, n: '03', title: 'landing.how.step3.title', desc: 'landing.how.step3.desc', ring: 'ring-emerald-500/30 bg-emerald-500/10 text-emerald-700' },
  ] as const;

  const navLinks = [
    ['how-it-works', 'landing.nav.how'],
    ['features', 'landing.nav.features'],
    ['pricing', 'landing.nav.pricing'],
    ['faq', 'landing.nav.faq'],
    ['for-pros', 'landing.nav.pro'],
  ] as const;

  return (
    <div
      className={`min-h-screen flex flex-col overflow-x-hidden ${
        isDark ? 'dark bg-[#020617] text-slate-100' : 'bg-[#F6F3EF] text-[#0F172A]'
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="shrink-0 [&_span]:text-white">
            <Logo />
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(([id, labelKey]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {t(labelKey)}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEnterApp ?? onSignIn}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-200 hover:text-[#FFB070] transition-colors"
            >
              {t('landing.nav.signIn')}
            </button>
            <button
              type="button"
              onClick={onEnterApp ?? onSignIn}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FF5A12] via-[#FB923C] to-amber-400 text-white hover:opacity-95 shadow-lg shadow-[#FF5A12]/40 transition-opacity"
            >
              {t('landing.nav.enterApp')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero with slideshow */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0F172A] text-white">
        <LandingAnimatedBackground slideIndex={slideIndex} onSlideIndexChange={setSlideIndex} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF5A12]/25 to-teal-500/15 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#FFB070] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {t('landing.hero.badge')}
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] max-w-2xl">
                {t('landing.hero.title')}{' '}
                <span className="text-[#FF5A12]">
                  {t('landing.hero.titleHighlight')}
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
                {t('landing.hero.subtitle')}
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onStart('client', 'signup')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#FF5A12] to-amber-400 text-[#0F172A] font-bold hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#FF5A12]/40 transition-transform"
                >
                  {t('landing.hero.ctaClient')}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onStart('pro', 'signup')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-teal-400/50 bg-teal-500/10 text-white font-bold hover:bg-teal-500/20 backdrop-blur-sm transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-teal-300" />
                  {t('landing.hero.ctaPro')}
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {[t('auth.client.bullet4'), t('auth.client.bullet2'), t('landing.fees.clientNote')].map((text) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {text.length > 52 ? `${text.slice(0, 50)}…` : text}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-black/30">
                <div className="flex items-center gap-3 mb-5">
                  <LogoMark size={52} />
                  <div>
                    <BrandName size="lg" onDark />
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{t('brand.tagline')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-3 rounded-xl border ${
                        plan.popular
                          ? 'border-[#FF5A12]/50 bg-[#FF5A12]/15'
                          : 'border-white/10 bg-[#0F172A]/40'
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">{t(PLAN_LABELS[plan.id])}</p>
                      <p className="text-2xl font-black text-[#FFB070]">{plan.feePercent}%</p>
                      <p className="text-[10px] text-slate-400">{t('landing.fees.perService')}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { icon: UserCheck, label: t('auth.client.bullet4'), color: 'text-emerald-400' },
                    { icon: MessageCircle, label: t('auth.client.bullet3'), color: 'text-teal-300' },
                    { icon: Shield, label: t('landing.fees.holdBody'), color: 'text-amber-300' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-[#0F172A]/50 border border-white/5">
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${color}`} />
                      <span className="text-xs text-slate-300 leading-relaxed line-clamp-2">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide dots */}
          <div className="flex gap-2 mt-12">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlideIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === slideIndex ? 'w-10 bg-[#FF5A12]' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats — gradient band */}
      <section className="relative bg-gradient-to-r from-[#FF5A12] via-amber-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-[#0F172A]/10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-black drop-shadow-sm">{value}</p>
              <p className="mt-1 text-sm font-medium text-white/90">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-[#FF5A12]/5 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('landing.how.title')}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{t('landing.how.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, n, title, desc, ring }) => (
              <article
                key={n}
                className="relative p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-[#1e293b]/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl font-black text-slate-100 dark:text-white/5 absolute top-4 right-4">{n}</span>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-2 ${ring}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{t(title)}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Fees */}
      <section id="pricing" className="scroll-mt-20 py-16 sm:py-24 bg-[#0F172A] text-white relative overflow-hidden">
        {motionEnabled && (
          <div className="landing-orb absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#FF5A12]/20 blur-3xl" />
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5A12] to-amber-400 text-[#0F172A]">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('landing.fees.title')}</h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">{t('landing.fees.subtitle')}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mt-10">
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                <User className="w-3.5 h-3.5" />
                {t('landing.fees.clientBadge')}
              </span>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">{t('landing.fees.clientNote')}</p>
            </div>
            <div className="p-6 rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-teal-700/5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                {t('landing.fees.proBadge')}
              </span>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">{t('landing.fees.proNote')}</p>
            </div>
          </div>

          {/* Example breakdown */}
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                {t('landing.fees.exampleTitle')} — {fmt(exampleGross)}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('landing.fees.exampleAgreed')}</span>
                  <span className="font-bold">{fmt(exampleGross)}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('landing.fees.exampleFee', { percent: 7 })}</span>
                  <span className="font-semibold text-rose-400">− {fmt(examplePayout.feeAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('landing.fees.exampleProReceives')}</span>
                  <span className="font-semibold text-emerald-400">{fmt(examplePayout.net)}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-[#FF5A12]/20 to-amber-500/10 border border-[#FF5A12]/30">
                  <span className="text-sm font-bold">{t('landing.fees.exampleClientPays')}</span>
                  <span className="text-xl font-black text-[#FFB070]">{fmt(exampleGross)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-teal-500/30 bg-teal-500/10">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">{t('landing.fees.holdTitle')}</p>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">{t('landing.fees.holdBody')}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">{t('landing.fees.cancelTitle')}</p>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">{t('landing.fees.cancelBody')}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">{t('landing.fees.coversTitle')}</p>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">{t('landing.fees.coversBody')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan fee cards */}
          <div className="mt-14">
            <h3 className="text-xl font-bold">{t('landing.fees.plansTitle')}</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">{t('landing.fees.plansSubtitle')}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-2xl border transition-transform hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-[#FF5A12] bg-gradient-to-b from-[#FF5A12]/20 to-[#FF5A12]/5 shadow-lg shadow-[#FF5A12]/20'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FF5A12] text-[10px] font-bold uppercase tracking-wider">
                      {t('landing.fees.popular')}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-300">{t(PLAN_LABELS[plan.id])}</p>
                  <p className="mt-2 text-4xl font-black text-[#FF5A12]">
                    {plan.feePercent}%
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{t('landing.fees.perService')}</p>
                  <p className="mt-4 text-sm font-medium text-slate-200">
                    {t('landing.fees.monthly', { price: plan.priceLabel })}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{t(plan.feeLabelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LandingAppShowcase />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-[#F6F3EF] dark:bg-[#020617] border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] dark:text-white">
              {t('landing.faq.title')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{t('landing.faq.subtitle')}</p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ_KEYS.map(({ q, a }) => (
              <FaqItem key={q} question={t(q)} answer={t(a)} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 py-16 sm:py-24 bg-white dark:bg-[#0f172a] border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('landing.features.title')}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_KEYS.map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="group p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1e293b]/40"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold">{t(title)}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with images */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('landing.categories.title')}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{t('landing.categories.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(({ key, icon: Icon, image, tint }) => (
              <button
                key={key}
                type="button"
                onClick={() => onStart('client', 'signup')}
                className="group relative h-44 rounded-2xl overflow-hidden text-left shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${tint} to-black/60`} />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-lg font-bold text-white">{t(key)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Audience split */}
      <section id="for-pros" className="scroll-mt-20 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1a2332] to-[#FF5A12]/30" />
        {motionEnabled && (
          <div className="landing-orb absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-teal-500/15 blur-3xl" />
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 text-white">
          <article className="p-8 rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-500/15 to-teal-800/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold">{t('landing.audience.client.title')}</h3>
            <p className="mt-3 text-sm text-slate-200 leading-relaxed">{t('landing.audience.client.desc')}</p>
            <button
              type="button"
              onClick={() => onStart('client', 'signup')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:text-white transition-colors"
            >
              {t('landing.audience.client.cta')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </article>
          <article className="p-8 rounded-3xl border border-[#FF5A12]/40 bg-gradient-to-br from-[#FF5A12]/25 to-amber-500/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold">{t('landing.audience.pro.title')}</h3>
            <p className="mt-3 text-sm text-slate-100 leading-relaxed">{t('landing.audience.pro.desc')}</p>
            <button
              type="button"
              onClick={() => onStart('pro', 'signup')}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A12] to-amber-400 text-[#0F172A] text-sm font-bold hover:opacity-95 transition-opacity"
            >
              {t('landing.audience.pro.cta')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </article>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A12]/12 via-amber-400/10 to-teal-500/10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t('landing.cta.title')}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{t('landing.cta.subtitle')}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onStart('client', 'signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF5A12] via-amber-400 to-yellow-300 text-[#0F172A] font-bold hover:scale-[1.02] shadow-xl shadow-[#FF5A12]/30 transition-transform"
            >
              {t('landing.cta.primary')}
            </button>
            <button
              type="button"
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 font-bold hover:border-[#FF5A12] transition-colors"
            >
              {t('landing.cta.secondary')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 py-8 bg-[#0F172A] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="[&_span]:text-white">
            <Logo />
          </div>

          <div className="flex flex-col sm:items-center gap-4 flex-1 sm:px-6">
            <p className="text-sm text-slate-400 max-w-md sm:text-center">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              <span className="sr-only">{t('landing.footer.follow')}</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('landing.footer.instagram')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:border-[#FF5A12]/60 hover:bg-[#FF5A12]/15 hover:text-[#FFB070] transition-colors"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('landing.footer.tiktok')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:border-teal-400/60 hover:bg-teal-500/15 hover:text-teal-300 transition-colors"
              >
                <TikTokIcon />
                TikTok
              </a>
            </div>
          </div>

          <p className="text-xs text-slate-500 sm:text-right shrink-0">
            {t('landing.footer.rights', { year })}
          </p>
        </div>
      </footer>
    </div>
  );
}
