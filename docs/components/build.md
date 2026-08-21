# Building the component

`src/components/ui/<name>.tsx`. Tokens from [TOKENS.md](../TOKENS.md). Copy the **closest sibling's** patterns — do not invent a new shape.

- **Sizes** — follow the sibling: `cva` variants or `data-size` + Tailwind. Do not rewrite an existing size system with a new `cva`.
- **Primitive wrappers** — no `render` / `nativeButton` wrapper unless the sibling, or an in-repo Base UI recipe, already uses one.
- **Naming** — `group/<part>` names, hit-area pseudo-elements and `data-slot` seams as the sibling does.
- **Exports** — only what demos and consumers need (root + documented parts). Do not export `*Variants` helpers that siblings do not.
- **Geometry** (thumb travel, insets, hit areas) comes from the Figma variant × state matrix, not from the primitive's defaults.
