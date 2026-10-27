# Adding `@qbds` components

Use after Vite/Next already has `@qbds` (setup script, host app, or partial install below).

**New folder:** [delivery-modes.md](../delivery-modes.md) — [setup-qbds-vite.sh](../scripts/setup-qbds-vite.sh) (default) or [setup-qbds-next.sh](../scripts/setup-qbds-next.sh). Do not hand-roll.

**Tokens / visual:** [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) · [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md) · layouts: [app-layout-archetypes.md](app-layout-archetypes.md)

---

## Add a component

```bash
npx shadcn@4.20.0 add @qbds/<name> --yes --overwrite
```

Batch names in **one** call. Only names in [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) work.

1. Find `name` / `files[]` / `registryDependencies` in `registry.json`
2. Read API from `src/components/ui/<name>.tsx` on GitHub (or `/r/<name>.json`)
3. **Fetch usage examples** — `https://designsystem.quantumblack.com/examples/<name>.json` (index: [`/examples/index.json`](https://designsystem.quantumblack.com/examples/index.json)). Required before composing UI in stage 3 / build. Fallback: GitHub `src/app/demo/[name]/ui/<name>.tsx` if the examples JSON is missing.
4. Install; verify `files[]` landed

| Resource | URL |
| -------- | --- |
| Registry | `https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json` |
| Install JSON | `https://designsystem.quantumblack.com/r/<name>.json` |
| **Examples (preferred)** | `https://designsystem.quantumblack.com/examples/<name>.json` |
| Examples index | `https://designsystem.quantumblack.com/examples/index.json` |
| API | `…/blob/main/src/components/ui/<component>.tsx` |
| Demo source (fallback) | `…/blob/main/src/app/demo/%5Bname%5D/ui/<component>.tsx` |
| Site | [designsystem.quantumblack.com](https://designsystem.quantumblack.com/) |

`/r/<name>.json` = installable files (often UI only). `/examples/<name>.json` = usage snippets agents must follow. Do not invent composition from the API alone when an example exists. Prefer the example’s nesting/chrome even if that shifts the confirmed UX — tell the user ([ui-structure.md](../ui-structure.md) `uxAdjustments`). Strip site-only imports (`@/components/registry/*`, `@/lib/demo-utils`) when adapting into a product app.

---

## Partial install — install alone is not enough

If `components.json` already has `@qbds` but there is **no** QBDS `globals.css` yet:

1. Run `npx shadcn@latest add @qbds/button` (or another installable `@qbds/*`) — this **pulls** `globals.css`.
2. **Import** that `globals.css` **after** `@import "tailwindcss"` in the CSS entry.
3. Set **`className="dark"`** (or `class="dark"`) on `<html>` for the dark default.

Do not tell the user they are done after the install command alone — name the CSS import and dark default steps.

---

## Not in `registry.json`

1. Say it is **not installable** / not in `registry.json`.
2. **Do not** emit `npx shadcn@latest add @qbds/<missing-name>`.
3. Fall back:
   - Data grids → `@qbds/table` or native `<table>` with QBDS tokens (`border-stroke-divider`, `text-fg-secondary` headers)
   - Theme toggle → hand-build `Button` + Material Symbols
   - Menubar → compose `Button` / nav patterns; or `@qbds/sidebar` for app chrome

---

## Tokens on the React path

| Situation               | What to do                                       |
| ----------------------- | ------------------------------------------------ |
| `@qbds/*` primitives    | Tokens already in `cva` — no raw hex / `slate-*` |
| Page shell, grids, gaps | Utilities from TOKENS.md on wrappers / `<main>`  |
| Extra `className`       | OK when API allows; merge with `cn()`            |
| Not in `registry.json`  | shadcn/ui + TOKENS.md utilities (see above)      |

---

## Caveats

- **`--overwrite`** from the second `@qbds/*` install onward (utils conflict is interactive otherwise).
- **`registryDependencies`** install transitively — don’t add by hand unless debugging.
- **`files[]`** is authoritative for what landed.
- **`theme`** → `globals.css`. **`utils`** → `src/lib/utils.ts`.
- **`@qbds/sidebar`** — installable; use for app shells ([app-layout-archetypes.md](app-layout-archetypes.md)).
- **No `@qbds/theme-toggle`** — hand-build from `Button` + Material Symbols.
- **No `@qbds/menubar`**, **`@qbds/data-grid`** — not in registry; use fallbacks above.
- **`date-picker` / `data-table` / `tag-group`** — recipes/examples; read registry entry before relying on them.
- Filter chips (toggle on/off, no X) → `@qbds/tag-toggle` + `aria-pressed` (not Tag-Dismissable / Badge).
- Dark default: `class="dark"` / `className="dark"` on `<html>`; toggle `document.documentElement`.

Stack: React 19 · TS · Tailwind v4 · Base UI + Radix · ECharts for charts (no QBDS chart package). Chart hex: [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) — no `echarts.registerTheme()`, no external JSON theme. Re-init on dark/light toggle.
