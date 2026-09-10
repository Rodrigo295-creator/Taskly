import { Calendar, MapPin, Clock } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { MOCK_AGENDA } from '@/data/mockNavScreens';
import { SettingsPageShell } from './settings/SettingsUI';

export function AgendaScreen() {
  const { t } = useAppSettings();
  const today = MOCK_AGENDA.filter((a) => a.isToday);
  const upcoming = MOCK_AGENDA.filter((a) => !a.isToday);

  const renderList = (items: typeof MOCK_AGENDA) => {
    if (items.length === 0) {
      return <p className="text-sm text-slate-500 py-4">{t('agenda.empty')}</p>;
    }
    return (
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 p-4"
          >
            <div className="flex justify-between gap-2 items-start">
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                  item.confirmed
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                }`}
              >
                {item.confirmed ? t('agenda.confirmed') : t('agenda.pending')}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{item.clientName}</p>
            <p className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 mt-2">
              <Clock className="w-3.5 h-3.5" />
              {item.when} · {item.time}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {item.address}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <SettingsPageShell title={t('agenda.title')} subtitle={t('agenda.subtitle')}>
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
          <Calendar className="w-4 h-4 text-[#0D9488]" />
          {t('agenda.today')}
        </h2>
        {renderList(today)}
      </section>
      <section>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">{t('agenda.upcoming')}</h2>
        {renderList(upcoming)}
      </section>
    </SettingsPageShell>
  );
}
