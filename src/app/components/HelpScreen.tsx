import { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, LifeBuoy } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { SettingsPageShell, Section, Row } from './settings/SettingsUI';

const FAQ_KEYS = ['help.faq1', 'help.faq2', 'help.faq3', 'help.faq4'] as const;

export function HelpScreen() {
  const { t } = useAppSettings();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SettingsPageShell title={t('help.title')} subtitle={t('help.subtitle')}>
      <Section title={t('help.faq')}>
        {FAQ_KEYS.map((key, i) => {
          const q = t(`${key}q`);
          const a = t(`${key}a`);
          const isOpen = open === i;
          return (
            <div key={key} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span className="text-sm font-medium text-slate-900 dark:text-white">{q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>}
            </div>
          );
        })}
      </Section>

      <Section title={t('help.contact')}>
        <Row icon={MessageCircle} label={t('help.chat')} sublabel={t('help.chatSub')} color="text-[#0D9488]" />
        <Row icon={Mail} label={t('help.email')} sublabel={t('help.emailSub')} color="text-blue-500" />
        <Row icon={LifeBuoy} label={t('nav.help')} sublabel={t('help.subtitle')} color="text-teal-500" />
      </Section>
    </SettingsPageShell>
  );
}
