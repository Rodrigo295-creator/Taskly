import { Menu, PanelLeft, Briefcase, CreditCard } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import type { AuthUserType } from '@/lib/auth-session';

interface Props {
  onOpenMobileMenu: () => void;
  onToggleDesktopSidebar?: () => void;
  desktopCollapsed?: boolean;
  userType: AuthUserType;
  screen: string;
  onProAccount: () => void;
  onPlans: () => void;
}

export function AppTopBar({
  onOpenMobileMenu,
  onToggleDesktopSidebar,
  desktopCollapsed,
  userType,
  screen,
  onProAccount,
  onPlans,
}: Props) {
  const { t } = useAppSettings();
  const isPro = userType === 'pro';
  const proActive = screen.startsWith('pro-') || screen === 'opportunities' || screen === 'agenda';
  const plansActive = screen === 'plans';

  const actionBtn =
    'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors shrink-0';
  const actionIdle =
    'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5';
  const actionActive = 'bg-[#ECFDF5] text-[#0D9488] dark:bg-[#0D9488]/15';

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 sm:gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-slate-700/80 dark:bg-[#0f172a]/90 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden shrink-0"
        aria-label={t('nav.toggleMenu')}
      >
        <Menu className="h-5 w-5" />
      </button>

      {onToggleDesktopSidebar && (
        <button
          type="button"
          onClick={onToggleDesktopSidebar}
          className="hidden lg:inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 shrink-0"
          aria-label={desktopCollapsed ? t('nav.expand') : t('nav.collapse')}
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      )}

      <div className="flex-1 min-w-0" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onProAccount}
          className={`${actionBtn} ${proActive ? actionActive : actionIdle}`}
          title={isPro ? t('nav.topbar.proDashboard') : t('nav.topbar.proAccount')}
        >
          <Briefcase className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">
            {isPro ? t('nav.topbar.proDashboard') : t('nav.topbar.proAccount')}
          </span>
        </button>

        <button
          type="button"
          onClick={onPlans}
          className={`${actionBtn} bg-[#0D9488] text-white shadow-md shadow-[#0D9488]/30 hover:bg-[#0F766E] ${
            plansActive ? 'ring-2 ring-[#0D9488]/40 ring-offset-2 ring-offset-white dark:ring-offset-[#0f172a]' : ''
          }`}
          title={t('nav.topbar.plans')}
        >
          <CreditCard className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">{t('nav.topbar.plans')}</span>
        </button>
      </div>
    </header>
  );
}
