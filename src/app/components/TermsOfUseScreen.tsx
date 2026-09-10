import { useState } from 'react';
import { ChevronDown, ArrowLeft, ScrollText } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { SettingsPageShell, Section } from './settings/SettingsUI';
import { TERMS_SECTIONS } from '@/lib/i18n-terms';

interface Props {
  onBack: () => void;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((text) => (
        <li key={text} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D9488]" aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export function TermsOfUseScreen({ onBack }: Props) {
  const { t } = useAppSettings();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SettingsPageShell title={t('terms.title')} subtitle={t('terms.subtitle')}>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0D9488] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('terms.back')}
      </button>

      <div className="rounded-2xl border border-[#0D9488]/20 bg-[#ECFDF5]/50 dark:bg-[#0D9488]/10 p-5 mb-6 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488]/15 flex items-center justify-center shrink-0">
          <ScrollText className="w-6 h-6 text-[#0D9488]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#0D9488] uppercase tracking-wide">{t('terms.updated')}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">{t('terms.acceptNote')}</p>
        </div>
      </div>

      <Section title={t('terms.title')}>
        {TERMS_SECTIONS.map((section, i) => {
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
