#!/usr/bin/env bash
# Renomeia Job4You → Taskly no GitHub (mantém histórico) ou só ajusta o remote local.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OWNER="${GITHUB_OWNER:-Rodrigo295-creator}"
OLD_NAME="${GITHUB_OLD_REPO:-Job4You}"
NEW_NAME="${GITHUB_NEW_REPO:-Taskly}"
NEW_URL="https://github.com/${OWNER}/${NEW_NAME}.git"

git remote set-url origin "$NEW_URL"

rename_api() {
  local token="$1"
  curl -fsS -X PATCH \
    -H "Authorization: Bearer $token" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${OWNER}/${OLD_NAME}" \
    -d "{\"name\":\"${NEW_NAME}\"}"
}

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  if gh api "repos/${OWNER}/${OLD_NAME}" &>/dev/null; then
    gh api -X PATCH "repos/${OWNER}/${OLD_NAME}" -f name="${NEW_NAME}"
    echo "Repositório renomeado. Apague duplicata em https://github.com/${OWNER}/${NEW_NAME} se existir."
  else
    echo "Remote apontando para ${NEW_URL} (repo ${OLD_NAME} não encontrado — use git push)."
  fi
  echo "OK: ${NEW_URL}"
  exit 0
fi

if [[ -n "${GITHUB_TOKEN:-${GH_TOKEN:-}}" ]]; then
  if curl -fsS -H "Authorization: Bearer ${GITHUB_TOKEN:-$GH_TOKEN}" \
    "https://api.github.com/repos/${OWNER}/${OLD_NAME}" &>/dev/null; then
    rename_api "${GITHUB_TOKEN:-$GH_TOKEN}"
    echo "Repositório renomeado."
  fi
  echo "OK: ${NEW_URL}"
  exit 0
fi

echo "Remote já é ${NEW_URL}"
echo "Para enviar o código: git push -u origin main (após gh auth login)"
