# api — composition

## Description

QBDS binding for step `api` (parts). Pair with [props.md](./props.md).

## Prompt

Map Figma slots and `show*` booleans to QBDS parts and children for `{name}`.

Rules:

1. Figma `show*` booleans → structure (children / named parts), never React props — Code Connect templates may use `show*`; the public API must not
2. Figma SLOT props → composable children or named sub-components
3. Form labels → sibling `<Label htmlFor>` + control `id`, outside the leaf
4. Host swap → Base UI `render` on the element that owns focus
5. Field footer → `FieldDescription` or `FieldError`, not both
6. Group frames in the Figma file → demo composition only, not a leaf prop

Return the part list alongside the prop table.

Do not write files until both prop table and part list are shown.

## Output

Part list in the combined `api` artifact.
