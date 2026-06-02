import type { AuthError, Session, User } from '@supabase/supabase-js';
import type { AuthProvider, AuthSession, AuthUserType, ProfileRole } from '@/lib/auth-session';
import { applyAdminMasterPlan } from '@/lib/pro-plan-session';
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

function buildSession(user: User, provider: AuthProvider, profileRole?: ProfileRole): AuthSession {
  const meta = user.user_metadata ?? {};
  const roleFromMeta = parseProfileRole(meta[PROFILE_ROLE_KEY]);
  const role = profileRole ?? roleFromMeta;
  const isAdminMaster = role === 'admin_master';
  const session: AuthSession = {
    userId: user.id,
    userType: isAdminMaster ? 'pro' : parseUserType(meta[USER_TYPE_KEY]),
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
): AuthSession {
  return buildSession(user, provider);
}

/** Sincroniza `profiles.role` do banco na sessão (ex.: admin_master). */
export async function enrichSessionWithProfile(user: User, session: AuthSession): Promise<AuthSession> {
  if (!supabase || !user.id) return session;
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  const role = parseProfileRole(data?.role);
  if (!role) return session;
  return buildSession(user, session.provider, role);
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
): Promise<{ session: AuthSession | null; error: AuthError | null; needsConfirmation?: boolean }> {
  if (!supabase) return { session: null, error: null };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { session: null, error };
  if (!data.session) return { session: null, error: null };
  const base = sessionFromSupabaseSession(data.session, 'email');
  const session = await enrichSessionWithProfile(data.session.user, base);
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
      },
    },
  });
  if (error) return { session: null, error };
  if (!data.session) {
    return { session: null, error: null, needsConfirmation: true };
  }
  const base = sessionFromSupabaseSession(data.session, 'email');
  const session = await enrichSessionWithProfile(data.session.user, base);
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
      redirectTo: `${window.location.origin}/`,
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

export function consumeOAuthUserType(): AuthUserType {
  try {
    const v =
      sessionStorage.getItem('taskly-oauth-user-type') ??
      sessionStorage.getItem('job4you-oauth-user-type');
    sessionStorage.removeItem('taskly-oauth-user-type');
    sessionStorage.removeItem('job4you-oauth-user-type');
    return v === 'pro' ? 'pro' : 'client';
  } catch {
    return 'client';
  }
}

export async function ensureOAuthUserType(user: User): Promise<User> {
  const current = user.user_metadata?.[USER_TYPE_KEY];
  if (current === 'client' || current === 'pro') return user;
  const userType = consumeOAuthUserType();
  if (!supabase) return user;
  const { data } = await supabase.auth.updateUser({
    data: { [USER_TYPE_KEY]: userType },
  });
  return data.user ?? user;
}

export async function signOutSupabase() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function resetPasswordForEmail(email: string) {
  if (!supabase) return { error: null };
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/`,
  });
  return { error };
}

export { supabaseConfigured };
