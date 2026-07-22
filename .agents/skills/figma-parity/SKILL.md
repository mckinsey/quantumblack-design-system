---
name: figma-parity
description: Match Figma specs when implementing or reviewing QBDS UI — tokens, layout, all variants/states, demos, registry. Use when implementing, updating, or reviewing a QBDS component against a Figma URL/node or the library spec. Triggers — "implement this Figma component", "match the Figma spec", "figma parity", "build this component from Figma", or a figma.com URL alongside work in src/components/ui/, demos, or registry.json.
---

# Figma ↔ code parity (QBDS)

**Scope:** Run this workflow only for Figma-driven implement/review of QBDS components. Skip for unrelated tasks (deps, CI, docs, refactors with no design change). Figma MCP output is reference only — still run the full workflow below.

If no Figma URL/node is provided, ask for it (or use the team’s internal/shared link).

## Sources of truth (read before styling)

1. **[docs/TOKENS.md](docs/TOKENS.md)** — semantic Tailwind utilities; design-name column maps to Figma variables.
2. **[src/styles/globals.css](src/styles/globals.css)** — CSS variables and `@theme inline`; trace utilities back to semantics (e.g. `bg-fill-*` → `--color-fill-*` → `--fill-*`). Verify **light and dark** (`.dark`); use `-inverse` on dark/accent surfaces.
3. **Spacing scale** — `gap-1` / `p-1` = 4px, `gap-2` / `p-2` = 8px, `gap-3` / `p-3` = 12px. No `gap-[Npx]`, `text-[#…]`, `bg-[#…]`, or primitives (`slate-*`, `mist-*`) in components.

Match Figma tokens via **[docs/TOKENS.md](docs/TOKENS.md)** (Design name + Tailwind utility). CSS semantics in `globals.css`: `--text-*`, `--border-*`, `--fill-*`, `--surface-*`, `--status-*`, `--stateslayer-*`, `--elevations-*`, `--brand-accents-*` (each has a `-inverse` form where the spec uses inverse surfaces). In components use Tailwind utilities from TOKENS.md — e.g. `text-fg-*` (→ `--color-fg-*` → `--text-*`), `border-stroke-*` (→ `--color-stroke-*` → `--border-*`), `bg-fill-*` — not raw `--fg-*` / `--stroke-*` or primitives.

**Text vs status (feedback copy):** Message text uses **`Text/Error`** → `text-error`, **`Text/Warning`** → `text-warning`, etc. (AA-compliant). **`Status/Error`** → `status-error` / `border-stroke-status-error` — control borders and fills only, **not** `<FieldError>`, helper text, or counters.

## Repo patterns (match siblings, do not reinvent)

- **Component**: `src/components/ui/<name>.tsx` — Radix + `cva` + context + `data-slot`; copy structure from the closest sibling, not from scratch.
- **Demo**: `src/app/demo/[name]/ui/<name>.tsx` — `createLegacyDemo`, `examples[]`; cover every Figma variant axis or document manual gaps. No extra demo backgrounds unless the spec requires a surface contrast (match other demos).
- **Registry**: `registry.json` + `npm run registry:build` → `public/r/`.
- **Tests**: `src/tests/<name>.test.tsx` — a11y roles, `data-*` attrs, interaction; assert key variant outputs where helpers exist.
- **Icons**: `<IconShell>` + `<Icon icon="snake_case" />`; shell owns colour — pair sizes with the parent control per sibling demos.
- **Typography**: globals utilities (`cta-*`, `paragraph-*`, …) — not hand-rolled `text-sm` / `font-*` / `leading-*`.
- **Interactive states**: match the nearest button-like sibling — state overlays, disabled fills, focus rings; do not let variant branches override size-level focus treatment.
- **Slots**: Figma SLOT props → composable children, named sub-components, or Radix `asChild` / `Slot`; mark seams with `data-slot`.
- **Field footer**: `FieldDescription` (helper) and `FieldError` (feedback) are **mutually exclusive** — one per field. Error/invalid → `FieldError` only; otherwise `FieldDescription` when helper is shown. Never both in demo or Code Connect.
- **Radix composition**: The primitive that owns focus and keyboard behavior must be the **rendered** element — put `asChild` on the outer primitive and wrap the styled QBDS sub-component, not the reverse. Verify keyboard navigation in the demo.
- **Public API**: Every exported sub-component needs a demo example and at least one test, or remove it from the public API.
- **Field-composed controls** (input, textarea, select, date/time pickers, …): Figma nests **Elements/** instances (Label, Help-Text, Status-Messages, Characters-Counter). Match **each slot** per size × state in the demo — copy the per-size `fieldConfig` pattern from the nearest sibling (e.g. `input.tsx`). Do **not** assume shared `Field*` defaults match the parent set’s spec.

## Workflow (run in order)

### 0 — Code Connect (if present)

If **`code-connect/<name>.figma.tsx` exists**, read it before raw Figma codegen. Use it for props, enums, slots, and `example` snippets; still verify tokens, spacing, geometry, and states in code. Map every Figma variant property; use the real public API (no invented props). Update the mapping when the React API changes. New mappings: follow `code-connect/button.figma.tsx` and use `get_code_connect_map` when available.

For field-composed controls: derive **`errorClass`** (and warning/success/info) the same way as **`labelClass`** / **`descClass`** — pass explicit `className` on `<FieldError>` when Figma typography varies by size.

### 1 — Structure & variants

1. **Component description (Figma)** — On the **component set** root (not a single variant instance), read the designer-written **description** in Dev Mode, or from `get_design_context` on that node (follow **component documentation** links and **design annotations** in the response when present). QBDS descriptions often state the **default layout** and which variant axes exist (e.g. “Defaults to unboxed horizontal… also supports boxed, vertical, …”). Treat this as the narrative source of truth for defaults and scope before inferring from one frame.
2. `get_metadata` (or Dev Mode) on the component set — list every variant, boolean, text, and SLOT property; note which property values are the set’s **default** selections.
3. Read `src/components/ui/<name>.tsx` — `cva` keys, props, `data-slot`, exports.
4. Build an alignment table; flag **asymmetric** coverage (Figma-only or code-only values):

| Axis              | Figma values                 | React values                                            | Aligned? | Notes                    |
| ----------------- | ---------------------------- | ------------------------------------------------------- | -------- | ------------------------ |
| Variant / type    | …                            | …                                                       |          |                          |
| Size              | …                            | …                                                       |          |                          |
| Other layout axes | …                            | …                                                       |          |                          |
| State (if on set) | …                            | …                                                       |          |                          |
| Field slots       | Label, Help, Status, Counter | `FieldTitle`, `FieldDescription`, `FieldError`, counter |          | Per **size** — see below |
| SLOT props        | …                            | children / sub-components                               |          |                          |
| Sub-components    | …                            | exports                                                 |          |                          |

5. **Field chrome table** (required when Figma nests Elements/\* or booleans `showLabel`, `showHelpText`, `showFeedbackMessage`, `showCounter`): inspect **each text slot** at sm, reg/default, and lg (and error/disabled states). Shared primitives (`FieldError`, `FieldDescription`) often ship generic defaults — override in demo/Code Connect when Figma differs.

| Slot     | Figma node                  | sm (type + color) | default | lg  | Code target                  |
| -------- | --------------------------- | ----------------- | ------- | --- | ---------------------------- |
| Label    | Elements/Label              | …                 | …       | …   | `fieldConfig.*.label`        |
| Helper   | Elements/Help-Text          | …                 | …       | …   | `fieldConfig.*.description`  |
| Feedback | Elements/Status-Messages    | …                 | …       | …   | `fieldConfig.*.error` (etc.) |
| Counter  | Elements/Characters-Counter | …                 | …       | …   | counter sub-component        |

**Red flags:** label/description are per-size in demo but error/feedback is not; bare `<FieldError>` with no `className` on a sized field set; feedback uses `text-status-*` or wrong `paragraph-*` (e.g. `paragraph-regular-primary` when Figma shows `Paragraph/Large-Primary`).

6. **Defaults & demos:**
   - **Defaults:** Figma description, `cva` defaults, and `registry.json` must agree.
   - **Demos:** Start `examples[0]` simple — developer's choice, not necessarily the Figma default. Cover every alignment-table row across `examples[]`. Include at least one **error/feedback** example per size when typography differs.

### 2 — Tokens (every distinct variant × state)

Use `get_variable_defs` on representative nodes: at minimum **enabled**, **hover**, **focus**, **pressed**, **disabled**, plus selected/active/loading if defined. Map fill, text, stroke, elevation, radius, and state overlays per **[docs/TOKENS.md](docs/TOKENS.md)**. Check **light and dark**. Flag: wrong `-inverse` prefix; raw hex; primitives; right hex but wrong token name; **`Status/*` on feedback copy** (should be **`Text/*`**).

### 3 — Layout, spacing, typography & states

For **each matrix cell** (every meaningful variant combination), use `get_design_context` or Dev Mode — not only the root frame. For field sets, also pull context on **nested Elements/** frames in that cell.

| Property                      | Figma                            | Code                                                                              |
| ----------------------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| Height / min size             | auto-layout                      | `size-*`, `min-h`, padding + line-height                                          |
| Padding / gap                 | spacing variables                | `p-*`, `gap-*` on the scale above                                                 |
| Icon box                      | icon frame size                  | `IconShell` + parent `icon-*` size                                                |
| Separators / attached spacers | layout on group                  | avoid double gap; only between items                                              |
| Typography (control)          | text style name                  | matching `cta-*` / `paragraph-*` utility                                          |
| Typography (field feedback)   | Paragraph/\* + Text/Error (etc.) | per-size `paragraph-*` + `text-error` — verify **each size**, not control default |

**Compound spacing:** Derive spacing from Figma **per variant cell**, not from a single axis (e.g. “if boxed, always gap-2”). Size and shape often change gap/padding independently — document or test non-default cells when logic is non-obvious.

**Spacing verification rules**

- Record **pl and pr separately** in the spacing table — never assume symmetric padding.
- Do **not** infer padding from symbol bounding-box width or total component width.
- Verify padding on the inner **State-Overlays** frame (Dev Mode or MCP codegen on the variant cell).
- When `Spacing/N` tokens appear together (e.g. `Spacing/8` + `Spacing/12`), map each to its side; do not dismiss larger tokens as "internal only" without checking the overlay frame.
- **Shared `cva` ≠ shared spacing** — if a sibling component (e.g. Tag vs TagToggle) diverges, document and fix per component file.

**Interactive states** (on controls inside the component):

| State               | Verify                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------- |
| Hover / pressed     | overlay tokens (+ `-inverse` where spec uses inverse surfaces)                         |
| Focus               | ring token, width, offset                                                              |
| Disabled            | muted fill, disabled text, overlay                                                     |
| Selected / expanded | `data-[state=*]` / `aria-*` branches                                                   |
| Loading             | if defined in Figma                                                                    |
| Error (field)       | control border/fill (`Status/*`) **and** feedback text (`Text/*`, per-size typography) |

**Visual pass (required):** `npm run dev` on the demo vs Figma / `get_screenshot` per matrix cell. Fix or document any **≥2px** mismatch.

Report a **variant × state** matrix: pass / drift (note ≥2px or wrong token).

**Figma MCP (when available):** `get_design_context` (primary — layout, description, screenshot), `get_metadata`, `get_variable_defs`, `get_screenshot`.

## Acceptance checklist

- [ ] Alignment table: all Figma axes ↔ `cva`/props (both directions); SLOT seams covered
- [ ] Field chrome table (when Elements/\* present): label, helper, feedback, counter — typography + color per **size**
- [ ] Feedback copy uses `text-error|warning|success|information`, not `text-status-*`
- [ ] Variant × state matrix: tokens + geometry per cell
- [ ] Light and dark where the component appears on both
- [ ] Defaults aligned (Figma, `cva`, registry); demos start simple and cover the full alignment table
- [ ] Compound spacing from per-cell Figma values (no undocumented single-axis shortcuts)
- [ ] Horizontal padding verified as pl + pr per matrix cell (not width-inferred, not assumed symmetric)
- [ ] Shared styling helpers checked per component when spacing differs
- [ ] Exported sub-components: demo + test, or not exported
- [ ] Composed primitives: correct `asChild` direction; keyboard nav verified
- [ ] Visual pass: no undocumented ≥2px gaps
- [ ] `npm run lint`, tests pass; `registry:build` if registry touched

## User only shares a URL

Extract `node-id` from the URL, run the workflow above, and compare to the nearest sibling in `src/components/ui/`.
