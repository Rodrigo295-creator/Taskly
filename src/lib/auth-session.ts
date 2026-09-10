export type AuthUserType = 'client' | 'pro';
export type AuthProvider = 'email' | 'google' | 'apple';
/** Papel em `public.profiles.role` (Supabase) */
export type ProfileRole = 'client' | 'professional' | 'admin_master';

export interface AuthSession {
  userType: AuthUserType;
  provider: AuthProvider;
  email?: string;
  name?: string;
  /** Supabase Auth user id when using backend auth */
  userId?: string;
  profileRole?: ProfileRole;
  /** Acesso master: painel pro, plano premium e rotas administrativas */
  isAdminMaster?: boolean;
}

import { migrateSessionStorageKey } from './storage-migrate';

const AUTH_STORAGE_KEY = 'taskly-auth';
const LOGIN_INTENT_KEY = 'taskly-login-intent';
const LEGACY_LOGIN_INTENT_KEY = 'job4you-login-intent';

function clearLegacyAuth() {
  try {
    localStorage.removeItem('job4you-auth-local');
  } catch {
    /* ignore */
  }
}

function migrateAuthKeys() {
  migrateSessionStorageKey('job4you-auth', AUTH_STORAGE_KEY);
  migrateSessionStorageKey(LEGACY_LOGIN_INTENT_KEY, LOGIN_INTENT_KEY);
}

export interface LoginIntent {
  userType: AuthUserType;
  mode?: 'login' | 'signup';
}

export function setLoginIntent(intent: LoginIntent) {
  try {
    sessionStorage.setItem(LOGIN_INTENT_KEY, JSON.stringify(intent));
  } catch {
    /* ignore */
  }
}

export function consumeLoginIntent(): LoginIntent | null {
  try {
    const raw = sessionStorage.getItem(LOGIN_INTENT_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(LOGIN_INTENT_KEY);
    const parsed = JSON.parse(raw) as LoginIntent;
    if (parsed.userType !== 'client' && parsed.userType !== 'pro') return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Returns session only for the current browser tab; new visit requires login again. */
export function readAuthSession(): AuthSession | null {
  migrateAuthKeys();
  clearLegacyAuth();
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed.userType !== 'client' && parsed.userType !== 'pro') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession) {
  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function clearAuthSession() {
  clearLegacyAuth();
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Dev shortcut: `/?login=1` (also `?login` or `?login=true`) opens `/login`. Desabilitado em produção. */
export function hasForceLoginQuery(): boolean {
  if (import.meta.env.PROD) return false;
  try {
    const raw = new URLSearchParams(window.location.search).get('login');
    if (raw === null) return false;
    return raw === '' || raw === '1' || raw === 'true';
  } catch {
    return false;
  }
}

export function consumeForceLoginQuery(): boolean {
  try {
    if (!hasForceLoginQuery()) return false;
    const params = new URLSearchParams(window.location.search);
    params.delete('login');
    const qs = params.toString();
    const next = `/login${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', next);
    return true;
  } catch {
    return false;
  }
}
