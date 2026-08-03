#!/usr/bin/env bash
# Push static assets to the gh-pages branch (production root or pr-preview/pr-<n>/).
# Retries on push races when multiple workflows update gh-pages concurrently.
set -euo pipefail

MODE="${1:?Usage: deploy-to-gh-pages.sh <production|preview|remove-preview>}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-gh-pages}"
REPO="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
TOKEN="${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
PR_NUMBER="${PR_NUMBER:-}"
SOURCE_DIR="${SOURCE_DIR:-dist}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-5}"

git config --global user.name "github-actions[bot]"
git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT

git -C "$workdir" init
git -C "$workdir" checkout -B "$DEPLOY_BRANCH"
git -C "$workdir" remote add origin "https://x-access-token:${TOKEN}@github.com/${REPO}.git"

apply_changes() {
  case "$MODE" in
    production)
      local preview_backup
      preview_backup=$(mktemp -d)
      if [ -d "$workdir/pr-preview" ]; then
        cp -a "$workdir/pr-preview" "$preview_backup/"
      fi
      find "$workdir" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
      if [ -d "$preview_backup/pr-preview" ]; then
        cp -a "$preview_backup/pr-preview" "$workdir/"
      fi
      rm -rf "$preview_backup"
      cp -a "$SOURCE_DIR/." "$workdir/"
      COMMIT_MSG="Deploy production from ${GITHUB_SHA}"
      ;;
    preview)
      local preview_path="$workdir/pr-preview/pr-${PR_NUMBER}"
      rm -rf "$preview_path"
      mkdir -p "$preview_path"
      cp -a "$SOURCE_DIR/." "$preview_path/"
      COMMIT_MSG="Deploy preview for PR ${PR_NUMBER}"
      ;;
    remove-preview)
      rm -rf "$workdir/pr-preview/pr-${PR_NUMBER}"
      COMMIT_MSG="Remove preview for PR ${PR_NUMBER}"
      ;;
    *)
      echo "Unknown mode: $MODE" >&2
      exit 1
      ;;
  esac
}

attempt=0
while [ "$attempt" -lt "$MAX_ATTEMPTS" ]; do
  attempt=$((attempt + 1))

  if git -C "$workdir" ls-remote --heads origin "$DEPLOY_BRANCH" | grep -q "$DEPLOY_BRANCH"; then
    git -C "$workdir" fetch origin "$DEPLOY_BRANCH" --depth=1
    git -C "$workdir" reset --hard "origin/$DEPLOY_BRANCH"
  else
    git -C "$workdir" rm -rf . 2>/dev/null || true
  fi

  apply_changes

  git -C "$workdir" add -A
  if git -C "$workdir" diff --staged --quiet; then
    echo "No changes to deploy"
    exit 0
  fi

  git -C "$workdir" commit -m "$COMMIT_MSG"

  if git -C "$workdir" push origin "$DEPLOY_BRANCH"; then
    echo "Deploy succeeded"
    exit 0
  fi

  echo "Push failed (attempt ${attempt}/${MAX_ATTEMPTS}), retrying..."
done

echo "Deploy failed after ${MAX_ATTEMPTS} attempts" >&2
exit 1
