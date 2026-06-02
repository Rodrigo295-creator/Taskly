import { useEffect, useState } from 'react';
import { fetchAuthProviders, type AuthProvidersState } from '@/lib/auth-providers';
import { supabaseConfigured } from '@/lib/supabase';

const DEFAULT: AuthProvidersState = { google: false, apple: false, email: true };

export function useAuthProviders() {
  const [providers, setProviders] = useState<AuthProvidersState>(DEFAULT);
  const [loading, setLoading] = useState(() => supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    void fetchAuthProviders().then((state) => {
      if (!cancelled) {
        setProviders(state);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    providers,
    loading,
    hasOAuth: providers.google || providers.apple,
  };
}
