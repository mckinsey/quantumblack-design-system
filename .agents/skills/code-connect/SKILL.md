---
name: code-connect
description: Create or update a QBDS Figma Code Connect mapping as a template file (`code-connect/<name>.figma.ts`, MCP `figma` API, published via the Figma CLI). Use when adding a new mapping, wiring a Figma node URL, or mapping Figma component properties to a React component's API — including Figma-only props (show* booleans, slots) with no matching React prop. Triggers — "add a code connect", "create a Figma mapping", "map this component to Figma", "code connect for <component>", or a figma.com node URL alongside work in code-connect/.
---

# QBDS Code Connect (template-based)

Use the **`/figma-code-connect`** skill to create the template mappings — it owns the mechanics (URL parsing, `get_context_for_code_connect`, the `instance.*` API, enum/interpolation/dynamic-children rules, validation). This skill only layers the **QBDS conventions** below; don't restate the generic mechanics.

QBDS authors **template** files (`code-connect/<name>.figma.ts`, MCP `figma` API). The old parser style (`figma.connect(...)` in `.figma.tsx`) is **deprecated** — do not author new `.figma.tsx` files.

## QBDS conventions

### 1 — Figma URL is a token, never inlined

The `// url=` header references a substitution token, not a raw URL:

```ts
// url=<QBDS_BUTTON_TEXT>
// source=src/components/ui/button.tsx
// component=Button
```

- Add the node URL to **`.env`** and **`.env.example`** as `FIGMA_URL_QBDS_<NAME>=...`, then run `npm run figma:config`.
- The script turns each `FIGMA_URL_<NAME>` into `<<NAME>>` and writes `documentUrlSubstitutions` into `figma.config.json` (git-ignored). The CLI substitutes `<QBDS_<NAME>>` → URL at publish.

### 2 — Files, imports

- Mappings live in `code-connect/<name>.figma.ts` (already globbed by `figma.config.template.json` `include`).
- Import the React component from `@/components/ui/<name>`.
- One template = one Figma node. Distinct Figma variants that produce different snippets → **separate files** (e.g. `button-text.figma.ts`, `button-icon.figma.ts`), each with its own `<QBDS_*>` token and `id`.

### 3 — Show Figma-only props through the component

The component `Props` in `src/components/ui/<name>.tsx` is the source of truth. Some Figma properties have **no matching code prop** — don't drop them; render the same result through the component:

- `showLeadingIcon` (Figma-only boolean) → child instance inside the button.
- `shape: circle` (no `shape` prop) → `className="rounded-full"`.

If nothing represents it, omit it and tell the user. Keep `example` close to the demo (`src/app/demo/[name]/ui/<name>.tsx`).

## Reference examples

Read existing templates in `code-connect/` before writing a new one — `button-text.figma.ts` and `button-icon.figma.ts` cover the token header, separate-file split, and showing Figma-only props through the component. Match their shape.

## Validate & publish

```bash
npm run figma:config        # regenerate substitutions
npx figma connect parse     # exit 0
npm run figma:publish       # only when the user asks (needs FIGMA_ACCESS_TOKEN)
```
