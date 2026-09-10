import { useAppSettings } from '../context/AppSettings';
import { calcServicePayout } from '@/lib/pro-plan-session';

interface Props {
  gross: number;
  feePercent?: number;
  compact?: boolean;
  className?: string;
}

export function ProPayoutBreakdown({ gross, feePercent, compact, className = '' }: Props) {
  const { fmt, t } = useAppSettings();
  const { feePercent: pct, feeAmount, net } = calcServicePayout(gross, feePercent);

  if (compact) {
    return (
      <div className={`text-right ${className}`}>
        <p className="text-sm font-bold text-[#0D9488]">{fmt(net, { decimals: 0 })}</p>
        <p className="text-[10px] text-slate-500 dark:text-slate-400">
          {t('pro.payout.netOf', { gross: fmt(gross, { decimals: 0 }), percent: pct })}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/50 p-3 space-y-2 ${className}`}
    >
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">{t('pro.payout.gross')}</span>
        <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(gross)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          {t('pro.payout.fee', { percent: pct })}
        </span>
        <span className="font-medium text-rose-600 dark:text-rose-400">− {fmt(feeAmount)}</span>
      </div>
      <div className="flex justify-between text-sm pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
        <span className="font-semibold text-slate-700 dark:text-slate-200">{t('pro.payout.youReceive')}</span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">{fmt(net)}</span>
      </div>
    </div>
  );
}
