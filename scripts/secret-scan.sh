#!/usr/bin/env sh
set -eu

if ! command -v gitleaks >/dev/null 2>&1; then
  echo "gitleaks is required for secret scanning."
  echo "Install: https://github.com/gitleaks/gitleaks#installing"
  echo "  macOS: brew install gitleaks"
  exit 1
fi

gitleaks protect --staged --verbose --redact
