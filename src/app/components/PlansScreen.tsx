import { useState } from 'react';
import { Sparkles, Check, Layers, CheckCircle } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { PLANS, type PlanDefinition } from '@/data/plans';
import { PlanBadge } from './PlanBadge';
import { SettingsPageShell } from './settings/SettingsUI';
import { PlanSubscribeModal } from './PlanSubscribeModal';
import { getProPlanTier, readProPlanSubscription } from '@/lib/pro-plan-session';

function formatFeePercent(pct: number, locale: string): string {
  if (pct === 0) return '0%';
  const raw = Number.isInteger(pct) ? String(pct) : String(pct);
  const useComma = locale === 'pt-BR' || locale === 'es-ES';
  return `${useComma ? raw.replace('.', ',') : raw}%`;
}

export function PlansScreen() {
  const { t, locale } = useAppSettings();
  const hasPlans = PLANS.length > 0;
  const [subscribePlan, setSubscribePlan] = useState<PlanDefinition | null>(null);
  const [activeTier, setActiveTier] = useState(getProPlanTier);
  const [justSubscribed, setJustSubscribed] = useState(false);

  const subscription = readProPlanSubscription();

  return (
    <SettingsPageShell title={t('plans.title')} subtitle={t('plans.subtitle')}>
      {justSubscribed && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">
          <CheckCircle className="w-5 h-5 shrink-0" />
          {t('plans.pay.success')}
        </div>
      )}

      {subscription && (
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          {t('plans.currentPlan', { plan: t(PLANS.find((p) => p.id === activeTier)?.nameKey ?? 'plans.basic.name') })}
        </p>
      )}

      {!hasPlans && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/50 p-10 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] dark:bg-[#0D9488]/15 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-[#0D9488]" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('plans.emptyTitle')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('plans.emptyDesc')}</p>
        </div>
      )}

      {hasPlans && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isActive = activeTier === plan.id;
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white dark:bg-slate-900/80 p-6 shadow-sm ${
                  plan.popular
                    ? 'border-[#0D9488] ring-2 ring-[#0D9488]/20'
                    : 'border-slate-200/80 dark:border-slate-700/80'
                } ${isActive ? 'ring-2 ring-emerald-500/30 border-emerald-400/50' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-[#0D9488] text-white px-3 py-1 rounded-full">
                    {t('plans.popular')}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -top-3 right-4 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-full">
                    {t('plans.active')}
                  </span>
                )}

                <div className="flex items-center gap-2.5 mb-1">
                  <PlanBadge tier={plan.id} size={32} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t(plan.nameKey)}</h3>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">{t(plan.descriptionKey)}</p>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 px-3 py-2.5 border border-slate-100 dark:border-slate-700">
                  <PlanBadge tier={plan.id} size={22} />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t('plans.previewName')}</span>
                </div>

                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#0D9488]">{plan.priceLabel}</span>
                  <span className="text-sm text-slate-500">{t('plans.perMonth')}</span>
                </p>

                <div
                  className={`mt-4 rounded-xl px-4 py-3 text-center ${
                    plan.feePercent === 0
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50'
                      : 'bg-[#ECFDF5]/80 dark:bg-[#0D9488]/10 border border-[#0D9488]/20'
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('plans.feeLabel')}
                  </p>
                  <p
                    className={`text-2xl font-black mt-0.5 ${
                      plan.feePercent === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#0D9488]'
                    }`}
                  >
                    {formatFeePercent(plan.feePercent, locale)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t(plan.feeLabelKey)}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.includesPreviousKey && (
                    <li className="flex items-start gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <Layers className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                      {t(plan.includesPreviousKey)}
                    </li>
                  )}
                  {plan.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                      {t(key)}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSubscribePlan(plan)}
                  className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                    plan.popular || plan.id === 'premium'
                      ? 'bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isActive ? t('plans.ctaChange') : t('plans.cta')}
                </button>
              </article>
            );
          })}
        </div>
      )}

      {subscribePlan && (
        <PlanSubscribeModal
          plan={subscribePlan}
          onClose={() => setSubscribePlan(null)}
          onSubscribed={() => {
            setActiveTier(subscribePlan.id);
            setJustSubscribed(true);
          }}
        />
      )}
    </SettingsPageShell>
  );
}
