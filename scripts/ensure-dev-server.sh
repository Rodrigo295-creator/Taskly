#!/usr/bin/env bash
# Garante que o Vite (porta 5173) está rodando no projeto Taskly.
# Idempotente: se já houver listener, não faz nada.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${TASKLY_DEV_PORT:-5173}"
LOG_DIR="$ROOT/.cursor"
LOG_FILE="$LOG_DIR/dev-server.log"
PID_FILE="$LOG_DIR/dev-server.pid"

# LaunchAgents / bare shells often miss nvm/homebrew
export PATH="${HOME}/.nvm/versions/node/$(ls "${HOME}/.nvm/versions/node" 2>/dev/null | tail -1)/bin:/opt/homebrew/bin:/usr/local/bin:${PATH}"

mkdir -p "$LOG_DIR"

is_up() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1
    return $?
  fi
  curl -sf -o /dev/null --connect-timeout 1 "http://127.0.0.1:${PORT}/" 2>/dev/null
}

if is_up; then
  echo "Taskly dev server already running on :$PORT"
  exit 0
fi

cd "$ROOT"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found in PATH=$PATH" >&2
  exit 1
fi

nohup npm run dev >>"$LOG_FILE" 2>&1 &
echo $! >"$PID_FILE"

for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if is_up; then
    echo "Taskly dev server started on :$PORT (pid $(cat "$PID_FILE"))"
    exit 0
  fi
  sleep 0.4
done

echo "Warning: started process but :$PORT is not listening yet. Check $LOG_FILE" >&2
exit 0
