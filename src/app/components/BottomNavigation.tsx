import { Home, Search, Bell, User } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

interface Props {
  screen?: string;
  setScreen?: (s: string) => void;
}

export function BottomNavigation({ screen = 'home', setScreen }: Props) {
  const { t } = useAppSettings();
  const tabs = [
    { id: 'home', label: t('nav.home'), Icon: Home },
    { id: 'search', label: t('nav.searchTab'), Icon: Search },
    { id: 'chat', label: t('nav.chat'), Icon: Bell, badge: true },
    { id: 'profile', label: t('nav.profile'), Icon: User },
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-t border-[#E2E8F0] dark:border-slate-700/80 pb-6 sm:pb-3 pt-3 px-6 flex justify-between items-center z-50 sm:hidden">
      {tabs.map(({ id, label, Icon, badge }) => {
        const active = screen === id;
        return (
          <button
            key={id}
            onClick={() => {
              if (id === 'profile') setScreen?.('account');
              else setScreen?.(id);
            }}
            className="flex flex-col items-center gap-1 relative"
            style={{ color: active ? '#FF5A12' : '#94A3B8' }}
          >
            <Icon className="w-6 h-6" />
            <span className={`text-[11px] ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
            {badge && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
