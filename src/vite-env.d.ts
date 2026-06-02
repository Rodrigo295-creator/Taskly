/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_OAUTH_GOOGLE_ENABLED?: string
  readonly VITE_OAUTH_APPLE_ENABLED?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_TIKTOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
