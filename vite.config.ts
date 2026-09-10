import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ command, mode }) => {
  // Build de produção sem Supabase ativaria o auth mock (qualquer e-mail/senha entra).
  if (command === 'build' && mode === 'production') {
    const env = loadEnv(mode, __dirname, 'VITE_')
    const url = (env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL)?.trim()
    const anonKey = (env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY)?.trim()
    if (!url || !anonKey) {
      throw new Error(
        'Build de produção bloqueado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY ' +
          '(.env local ou Environment Variables na Vercel). Sem elas o app cairia no login simulado.',
      )
    }
  }

  return {
  /** Dev: http://localhost:5173 (porta padrão Vite) */
  server: {
    // true = aceita localhost, 127.0.0.1 e [::1] (evita 400/connection issues no browser)
    host: true,
    port: 5173,
    strictPort: true,
    open: '/',
  },
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
