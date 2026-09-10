#!/usr/bin/env bash
# Instala autostart via crontab (LaunchAgent não consegue ler ~/Downloads no macOS).
# Uso: bash scripts/install-dev-autostart.sh
# Remover: bash scripts/install-dev-autostart.sh --uninstall
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENSURE="$ROOT/scripts/ensure-dev-server.sh"
MARKER="# taskly-dev-server"
CRON_LINE="*/1 * * * * PATH=\"\$HOME/.nvm/versions/node/\$(ls \"\$HOME/.nvm/versions/node\" 2>/dev/null | tail -1)/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin\" /bin/bash \"$ENSURE\" >>\"$ROOT/.cursor/dev-server-cron.log\" 2>&1 $MARKER"

uninstall() {
  # Remove LaunchAgent leftovers
  launchctl bootout "gui/$(id -u)/com.taskly.dev-server" 2>/dev/null || true
  rm -f "$HOME/Library/LaunchAgents/com.taskly.dev-server.plist"

  local tmp
  tmp="$(mktemp)"
  crontab -l 2>/dev/null | grep -v "taskly-dev-server" >"$tmp" || true
  if [[ -s "$tmp" ]]; then
    crontab "$tmp"
  else
    crontab -r 2>/dev/null || true
  fi
  rm -f "$tmp"
  echo "Removed Taskly dev-server autostart"
  exit 0
}

if [[ "${1:-}" == "--uninstall" ]]; then
  uninstall
fi

chmod +x "$ENSURE"
mkdir -p "$ROOT/.cursor"

# Drop broken LaunchAgent if present
launchctl bootout "gui/$(id -u)/com.taskly.dev-server" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/com.taskly.dev-server.plist"

tmp="$(mktemp)"
{
  crontab -l 2>/dev/null | grep -v "taskly-dev-server" || true
  echo "$CRON_LINE"
} >"$tmp"
crontab "$tmp"
rm -f "$tmp"

# Start immediately
/bin/bash "$ENSURE" || true

echo "Installed crontab autostart for Taskly (every 1 min)"
echo "  → http://localhost:5173/"
echo "  → uninstall: bash scripts/install-dev-autostart.sh --uninstall"
