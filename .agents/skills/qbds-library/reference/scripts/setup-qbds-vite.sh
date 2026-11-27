#!/usr/bin/env bash
# One-shot Vite + React + Tailwind v4 + @qbds (non-interactive).
# Use for greenfield apps or sandbox prototypes next to a host app.
#
# Usage (from the parent folder):
#   bash /path/to/setup-qbds-vite.sh my-sandbox
#   bash /path/to/setup-qbds-vite.sh my-sandbox @qbds/button @qbds/card
#
# Env:
#   QBDS_REGISTRY_URL  default https://designsystem.quantumblack.com/r/{name}.json
#   SHADCN_ADD         default shadcn@4.20.0
set -euo pipefail

APP_DIR="${1:-}"
if [[ -z "$APP_DIR" ]]; then
  echo "usage: $0 <folder-name> [@qbds/comp ...]" >&2
  exit 1
fi
shift || true

if [[ "$APP_DIR" == */* ]]; then
  echo "error: pass a single folder name (cd to the parent first)" >&2
  exit 1
fi

if [[ -e "$APP_DIR" ]]; then
  echo "error: $APP_DIR already exists" >&2
  exit 1
fi

# Do not put `{name}.json` inside ${VAR:-…} — bash ends the expansion at the first `}`.
DEFAULT_REGISTRY='https://designsystem.quantumblack.com/r/{name}.json'
REGISTRY_URL="${QBDS_REGISTRY_URL:-$DEFAULT_REGISTRY}"
SHADCN_ADD="${SHADCN_ADD:-shadcn@4.20.0}"
EXTRA_COMPS=("$@")
if [[ ${#EXTRA_COMPS[@]} -eq 0 ]]; then
  EXTRA_COMPS=(@qbds/button @qbds/card @qbds/table @qbds/tabs @qbds/tooltip @qbds/separator)
fi

echo "==> create vite ($APP_DIR)"
npm create vite@latest "$APP_DIR" -- --template react-ts
cd "$APP_DIR"

echo "==> deps"
npm install
npm install tailwindcss @tailwindcss/vite clsx tailwind-merge class-variance-authority material-symbols tw-animate-css

echo "==> vite + tsconfig + css + html"
python3 - <<'PY'
from pathlib import Path
import json

Path("vite.config.ts").write_text("""import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
""")

Path("src/index.css").write_text('@import "tailwindcss";\n')

FONT_LINKS = """    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Roboto+Mono:wght@400&display=swap"
      rel="stylesheet"
    />
"""

html = Path("index.html")
h = html.read_text()
if 'class="dark"' not in h:
    h = h.replace('<html lang="en">', '<html lang="en" class="dark">')
if "fonts.googleapis.com" not in h:
    h = h.replace("</head>", FONT_LINKS + "  </head>", 1)
html.write_text(h)

Path("tsconfig.json").write_text(json.dumps({
    "files": [],
    "references": [
        {"path": "./tsconfig.app.json"},
        {"path": "./tsconfig.node.json"},
    ],
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {"@/*": ["./src/*"]},
    },
}, indent=2) + "\n")

app = Path("tsconfig.app.json")
t = app.read_text()
if '"paths"' not in t:
    t = t.replace(
        '"jsx": "react-jsx",',
        '"jsx": "react-jsx",\n    "baseUrl": ".",\n    "paths": { "@/*": ["./src/*"] },\n    "ignoreDeprecations": "6.0",',
    )
    app.write_text(t)

print("patched configs")
PY

echo "==> components.json + utils"
mkdir -p src/lib src/components/ui
python3 - "$REGISTRY_URL" <<'PY'
import json
import sys
from pathlib import Path

url = sys.argv[1]
Path("components.json").write_text(json.dumps({
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": False,
    "tsx": True,
    "tailwind": {
        "config": "",
        "css": "src/index.css",
        "baseColor": "neutral",
        "cssVariables": True,
        "prefix": "",
    },
    "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks",
    },
    "iconLibrary": "lucide",
    "registries": {
        "@qbds": {"url": url},
    },
}, indent=2) + "\n")
print("components.json ok")
PY

cat > src/lib/utils.ts <<'EOF'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

echo "==> install @qbds (${EXTRA_COMPS[*]})"
npx "$SHADCN_ADD" add "${EXTRA_COMPS[@]}" --yes --overwrite

echo "==> wire globals.css"
python3 - <<'PY'
from pathlib import Path

candidates = [
    Path("src/styles/globals.css"),
    Path("styles/globals.css"),
    Path("src/app/globals.css"),
]
g = next((c for c in candidates if c.exists()), None)
if g is None:
    raise SystemExit("error: QBDS globals.css missing after @qbds install")

if g.as_posix().startswith("src/"):
    imp = f"@import './{g.as_posix()[4:]}';"
else:
    imp = f"@import '../{g.as_posix()}';"

Path("src/index.css").write_text(f"{imp}\n@import 'material-symbols';\n")
print("index.css ->", g)
PY

cat > .gitignore <<'EOF'
node_modules
dist
.DS_Store
*.local
EOF

echo ""
echo "done: $APP_DIR"
echo "  cd $APP_DIR && npm run dev"
echo "  add more: npx $SHADCN_ADD add @qbds/<name> --yes --overwrite"
