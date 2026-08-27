import { Shield, CreditCard, UserCheck, FileText, Scale, Lock, Award, ScrollText, ShieldCheck } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';
import { SettingsPageShell, Section, Row } from './settings/SettingsUI';

const ITEMS = [
  { icon: CreditCard, key: 'pay', color: 'text-[#FF5A12]' },
  { icon: UserCheck, key: 'verify', color: 'text-blue-500' },
  { icon: FileText, key: 'contract', color: 'text-indigo-500' },
  { icon: Scale, key: 'dispute', color: 'text-amber-600' },
  { icon: Lock, key: 'privacy', color: 'text-slate-600' },
  { icon: Award, key: 'guarantee', color: 'text-emerald-600' },
] as const;

type TrustKey = (typeof ITEMS)[number]['key'];

const POINT_KEYS: Record<Exclude<TrustKey, 'privacy'>, string[]> = {
  pay: ['trust.pay.p1', 'trust.pay.p2', 'trust.pay.p3', 'trust.pay.p4', 'trust.pay.p5'],
  verify: ['trust.verify.p1', 'trust.verify.p2', 'trust.verify.p3', 'trust.verify.p4', 'trust.verify.p5'],
  contract: ['trust.contract.p1', 'trust.contract.p2', 'trust.contract.p3', 'trust.contract.p4'],
  dispute: ['trust.dispute.p1', 'trust.dispute.p2', 'trust.dispute.p3', 'trust.dispute.p4', 'trust.dispute.p5'],
  guarantee: ['trust.guarantee.p1', 'trust.guarantee.p2', 'trust.guarantee.p3', 'trust.guarantee.p4'],
};

const PRIVACY_BLOCKS = [
  {
    titleKey: 'trust.privacy.storedTitle',
    introKey: 'trust.privacy.storedIntro',
    pointKeys: [
      'trust.privacy.stored1',
      'trust.privacy.stored2',
      'trust.privacy.stored3',
      'trust.privacy.stored4',
      'trust.privacy.stored5',
      'trust.privacy.stored6',
    ],
  },
  {
    titleKey: 'trust.privacy.notStoredTitle',
    introKey: 'trust.privacy.notStoredIntro',
    pointKeys: [
      'trust.privacy.notStored1',
      'trust.privacy.notStored2',
      'trust.privacy.notStored3',
      'trust.privacy.notStored4',
      'trust.privacy.notStored5',
    ],
  },
  {
    titleKey: 'trust.privacy.secureTitle',
    introKey: 'trust.privacy.secureIntro',
    pointKeys: [
      'trust.privacy.secure1',
      'trust.privacy.secure2',
      'trust.privacy.secure3',
      'trust.privacy.secure4',
      'trust.privacy.secure5',
    ],
  },
  {
    titleKey: 'trust.privacy.rightsTitle',
    introKey: 'trust.privacy.rightsIntro',
    pointKeys: ['trust.privacy.rights1', 'trust.privacy.rights2', 'trust.privacy.rights3'],
  },
] as const;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((text) => (
        <li key={text} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A12]" aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function PrivacyDetails({ t }: { t: (key: string) => string }) {
  return (
    <div className="mt-3 space-y-5">
      {PRIVACY_BLOCKS.map((block) => (
        <div key={block.titleKey} className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 px-4 py-3.5">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t(block.titleKey)}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t(block.introKey)}</p>
          <BulletList items={block.pointKeys.map((k) => t(k))} />
        </div>
      ))}
    </div>
  );
}

interface Props {
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export function TrustScreen({ onOpenTerms, onOpenPrivacy }: Props) {
  const { t } = useAppSettings();

  return (
    <SettingsPageShell title={t('trust.title')} subtitle={t('trust.subtitle')}>
      <div className="rounded-2xl border border-[#FF5A12]/20 bg-[#FFF0E6]/50 dark:bg-[#FF5A12]/10 p-5 mb-6 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-[#FF5A12]/15 flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 text-[#FF5A12]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('trust.introTitle')}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">{t('trust.introBody')}</p>
        </div>
      </div>

      {(onOpenTerms || onOpenPrivacy) && (
        <div className="mb-8">
          <Section title={t('terms.legalSection')}>
            {onOpenTerms && (
              <Row
                icon={ScrollText}
                label={t('terms.button')}
                sublabel={t('terms.buttonSub')}
                color="text-[#FF5A12]"
                onClick={onOpenTerms}
              />
            )}
            {onOpenPrivacy && (
              <Row
                icon={ShieldCheck}
                label={t('privacy.button')}
                sublabel={t('privacy.buttonSub')}
                color="text-slate-600"
                onClick={onOpenPrivacy}
              />
            )}
          </Section>
        </div>
      )}

      <ul className="space-y-4">
        {ITEMS.map(({ icon: Icon, key, color }) => (
          <li
            key={key}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-sm"
          >
            <div className="flex gap-4">
              <div
                className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white">{t(`trust.${key}Title`)}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{t(`trust.${key}Desc`)}</p>

                {key === 'privacy' ? (
                  <PrivacyDetails t={t} />
                ) : (
                  <BulletList items={POINT_KEYS[key].map((k) => t(k))} />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SettingsPageShell>
  );
}
