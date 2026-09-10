import { Briefcase, LogIn, UserPlus } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { SettingsPageShell } from './settings/SettingsUI';

interface Props {
  onGoHome: () => void;
  onRequestProLogin: (mode: 'login' | 'signup') => void;
}

export function ProAccessScreen({ onGoHome, onRequestProLogin }: Props) {
  const { t } = useAppSettings();

  return (
    <SettingsPageShell title={t('proAccess.title')} subtitle={t('proAccess.subtitle')}>
      <div className="max-w-md mx-auto space-y-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] dark:bg-[#0D9488]/15 flex items-center justify-center mx-auto mb-5">
            <Briefcase className="w-8 h-8 text-[#0D9488]" />
          </div>
          <button
            type="button"
            onClick={() => onRequestProLogin('login')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0D9488] text-white font-bold text-sm hover:bg-[#0F766E] transition-colors mb-3"
          >
            <LogIn className="w-4 h-4" />
            {t('proAccess.ctaLogin')}
          </button>
          <button
            type="button"
            onClick={() => onRequestProLogin('signup')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            {t('proAccess.ctaSignup')}
          </button>
        </div>
        <button
          type="button"
          onClick={onGoHome}
          className="w-full text-sm font-medium text-slate-500 hover:text-[#0D9488] transition-colors py-2"
        >
          {t('proAccess.back')}
        </button>
      </div>
    </SettingsPageShell>
  );
}
