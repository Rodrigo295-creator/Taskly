import { fetchAuthProviders } from '@/lib/auth-providers';

export type OAuthProvider = 'google' | 'apple';

export async function isOAuthProviderEnabled(provider: OAuthProvider): Promise<boolean> {
  const state = await fetchAuthProviders();
  return provider === 'google' ? state.google : state.apple;
}

export async function hasAnyOAuthProvider(): Promise<boolean> {
  const state = await fetchAuthProviders();
  return state.google || state.apple;
}
