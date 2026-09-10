import {
  Home,
  Search,
  User,
  LayoutDashboard,
  MessageCircle,
  Wallet,
  Calendar,
} from 'lucide-react';
import type { AuthUserType } from '@/lib/auth-session';
import { useAppSettings } from '../context/AppSettings';

interface Props {
  screen?: string;
  setScreen?: (s: string) => void;
  userType?: AuthUserType;
}

export function BottomNavigation({ screen = 'home', setScreen, userType = 'client' }: Props) {
  const { t } = useAppSettings();
  const isProfessional = userType === 'pro';

  const tabs = isProfessional
    ? [
        { id: 'pro-dashboard', label: t('nav.pro.dashboard'), Icon: LayoutDashboard },
        { id: 'pro-chat', label: t('nav.pro.chat'), Icon: MessageCircle },
        { id: 'agenda', label: t('nav.agenda'), Icon: Calendar },
        { id: 'pro-financial', label: t('nav.pro.financial'), Icon: Wallet },
        { id: 'account', label: t('nav.profile'), Icon: User },
      ]
    : [
        { id: 'home', label: t('nav.home'), Icon: Home },
        { id: 'search', label: t('nav.searchTab'), Icon: Search },
        { id: 'chat', label: t('nav.chat'), Icon: MessageCircle },
        { id: 'account', label: t('nav.profile'), Icon: User },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-t border-[#E2E8F0] dark:border-slate-700/80 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3 pt-3 px-6 flex justify-between items-center z-[55] sm:hidden lg:hidden">
      {tabs.map(({ id, label, Icon }) => {
        const active =
          screen === id ||
          (id === 'pro-dashboard' && screen === 'pro-dashboard') ||
          (id === 'account' && (screen === 'account' || screen === 'profile'));
        return (
          <button
            key={id}
            type="button"
            onClick={() => setScreen?.(id)}
            className="flex flex-col items-center gap-1 relative min-w-0 flex-1"
            style={{ color: active ? '#0D9488' : '#94A3B8' }}
          >
            <Icon className="w-6 h-6 shrink-0" />
            <span className={`text-[10px] sm:text-[11px] truncate max-w-full px-0.5 ${active ? 'font-semibold' : 'font-medium'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
