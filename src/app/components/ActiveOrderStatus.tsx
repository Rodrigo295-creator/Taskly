import { MapPin } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

export function ActiveOrderStatus() {
  const { t } = useAppSettings();

  return (
    <div className="mb-8 bg-[#0F172A] rounded-[16px] p-4 flex items-center gap-4 text-white relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
      <div className="w-10 h-10 rounded-full bg-[#FF5A12]/20 flex items-center justify-center flex-shrink-0">
        <MapPin className="text-[#FF5A12] w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-300 mb-0.5">{t('order.inProgress')}</p>
        <p className="text-sm font-medium">{t('order.sample')}</p>
      </div>
      <button className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
        {t('order.viewChat')}
      </button>
    </div>
  );
}
