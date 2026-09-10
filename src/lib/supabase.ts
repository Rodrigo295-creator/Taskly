import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabaseConfigured = Boolean(url && anonKey)

/** Auth simulado só em dev. Em produção sem Supabase, o login deve falhar (nunca aceitar qualquer senha). */
export const authMockEnabled = !supabaseConfigured && import.meta.env.DEV

/** Client só existe quando há `.env` com as variáveis VITE_* — nos hooks fazemos fallback aos mocks. */
export const supabase = supabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
