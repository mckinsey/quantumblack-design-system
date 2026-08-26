# Building the component

QBDS binding for step 4 (Build).

Implement `src/components/ui/<name>.tsx` by copying the closest sibling — same file shape, tokens, and primitive wiring.

Pick colours and surfaces from [TOKENS.md](../TOKENS.md). Geometry (thumb travel, insets, hit areas) comes from your Figma variant × state matrix, not from the primitive's defaults.

## Guidelines

1. **Sizes** — follow the sibling: `cva` variants or `data-size` + Tailwind. Don't replace an existing size system with a new `cva`.
2. **Primitive wrappers** — add a `render` / `nativeButton` wrapper only when the sibling, or an in-repo Base UI recipe, already uses one.
3. **Naming** — `group/<part>` class names, hit-area pseudo-elements, and `data-slot` seams as the sibling does.
4. **Exports** — root plus documented parts only. Skip `*Variants` helpers unless siblings export them.

## Example

Adding a toggle-style control: open `switch.tsx` or `checkbox.tsx`, not a greenfield `cva` layout. Match how that sibling handles size tokens, disabled fill, and focus rings before writing new classes.
