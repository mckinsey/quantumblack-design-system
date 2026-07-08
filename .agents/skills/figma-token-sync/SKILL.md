---
name: figma-token-sync
description: Sync QBDS Figma variables (DS_THEMES, Radius, DS-Primitives) into globals.css and TOKENS.md. Use only when designers have updated Figma variables and tokens need to flow into code (light + dark modes). Triggers — "sync tokens", "figma token sync", "designers updated variables", or a Figma variables URL for the QBDS v2.0.0 file. For component-only work use figma-parity instead.
---

# Figma → code token sync (QBDS)

**Scope:** Run only when designers have updated Figma variables and tokens need to flow into code. Skip for component-only work — use the **figma-parity** skill instead.

## Figma source

- **File:** [QBDS v2.0.0](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=1878-17156&view=variables&p=f&t=z4NTULUiQsv5yiJM-0)
- **Variable sets to read:** `DS_THEMES`, `Radius`, `DS-Primitives`
- **Modes:** light and dark (both must be synced)

Two paths to read variables — pick the first that applies:

| #   | Condition                                                   | Method                                                                                                             |
| --- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | `.env` exists and contains a non-empty `FIGMA_ACCESS_TOKEN` | **Figma REST API** (fastest — see Path A below)                                                                    |
| 2   | No token available                                          | **Figma MCP** `get_variable_defs` — ask the user to open the QBDS Figma file, select any layer, then call the tool |

Note: `search_design_system` returns metadata only (no values) — do not use it for syncing.

## Code targets (read before editing)

| File                                               | Role                                                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`docs/TOKENS.md`](docs/TOKENS.md)                 | **Figma ↔ CSS mapping** — the **Design name** column is the canonical Figma variable path for each `--*` token; read this before syncing |
| [`src/styles/globals.css`](src/styles/globals.css) | **CSS source of truth** — primitive + semantic variable definitions and `var()` bindings                                                 |

### `globals.css` structure (preserve layout)

1. **`@theme inline`** — primitives (`--mist-*`, `--slate-*`, opacity ladders, brand accents), Tailwind bridge (`--color-fill-*`, `--color-fg-*`, `--color-surface-*`, …), shadcn aliases, radius utilities (`--radius-*` → `--rad-*`).
2. **`:root`** — light-mode semantic tokens (`--text-*`, `--border-*`, `--fill-*`, `--surface-*`, `--status-*`, `--stateslayer-*`, `--elevations-*`) and sharp radius defaults (`--rad-*`).
3. **`.dark`** — dark-mode semantic tokens (same families as `:root`).
4. **`.radius-mode`** — rounded radius overrides (`--rad-reg`, `--rad-sm`, `--rad-md`, `--rad-lg`; `--rad-round` stays `9999px`).
5. **`@utility shadow-elevation-*`** and typography utilities — update only if elevation or type tokens changed in Figma.

**Do not** remove `@custom-variant dark`, `@custom-variant radius-mode`, or the `@theme inline` → semantic → Tailwind bridge pattern.

## Workflow (run in order)

### 1 — Read Figma variables

1. Read [`docs/TOKENS.md`](docs/TOKENS.md) — note each token's **Design name** column (e.g. `--fill-active` → `Fill/Content/Active`). These are the canonical Figma paths to match against.

2. **Path A — REST API (preferred when `.env` has `FIGMA_ACCESS_TOKEN`):**

```bash
source .env
curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/iuMWqCsIohoKAUB0tBS0xr/variables/local" \
  -o /tmp/figma_vars.json
```

Then proceed to steps 3–7 below.

**Path B — Figma MCP (no token available):**

Ask the user to open the [QBDS v2.0.0 variables page](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=1878-17156&view=variables&p=f&t=z4NTULUiQsv5yiJM-0) in the Figma desktop app and select any layer. Then use the Figma MCP `get_variable_defs` tool, pointing it at the QBDS v2.0.0 file and node `1878:17156`. The tool returns resolved variable values for the whole file. Extract DS_Themes (light + dark), DS-Primitives, and Radius values from the response and build the diff table manually — skip steps 3–5 and go straight to step 6.

3. The three local collections and their known stable IDs are:

| Collection      | ID                                 | Modes                                |
| --------------- | ---------------------------------- | ------------------------------------ |
| `DS_Themes`     | `VariableCollectionId:26698:8497`  | Dark = `32620:0`, Light = `26698:0`  |
| `DS-Primitives` | `VariableCollectionId:33946:8988`  | Value = `33946:1`                    |
| `Radius`        | `VariableCollectionId:35241:30757` | Sharp = `35241:0`, Round = `35241:1` |

If collection IDs look wrong (file was recreated), discover them with:

```bash
jq '.meta.variableCollections | to_entries[] | {id: .key, name: .value.name, modes: (.value.modes | map(.name))}' /tmp/figma_vars.json
```

4. Resolve the DS_Themes alias chain to primitive names in one `jq` pass:

```bash
jq -r '
  (.meta.variables | to_entries | map({key: .key, value: .value.name}) | from_entries) as $idToName |
  .meta.variables | to_entries[] |
  select(.value.variableCollectionId == "VariableCollectionId:26698:8497") |
  .value as $v |
  {
    name: $v.name,
    light: (if ($v.valuesByMode["26698:0"] | type) == "object" and $v.valuesByMode["26698:0"].type == "VARIABLE_ALIAS"
            then $idToName[$v.valuesByMode["26698:0"].id] else ($v.valuesByMode["26698:0"] | tostring) end),
    dark:  (if ($v.valuesByMode["32620:0"] | type) == "object" and $v.valuesByMode["32620:0"].type == "VARIABLE_ALIAS"
            then $idToName[$v.valuesByMode["32620:0"].id] else ($v.valuesByMode["32620:0"] | tostring) end)
  }
' /tmp/figma_vars.json
```

5. Extract Radius values:

```bash
jq -r '
  .meta.variables | to_entries[] |
  select(.value.variableCollectionId == "VariableCollectionId:35241:30757") |
  {name: .value.name, sharp: .value.valuesByMode["35241:0"], round: .value.valuesByMode["35241:1"]}
' /tmp/figma_vars.json
```

6. Build a diff table: Design name (from TOKENS.md) → CSS variable → current `var()` binding → new binding. Flag **renames** and **removed** tokens.

7. Remove the temp file when done: `rm /tmp/figma_vars.json`

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
