#!/usr/bin/env bash
# One-shot Next.js App Router + Tailwind v4 + @qbds (non-interactive).
# Use for greenfield apps that need SSR / RSC.
#
# Usage (from the parent folder):
#   bash /path/to/setup-qbds-next.sh my-app
#   bash /path/to/setup-qbds-next.sh my-app @qbds/button @qbds/card
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

DEFAULT_REGISTRY='https://designsystem.quantumblack.com/r/{name}.json'
REGISTRY_URL="${QBDS_REGISTRY_URL:-$DEFAULT_REGISTRY}"
SHADCN_ADD="${SHADCN_ADD:-shadcn@4.20.0}"
EXTRA_COMPS=("$@")
if [[ ${#EXTRA_COMPS[@]} -eq 0 ]]; then
  EXTRA_COMPS=(@qbds/button @qbds/card @qbds/table @qbds/tabs @qbds/tooltip @qbds/separator)
fi

echo "==> create-next-app ($APP_DIR)"
npx create-next-app@latest "$APP_DIR" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack \
  --use-npm \
  --yes

cd "$APP_DIR"

echo "==> qbds deps"
npm install clsx tailwind-merge class-variance-authority material-symbols tw-animate-css

echo "==> shadcn init (base + nova)"
npx "$SHADCN_ADD" init -b base -p nova --yes

echo "==> components.json @qbds registry + utils"
mkdir -p src/lib src/components/ui
python3 - "$REGISTRY_URL" <<'PY'
import json
import sys
from pathlib import Path

url = sys.argv[1]
path = Path("components.json")
if path.exists():
    data = json.loads(path.read_text())
else:
    data = {
        "$schema": "https://ui.shadcn.com/schema.json",
        "style": "new-york",
        "rsc": True,
        "tsx": True,
        "tailwind": {
            "config": "",
            "css": "src/app/globals.css",
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
    }

data["rsc"] = True
tw = data.setdefault("tailwind", {})
tw.setdefault("css", "src/app/globals.css")
data.setdefault("aliases", {})
data["aliases"].setdefault("components", "@/components")
data["aliases"].setdefault("utils", "@/lib/utils")
data["aliases"].setdefault("ui", "@/components/ui")
data["aliases"].setdefault("lib", "@/lib")
data["aliases"].setdefault("hooks", "@/hooks")
data["registries"] = {"@qbds": {"url": url}}
path.write_text(json.dumps(data, indent=2) + "\n")
print("components.json ok")
PY

if [[ ! -f src/lib/utils.ts ]]; then
  cat > src/lib/utils.ts <<'EOF'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
fi

echo "==> install @qbds (${EXTRA_COMPS[*]})"
npx "$SHADCN_ADD" add "${EXTRA_COMPS[@]}" --yes --overwrite

echo "==> wire globals.css + dark html"
python3 - <<'PY'
from pathlib import Path
import re

candidates = [
    Path("src/styles/globals.css"),
    Path("styles/globals.css"),
    Path("src/app/globals.css"),
]
# Prefer QBDS theme file that is not the app entry (has @theme / :root primitives)
qbds = None
for c in candidates:
    if not c.exists():
        continue
    text = c.read_text()
    if "@theme" in text or "--surface-base" in text or "custom-variant dark" in text:
        qbds = c
        break

if qbds is None:
    # first install sometimes writes only under src/styles/globals.css
    raise SystemExit("error: QBDS globals.css missing after @qbds install")

entry = Path("src/app/globals.css")
if qbds.resolve() == entry.resolve():
    # theme landed in the app entry — ensure tailwind + material-symbols order
    body = entry.read_text()
    parts = []
    if '@import "tailwindcss"' not in body and "@import 'tailwindcss'" not in body:
        parts.append('@import "tailwindcss";')
    parts.append(body.rstrip())
    if "material-symbols" not in body:
        parts.append("@import 'material-symbols';")
    entry.write_text("\n".join(parts) + "\n")
    print("globals.css is theme entry; ensured tailwind + material-symbols")
else:
    if qbds.as_posix().startswith("src/"):
        rel = Path("app") / ".." / qbds.as_posix()[4:]
        # from src/app/globals.css → ../styles/globals.css etc.
        imp = f"@import '../{qbds.as_posix()[4:]}';"
    else:
        imp = f"@import '../../{qbds.as_posix()}';"

    entry.write_text(
        f'@import "tailwindcss";\n{imp}\n@import \'material-symbols\';\n'
    )
    print("src/app/globals.css ->", qbds)

FONT_LINKS = """        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Roboto+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
"""

layout = next(
    (p for p in (Path("src/app/layout.tsx"), Path("app/layout.tsx")) if p.exists()),
    None,
)
if layout is None:
    print('warn: layout.tsx not found — set className="dark" on <html> and load Inter / Roboto Mono manually')
else:
    t = layout.read_text()
    if 'className="dark"' not in t and "className='dark'" not in t:
        t2 = t.replace('<html lang="en">', '<html lang="en" className="dark">', 1)
        if t2 == t:
            t2 = re.sub(r"<html(?![^>]*className=)([^>]*)>", r'<html\1 className="dark">', t, count=1)
        t = t2
        print("layout dark default ok")
    else:
        print("layout already dark")

    if "fonts.googleapis.com" not in t:
        if re.search(r"<head[^>]*>", t):
            t = re.sub(r"(<head[^>]*>)", r"\1\n" + FONT_LINKS, t, count=1)
        else:
            t = re.sub(
                r"(<html[^>]*>)",
                r"\1\n      <head>\n" + FONT_LINKS + "      </head>",
                t,
                count=1,
            )
        print("layout QBDS fonts ok")
    else:
        print("layout already has Google fonts")

    layout.write_text(t)
PY

echo ""
echo "done: $APP_DIR (Next.js App Router + @qbds)"
echo "  cd $APP_DIR && npm run dev"
echo "  add more: npx $SHADCN_ADD add @qbds/<name> --yes --overwrite"
