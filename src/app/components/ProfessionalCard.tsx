import { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { HireModal } from './HireModal';

interface ProfessionalCardProps {
  name: string;
  role: string;
  description: string;
  rating: number;
  price: number;
  priceUnit: string;
  image: string;
  isOnline: boolean;
  /** Opens (or creates) a chat conversation with this professional */
  onMessage?: () => void;
}

export function ProfessionalCard({
  name, role, description, rating, price, priceUnit, image, isOnline, onMessage,
}: ProfessionalCardProps) {
  const { fmt, t } = useAppSettings();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white p-4 rounded-[16px] border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md cursor-pointer">
        <div className="flex gap-3.5 items-start">
          <div className="relative">
            <img src={image} alt={name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${isOnline ? 'bg-green-500' : 'bg-slate-300'} border-2 border-white rounded-full`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-medium text-slate-900 leading-tight">{name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{role}</p>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                <Star className="text-[#0D9488] w-[14px] h-[14px] fill-current" />
                <span className="text-xs font-medium text-slate-700">{rating}</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">{description}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">
                  {priceUnit === '/hora' || priceUnit === '/hour' ? t('common.visitFrom') : t('common.dailyFrom')}
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {fmt(price, { decimals: 0 })}
                  <span className="text-xs text-slate-400 font-normal">{priceUnit}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onMessage && (
                  <button
                    onClick={onMessage}
                    aria-label={t('common.message')}
                    title={t('common.message')}
                    className="w-9 h-9 rounded-xl border border-[#0D9488]/30 bg-[#ECFDF5]/60 hover:bg-[#ECFDF5] text-[#0D9488] flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className={`${isOnline ? 'bg-[#0D9488] hover:bg-[#0F766E]' : 'bg-[#1E2A38] hover:bg-slate-800'} text-white px-5 py-2 rounded-xl text-[14px] font-semibold transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06)]`}
                >
                  {t('common.hire')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <HireModal
          professional={{ name, role, image, rating, price, priceUnit, isOnline }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
