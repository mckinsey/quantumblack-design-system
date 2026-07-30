---
name: code-connect
description: Create or update a QBDS Figma Code Connect mapping as a template file (`code-connect/<name>.figma.ts`, MCP `figma` API, published via the Figma CLI). Use when adding a new mapping, wiring a Figma node URL, or mapping Figma component properties to a React component's API — including Figma-only props (show* booleans, slots) with no matching React prop. Triggers — "add a code connect", "create a Figma mapping", "map this component to Figma", "code connect for <component>", or a figma.com node URL alongside work in code-connect/.
---

# QBDS Code Connect (template-based)

Use the **`/figma-code-connect`** skill to create the template mappings — it owns the mechanics (URL parsing, `get_context_for_code_connect`, the `instance.*` API, enum/interpolation/dynamic-children rules, validation). This skill only layers the **QBDS conventions** below; don't restate the generic mechanics.

QBDS authors **template** files (`code-connect/<name>.figma.ts`, MCP `figma` API). The old parser style (`figma.connect(...)` in `.figma.tsx`) is **deprecated** — do not author new `.figma.tsx` files.

## Env vars (before templates)

Every `// url=<QBDS_*>` token needs a matching env var. Derive the name from the header:

| Template header             | Env var                      |
| --------------------------- | ---------------------------- |
| `// url=<QBDS_TAG>`         | `FIGMA_URL_QBDS_TAG`         |
| `// url=<QBDS_BUTTON_TEXT>` | `FIGMA_URL_QBDS_BUTTON_TEXT` |

Rule: `<QBDS_X>` → `FIGMA_URL_QBDS_X`.

### Missing var — add to repo files

When creating or wiring a template, check both files:

| File           | Action                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `.env.example` | add empty placeholder if key missing: `FIGMA_URL_QBDS_<NAME>=`                                          |
| `.env`         | add key if missing — paste URL when user provided it in chat; otherwise empty: `FIGMA_URL_QBDS_<NAME>=` |

Then tell the user:

- If `.env` has the full URL → run `npm run figma:config`
- If `.env` value is empty → ask user to paste the Figma URL into `.env`, then run `npm run figma:config`

Never commit real URLs or tokens — only empty placeholders in `.env.example`.

### Cannot write `.env`

`.env` is local and may be missing or blocked. If you cannot create or edit it:

1. Still add the empty key to `.env.example` (committed).
2. Stop and give the user an exact block to paste into their local `.env`:

```bash
FIGMA_URL_QBDS_<NAME>=<full figma component-set url>
```

Do not run `npm run figma:config` / `figma:parse` until the user confirms the URL is in `.env` (empty values are skipped by `generate-figma-config.ts`).

## QBDS conventions

### 1 — Figma URL is a token, never inlined

The `// url=` header references a substitution token, not a raw URL:

```ts
// url=<QBDS_BUTTON_TEXT>
// source=src/components/ui/button.tsx
// component=Button
```

- Add the node URL via env vars (see **Env vars** above) — never inline the URL in the template.
- The script turns each `FIGMA_URL_<NAME>` into `<<NAME>>` and writes `documentUrlSubstitutions` into `figma.config.json` (git-ignored). The CLI substitutes `<QBDS_<NAME>>` → URL at publish.
- URL must target the **COMPONENT_SET** node, not a variant inside it. Dev Mode only surfaces Code Connect at the set level. Copy link from the set name in Figma (e.g. `Tags-Dismissable` → `38573-15379`, not variant `38573-15380`).

### 2 — Files, imports

- Mappings live in `code-connect/<name>.figma.ts` (already globbed by `figma.config.template.json` `include`).
- Import the React component from `@/components/ui/<name>`.
- One template = one Figma node. Distinct Figma variants that produce different snippets → **separate files** (e.g. `button-text.figma.ts`, `button-icon.figma.ts`), each with its own `<QBDS_*>` token and `id`.

### 3 — Show Figma-only props through the component

The component `Props` in `src/components/ui/<name>.tsx` is the source of truth. Some Figma properties have **no matching code prop** — don't drop them; render the same result through the component:

- `showLeadingIcon` (Figma-only boolean) → child instance inside the button.
- `shape: circle` (no `shape` prop) → `className="rounded-full"`.

If nothing represents it, omit it and tell the user. Keep `example` close to the demo (`src/app/demo/[name]/ui/<name>.tsx`).

### 3b — Field footer: helper XOR feedback

Figma inputs often expose `showHelpText` and `showFeedbackMessage` as separate booleans. React composes **one** footer message:

| State           | Render                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| valid / neutral | `<FieldDescription>` when `showHelpText`                                                               |
| error / invalid | `<FieldError>` when `showFeedbackMessage` — **replaces** helper, do not also render `FieldDescription` |

Demos follow this (see `TextareaStates` error example). Code Connect templates must match — not both in the same snippet.

```ts
${invalid && showFeedback
  ? figma.code`<FieldError>${statusMessage}</FieldError>`
  : showHelpText
    ? figma.code`<FieldDescription className="${descClass}">${helperText}</FieldDescription>`
    : figma.code``}
```

### 4 — Slot children (repeated same-type instances)

Prefer Figma’s official SLOT path when the component has a SLOT property (see [Writing template files](https://developers.figma.com/docs/code-connect/template-files/)):

1. **`getSlot('propName').connectedInstances`** + `executeTemplate()` / `renderChildren` — SLOT with code-connected children (expand snippets inline). Prefer this for new templates.
2. **Bare `getSlot('propName')`** — only when you want the Dev Mode slot pill (freeform content), not expanded children.
3. **`figma.properties.children(['MainComponentName'])`** — fallback when `connectedInstances` is empty (known quirk for some QBDS sets). Still used by older templates (tag groups, button groups).

```ts
const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['RadioGroup/Item']);

export default {
  example: figma.code`
    <RadioGroup>
      ${figma.helpers.react.renderChildren(items)}
    </RadioGroup>
  `,
};
```

Do not call `executeTemplate()` on the slot itself — only on each `connectedInstances` handle. See `radio-group-list-vertical.figma.ts`, `radio-group-list-horizontal.figma.ts`.

## Reference examples

Read existing templates in `code-connect/` before writing a new one:

- `button-text.figma.ts`, `button-icon.figma.ts` — token header, variant split, Figma-only props
- `radio-group-list-vertical.figma.ts` — SLOT via `getSlot().connectedInstances` with `properties.children` fallback
- `button-group.figma.ts`, `tag-group-dismissable.figma.ts` — older `properties.children` pattern

## Validate & publish

```bash
npm run figma:config        # regenerate substitutions
npm run figma:parse         # local template validation (exit 0)
npm run figma:publish       # only when the user asks (needs FIGMA_ACCESS_TOKEN)
```
