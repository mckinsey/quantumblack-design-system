#!/usr/bin/env bash
set -euo pipefail

cd "${WORKSPACE_FOLDER:-/workspaces/quantumblack-design-system}"

export QBDS_REGISTRY_URL="${QBDS_REGISTRY_URL:-http://127.0.0.1:4123}"

if [ ! -d node_modules ]; then
  echo "Installing dependencies with npm ci..."
  npm ci
fi

pkill -f "vite --port 4123" >/dev/null 2>&1 || true

echo "Starting QBDS dev server..."
nohup npm run dev -- --host 0.0.0.0 > /tmp/qbds-dev.log 2>&1 &

for attempt in $(seq 1 60); do
  if curl -fsS http://127.0.0.1:4123 >/dev/null 2>&1; then
    echo "QBDS dev server is ready on http://127.0.0.1:4123"
    exit 0
  fi
  sleep 2
done

echo "QBDS dev server did not become ready in time; check /tmp/qbds-dev.log for details."
exit 0
