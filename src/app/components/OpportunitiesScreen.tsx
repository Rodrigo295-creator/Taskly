import { MapPin, Zap } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { MOCK_OPPORTUNITIES } from '@/data/mockNavScreens';
import { SettingsPageShell } from './settings/SettingsUI';
import { ProPayoutBreakdown } from './ProPayoutBreakdown';

export function OpportunitiesScreen() {
  const { t } = useAppSettings();

  return (
    <SettingsPageShell title={t('opportunities.title')} subtitle={t('opportunities.subtitle')}>
      {MOCK_OPPORTUNITIES.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center text-slate-500">
          <Zap className="w-10 h-10 mx-auto mb-3 opacity-40" />
          {t('opportunities.empty')}
        </div>
      ) : (
        <ul className="space-y-4">
          {MOCK_OPPORTUNITIES.map((op) => (
            <li
              key={op.id}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-5 shadow-sm"
            >
              <div className="flex justify-between gap-2 items-start">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A12]">
                    {op.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-1">{op.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{op.clientName}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{t('opportunities.posted', { time: op.postedAgo })}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">{op.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{op.budget}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {t('opportunities.distance', { km: op.distanceKm })}
                </span>
              </div>
              <div className="mt-4">
                <ProPayoutBreakdown gross={op.budgetAmount} />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#FF5A12] text-white text-sm font-bold hover:bg-[#E04E0E] transition-colors"
                >
                  {t('opportunities.cta')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SettingsPageShell>
  );
}
