---
name: figma-token-sync
description: Sync QBDS Figma variables (DS_THEMES, Radius, DS-Primitives) into globals.css and TOKENS.md. Use only when designers have updated Figma variables and tokens need to flow into code (light + dark modes). Triggers — "sync tokens", "figma token sync", "designers updated variables", or a Figma variables URL for the QBDS v2.0.0 file. For component-only work use figma-parity instead.
---

# Figma → code token sync (QBDS)

**Scope:** Run only when designers have updated Figma variables and tokens need to flow into code. Skip for component-only work — use the **figma-parity** skill instead.

## Figma source

- **File:** [QBDS v2.0.0](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=1878-17156&view=variables&var-set-id=26698-8497&m=dev)
- **Variable sets to read:** `DS_THEMES`, `Radius`, `DS-Primitives`
- **Modes:** light and dark (both must be synced)

Use Figma MCP (`get_variable_defs` or variable export via the Figma plugin) to read resolved values. Load the **figma-use** skill before `use_figma` calls if needed.

## Code targets (read before editing)

| File | Role |
|------|------|
| [`docs/TOKENS.md`](docs/TOKENS.md) | **Figma ↔ CSS mapping** — the **Design name** column is the canonical Figma variable path for each `--*` token; read this before syncing |
| [`src/styles/globals.css`](src/styles/globals.css) | **CSS source of truth** — primitive + semantic variable definitions and `var()` bindings |

### `globals.css` structure (preserve layout)

1. **`@theme inline`** — primitives (`--mist-*`, `--slate-*`, opacity ladders, brand accents), Tailwind bridge (`--color-fill-*`, `--color-fg-*`, `--color-surface-*`, …), shadcn aliases, radius utilities (`--radius-*` → `--rad-*`).
2. **`:root`** — light-mode semantic tokens (`--text-*`, `--border-*`, `--fill-*`, `--surface-*`, `--status-*`, `--stateslayer-*`, `--elevations-*`) and sharp radius defaults (`--rad-*`).
3. **`.dark`** — dark-mode semantic tokens (same families as `:root`).
4. **`.radius-mode`** — rounded radius overrides (`--rad-reg`, `--rad-sm`, `--rad-md`, `--rad-lg`; `--rad-round` stays `9999px`).
5. **`@utility shadow-elevation-*`** and typography utilities — update only if elevation or type tokens changed in Figma.

**Do not** remove `@custom-variant dark`, `@custom-variant radius-mode`, or the `@theme inline` → semantic → Tailwind bridge pattern.

## Workflow (run in order)

### 1 — Read Figma variables

1. Confirm designers have published changes in the QBDS v2.0.0 file.
2. Read [`docs/TOKENS.md`](docs/TOKENS.md) — for each semantic token you will sync, note its **Design name** (e.g. `--fill-active` → `Fill/Content/Active`). Use that exact Figma path when reading `DS_THEMES`; do not match by similar names in the Figma file.
3. Read all variables from `DS-Primitives`, `DS_THEMES`, and `Radius` for **light** and **dark** modes.
4. Build a diff table: Design name (from TOKENS.md) → CSS variable → old `var()` binding → new binding. Flag **renames** and **removed** tokens.

### 2 — Update `globals.css`

1. Update **primitives** in `@theme inline` if `DS-Primitives` changed (oklch values, opacity steps).
2. Update **semantic mappings** in `:root` (light) and `.dark` (dark) from `DS_THEMES`.
3. Update **radius** in `:root` / `.dark` (sharp defaults) and `.radius-mode` (rounded overrides) from `Radius`.
4. Keep semantic tokens referencing primitives via `var(...)` — do not inline raw oklch in semantic blocks unless Figma aliases require it.
5. Verify the `@theme inline` bridge still maps every semantic token to a `--color-*` utility.

### 3 — Update `docs/TOKENS.md`

Only when the token **model** changed (new/removed/renamed semantic tokens or Figma design names):

1. Every `--*` semantic variable in `globals.css` must have a row in the matching TOKENS.md section.
2. **Design name** column = the Figma variable path used in step 1.
3. Add/remove/rename rows as needed. Keep "How to choose" and "Quick rules" intact unless the token model itself changed.

If only primitive `var()` bindings changed in `globals.css`, TOKENS.md usually needs no edit.

### 4 — Fix downstream references (if names changed)

If any CSS variable or Tailwind utility was renamed or removed:

```bash
# Example greps — extend for each renamed token
rg 'old-token-name' src/
rg '--old-var' src/
```

Update components, demos, and tests that reference old names. Prefer semantic utilities (`bg-fill-active`, `text-fg-primary`) over raw `var(...)`.

**Out of scope unless asked:** Code Connect publish, registry rebuild, component visual parity (**figma-parity**).

### 5 — Verify

```bash
npm run build
npm run lint
```

Report a summary: tokens added/changed/removed, files touched, grep hits fixed, build/lint result.

## Acceptance checklist

- [ ] Figma variables read from `DS_THEMES`, `Radius`, `DS-Primitives` (light + dark)
- [ ] `globals.css` updated: primitives, `:root`, `.dark`, `.radius-mode` as needed
- [ ] `@theme inline` bridge intact; no broken `var()` chains
- [ ] `docs/TOKENS.md` matches `globals.css` (including Design name column)
- [ ] Renamed/removed tokens grepped and fixed in `src/`
- [ ] `npm run build` and `npm run lint` pass

## Minimal trigger prompt

```
Designers updated Figma variables. Sync tokens into code.
Variable sets: DS_THEMES, Radius, DS-Primitives
```
