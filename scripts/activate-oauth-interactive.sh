#!/usr/bin/env bash
# macOS: pede token Supabase + Google OAuth e ativa via Management API.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_OAUTH="$ROOT/.env.oauth"

if [[ "$(uname)" != "Darwin" ]]; then
  echo "Use: crie .env.oauth ou rode npm run auth:activate:interactive"
  exit 1
fi

prompt() {
  osascript -e "text returned of (display dialog \"$1\" default answer \"\" with title \"Taskly — Ativar OAuth\")"
}

echo "Abra https://supabase.com/dashboard/account/tokens se ainda não tiver o token."
TOKEN="$(prompt "Cole o SUPABASE_ACCESS_TOKEN (sbp_...):")"
TOKEN="${TOKEN//$'\r'/}"
TOKEN="$(echo "$TOKEN" | xargs)"
if [[ -z "$TOKEN" ]]; then
  echo "Token vazio. Cancelado."
  exit 1
fi

echo "Abra https://console.cloud.google.com/auth/clients (OAuth Web)."
GID="$(prompt "Google Client ID (.apps.googleusercontent.com):")"
GID="$(echo "$GID" | xargs)"
GSEC="$(prompt "Google Client Secret:")"
GSEC="$(echo "$GSEC" | xargs)"

cat > "$ENV_OAUTH" <<EOF
SUPABASE_ACCESS_TOKEN=$TOKEN
SUPABASE_PROJECT_REF=pnygzbfeuovauwzlluys
GOOGLE_CLIENT_ID=$GID
GOOGLE_CLIENT_SECRET=$GSEC
EOF
chmod 600 "$ENV_OAUTH"
echo "Salvo em .env.oauth (não vai pro git)."

cd "$ROOT"
node scripts/activate-oauth.mjs
