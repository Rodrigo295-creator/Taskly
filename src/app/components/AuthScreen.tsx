import { useEffect, useState } from 'react';
import { Check, Loader2, User, Briefcase, ArrowLeft } from 'lucide-react';
import { LandingAnimatedBackground } from './LandingAnimatedBackground';
import { BrandName, Logo, LogoMark } from './Logo';
import { useAppSettings } from '../context/AppSettings';
import { consumeLoginIntent, type AuthProvider, type AuthSession, type AuthUserType } from '@/lib/auth-session';
import {
  authErrorKey,
  signInWithEmail,
  signInWithOAuth,
  signUpWithEmail,
  resetPasswordForEmail,
  supabaseConfigured,
} from '@/lib/auth-supabase';
import { authMockEnabled } from '@/lib/supabase';
import { useAuthProviders } from '@/hooks/useAuthProviders';

type AuthMode = 'login' | 'signup';
export type AuthPortal = 'client' | 'pro';

interface Props {
  /** Dedicated portal — locks role (client `/login` vs pro `/pro/login`). */
  portal: AuthPortal;
  onAuthenticated: (session: AuthSession) => void;
  onBackToLanding?: () => void;
  onSwitchPortal?: () => void;
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function AuthScreen({ portal, onAuthenticated, onBackToLanding, onSwitchPortal }: Props) {
  const { t, resolvedTheme } = useAppSettings();
  const isDark = resolvedTheme === 'dark';
  const { providers, loading: providersLoading } = useAuthProviders();
  // Em dev sem Supabase os botões sociais usam o mock; em produção só aparecem se o provider estiver ativo.
  const showGoogle = authMockEnabled || (!providersLoading && providers.google);
  const showApple = authMockEnabled || (!providersLoading && providers.apple);
  const showSocial = showGoogle || showApple;

  const userType: AuthUserType = portal === 'pro' ? 'pro' : 'client';
  const [mode, setMode] = useState<AuthMode>('login');

  useEffect(() => {
    const intent = consumeLoginIntent();
    if (intent?.mode) setMode(intent.mode);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<AuthProvider | 'submit' | null>(null);

  const isClient = userType === 'client';
  const resetRedirect = portal === 'pro' ? '/pro/login' : '/login';
  const bullets = isClient
    ? [
        t('auth.client.bullet1'),
        t('auth.client.bullet2'),
        t('auth.client.bullet3'),
        t('auth.client.bullet4'),
      ]
    : [
        t('auth.pro.bullet1'),
        t('auth.pro.bullet2'),
        t('auth.pro.bullet3'),
        t('auth.pro.bullet4'),
      ];

  const demoNoteKey = supabaseConfigured ? 'auth.demoNoteSupabase' : 'auth.demoNote';

  const completeAuthMock = (provider: AuthProvider, sessionEmail?: string, sessionName?: string) => {
    setLoading(provider);
    setError(null);
    window.setTimeout(() => {
      onAuthenticated({
        userType,
        provider,
        email: sessionEmail,
        name: sessionName,
      });
      setLoading(null);
    }, 600);
  };

  const handleSocial = async (provider: 'google' | 'apple') => {
    if (!supabaseConfigured) {
      if (authMockEnabled) {
        completeAuthMock(provider, email || undefined, name || undefined);
      } else {
        setError(t('auth.error.backendUnavailable'));
      }
      return;
    }
    setLoading(provider);
    setError(null);
    const { error } = await signInWithOAuth(provider, userType);
    if (error) {
      setError(t(authErrorKey(error)));
      setLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError(t('auth.error.required'));
      return;
    }
    if (!supabaseConfigured) {
      setError(t('auth.error.forgotUnavailable'));
      return;
    }
    setLoading('submit');
    setError(null);
    const { error } = await resetPasswordForEmail(email.trim(), resetRedirect);
    setLoading(null);
    if (error) setError(t(authErrorKey(error)));
    else setError(t('auth.resetEmailSent'));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError(t('auth.error.required'));
      return;
    }
    if (mode === 'signup') {
      if (!name.trim()) {
        setError(t('auth.error.required'));
        return;
      }
      if (password.length < 8) {
        setError(t('auth.error.passwordShort'));
        return;
      }
      if (password !== passwordConfirm) {
        setError(t('auth.error.passwordMismatch'));
        return;
      }
    }

    if (!supabaseConfigured) {
      if (!authMockEnabled) {
        setError(t('auth.error.backendUnavailable'));
        return;
      }
      setLoading('submit');
      window.setTimeout(() => {
        onAuthenticated({
          userType,
          provider: 'email',
          email: email.trim(),
          name: mode === 'signup' ? name.trim() : undefined,
        });
        setLoading(null);
      }, 500);
      return;
    }

    setLoading('submit');
    const result =
      mode === 'login'
        ? await signInWithEmail(email.trim(), password, userType)
        : await signUpWithEmail(email.trim(), password, name.trim(), userType);

    if (result.error) {
      setError(t(authErrorKey(result.error)));
      setLoading(null);
      return;
    }
    if (result.needsConfirmation) {
      setError(t('auth.error.confirmEmail'));
      setLoading(null);
      return;
    }
    if (result.session) {
      onAuthenticated(result.session);
      setLoading(null);
      return;
    }
    setError(t('auth.error.generic'));
    setLoading(null);
  };

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488]/50 transition-shadow';

  return (
    <div
      className={`relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0F172A] ${isDark ? 'dark text-slate-100' : 'text-[#0F172A]'}`}
    >
      <LandingAnimatedBackground variant="auth" />

      {/* Left — value proposition */}
      <div className="relative z-10 lg:w-[48%] xl:w-[52%] shrink-0 overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/55 via-[#0F172A]/25 to-transparent lg:to-[#0F172A]/10" />

        <div className="relative z-10 flex flex-col min-h-[280px] lg:min-h-screen p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3 mb-8 lg:mb-12">
            <LogoMark size={44} />
            <div>
              <BrandName size="md" onDark className="text-xl" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">
                {t('brand.tagline')}
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl self-start mb-8 text-sm font-semibold border ${
              isClient
                ? 'bg-[#0D9488]/20 border-[#0D9488]/30 text-[#5EEAD4]'
                : 'bg-teal-500/20 border-teal-400/40 text-teal-200'
            }`}
          >
            {isClient ? <User className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            {t(isClient ? 'auth.portal.clientBadge' : 'auth.portal.proBadge')}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight max-w-lg">
            {isClient ? t('auth.client.title') : t('auth.pro.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
            {isClient ? t('auth.client.subtitle') : t('auth.pro.subtitle')}
          </p>

          <ul className="mt-8 space-y-3 flex-1">
            {bullets.map((text) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D9488]/20 text-[#0D9488]">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <p className="hidden lg:block text-xs text-slate-500 mt-8">{t(demoNoteKey)}</p>
        </div>
      </div>

      {/* Right — auth form */}
      <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden">
        <div
          className={`absolute inset-0 backdrop-blur-xl ${
            isDark ? 'bg-[#020617]/82' : 'bg-white/86'
          }`}
        />
        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-10 sm:px-12 lg:px-16 xl:px-20">
          {onBackToLanding && (
            <button
              type="button"
              onClick={onBackToLanding}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0D9488] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.backToHome')}
            </button>
          )}
          <div className="lg:hidden mb-6">
            <Logo />
            <div
              className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                isClient
                  ? 'bg-[#ECFDF5] border-[#0D9488]/25 text-[#115E59]'
                  : 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300'
              }`}
            >
              {isClient ? <User className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              {t(isClient ? 'auth.portal.clientBadge' : 'auth.portal.proBadge')}
            </div>
          </div>

          <div className="flex gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 mb-8">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  mode === m
                    ? 'bg-white dark:bg-slate-900 text-[#0D9488] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t(m === 'login' ? 'auth.tab.login' : 'auth.tab.signup')}
              </button>
            ))}
          </div>

          {showSocial && (
            <div className="space-y-3">
              {showGoogle && (
                <button
                  type="button"
                  disabled={loading !== null}
                  onClick={() => handleSocial('google')}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  {loading === 'google' ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
                  {t('auth.continueGoogle')}
                </button>
              )}

              {showApple && (
                <button
                  type="button"
                  disabled={loading !== null}
                  onClick={() => handleSocial('apple')}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0F172A] dark:bg-white px-4 py-3 text-sm font-semibold text-white dark:text-[#0F172A] hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading === 'apple' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <AppleIcon className="w-5 h-5 dark:text-[#0F172A]" />
                  )}
                  {t('auth.continueApple')}
                </button>
              )}
            </div>
          )}

          {showSocial && (
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm px-3 text-slate-500">{t('auth.orEmail')}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  {t('auth.field.name')}
                </label>
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                {t('auth.field.email')}
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder={t('auth.placeholder.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                {t('auth.field.password')}
              </label>
              <input
                id="auth-password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={t('auth.placeholder.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="auth-password-confirm"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                >
                  {t('auth.field.passwordConfirm')}
                </label>
                <input
                  id="auth-password-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => void handleForgotPassword()}
                  className="text-xs font-semibold text-[#0D9488] hover:underline"
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#0F766E] transition-colors disabled:opacity-60 shadow-lg shadow-[#0D9488]/25"
            >
              {loading === 'submit' && <Loader2 className="w-5 h-5 animate-spin" />}
              {t(mode === 'login' ? 'auth.submit.login' : 'auth.submit.signup')}
            </button>
          </form>

          {onSwitchPortal && (
            <button
              type="button"
              onClick={onSwitchPortal}
              className="mt-6 w-full text-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0D9488] transition-colors"
            >
              {t(isClient ? 'auth.portal.switchToPro' : 'auth.portal.switchToClient')}
            </button>
          )}

          <p className="mt-8 text-center text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            {t('auth.terms')}
          </p>
          <p className="lg:hidden mt-4 text-center text-[10px] text-slate-400">{t(demoNoteKey)}</p>
        </div>
      </div>
    </div>
  );
}
