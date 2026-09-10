import { Heart, Star } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { MOCK_FAVORITES } from '@/data/mockNavScreens';
import { SettingsPageShell } from './settings/SettingsUI';

interface Props {
  onSearch?: () => void;
}

export function FavoritesScreen({ onSearch }: Props) {
  const { t } = useAppSettings();

  return (
    <SettingsPageShell title={t('favorites.title')} subtitle={t('favorites.subtitle')}>
      {MOCK_FAVORITES.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
          <Heart className="w-10 h-10 mx-auto mb-3 text-rose-300" />
          <p className="text-slate-500 mb-4">{t('favorites.empty')}</p>
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className="px-5 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-bold hover:bg-[#0F766E]"
            >
              {t('favorites.cta.search')}
            </button>
          )}
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {MOCK_FAVORITES.map((pro) => (
            <li
              key={pro.id}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-4 flex gap-4 shadow-sm"
            >
              <img src={pro.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{pro.name}</h3>
                <p className="text-sm text-slate-500">{pro.role}</p>
                <p className="flex items-center gap-1 text-sm text-amber-600 mt-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {pro.rating.toFixed(1)}
                </p>
                <button type="button" className="text-xs font-semibold text-rose-500 mt-2 hover:underline">
                  {t('favorites.remove')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SettingsPageShell>
  );
}
