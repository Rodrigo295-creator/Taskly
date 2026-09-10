import { useMemo, type ElementType, type ReactNode } from 'react';
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
  Settings,
  PanelLeftClose,
  PanelLeft,
  X,
  ClipboardList,
  Heart,
  LifeBuoy,
  Shield,
  Zap,
  Calendar,
} from 'lucide-react';
import type { AuthUserType } from '@/lib/auth-session';
import { Logo, LogoMark } from './Logo';
import { useAppSettings } from '../context/AppSettings';

const SIDEBAR_STORAGE_KEY = 'taskly-sidebar-collapsed';

export function readSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function writeSidebarCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? '1' : '0');
  } catch {
    /* ignore */
  }
}

interface Props {
  screen: string;
  setScreen: (s: string) => void;
  userType: AuthUserType;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function NavSection({
  title,
  narrow,
  children,
}: {
  title: string;
  narrow: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      {!narrow && (
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{title}</p>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export function AppSidebar({
  screen,
  setScreen,
  userType,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: Props) {
  const { t } = useAppSettings();
  const isProfessional = userType === 'pro';

  const clientLinks = useMemo(
    () => [
      { id: 'home', label: t('nav.home'), Icon: Home },
      { id: 'search', label: t('nav.search'), Icon: Search },
      { id: 'orders', label: t('nav.orders'), Icon: ClipboardList },
      { id: 'chat', label: t('nav.messages'), Icon: MessageCircle },
      { id: 'favorites', label: t('nav.favorites'), Icon: Heart },
      { id: 'history', label: t('nav.history'), Icon: History },
      { id: 'client-reviews', label: t('nav.clientReviews'), Icon: Star },
      { id: 'how-it-works', label: t('nav.how'), Icon: Info },
    ],
    [t],
  );

  const generalLinks = useMemo(
    () => [
      { id: 'help', label: t('nav.help'), Icon: LifeBuoy },
      { id: 'trust', label: t('nav.trust'), Icon: Shield },
    ],
    [t],
  );

  const proLinks = useMemo(
    () => [
      { id: 'pro-dashboard', label: t('nav.pro.dashboard'), Icon: LayoutDashboard },
      { id: 'opportunities', label: t('nav.opportunities'), Icon: Zap },
      { id: 'pro-chat', label: t('nav.pro.chat'), Icon: MessageCircle },
      { id: 'agenda', label: t('nav.agenda'), Icon: Calendar },
      { id: 'pro-history', label: t('nav.history'), Icon: History },
      { id: 'pro-financial', label: t('nav.pro.financial'), Icon: Wallet },
      { id: 'pro-contracts', label: t('nav.pro.contracts'), Icon: FileText },
      { id: 'pro-reviews', label: t('nav.pro.reviews'), Icon: Star },
    ],
    [t],
  );

  const settingsLinks = useMemo(
    () => [
      { id: 'account', label: t('nav.myAccount'), Icon: UserCircle },
      { id: 'settings', label: t('nav.settings'), Icon: Settings },
    ],
    [t],
  );

  const go = (id: string) => {
    setScreen(id);
    onCloseMobile();
  };

  const renderPanel = (narrow: boolean, showMobileClose: boolean) => {
    const NavItem = ({
      id,
      label,
      Icon,
    }: {
      id: string;
      label: string;
      Icon: ElementType;
    }) => {
      const active = screen === id || (id === 'settings' && screen.startsWith('settings-'));
      return (
        <button
          type="button"
          title={narrow ? label : undefined}
          onClick={() => go(id)}
          className={`group flex items-center gap-3 w-full rounded-xl text-sm font-medium transition-colors ${
            narrow ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
          } ${
            active
              ? 'bg-[#ECFDF5] text-[#0D9488] dark:bg-[#0D9488]/15 dark:text-[#0D9488]'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          {!narrow && <span className="truncate text-left">{label}</span>}
        </button>
      );
    };

    return (
      <aside
        className={`flex h-full flex-col border-r border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-[#0f172a] shadow-sm transition-[width] duration-300 ease-out ${
          narrow ? 'w-[72px]' : 'w-[280px]'
        }`}
      >
        <div
          className={`flex items-center border-b border-slate-100 dark:border-slate-800 shrink-0 ${
            narrow ? 'justify-center px-2 h-16' : 'justify-between gap-2 px-4 h-16'
          }`}
        >
          <button
            type="button"
            onClick={() => go(isProfessional ? 'pro-dashboard' : 'home')}
            className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]/40 min-w-0"
          >
            {narrow ? <LogoMark size={36} /> : <Logo />}
          </button>
          {showMobileClose && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label={t('nav.hideSidebar')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-6"
          style={{ scrollbarWidth: 'thin' }}
        >
          {isProfessional ? (
            <NavSection title={t('nav.section.pro')} narrow={narrow}>
              {proLinks.map((link) => (
                <NavItem key={link.id} {...link} />
              ))}
            </NavSection>
          ) : (
            <NavSection title={t('nav.section.client')} narrow={narrow}>
              {clientLinks.map((link) => (
                <NavItem key={link.id} {...link} />
              ))}
            </NavSection>
          )}

          <NavSection title={t('nav.section.general')} narrow={narrow}>
            {generalLinks.map((link) => (
              <NavItem key={link.id} {...link} />
            ))}
          </NavSection>

          <NavSection title={t('nav.section.settings')} narrow={narrow}>
            {settingsLinks.map((link) => (
              <NavItem key={link.id} {...link} />
            ))}
          </NavSection>
        </nav>

        <div className="border-t border-slate-100 dark:border-slate-800 p-2 space-y-1 shrink-0">
          {!showMobileClose && (
            <button
              type="button"
              onClick={onToggleCollapsed}
              title={narrow ? t('nav.expand') : t('nav.collapse')}
              className={`flex items-center gap-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors ${
                narrow ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
              }`}
            >
              {narrow ? (
                <PanelLeft className="w-5 h-5 shrink-0" />
              ) : (
                <>
                  <PanelLeftClose className="w-5 h-5 shrink-0" />
                  <span>{t('nav.collapse')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </aside>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label={t('nav.hideSidebar')}
        onClick={onCloseMobile}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed inset-y-0 left-0 z-[70] lg:hidden transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderPanel(false, true)}
      </div>

      <div className="hidden lg:block h-screen sticky top-0 shrink-0 self-start">
        {renderPanel(collapsed, false)}
      </div>
    </>
  );
}
