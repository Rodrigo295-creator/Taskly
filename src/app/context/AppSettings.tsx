import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  translate,
  readStoredLocale,
  LOCALE_STORAGE_KEY,
  type AppLocale,
  type TranslateParams,
} from '@/lib/i18n';
import {
  readStoredTheme,
  writeStoredTheme,
  readStoredFontSize,
  writeStoredFontSize,
  readStoredCurrency,
  writeStoredCurrency,
  type Theme,
  type FontSize,
  type Currency,
} from '@/lib/settings-storage';

export type { AppLocale, Theme, FontSize, Currency };

export type A11yPrefs = {
  reduceMotion: boolean;
  animations: boolean;
  highContrast: boolean;
  touchTargets: boolean;
  captions: boolean;
  screenReader: boolean;
};

const A11Y_STORAGE_KEY = 'taskly-a11y';

const DEFAULT_A11Y: A11yPrefs = {
  reduceMotion: false,
  animations: true,
  highContrast: false,
  touchTargets: false,
  captions: true,
  screenReader: false,
};

function readStoredA11y(): A11yPrefs {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y;
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return { ...DEFAULT_A11Y, ...parsed };
  } catch {
    return DEFAULT_A11Y;
  }
}

function writeA11y(prefs: A11yPrefs) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

/* ── Exchange rates relative to BRL ── */
const RATES: Record<Currency, number> = {
  BRL: 1,
  USD: 0.175,  // 1 BRL ≈ 0.175 USD  (USD/BRL ≈ 5.70)
  EUR: 0.161,  // 1 BRL ≈ 0.161 EUR  (EUR/BRL ≈ 6.20)
};

const LOCALES: Record<Currency, string> = {
  BRL: 'pt-BR',
  USD: 'en-US',
  EUR: 'fr-FR',
};

interface AppSettingsCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  fontSize: FontSize;
  setFontSize: (f: FontSize) => void;
  resolvedTheme: 'light' | 'dark';

  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Convert a BRL value and format it in the active currency */
  fmt: (brl: number, opts?: { decimals?: number }) => string;
  /** Convert BRL value to active currency number (for calculations) */
  convert: (brl: number) => number;
  /** Currency symbol for the active currency */
  symbol: string;
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  /** UI strings for the active locale */
  t: (key: string, params?: TranslateParams) => string;

  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  animations: boolean;
  setAnimations: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  touchTargets: boolean;
  setTouchTargets: (v: boolean) => void;
  captions: boolean;
  setCaptions: (v: boolean) => void;
  screenReader: boolean;
  setScreenReader: (v: boolean) => void;
}

const SYMBOLS: Record<Currency, string> = { BRL: 'R$', USD: '$', EUR: '€' };

const Ctx = createContext<AppSettingsCtx | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [fontSize, setFontSizeState] = useState<FontSize>(readStoredFontSize);
  const [currency, setCurrencyState] = useState<Currency>(readStoredCurrency);
  const [locale, setLocaleState] = useState<AppLocale>(readStoredLocale);
  const [a11y, setA11y] = useState<A11yPrefs>(readStoredA11y);

  const patchA11y = useCallback((patch: Partial<A11yPrefs>) => {
    setA11y((prev) => {
      const next = { ...prev, ...patch };
      writeA11y(next);
      return next;
    });
  }, []);

  const setReduceMotion = useCallback((v: boolean) => patchA11y({ reduceMotion: v }), [patchA11y]);
  const setAnimations = useCallback((v: boolean) => patchA11y({ animations: v }), [patchA11y]);
  const setHighContrast = useCallback((v: boolean) => patchA11y({ highContrast: v }), [patchA11y]);
  const setTouchTargets = useCallback((v: boolean) => patchA11y({ touchTargets: v }), [patchA11y]);
  const setCaptions = useCallback((v: boolean) => patchA11y({ captions: v }), [patchA11y]);
  const setScreenReader = useCallback((v: boolean) => patchA11y({ screenReader: v }), [patchA11y]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    writeStoredTheme(t);
  }, []);

  const setFontSize = useCallback((f: FontSize) => {
    setFontSizeState(f);
    writeStoredFontSize(f);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    writeStoredCurrency(c);
  }, []);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  useEffect(() => {
    const sizes: Record<FontSize, string> = { sm: '13px', md: '16px', lg: '19px' };
    document.documentElement.style.setProperty('--font-size', sizes[fontSize]);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  useEffect(() => {
    document.documentElement.lang =
      locale === 'en-US' ? 'en' : locale === 'es-ES' ? 'es' : 'pt';
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionOff = a11y.reduceMotion || prefersReduced || !a11y.animations;
    root.classList.toggle('reduce-motion', motionOff);
    root.classList.toggle('no-animations', !a11y.animations);
    root.classList.toggle('high-contrast', a11y.highContrast);
    root.classList.toggle('touch-targets', a11y.touchTargets);
    root.classList.toggle('captions-enabled', a11y.captions);
    root.classList.toggle('screen-reader-mode', a11y.screenReader);
  }, [a11y]);

  const t = useCallback(
    (key: string, params?: TranslateParams) => translate(key, params, locale),
    [locale],
  );

  const convert = (brl: number) => brl * RATES[currency];

  const fmt = (brl: number, opts?: { decimals?: number }) => {
    const decimals = opts?.decimals ?? 2;
    const value = brl * RATES[currency];
    return new Intl.NumberFormat(LOCALES[currency], {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <Ctx.Provider value={{
      theme, setTheme,
      fontSize, setFontSize,
      resolvedTheme,
      currency, setCurrency,
      fmt, convert,
      symbol: SYMBOLS[currency],
      locale,
      setLocale,
      t,
      reduceMotion: a11y.reduceMotion,
      setReduceMotion,
      animations: a11y.animations,
      setAnimations,
      highContrast: a11y.highContrast,
      setHighContrast,
      touchTargets: a11y.touchTargets,
      setTouchTargets,
      captions: a11y.captions,
      setCaptions,
      screenReader: a11y.screenReader,
      setScreenReader,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppSettings must be used within AppSettingsProvider');
  return ctx;
}
