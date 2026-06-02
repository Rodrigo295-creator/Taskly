#!/usr/bin/env bash
# Configure Supabase Auth redirect URLs and optional Google/Apple OAuth via Management API.
# Requires: SUPABASE_ACCESS_TOKEN (https://supabase.com/dashboard/account/tokens)
# Optional: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APPLE_CLIENT_ID, APPLE_CLIENT_SECRET (JWT)

set -euo pipefail

PROJECT_REF="${SUPABASE_PROJECT_REF:-pnygzbfeuovauwzlluys}"
API="https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth"

SITE_URL="${SUPABASE_SITE_URL:-https://taskly-rodrigo295.vercel.app/}"
# Comma-separated allow list (Supabase Auth redirect URLs after OAuth)
URI_ALLOW_LIST="${SUPABASE_URI_ALLOW_LIST:-http://localhost:5173/,https://taskly-rodrigo295.vercel.app/,https://job4you-rho.vercel.app/}"

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo "Error: set SUPABASE_ACCESS_TOKEN (Personal Access Token from Supabase Dashboard → Account → Access Tokens)." >&2
  exit 1
fi

auth_header="Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}"

echo "==> Current auth config (redirect / site)"
curl -sS -H "$auth_header" "$API" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for k in ('site_url', 'uri_allow_list', 'external_google_enabled', 'external_apple_enabled'):
    if k in d:
        print(f'  {k}: {d[k]!r}')
" 2>/dev/null || curl -sS -H "$auth_header" "$API"

payload=$(python3 - <<PY
import json, os
p = {
    "site_url": os.environ.get("SUPABASE_SITE_URL", "https://taskly-rodrigo295.vercel.app/"),
    "uri_allow_list": os.environ.get("SUPABASE_URI_ALLOW_LIST", "http://localhost:5173/,https://taskly-rodrigo295.vercel.app/,https://job4you-rho.vercel.app/"),
}
gid = os.environ.get("GOOGLE_CLIENT_ID", "").strip()
gsec = os.environ.get("GOOGLE_CLIENT_SECRET", "").strip()
if gid and gsec:
    p["external_google_enabled"] = True
    p["external_google_client_id"] = gid
    p["external_google_secret"] = gsec
aid = os.environ.get("APPLE_CLIENT_ID", "").strip()
asec = os.environ.get("APPLE_CLIENT_SECRET", "").strip()
if aid and asec:
    p["external_apple_enabled"] = True
    p["external_apple_client_id"] = aid
    p["external_apple_secret"] = asec
print(json.dumps(p))
PY
)

echo ""
echo "==> PATCH auth config"
echo "$payload" | python3 -m json.tool
curl -sS -X PATCH -H "$auth_header" -H "Content-Type: application/json" \
  -d "$payload" "$API" | python3 -m json.tool

echo ""
echo "==> Verify /auth/v1/settings (public)"
ANON_KEY="${SUPABASE_ANON_KEY:-}"
if [[ -n "$ANON_KEY" ]]; then
  curl -sS "https://${PROJECT_REF}.supabase.co/auth/v1/settings" \
    -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); print('google:', d.get('external',{}).get('google')); print('apple:', d.get('external',{}).get('apple'))"
else
  echo "Tip: export SUPABASE_ANON_KEY to verify google/apple flags after PATCH."
fi

echo ""
echo "Done. In Taskly .env set VITE_OAUTH_GOOGLE_ENABLED=true / VITE_OAUTH_APPLE_ENABLED=true when providers show true above."
