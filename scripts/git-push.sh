#!/usr/bin/env bash
# Envia o repositório local para GitHub (requer GitHub CLI autenticado).
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if ! git remote get-url origin | grep -q 'Rodrigo295-creator/Taskly'; then
  git remote set-url origin https://github.com/Rodrigo295-creator/Taskly.git
fi

if command -v gh >/dev/null 2>&1; then
  gh auth status >/dev/null 2>&1 || gh auth login
fi

git branch -M main
git push -u origin main
echo "OK: https://github.com/Rodrigo295-creator/Taskly"
