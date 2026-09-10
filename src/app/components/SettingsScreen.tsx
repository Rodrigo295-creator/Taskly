import { useEffect, useState } from 'react';
import {
  Globe,
  DollarSign,
  Sun,
  Moon,
  Monitor,
  Type,
  Bell,
  Shield,
  Lock,
  MapPin,
  Wallet,
  CreditCard,
  FileText,
  HelpCircle,
  Star,
  Scale,
  Accessibility,
  Sparkles,
  Mail,
  MessageSquare,
  Smartphone,
  Download,
  Trash2,
  Fingerprint,
  Clock,
  Laptop,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import { useAppSettings, type Theme, type FontSize } from '../context/AppSettings';
import {
  readNotificationPrefs,
  writeNotificationPrefs,
  readPrivacyPrefs,
  writePrivacyPrefs,
} from '@/lib/settings-storage';
import { BrandName } from './Logo';
import {
  SettingsPageShell,
  Section,
  Row,
  ToggleRow,
  InlineBlock,
  ChipSelect,
  SavedBanner,
} from './settings/SettingsUI';
import { LangModal, CurrencyModal } from './settings/settings-modals';

export type SettingsTab =
  | 'general'
  | 'appearance'
  | 'notifications'
  | 'privacy'
  | 'security'
  | 'accessibility'
  | 'billing'
  | 'about';

const TAB_IDS: SettingsTab[] = [
  'general',
  'appearance',
  'notifications',
  'privacy',
  'security',
  'accessibility',
  'billing',
  'about',
];

export function screenToSettingsTab(screen: string): SettingsTab {
  if (screen === 'settings') return 'general';
  const suffix = screen.replace('settings-', '') as SettingsTab;
  return TAB_IDS.includes(suffix) ? suffix : 'general';
}

interface Props {
  initialTab?: SettingsTab;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export function SettingsScreen({ initialTab = 'general', onOpenTerms, onOpenPrivacy }: Props) {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    currency,
    setCurrency,
    locale,
    setLocale,
    t,
    animations,
    setAnimations,
    reduceMotion,
    setReduceMotion,
    highContrast,
    setHighContrast,
    touchTargets,
    setTouchTargets,
    captions,
    setCaptions,
    screenReader,
    setScreenReader,
  } = useAppSettings();
  const [tab, setTab] = useState<SettingsTab>(initialTab);
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);
  const [modal, setModal] = useState<'lang' | 'currency' | null>(null);
  const [exportDone, setExportDone] = useState(false);

  const [dateFormat, setDateFormat] = useState<'dmy' | 'mdy' | 'iso'>('dmy');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [density, setDensity] = useState<'comfort' | 'compact'>('comfort');

  const initialNotif = readNotificationPrefs();
  const [pushNotif, setPushNotif] = useState(initialNotif.push);
  const [emailNotif, setEmailNotif] = useState(initialNotif.email);
  const [smsNotif, setSmsNotif] = useState(initialNotif.sms);
  const [quietHours, setQuietHours] = useState(initialNotif.quietHours);
  const [notifSound, setNotifSound] = useState(initialNotif.sound);
  const [notifPrefs, setNotifPrefs] = useState({
    newOffers: initialNotif.newOffers,
    messages: initialNotif.messages,
    payments: initialNotif.payments,
    reminders: initialNotif.reminders,
    reviews: initialNotif.reviews,
    orderUpdates: initialNotif.orderUpdates,
    promotions: initialNotif.promotions,
    marketing: initialNotif.marketing,
  });

  const initialPrivacy = readPrivacyPrefs();
  const [visibility, setVisibility] = useState(initialPrivacy.visibility);
  const [onlineStatus, setOnlineStatus] = useState(initialPrivacy.onlineStatus);
  const [analytics, setAnalytics] = useState(initialPrivacy.analytics);
  const [personalizedAds, setPersonalizedAds] = useState(initialPrivacy.personalizedAds);
  const [locationAccess, setLocationAccess] = useState(initialPrivacy.locationAccess);

  useEffect(() => {
    writeNotificationPrefs({
      push: pushNotif,
      email: emailNotif,
      sms: smsNotif,
      quietHours,
      sound: notifSound,
      ...notifPrefs,
    });
  }, [pushNotif, emailNotif, smsNotif, quietHours, notifSound, notifPrefs]);

  useEffect(() => {
    writePrivacyPrefs({
      visibility,
      onlineStatus,
      analytics,
      personalizedAds,
      locationAccess,
    });
  }, [visibility, onlineStatus, analytics, personalizedAds, locationAccess]);

  const langLabel = locale === 'pt-BR' ? 'Português (Brasil)' : locale === 'en-US' ? 'English (US)' : 'Español';
  const currencyLabel = t(`settings.currency.${currency}`);

  const themeOptions: { value: Theme; label: string; Icon: React.ElementType }[] = [
    { value: 'light', label: t('settings.themeLight'), Icon: Sun },
    { value: 'dark', label: t('settings.themeDark'), Icon: Moon },
    { value: 'system', label: t('settings.themeSystem'), Icon: Monitor },
  ];

  const fontOptions: { value: FontSize; label: string; size: string }[] = [
    { value: 'sm', label: t('settings.fontSm'), size: 'text-xs' },
    { value: 'md', label: t('settings.fontMd'), size: 'text-sm' },
    { value: 'lg', label: t('settings.fontLg'), size: 'text-base' },
  ];

  const notifItems: { key: keyof typeof notifPrefs; label: string; sub: string }[] = [
    { key: 'newOffers', label: t('settings.notif.offers'), sub: t('settings.notif.offersSub') },
    { key: 'messages', label: t('settings.notif.messages'), sub: t('settings.notif.messagesSub') },
    { key: 'payments', label: t('settings.notif.payments'), sub: t('settings.notif.paymentsSub') },
    { key: 'orderUpdates', label: t('settings.notif.orderUpdates'), sub: t('settings.notif.orderUpdatesSub') },
    { key: 'reminders', label: t('settings.notif.reminders'), sub: t('settings.notif.remindersSub') },
    { key: 'reviews', label: t('settings.notif.reviews'), sub: t('settings.notif.reviewsSub') },
    { key: 'promotions', label: t('settings.notif.promotions'), sub: t('settings.notif.promotionsSub') },
    { key: 'marketing', label: t('settings.notif.marketing'), sub: t('settings.notif.marketingSub') },
  ];

  return (
    <SettingsPageShell title={t('settings.pageTitle')} subtitle={t('settings.pageSubtitle')}>
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-12 w-full min-w-0">
        <div className="xl:w-60 shrink-0 min-w-0 -mx-4 sm:mx-0 xl:mx-0">
        <nav
          className="flex xl:flex-col gap-1.5 overflow-x-auto xl:overflow-visible px-4 sm:px-0 pb-1 xl:pb-0 xl:sticky xl:top-4 xl:self-start scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
          aria-label={t('settings.pageTitle')}
        >
          {TAB_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`whitespace-nowrap text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 xl:w-full ${
                tab === id
                  ? 'bg-[#ECFDF5] text-[#0D9488] dark:bg-[#0D9488]/15 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {t(`settings.tab.${id}`)}
            </button>
          ))}
        </nav>
        </div>

        <div className="flex-1 min-w-0 max-w-full">
          {tab === 'general' && (
            <>
              <Section title={t('settings.langCurrency')}>
                <Row icon={Globe} label={t('settings.language')} sublabel={langLabel} onClick={() => setModal('lang')} color="text-blue-500" />
                <Row icon={DollarSign} label={t('settings.currency')} sublabel={currencyLabel} onClick={() => setModal('currency')} color="text-emerald-500" />
              </Section>
              <Section title={t('settings.general.region')} description={t('settings.general.regionSub')}>
                <Row icon={Clock} label={t('settings.general.timezone')} sublabel="America/São_Paulo (GMT-3)" color="text-slate-500" disabled />
                <InlineBlock title={t('settings.general.dateFormat')} icon={FileText} iconColor="text-indigo-500">
                  <ChipSelect
                    value={dateFormat}
                    onChange={setDateFormat}
                    options={[
                      { value: 'dmy', label: t('settings.general.dateDMY') },
                      { value: 'mdy', label: t('settings.general.dateMDY') },
                      { value: 'iso', label: t('settings.general.dateISO') },
                    ]}
                  />
                </InlineBlock>
                <InlineBlock title={t('settings.general.units')} icon={MapPin} iconColor="text-orange-500">
                  <ChipSelect
                    value={units}
                    onChange={setUnits}
                    options={[
                      { value: 'metric', label: t('settings.general.metric') },
                      { value: 'imperial', label: t('settings.general.imperial') },
                    ]}
                  />
                </InlineBlock>
              </Section>
              {(onOpenTerms || onOpenPrivacy) && (
                <Section title={t('terms.legalSection')}>
                  {onOpenTerms && (
                    <Row
                      icon={ScrollText}
                      label={t('terms.button')}
                      sublabel={t('terms.buttonSub')}
                      color="text-[#0D9488]"
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
              )}
            </>
          )}

          {tab === 'appearance' && (
            <Section title={t('settings.appearance')}>
              <InlineBlock title={t('settings.theme')} icon={Sun} iconColor="text-amber-500">
                <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2 w-full">
                  {themeOptions.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTheme(value)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3.5 sm:py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-colors min-w-0 w-full ${
                        theme === value
                          ? 'border-[#0D9488] bg-[#ECFDF5] text-[#0D9488] dark:bg-[#0D9488]/15'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </InlineBlock>
              <InlineBlock title={t('settings.fontSize')} icon={Type} iconColor="text-purple-500">
                <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2 w-full">
                  {fontOptions.map(({ value, label, size }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFontSize(value)}
                      className={`flex flex-col items-center justify-center gap-1 py-3.5 sm:py-3 px-2 rounded-xl border transition-colors min-w-0 w-full ${
                        fontSize === value
                          ? 'border-[#0D9488] bg-[#ECFDF5] dark:bg-[#0D9488]/15'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      }`}
                    >
                      <span className={`font-bold text-slate-900 dark:text-white ${size}`}>Aa</span>
                      <span className={`text-xs font-medium ${fontSize === value ? 'text-[#0D9488]' : 'text-slate-500'}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </InlineBlock>
              <InlineBlock title={t('settings.appearance.density')} icon={Monitor} iconColor="text-slate-500">
                <ChipSelect
                  value={density}
                  onChange={setDensity}
                  options={[
                    { value: 'comfort', label: t('settings.appearance.densityComfort') },
                    { value: 'compact', label: t('settings.appearance.densityCompact') },
                  ]}
                />
              </InlineBlock>
              <ToggleRow icon={Sparkles} label={t('settings.appearance.animations')} sublabel={t('settings.appearance.animationsSub')} value={animations} onChange={setAnimations} color="text-pink-500" />
              <ToggleRow icon={Accessibility} label={t('settings.appearance.reduceMotion')} sublabel={t('settings.appearance.reduceMotionSub')} value={reduceMotion} onChange={setReduceMotion} color="text-cyan-500" />
              <ToggleRow icon={Sun} label={t('settings.appearance.highContrast')} sublabel={t('settings.appearance.highContrastSub')} value={highContrast} onChange={setHighContrast} color="text-amber-600" />
            </Section>
          )}

          {tab === 'notifications' && (
            <>
              <Section title={t('settings.notif.channels')} description={t('settings.notif.channelsSub')}>
                <ToggleRow icon={Bell} label={t('settings.notif.push')} sublabel={t('settings.notif.pushSub')} value={pushNotif} onChange={setPushNotif} color="text-rose-500" />
                <ToggleRow icon={Mail} label={t('settings.notif.email')} sublabel={t('settings.notif.emailSub')} value={emailNotif} onChange={setEmailNotif} color="text-blue-500" />
                <ToggleRow icon={MessageSquare} label={t('settings.notif.sms')} sublabel={t('settings.notif.smsSub')} value={smsNotif} onChange={setSmsNotif} color="text-green-600" />
              </Section>
              <Section title={t('settings.notif.types')}>
                {notifItems.map(({ key, label, sub }) => (
                  <ToggleRow
                    key={key}
                    icon={Bell}
                    label={label}
                    sublabel={sub}
                    value={notifPrefs[key]}
                    onChange={(v) => setNotifPrefs((p) => ({ ...p, [key]: v }))}
                    color="text-[#0D9488]"
                  />
                ))}
              </Section>
              <Section title={t('settings.preferences')} description={t('settings.preferencesSub')}>
                <ToggleRow icon={Clock} label={t('settings.notif.quietHours')} sublabel={t('settings.notif.quietHoursSub')} value={quietHours} onChange={setQuietHours} color="text-indigo-500" />
                <ToggleRow icon={Smartphone} label={t('settings.notif.sound')} sublabel={t('settings.notif.soundSub')} value={notifSound} onChange={setNotifSound} color="text-violet-500" />
              </Section>
            </>
          )}

          {tab === 'privacy' && (
            <Section title={t('settings.privacy')}>
              <InlineBlock title={t('settings.privacy.visibility')} icon={Shield} iconColor="text-teal-500">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">{t('settings.privacy.visibilitySub')}</p>
                <ChipSelect
                  value={visibility}
                  onChange={setVisibility}
                  options={[
                    { value: 'public', label: t('settings.privacy.visibilityPublic') },
                    { value: 'contacts', label: t('settings.privacy.visibilityContacts') },
                    { value: 'private', label: t('settings.privacy.visibilityPrivate') },
                  ]}
                />
              </InlineBlock>
              <ToggleRow icon={MapPin} label={t('settings.location')} sublabel={t('settings.locationSub')} value={locationAccess} onChange={setLocationAccess} color="text-sky-500" />
              <ToggleRow icon={Smartphone} label={t('settings.privacy.onlineStatus')} sublabel={t('settings.privacy.onlineStatusSub')} value={onlineStatus} onChange={setOnlineStatus} color="text-emerald-500" />
              <ToggleRow icon={Sparkles} label={t('settings.privacy.analytics')} sublabel={t('settings.privacy.analyticsSub')} value={analytics} onChange={setAnalytics} color="text-purple-500" />
              <ToggleRow icon={Star} label={t('settings.privacy.personalizedAds')} sublabel={t('settings.privacy.personalizedAdsSub')} value={personalizedAds} onChange={setPersonalizedAds} color="text-amber-500" />
              <Row
                icon={Download}
                label={t('settings.privacy.export')}
                sublabel={t('settings.privacy.exportSub')}
                color="text-blue-600"
                onClick={() => setExportDone(true)}
              />
              {exportDone && (
                <div className="px-4 pb-4">
                  <SavedBanner message={t('settings.privacy.exportDone')} />
                </div>
              )}
              <Row icon={Trash2} label={t('settings.privacy.delete')} sublabel={t('settings.privacy.deleteSub')} color="text-rose-500" disabled />
            </Section>
          )}

          {tab === 'security' && (
            <Section title={t('settings.tab.security')}>
              <Row icon={Lock} label={t('settings.security.password')} sublabel={t('settings.security.passwordSub')} color="text-amber-600" disabled />
              <Row
                icon={Shield}
                label={t('settings.twoFactor')}
                sublabel={t('settings.twoFactorSub')}
                color="text-teal-500"
                disabled
              />
              <Row
                icon={Fingerprint}
                label={t('settings.security.biometric')}
                sublabel={t('settings.rowSoon')}
                color="text-indigo-500"
                disabled
              />
              <Row
                icon={Laptop}
                label={t('settings.security.sessions')}
                sublabel={t('settings.rowSoon')}
                color="text-slate-500"
                disabled
              />
            </Section>
          )}

          {tab === 'accessibility' && (
            <Section title={t('settings.tab.accessibility')} description={t('settings.a11y.sectionSub')}>
              <ToggleRow icon={Accessibility} label={t('settings.a11y.touchTargets')} sublabel={t('settings.a11y.touchTargetsSub')} value={touchTargets} onChange={setTouchTargets} />
              <ToggleRow icon={Type} label={t('settings.a11y.screenReader')} sublabel={t('settings.a11y.screenReaderSub')} value={screenReader} onChange={setScreenReader} color="text-blue-500" />
              <ToggleRow icon={Sparkles} label={t('settings.appearance.animations')} sublabel={t('settings.appearance.animationsSub')} value={animations} onChange={setAnimations} color="text-pink-500" />
              <ToggleRow icon={Accessibility} label={t('settings.appearance.reduceMotion')} sublabel={t('settings.appearance.reduceMotionSub')} value={reduceMotion} onChange={setReduceMotion} color="text-cyan-500" />
              <ToggleRow icon={Sun} label={t('settings.appearance.highContrast')} sublabel={t('settings.appearance.highContrastSub')} value={highContrast} onChange={setHighContrast} color="text-amber-600" />
              <ToggleRow icon={FileText} label={t('settings.a11y.captions')} sublabel={t('settings.a11y.captionsSub')} value={captions} onChange={setCaptions} color="text-violet-500" />
            </Section>
          )}

          {tab === 'billing' && (
            <Section title={t('settings.billing.methods')} description={t('settings.billing.methodsSub')}>
              <Row icon={CreditCard} label={t('settings.billing.cardDefault')} sublabel={t('settings.billing.cardExpiry')} color="text-indigo-500" disabled />
              <Row icon={Wallet} label={t('settings.billing.pix')} sublabel={t('settings.billing.pixSub')} color="text-emerald-600" disabled />
              <Row icon={CreditCard} label={t('settings.billing.addCard')} color="text-[#0D9488]" disabled />
              <Row icon={FileText} label={t('settings.billing.invoices')} sublabel={t('settings.billing.invoicesSub')} color="text-slate-500" disabled />
              <Row icon={Mail} label={t('settings.billing.invoiceEmail')} sublabel="lucas.ferreira@email.com" color="text-blue-500" disabled />
            </Section>
          )}

          {tab === 'about' && (
            <Section title={t('settings.tab.about')}>
              <Row icon={Sparkles} label={t('settings.about.version')} sublabel="1.0.0 (build 2025.05)" color="text-[#0D9488]" />
              <Row
                icon={Scale}
                label={t('settings.about.terms')}
                sublabel={t('settings.about.termsSub')}
                color="text-slate-500"
                onClick={onOpenTerms}
              />
              <Row
                icon={Shield}
                label={t('settings.about.privacyPolicy')}
                sublabel={t('settings.about.privacyPolicySub')}
                color="text-teal-500"
                onClick={onOpenPrivacy}
              />
              <Row icon={HelpCircle} label={t('settings.about.help')} sublabel={t('settings.about.helpSub')} color="text-blue-500" disabled />
              <Row icon={Star} label={t('settings.about.rate')} sublabel={t('settings.about.rateSub')} color="text-amber-500" disabled />
              <Row icon={FileText} label={t('settings.about.licenses')} sublabel="MIT, Apache 2.0, BSD" color="text-slate-400" disabled />
            </Section>
          )}

          <p className="text-center text-xs text-slate-400 mt-8 lg:hidden">
            <BrandName size="sm" /> v1.0.0
          </p>
        </div>
      </div>

      {modal === 'lang' && <LangModal current={locale} onSelect={setLocale} onClose={() => setModal(null)} />}
      {modal === 'currency' && <CurrencyModal current={currency} onSelect={setCurrency} onClose={() => setModal(null)} />}
    </SettingsPageShell>
  );
}
