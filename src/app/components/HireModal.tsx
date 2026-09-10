import { useState } from 'react';
import { X, Star, Send, Calendar } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

interface Professional {
  name: string;
  role: string;
  image: string;
  rating: number;
  price: number;
  priceUnit: string;
  isOnline: boolean;
}

interface HireModalProps {
  professional: Professional;
  onClose: () => void;
}

export function HireModal({ professional, onClose }: HireModalProps) {
  const { fmt, convert, symbol, resolvedTheme, t } = useAppSettings();
  const isDark = resolvedTheme === 'dark';
  const [description, setDescription] = useState('');
  const [offer, setOffer] = useState('');
  const [date, setDate] = useState('');
  const [sent, setSent] = useState(false);

  const suggestedBase = Math.round(convert(professional.price));

  const handleSend = () => {
    if (!description.trim()) return;
    setSent(true);
    setTimeout(onClose, 2000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className={`w-10 h-1 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
        </div>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 pt-3 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <h2 className={`text-base font-bold ${isDark ? 'text-[#0D9488]' : 'text-slate-800'}`}>{t('hire.title')}</h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            <X className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-600'}`} />
          </button>
        </div>

        {/* Professional info */}
        <div className={`px-5 py-4 flex items-center gap-3 border-b ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
          <div className="relative flex-shrink-0">
            <img
              src={professional.image}
              alt={professional.name}
              className={`w-12 h-12 rounded-2xl object-cover border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
            />
            <div
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${isDark ? 'border-[#0f172a]' : 'border-white'} ${
                professional.isOnline ? 'bg-green-500' : 'bg-slate-300'
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{professional.name}</p>
            <p className={`text-xs truncate ${isDark ? 'text-white' : 'text-slate-500'}`}>{professional.role}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border flex-shrink-0 ${isDark ? 'bg-[#0D9488]/10 border-[#0D9488]/30' : 'bg-sky-50 border-sky-100'}`}>
            <Star className="w-3 h-3 fill-[#0D9488] text-[#0D9488]" />
            <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>{professional.rating}</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-5 space-y-5 overflow-y-auto flex-1" style={{ scrollbarWidth: 'none' }}>
          {/* Description */}
          <div>
            <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block ${isDark ? 'text-white' : 'text-slate-500'}`}>
              {t('hire.describe')}
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 500))}
              placeholder={t('hire.describePh')}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 resize-none transition-all ${isDark ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`}
            />
            <p className={`text-[10px] mt-1 text-right ${isDark ? 'text-white' : 'text-slate-400'}`}>{description.length}/500</p>
          </div>

          {/* Date */}
          <div>
            <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-500'}`}>
              <Calendar className="w-3.5 h-3.5" /> {t('hire.when')}
            </label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => setDate(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all ${isDark ? 'border-slate-700 bg-slate-900 text-white [color-scheme:dark]' : 'border-slate-200 bg-slate-50 text-slate-800'}`}
            />
          </div>

          {/* Offer */}
          <div>
            <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block ${isDark ? 'text-white' : 'text-slate-500'}`}>
              {t('hire.yourOffer')}
            </label>
            <div className="relative mb-2">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none ${isDark ? 'text-white' : 'text-slate-400'}`}>
                {symbol}
              </span>
              <input
                type="number"
                value={offer}
                min={0}
                onChange={e => setOffer(e.target.value)}
                placeholder={String(suggestedBase)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all ${isDark ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`}
              />
            </div>
            <p className={`text-[10px] mb-2 ${isDark ? 'text-white' : 'text-slate-400'}`}>
              {t('hire.baseRate', { price: fmt(professional.price, { decimals: 0 }), unit: professional.priceUnit })}
            </p>
            <div className="flex gap-2">
              {[1, 1.5, 2].map(mult => {
                const val = Math.round(suggestedBase * mult);
                const active = Number(offer) === val;
                const label = mult === 1 ? t('hire.base') : mult === 1.5 ? t('hire.plus50') : t('hire.double');
                return (
                  <button
                    key={mult}
                    onClick={() => setOffer(String(val))}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-[0_2px_8px_rgba(249,115,22,0.3)]'
                        : isDark
                          ? 'bg-slate-900 text-white border-slate-700 hover:border-[#0D9488]/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#0D9488]/50 hover:text-[#0D9488]'
                    }`}
                  >
                    {symbol}{val}
                    <span className={`block text-[9px] mt-0.5 ${active ? 'text-white/70' : isDark ? 'text-white/60' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info box */}
          <div className={`border rounded-xl p-3 flex gap-2.5 ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-100'}`}>
            <div className="w-1 rounded-full bg-blue-400 flex-shrink-0 self-stretch" />
            <p className={`text-xs leading-relaxed ${isDark ? 'text-white' : 'text-blue-700'}`}>
              {t('hire.paymentNote')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className={`px-5 pb-6 pt-3 border-t ${isDark ? 'border-slate-800 bg-[#0f172a]' : 'border-slate-100 bg-white'}`}>
          {sent ? (
            <div className="flex flex-col items-center py-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <Send className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-[#0D9488]' : 'text-slate-800'}`}>{t('hire.sent')}</p>
              <p className={`text-xs mt-1 text-center ${isDark ? 'text-white' : 'text-slate-500'}`}>
                {t('hire.sentHint', { name: professional.name })}
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-colors ${isDark ? 'border-slate-700 text-white hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSend}
                disabled={!description.trim()}
                className="flex-1 py-3 rounded-xl bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
              >
                <Send className="w-4 h-4" />
                {t('hire.send')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
