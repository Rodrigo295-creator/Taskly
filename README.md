# Taskly

Plataforma para conectar clientes e profissionais autônomos (React, Vite, Tailwind, Supabase).

## Desenvolvimento local

```bash
npm install
# crie .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (Supabase → Settings → API)
npm run dev
```

App em http://localhost:5173

### Login com Google ou Apple (Supabase Auth)

Se ao clicar em Google/Apple o navegador mostrar **HTTP ERROR 400** (`Unsupported provider: provider is not enabled`), o provedor ainda não está ativo no projeto Supabase **Marketplace** (`pnygzbfeuovauwzlluys`).

**Redirect URLs da app** (após o login no Google/Apple, o usuário volta para o site):

- `http://localhost:5173/`
- `https://taskly-rodrigo295.vercel.app/`
- `https://job4you-rho.vercel.app/` (legado, ainda aceito no Supabase)

**Callback OAuth no Google Cloud / Apple** (sempre o endpoint do Supabase, não a URL do Vite):

- `https://pnygzbfeuovauwzlluys.supabase.co/auth/v1/callback`

#### Opção A — Dashboard (recomendado)

1. [Providers](https://supabase.com/dashboard/project/pnygzbfeuovauwzlluys/auth/providers) → ative **Google** / **Apple** e cole **Client ID** + **secret** (Apple: secret = JWT gerado no Apple Developer).
2. [URL Configuration](https://supabase.com/dashboard/project/pnygzbfeuovauwzlluys/auth/url-configuration):
   - **Site URL**: `https://taskly-rodrigo295.vercel.app/`
   - **Redirect URLs**: as URLs da app acima.
3. No [Google Cloud Console](https://console.cloud.google.com/auth/clients), crie um OAuth client **Web** com:
   - **Authorized JavaScript origins**: `http://localhost:5173`, `https://taskly-rodrigo295.vercel.app`, `https://job4you-rho.vercel.app`
   - **Authorized redirect URIs**: `https://pnygzbfeuovauwzlluys.supabase.co/auth/v1/callback`
4. Reinicie `npm run dev` — os botões Google/Apple aparecem **automaticamente** quando o Supabase tiver `external.google` / `external.apple` em `/auth/v1/settings`.

A app consulta essa API na tela de login; não é preciso flag manual (use `VITE_OAUTH_*` só para forçar on/off em testes).

#### Opção B — Management API (script)

Com [Personal Access Token](https://supabase.com/dashboard/account/tokens):

```bash
export SUPABASE_ACCESS_TOKEN="sbp_..."
# Opcional: habilitar Google/Apple no mesmo PATCH
export GOOGLE_CLIENT_ID="....apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="..."
# export APPLE_CLIENT_ID="com...."
# export APPLE_CLIENT_SECRET="eyJ..."   # JWT client secret

chmod +x scripts/supabase-configure-oauth.sh
./scripts/supabase-configure-oauth.sh
```

O script define `site_url` + `uri_allow_list` e, se as variáveis `GOOGLE_*` / `APPLE_*` existirem, liga `external_google_enabled` / `external_apple_enabled`.

## Build

```bash
npm run build
```

## Deploy (Vercel)

Projeto **taskly** na Vercel (`rodrigo295-creators-projects`). Deploy manual:

```bash
npx vercel deploy --prod --non-interactive
```

**Produção (principal):** https://taskly-rodrigo295.vercel.app

**Legado (redirect implícito via mesmo deployment):** https://job4you-rho.vercel.app

> `taskly.vercel.app` já está em uso globalmente na Vercel; por isso o domínio do projeto é `taskly-rodrigo295.vercel.app`.

Configure em **Vercel → Project → Environment Variables** as mesmas variáveis do `.env` local.

## Repositório

Renomeie no GitHub (mantém histórico e issues):

```bash
chmod +x scripts/rename-github-repo.sh
./scripts/rename-github-repo.sh   # requer gh auth login ou GITHUB_TOKEN
```

Depois:

https://github.com/Rodrigo295-creator/Taskly

```bash
git clone https://github.com/Rodrigo295-creator/Taskly.git
cd Taskly
npm install
```

Para enviar alterações (com [GitHub CLI](https://cli.github.com/) instalado):

```bash
./scripts/git-push.sh
```
