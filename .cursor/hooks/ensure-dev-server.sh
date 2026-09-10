#!/usr/bin/env bash
# Cursor sessionStart: sobe o Vite se a porta 5173 estiver livre.
set -euo pipefail
# Consome stdin do hook (JSON do evento) sem bloquear
cat >/dev/null || true

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
bash "$ROOT/scripts/ensure-dev-server.sh" >/dev/null 2>&1 || true

# Fail-open: nunca bloqueia a sessão
echo '{}'
exit 0
