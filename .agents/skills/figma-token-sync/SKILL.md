---
name: figma-token-sync
description: Sync QBDS Figma variables (DS_Themes, Radius, DS-Primitives) into globals.css and TOKENS.md. Use only when designers have updated Figma variables and tokens need to flow into code (light + dark modes). Triggers — "sync tokens", "figma token sync", "designers updated variables", or a Figma variables URL for the QBDS v2.0.0 file. For component-only work use figma-parity instead.
---

# Figma → code token sync (QBDS)

**Scope:** Run only when designers have updated Figma variables and tokens need to flow into code. Skip for component-only work — use the **figma-parity** skill instead.

## Figma source

- **File:** [QBDS v2.0.0](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=1878-17156&view=variables&p=f&t=z4NTULUiQsv5yiJM-0)
- **Variable sets to read:** `DS_Themes`, `Radius`, `DS-Primitives`
- **Modes:** light and dark (both must be synced)

Use the Figma MCP `get_variable_defs` tool to read resolved values. Note: `search_design_system` returns metadata only (no values) — do not use it for syncing.

## Code targets (read before editing)

| File                                                        | Role                                                                                                                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`docs/TOKENS.md`](../../../docs/TOKENS.md)                 | **Figma ↔ CSS mapping** — the **Design name** column is the canonical Figma variable path for each `--*` token; read this before syncing |
| [`src/styles/globals.css`](../../../src/styles/globals.css) | **CSS source of truth** — primitive + semantic variable definitions and `var()` bindings                                                 |

### `globals.css` structure (preserve layout)

1. **`@theme inline`** — primitives (`--mist-*`, `--slate-*`, opacity ladders, brand accents), Tailwind bridge (`--color-fill-*`, `--color-fg-*`, `--color-surface-*`, …), shadcn aliases, radius utilities (`--radius-*` → `--rad-*`).
2. **`:root`** — light-mode semantic tokens (`--text-*`, `--border-*`, `--fill-*`, `--surface-*`, `--status-*`, `--stateslayer-*`, `--elevations-*`) and sharp radius defaults (`--rad-*`).
3. **`.dark`** — dark-mode semantic tokens (same families as `:root`).
4. **`.radius-mode`** — rounded radius overrides (`--rad-reg`, `--rad-sm`, `--rad-md`, `--rad-lg`; `--rad-round` stays `9999px`).
5. **`@utility shadow-elevation-*`** and typography utilities — update only if elevation or type tokens changed in Figma.

**Do not** remove `@custom-variant dark`, `@custom-variant radius-mode`, or the `@theme inline` → semantic → Tailwind bridge pattern.

## Workflow (run in order)

### 1 — Read Figma variables

1. Read [`docs/TOKENS.md`](../../../docs/TOKENS.md) — note each token's **Design name** column (e.g. `--fill-active` → `Fill/Content/Active`). These are the canonical Figma paths to match against.

2. Call the Figma MCP `get_variable_defs` tool pointing at the QBDS v2.0.0 file and node `1878:17156`.
   - If the tool responds "nothing selected": this is a known limitation of the Figma plugin sandbox — it checks for an active selection before running, even though `fileKey` and `nodeId` are provided explicitly. Ask the user to open the [QBDS v2.0.0 variables page](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=1878-17156&view=variables&p=f&t=z4NTULUiQsv5yiJM-0) in the Figma desktop app, click any layer, and retry. The selection does not affect the data returned.
   - The response contains all file variables with `valuesByMode` entries. Most semantic tokens will be `VARIABLE_ALIAS` references — follow the `id` to the primitive variable (also in the response) to get the resolved name (e.g. `Slate 900/opacity-88`).
   - Focus on the three local collections:

   | Collection      | Modes           |
   | --------------- | --------------- |
   | `DS_Themes`     | Dark and Light  |
   | `DS-Primitives` | Value           |
   | `Radius`        | Sharp and Round |

3. For each `DS_Themes` token, resolve both Light and Dark mode aliases to their primitive name and compare against the current `var()` binding in `globals.css`.

4. Build a diff table: Design name (from TOKENS.md) → CSS variable → current `var()` binding → new binding. Flag **renames** and **removed** tokens.

### 2 — Update `globals.css`

1. Update **primitives** in `@theme inline` if `DS-Primitives` changed (oklch values, opacity steps).
2. Update **semantic mappings** in `:root` (light) and `.dark` (dark) from `DS_Themes`.
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

- [ ] Figma variables read from `DS_Themes`, `Radius`, `DS-Primitives` (light + dark)
- [ ] `globals.css` updated: primitives, `:root`, `.dark`, `.radius-mode` as needed
- [ ] `@theme inline` bridge intact; no broken `var()` chains
- [ ] `docs/TOKENS.md` matches `globals.css` (including Design name column)
- [ ] Renamed/removed tokens grepped and fixed in `src/`
- [ ] `npm run build` and `npm run lint` pass
