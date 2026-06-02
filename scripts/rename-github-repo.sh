#!/usr/bin/env bash
# Renomeia o repositório GitHub Job4You → Taskly e atualiza o remote local.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OWNER="${GITHUB_OWNER:-Rodrigo295-creator}"
OLD_NAME="${GITHUB_OLD_REPO:-Job4You}"
NEW_NAME="${GITHUB_NEW_REPO:-Taskly}"

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh api -X PATCH "repos/${OWNER}/${OLD_NAME}" -f name="${NEW_NAME}"
  git remote set-url origin "https://github.com/${OWNER}/${NEW_NAME}.git"
  echo "OK: https://github.com/${OWNER}/${NEW_NAME}"
  exit 0
fi

if [[ -n "${GITHUB_TOKEN:-${GH_TOKEN:-}}" ]]; then
  curl -fsS -X PATCH \
    -H "Authorization: Bearer ${GITHUB_TOKEN:-$GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${OWNER}/${OLD_NAME}" \
    -d "{\"name\":\"${NEW_NAME}\"}"
  git remote set-url origin "https://github.com/${OWNER}/${NEW_NAME}.git"
  echo "OK: https://github.com/${OWNER}/${NEW_NAME}"
  exit 0
fi

echo "Instale e autentique o GitHub CLI (https://cli.github.com/) ou exporte GITHUB_TOKEN, depois rode de novo." >&2
exit 1
