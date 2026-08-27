import { useState } from 'react';
import { ChevronDown, ArrowLeft, Shield } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { SettingsPageShell, Section } from './settings/SettingsUI';
import { PRIVACY_SECTIONS } from '@/lib/i18n-privacy';

interface Props {
  onBack: () => void;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((text) => (
        <li key={text} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A12]" aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export function PrivacyPolicyScreen({ onBack }: Props) {
  const { t } = useAppSettings();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SettingsPageShell title={t('privacy.title')} subtitle={t('privacy.subtitle')}>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#FF5A12] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('privacy.back')}
      </button>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/40 p-5 mb-6 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-slate-200/80 dark:bg-slate-700/80 flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {t('privacy.updated')}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">{t('privacy.acceptNote')}</p>
        </div>
      </div>

      <Section title={t('privacy.title')}>
        {PRIVACY_SECTIONS.map((section, i) => {
          const isOpen = open === i;
          const bullets = section.bullets.map((k) => t(k));
          return (
            <div key={section.title} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/5"
                aria-expanded={isOpen}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t(section.title)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t(section.summary)}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-400 mt-0.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <BulletList items={bullets} />
                </div>
              )}
            </div>
          );
        })}
      </Section>
    </SettingsPageShell>
  );
}
