import { Star } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { MOCK_PENDING_REVIEWS, MOCK_PAST_REVIEWS } from '@/data/mockNavScreens';
import { SettingsPageShell, Section } from './settings/SettingsUI';

export function ClientReviewsScreen() {
  const { t } = useAppSettings();

  return (
    <SettingsPageShell title={t('clientReviews.title')} subtitle={t('clientReviews.subtitle')}>
      <Section title={t('clientReviews.pending')}>
        {MOCK_PENDING_REVIEWS.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate-500 text-center">{t('clientReviews.emptyPending')}</p>
        ) : (
          MOCK_PENDING_REVIEWS.map((item) => (
            <div key={item.id} className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <p className="font-semibold text-slate-900 dark:text-white">{item.service}</p>
              <p className="text-sm text-slate-500">{item.professionalName} · {item.date}</p>
              <button
                type="button"
                className="mt-3 px-4 py-2 rounded-xl bg-[#0D9488] text-white text-sm font-bold hover:bg-[#0F766E]"
              >
                {t('clientReviews.cta.rate')}
              </button>
            </div>
          ))
        )}
      </Section>

      <Section title={t('clientReviews.history')}>
        {MOCK_PAST_REVIEWS.map((item) => (
          <div key={item.id} className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-slate-900 dark:text-white">{item.service}</p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-1">{item.professionalName}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{item.comment}</p>
            <p className="text-xs text-slate-400 mt-2">{t('clientReviews.ratedOn', { date: item.date })}</p>
          </div>
        ))}
      </Section>
    </SettingsPageShell>
  );
}
