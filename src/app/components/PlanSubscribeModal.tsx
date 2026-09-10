import { X, Info, ShieldCheck, CreditCard } from 'lucide-react';
import type { PlanDefinition } from '@/data/plans';
import { useAppSettings } from '../context/AppSettings';
import { PlanBadge } from './PlanBadge';
import { saveProPlanSubscription } from '@/lib/pro-plan-session';

interface Props {
  plan: PlanDefinition;
  onClose: () => void;
  onSubscribed: () => void;
}

/**
 * Checkout sem coleta de cartão no browser (PCI): a assinatura real será feita
 * via gateway com tokenização (Stripe/Mercado Pago). Em dev, simula a assinatura.
 */
const CHECKOUT_AVAILABLE = import.meta.env.DEV;

export function PlanSubscribeModal({ plan, onClose, onSubscribed }: Props) {
  const { t } = useAppSettings();

  const handleSubmit = () => {
    if (!CHECKOUT_AVAILABLE) return;
    saveProPlanSubscription({
      tier: plan.id,
      subscribedAt: new Date().toISOString(),
      frequency: 'monthly',
    });
    onSubscribed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <PlanBadge tier={plan.id} size={36} />
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white">{t('plans.pay.title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {t(plan.nameKey)} · {plan.priceLabel}
                {t('plans.perMonth')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0 space-y-4" style={{ scrollbarWidth: 'thin' }}>
          <div className="rounded-xl border-2 border-[#0D9488]/40 bg-[#ECFDF5] dark:bg-[#0D9488]/10 px-4 py-3.5 flex gap-3">
            <Info className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#0F766E] dark:text-[#0D9488]">{t('plans.pay.monthlyChargeTitle')}</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                {t('plans.pay.monthlyChargeBody', { price: plan.priceLabel })}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-4 py-4 flex gap-3">
            <CreditCard className="w-5 h-5 text-slate-500 dark:text-slate-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{t('plans.pay.gatewayTitle')}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{t('plans.pay.gatewayBody')}</p>
            </div>
          </div>

          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3.5 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">{t('plans.pay.noCardStored')}</p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{t('plans.pay.feeReminder')}</p>
            <p>
              {t('plans.pay.feeReminderBody', {
                percent: plan.feePercent,
                plan: t(plan.nameKey),
              })}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 shrink-0 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!CHECKOUT_AVAILABLE}
            className="flex-1 py-3 rounded-xl bg-[#0D9488] text-white text-sm font-bold hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {CHECKOUT_AVAILABLE ? t('plans.pay.submit') : t('plans.pay.unavailable')}
          </button>
        </div>
      </div>
    </div>
  );
}
