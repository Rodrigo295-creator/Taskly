import type { OAuthProvider } from '@/lib/auth-oauth-config';
import { supabaseConfigured } from '@/lib/supabase';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export type AuthProvidersState = {
  google: boolean;
  apple: boolean;
  email: boolean;
};

let cache: AuthProvidersState | null = null;
let inflight: Promise<AuthProvidersState> | null = null;

function envOverride(provider: OAuthProvider): boolean | null {
  const key =
    provider === 'google' ? 'VITE_OAUTH_GOOGLE_ENABLED' : 'VITE_OAUTH_APPLE_ENABLED';
  const raw = import.meta.env[key];
  if (raw === 'true' || raw === '1') return true;
  if (raw === 'false' || raw === '0') return false;
  return null;
}

/** Lê /auth/v1/settings — mesma fonte que o Supabase Auth usa para provedores externos. */
export async function fetchAuthProviders(): Promise<AuthProvidersState> {
  if (cache) return cache;
  if (inflight) return inflight;

  const fallback: AuthProvidersState = { google: false, apple: false, email: true };

  if (!supabaseConfigured || !url || !anonKey) {
    cache = fallback;
    return cache;
  }

  inflight = (async () => {
    try {
      const res = await fetch(`${url}/auth/v1/settings`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });
      if (!res.ok) {
        if (import.meta.env.DEV) console.warn('[auth] settings', res.status);
        return fallback;
      }
      const data = (await res.json()) as {
        external?: { google?: boolean; apple?: boolean; email?: boolean };
      };
      const ext = data.external ?? {};
      const state: AuthProvidersState = {
        google: ext.google === true,
        apple: ext.apple === true,
        email: ext.email !== false,
      };
      for (const p of ['google', 'apple'] as const) {
        const override = envOverride(p);
        if (override !== null) state[p] = override;
      }
      return state;
    } catch (e) {
      if (import.meta.env.DEV) console.warn('[auth] settings fetch failed', e);
      return fallback;
    }
  })();

  try {
    cache = await inflight;
    return cache;
  } finally {
    inflight = null;
  }
}

export function clearAuthProvidersCache() {
  cache = null;
}
