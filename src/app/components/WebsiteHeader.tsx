import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Home,
  Search,
  MessageCircle,
  History,
  Info,
  LayoutDashboard,
  Wallet,
  FileText,
  Star,
  UserCircle,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Logo } from './Logo';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useAppSettings } from '../context/AppSettings';

interface Props {
  screen: string;
  setScreen: (s: string) => void;
}

export function WebsiteHeader({ screen, setScreen }: Props) {
  const { t } = useAppSettings();
  const clientLinks = useMemo(
    () => [
      { id: 'home', label: t('nav.home'), Icon: Home },
      { id: 'search', label: t('nav.search'), Icon: Search },
      { id: 'chat', label: t('nav.messages'), Icon: MessageCircle },
      { id: 'history', label: t('nav.history'), Icon: History },
      { id: 'how-it-works', label: t('nav.how'), Icon: Info },
    ],
    [t],
  );
  const proLinks = useMemo(
    () => [
      { id: 'pro-dashboard', label: t('nav.pro.dashboard'), Icon: LayoutDashboard },
      { id: 'pro-chat', label: t('nav.pro.chat'), Icon: MessageCircle },
      { id: 'pro-history', label: t('nav.history'), Icon: History },
      { id: 'pro-financial', label: t('nav.pro.financial'), Icon: Wallet },
      { id: 'pro-contracts', label: t('nav.pro.contracts'), Icon: FileText },
      { id: 'pro-reviews', label: t('nav.pro.reviews'), Icon: Star },
    ],
    [t],
  );

  const [proOpen, setProOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const proWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (proWrapRef.current && !proWrapRef.current.contains(e.target as Node)) setProOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const go = (id: string) => {
    setScreen(id);
    setProOpen(false);
    setMobileOpen(false);
  };

  const proActive = proLinks.some((l) => l.id === screen);

  const NavLink = ({
    id,
    label,
    Icon,
    onClick,
  }: {
    id: string;
    label: string;
    Icon: React.ElementType;
    onClick?: () => void;
  }) => {
    const active = screen === id;
    return (
      <button
        type="button"
        onClick={() => (onClick ? onClick() : go(id))}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          active
            ? 'text-[#FF5A12] bg-[#FFF0E6] dark:bg-[#FF5A12]/15'
            : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        {label}
      </button>
    );
  };

  const MobileSection = ({
    title,
    links,
  }: {
    title: string;
    links: typeof clientLinks;
  }) => (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">{title}</p>
      <div className="flex flex-col gap-1">
        {links.map(({ id, label, Icon }) => (
          <NavLink key={id} id={id} label={label} Icon={Icon} />
        ))}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        <button type="button" onClick={() => go('home')} className="shrink-0 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A12]/40">
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center flex-wrap">
          {clientLinks.map((l) => (
            <NavLink key={l.id} {...l} />
          ))}
          <div className="relative" ref={proWrapRef}>
            <button
              type="button"
              onClick={() => setProOpen(!proOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                proActive || proOpen
                  ? 'text-[#FF5A12] bg-[#FFF0E6] dark:bg-[#FF5A12]/15'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {t('nav.proArea')}
              <ChevronDown className={`w-4 h-4 transition-transform ${proOpen ? 'rotate-180' : ''}`} />
            </button>
            {proOpen && (
              <div className="absolute left-0 top-full mt-1 py-2 min-w-[220px] rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#1e293b] shadow-lg">
                {proLinks.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors ${
                      screen === id
                        ? 'text-[#FF5A12] bg-[#FFF0E6]/80 dark:bg-[#FF5A12]/10'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => go('settings')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              screen === 'settings'
                ? 'border-[#FF5A12] text-[#FF5A12] bg-[#FFF0E6]/50 dark:bg-[#FF5A12]/10'
                : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-[#FF5A12]/50'
            }`}
          >
            <UserCircle className="w-4 h-4" />
            {t('nav.myAccount')}
          </button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                aria-label={t('nav.openMenu')}
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,320px)] flex flex-col overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">{t('nav.sheetTitle')}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex-1 pb-8">
                <MobileSection title={t('nav.section.client')} links={clientLinks} />
                <MobileSection title={t('nav.section.pro')} links={proLinks} />
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <NavLink id="settings" label={t('nav.myAccount')} Icon={UserCircle} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
