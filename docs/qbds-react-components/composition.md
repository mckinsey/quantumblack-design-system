# api — composition

QBDS binding for step `api` (parts). Generic rules: [react-components/composition.md](../react-components/composition.md). Pair with [props.md](./props.md).

- Authority for export vs slot vs Figma frame — other docs link here; do not redefine
- Map Figma slots and `show*` booleans to QBDS parts and children for `{name}`
- Map each Figma axis to: **prop | child | demo-only | no export**
- Do not write files until prop table + part list are both shown

**Export decision tree**

1. Closest shadcn sibling already exposes this region (`Header`, `Footer`, `Title`, `Content`, …)? → slot content = `children` of that part. No new export.
2. Distinct consumer primitive with its own props or behaviour (`CardMedia`, `AlertIcon`, …)? → named export + demo example + test.
3. Figma group frame, auto-layout wrapper, or slot container with no standalone meaning? → no export. Style via parent part or demo markup.

**Other rules**

- Figma `show*` booleans → structure only (include/omit children). Never a React prop — see [props.md](./props.md). Code Connect templates may use `show*`.
- Form labels → sibling `<Label htmlFor>` + control `id`, outside the leaf
- Host swap → Base UI `render` on the element that owns focus
- Field footer → `FieldDescription` or `FieldError`, not both
