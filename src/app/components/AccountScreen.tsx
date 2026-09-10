import { useEffect, useState } from 'react';
import {
  User,
  Lock,
  MapPin,
  FileText,
  LogOut,
  ShieldCheck,
  Camera,
  Link2,
  Smartphone,
} from 'lucide-react';
import type { AuthSession } from '@/lib/auth-session';
import { useAppSettings } from '../context/AppSettings';
import { BrandName } from './Logo';
import { SettingsPageShell, Section, Row } from './settings/SettingsUI';
import { PersonalModal, PasswordModal, type PersonalInfo } from './settings/settings-modals';

interface Props {
  session?: AuthSession | null;
  onLogout?: () => void;
}

function personalFromSession(session: AuthSession | null | undefined, fallbackName: string): PersonalInfo {
  return {
    name: session?.name?.trim() || fallbackName,
    email: session?.email?.trim() || '',
    phone: '',
    city: '',
    bio: '',
  };
}

export function AccountScreen({ session, onLogout }: Props) {
  const { t } = useAppSettings();
  const [personal, setPersonal] = useState<PersonalInfo>(() =>
    personalFromSession(session, t('account.pageTitle')),
  );
  const [modal, setModal] = useState<'personal' | 'password' | null>(null);

  useEffect(() => {
    setPersonal((prev) => ({
      ...prev,
      name: session?.name?.trim() || prev.name || t('account.pageTitle'),
      email: session?.email?.trim() || prev.email,
    }));
  }, [session?.name, session?.email, t]);

  const initials = (personal.name || '?')
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <SettingsPageShell title={t('account.pageTitle')} subtitle={t('account.pageSubtitle')}>
      {/* Profile card */}
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>
          <button
            type="button"
            onClick={() => setModal('personal')}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#0D9488] rounded-full flex items-center justify-center shadow-lg"
            aria-label={t('settings.edit')}
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white truncate">{personal.name}</h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              {t('account.verified')}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{personal.email}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{personal.city}</p>
          <p className="text-xs text-slate-400 mt-2">{t('account.memberSince', { year: 2025 })}</p>
        </div>
        <button
          type="button"
          onClick={() => setModal('personal')}
          className="text-sm font-semibold text-[#0D9488] bg-[#ECFDF5] dark:bg-[#0D9488]/15 px-4 py-2 rounded-full shrink-0"
        >
          {t('settings.edit')}
        </button>
      </div>

      <Section title={t('account.section.profile')}>
        <Row icon={User} label={t('settings.personalInfo')} sublabel={personal.name} onClick={() => setModal('personal')} />
        <Row icon={MapPin} label={t('account.addresses')} sublabel={t('account.addressesSub')} color="text-sky-500" />
        <Row icon={FileText} label={t('account.documents')} sublabel={t('account.documentsSub')} color="text-violet-500" />
      </Section>

      <Section title={t('account.section.security')}>
        <Row
          icon={Lock}
          label={t('settings.changePassword')}
          sublabel={t('settings.passwordSub')}
          onClick={() => setModal('password')}
          color="text-amber-600"
        />
        <Row
          icon={ShieldCheck}
          label={t('settings.twoFactor')}
          sublabel={t('settings.rowSoon')}
          color="text-teal-500"
          disabled
        />
        <Row icon={Smartphone} label={t('settings.keepSession')} sublabel={t('settings.rowSoon')} color="text-indigo-500" disabled />
      </Section>

      <Section title={t('account.section.linked')}>
        <Row
          icon={Link2}
          label={t('account.linked.google')}
          sublabel={t('settings.rowSoon')}
          color="text-red-500"
          disabled
        />
        <Row
          icon={Link2}
          label={t('account.linked.apple')}
          sublabel={t('settings.rowSoon')}
          color="text-slate-700 dark:text-slate-300"
          disabled
        />
      </Section>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">{t('account.deleteWarning')}</p>

      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-rose-200/80 dark:border-rose-900/50 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => onLogout?.()}
          className="flex items-center gap-3.5 px-4 py-4 w-full hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-sm font-semibold text-rose-500">{t('settings.logout')}</span>
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        <BrandName size="sm" /> v1.0.0 · {t('settings.rights')}
      </p>

      {modal === 'personal' && (
        <PersonalModal info={personal} onSave={setPersonal} onClose={() => setModal(null)} />
      )}
      {modal === 'password' && <PasswordModal onClose={() => setModal(null)} />}
    </SettingsPageShell>
  );
}
