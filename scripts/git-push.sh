#!/usr/bin/env bash
# Envia o repositório local para GitHub (requer GitHub CLI autenticado).
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if ! command -v gh >/dev/null 2>&1; then
  echo "Instale o GitHub CLI: https://cli.github.com/"
  echo "Depois: gh auth login"
  exit 1
fi

gh auth status >/dev/null 2>&1 || gh auth login

git branch -M main
git push -u origin main --force
echo "OK: https://github.com/Rodrigo295-creator/Taskly"
