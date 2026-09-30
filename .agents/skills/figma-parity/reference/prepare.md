Scope: Figma-driven implement or review of **existing** QBDS components only. Skip deps, CI, docs, refactors with no design change.

## Figma MCP

- Source of truth: **Figma** (`get_metadata`, `get_variable_defs`, `get_screenshot`, `get_design_context`) + **`src/components/ui/<name>.tsx`**.
- `code-connect/<name>.figma.ts` is downstream — can be stale. Never seed the alignment table from it.
- `get_design_context`: pass **`disableCodeConnect: true`**.
- Code Connect fixes: use the **code-connect** skill after the alignment table exists.

## Tokens (read before styling)

1. [docs/TOKENS.md](../../../docs/TOKENS.md) — Tailwind utilities; design-name column ↔ Figma variables.
2. [src/styles/globals.css](../../../src/styles/globals.css) — CSS variables, `@theme inline`; check **light and dark** (`.dark`); `-inverse` on dark/accent surfaces.
3. Spacing: `gap-1`/`p-1` = 4px, `gap-2`/`p-2` = 8px, `gap-3`/`p-3` = 12px. No arbitrary `gap-[Npx]`, hex colors, or primitives (`slate-*`, `mist-*`).

Use utilities from TOKENS.md (`text-fg-*`, `border-stroke-*`, `bg-fill-*`), not raw CSS var names or primitives.

**Status copy:** Figma `Text/Error` (etc.) → code **`text-status-error`** (etc.) is intentional. Do not rewrite to `text-error` / `text-fg-error`. Control chrome: `border-stroke-status-*`, `bg-status-*`.

## Repo patterns (match closest sibling)

| Area | Where / rule |
| ---- | ------------ |
| Component | `src/components/ui/<name>.tsx` — `cva`, `data-slot`, context; Base UI vs Radix per [AGENTS.md](../../../AGENTS.md) imports in file + siblings |
| Demo | `src/app/demo/[name]/ui/<name>.tsx` — `examples: DemoExample[]`; no new `createLegacyDemo` |
| Registry | `registry.json` + `npm run registry:build` |
| Tests | `src/tests/<name>.test.tsx` — roles, `data-*`, interaction |
| Icons | `IconShell` + `Icon`; re-check **type** + opacity when surface flips (open, toggle-on, inverse) |
| Typography | `cta-*`, `paragraph-*` — not `text-sm` / `font-*` / `leading-*` |
| Slots / API | [composition.md](../../../docs/qbds-react-components/composition.md); export only with demo + test |
| Field footer | `FieldDescription` and `FieldError` are **mutually exclusive** |
| Horizontal field lists | `[&>[data-slot=field]]:w-auto` on group; label `flex-none` — do not change Field globals |
| Primitive | Focus/keyboard owner is the **rendered** element (Base UI `render`, Radix `asChild` on outer primitive) |
| Field-composed controls | Per-size `fieldConfig` from sibling (e.g. `input.tsx`); `errorClass` like `labelClass` / `descClass` |

Red flag: same axis on both `data-*` and React Context without a note in the alignment table.
