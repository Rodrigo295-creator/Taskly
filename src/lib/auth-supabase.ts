import type { AuthError, Session, User } from '@supabase/supabase-js';
import type { AuthProvider, AuthSession, AuthUserType, ProfileRole } from '@/lib/auth-session';
import {
  applyAdminMasterPlan,
  clearProPlanSubscription,
  saveProPlanSubscription,
  type PaymentFrequency,
} from '@/lib/pro-plan-session';
import { isOAuthProviderEnabled, type OAuthProvider } from '@/lib/auth-oauth-config';
import { supabase, supabaseConfigured } from '@/lib/supabase';

const USER_TYPE_KEY = 'user_type';
const PROFILE_ROLE_KEY = 'role';

function parseUserType(value: unknown): AuthUserType {
  return value === 'pro' ? 'pro' : 'client';
}

function parseProfileRole(value: unknown): ProfileRole | undefined {
  if (value === 'admin_master' || value === 'professional' || value === 'client') {
    return value;
  }
  return undefined;
}

function buildSession(
  user: User,
  provider: AuthProvider,
  profileRole?: ProfileRole,
  userTypeOverride?: AuthUserType,
): AuthSession {
  const meta = user.user_metadata ?? {};
  const roleFromMeta = parseProfileRole(meta[PROFILE_ROLE_KEY]);
  const role = profileRole ?? roleFromMeta;
  const isAdminMaster = role === 'admin_master';
  // Sidebar mode follows login choice (client | pro). admin_master keeps privileges
  // via isAdminMaster but can still open the app as either mode.
  const session: AuthSession = {
    userId: user.id,
    userType: userTypeOverride ?? parseUserType(meta[USER_TYPE_KEY]),
    provider,
    email: user.email ?? undefined,
    name:
      (typeof meta.full_name === 'string' && meta.full_name.trim()) ||
      (typeof meta.name === 'string' && meta.name.trim()) ||
      undefined,
    profileRole: role,
    isAdminMaster,
  };
  if (isAdminMaster) applyAdminMasterPlan();
  return session;
}

export function sessionFromSupabaseUser(
  user: User,
  provider: AuthProvider,
  userTypeOverride?: AuthUserType,
): AuthSession {
  return buildSession(user, provider, undefined, userTypeOverride);
}

/**
 * Plano do profissional: fonte de verdade em `professional_profiles.plan_tier`
 * (alterável só pelo service role). O sessionStorage é apenas cache de exibição.
 */
async function syncProPlanFromBackend(userId: string, isAdminMaster: boolean) {
  if (!supabase || isAdminMaster) return;
  const { data } = await supabase
    .from('professional_profiles')
    .select('plan_tier, plan_frequency, plan_subscribed_at')
    .eq('id', userId)
    .maybeSingle();
  const tier = data?.plan_tier;
  if (tier === 'pro' || tier === 'premium') {
    saveProPlanSubscription({
      tier,
      frequency: (data?.plan_frequency ?? 'monthly') as PaymentFrequency,
      subscribedAt: data?.plan_subscribed_at ?? new Date().toISOString(),
    });
  } else {
    clearProPlanSubscription();
  }
}

/** Sincroniza `profiles.role` do banco na sessão (ex.: admin_master). */
export async function enrichSessionWithProfile(user: User, session: AuthSession): Promise<AuthSession> {
  if (!supabase || !user.id) return session;
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  const role = parseProfileRole(data?.role);
  // Keep the login-chosen userType; only refresh role / admin flags from DB.
  const enriched = role
    ? buildSession(user, session.provider, role, session.userType)
    : session;
  await syncProPlanFromBackend(user.id, Boolean(enriched.isAdminMaster));
  return enriched;
}

/**
 * Persist the chosen client/pro mode on the Auth user and rebuild the app session.
 * Same account can enter either mode; sidebar follows this value.
 */
async function applyLoginUserType(
  user: User,
  provider: AuthProvider,
  userType: AuthUserType,
): Promise<AuthSession> {
  let nextUser = user;
  const current = user.user_metadata?.[USER_TYPE_KEY];
  if (supabase && current !== userType) {
    const { data } = await supabase.auth.updateUser({
      data: { [USER_TYPE_KEY]: userType },
    });
    if (data.user) nextUser = data.user;
  }
  if (supabase && userType === 'pro') {
    const { error } = await supabase.rpc('ensure_professional_profile');
    if (error && import.meta.env.DEV) {
      console.warn('[Taskly] ensure_professional_profile:', error.message);
    }
  }
  const base = sessionFromSupabaseUser(nextUser, provider, userType);
  return enrichSessionWithProfile(nextUser, base);
}

export function sessionFromSupabaseSession(
  session: Session,
  provider: AuthProvider = 'email',
): AuthSession {
  return sessionFromSupabaseUser(session.user, provider);
}

export function authErrorKey(error: AuthError | null): string {
  if (!error) return 'auth.error.generic';
  const msg = error.message.toLowerCase();
  if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
    return 'auth.error.invalidCredentials';
  }
  if (msg.includes('already registered') || msg.includes('already exists')) {
    return 'auth.error.emailTaken';
  }
  if (msg.includes('email not confirmed')) return 'auth.error.emailNotConfirmed';
  if (msg.includes('password')) return 'auth.error.passwordWeak';
  if (
    msg.includes('not enabled') ||
    msg.includes('unsupported provider') ||
    msg.includes('validation_failed')
  ) {
    return 'auth.error.oauthNotEnabled';
  }
  return 'auth.error.generic';
}

export async function getSupabaseAuthSession(): Promise<AuthSession | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) return null;
  const provider =
    (data.session.user.app_metadata?.provider as AuthProvider | undefined) ?? 'email';
  const base = sessionFromSupabaseSession(data.session, provider);
  return enrichSessionWithProfile(data.session.user, base);
}

export async function signInWithEmail(
  email: string,
  password: string,
  userType: AuthUserType,
): Promise<{ session: AuthSession | null; error: AuthError | null; needsConfirmation?: boolean }> {
  if (!supabase) return { session: null, error: null };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { session: null, error };
  if (!data.session) return { session: null, error: null };
  const session = await applyLoginUserType(data.session.user, 'email', userType);
  return { session, error: null };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  userType: AuthUserType,
): Promise<{ session: AuthSession | null; error: AuthError | null; needsConfirmation?: boolean }> {
  if (!supabase) return { session: null, error: null };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name.trim(),
        [USER_TYPE_KEY]: userType,
        // Legacy key still read by older handle_new_user variants
        role: userType === 'pro' ? 'professional' : 'client',
      },
    },
  });
  if (error) return { session: null, error };
  if (!data.session) {
    return { session: null, error: null, needsConfirmation: true };
  }
  const session = await applyLoginUserType(data.session.user, 'email', userType);
  return { session, error: null };
}

function oauthNotEnabledError(): AuthError {
  return {
    name: 'AuthApiError',
    message: 'Unsupported provider: provider is not enabled',
    status: 400,
  } as AuthError;
}

export async function signInWithOAuth(provider: OAuthProvider, userType: AuthUserType) {
  if (!supabase) return { error: null };
  if (!(await isOAuthProviderEnabled(provider))) {
    return { error: oauthNotEnabledError() };
  }
  try {
    sessionStorage.setItem('taskly-oauth-user-type', userType);
  } catch {
    /* ignore */
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/app`,
      skipBrowserRedirect: true,
      queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
    },
  });
  if (error) return { error };
  if (data?.url) {
    window.location.assign(data.url);
  }
  return { error: null };
}

/** Peek + clear the OAuth login mode chosen before redirect. */
export function consumeOAuthUserType(): AuthUserType | null {
  try {
    const v =
      sessionStorage.getItem('taskly-oauth-user-type') ??
      sessionStorage.getItem('job4you-oauth-user-type');
    sessionStorage.removeItem('taskly-oauth-user-type');
    sessionStorage.removeItem('job4you-oauth-user-type');
    if (v === 'pro' || v === 'client') return v;
    return null;
  } catch {
    return null;
  }
}

/**
 * After OAuth redirect, always apply the intended client/pro mode when present
 * (even if the account already had a previous user_type).
 */
export async function ensureOAuthUserType(user: User): Promise<User> {
  const intended = consumeOAuthUserType();
  if (!intended || !supabase) return user;
  let nextUser = user;
  if (user.user_metadata?.[USER_TYPE_KEY] !== intended) {
    const { data } = await supabase.auth.updateUser({
      data: {
        [USER_TYPE_KEY]: intended,
        role: intended === 'pro' ? 'professional' : 'client',
      },
    });
    if (data.user) nextUser = data.user;
  }
  if (intended === 'pro') {
    const { error } = await supabase.rpc('ensure_professional_profile');
    if (error && import.meta.env.DEV) {
      console.warn('[Taskly] ensure_professional_profile:', error.message);
    }
  }
  return nextUser;
}

export async function signOutSupabase() {
  clearProPlanSubscription();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function resetPasswordForEmail(email: string, redirectPath = '/login') {
  if (!supabase) return { error: null };
  const path = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${path}`,
  });
  return { error };
}

export { supabaseConfigured };
