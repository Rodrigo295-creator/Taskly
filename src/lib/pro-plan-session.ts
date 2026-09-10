import { PLANS, type PlanDefinition, type PlanTierId } from '@/data/plans';

const PRO_PLAN_KEY = 'taskly-pro-plan';

export type PaymentFrequency = 'monthly' | 'quarterly' | 'semiannual' | 'yearly';

export interface ProPlanSubscription {
  tier: PlanTierId;
  subscribedAt: string;
  frequency: PaymentFrequency;
}

export interface ServicePayout {
  gross: number;
  feePercent: number;
  feeAmount: number;
  net: number;
}

const DEFAULT_TIER: PlanTierId = 'basic';

export function getProPlanTier(): PlanTierId {
  try {
    const raw = sessionStorage.getItem(PRO_PLAN_KEY);
    if (!raw) return DEFAULT_TIER;
    const parsed = JSON.parse(raw) as ProPlanSubscription;
    if (parsed.tier === 'basic' || parsed.tier === 'pro' || parsed.tier === 'premium') {
      return parsed.tier;
    }
    return DEFAULT_TIER;
  } catch {
    return DEFAULT_TIER;
  }
}

export function readProPlanSubscription(): ProPlanSubscription | null {
  try {
    const raw = sessionStorage.getItem(PRO_PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProPlanSubscription;
    if (parsed.tier !== 'basic' && parsed.tier !== 'pro' && parsed.tier !== 'premium') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProPlanSubscription(sub: ProPlanSubscription) {
  try {
    sessionStorage.setItem(PRO_PLAN_KEY, JSON.stringify(sub));
  } catch {
    /* ignore */
  }
}

export function clearProPlanSubscription() {
  try {
    sessionStorage.removeItem(PRO_PLAN_KEY);
  } catch {
    /* ignore */
  }
}

/** Plano premium automático para contas admin_master */
export function applyAdminMasterPlan() {
  saveProPlanSubscription({
    tier: 'premium',
    subscribedAt: new Date().toISOString(),
    frequency: 'yearly',
  });
}

export function getPlanByTier(tier: PlanTierId): PlanDefinition {
  return PLANS.find((p) => p.id === tier) ?? PLANS[0];
}

export function getProFeePercent(tier?: PlanTierId): number {
  return getPlanByTier(tier ?? getProPlanTier()).feePercent;
}

export function calcServicePayout(gross: number, feePercent?: number): ServicePayout {
  const pct = feePercent ?? getProFeePercent();
  const feeAmount = Math.round(gross * (pct / 100) * 100) / 100;
  const net = Math.round((gross - feeAmount) * 100) / 100;
  return { gross, feePercent: pct, feeAmount, net };
}
