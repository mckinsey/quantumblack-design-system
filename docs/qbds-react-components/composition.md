# api — composition

## Description

QBDS binding for step `api` (parts). Pair with [props.md](./props.md).

Authority for export vs slot vs Figma frame — other docs link here; do not redefine.

## Prompt

Map Figma slots and `show*` booleans to QBDS parts and children for `{name}`.

### Export decision tree (SLOT or nested instance)

1. Does the closest shadcn sibling already expose a part for this region (`Header`, `Footer`, `Title`, `Content`, …)?
   → **Yes:** slot content = `children` of that part. Do not add a new export.
2. Is it a distinct consumer primitive with its own props or behavior (`CardMedia`, `AlertIcon`, …)?
   → **Yes:** add a named export, demo example, and test.
3. Is it a Figma group frame, auto-layout wrapper, or slot container with no standalone meaning?
   → **No export.** Style via the parent part's classes or demo markup (`className`, typography utilities).

### Other rules

1. Figma `show*` booleans → structure only (include/omit children). Never a React prop — see [props.md](./props.md). Code Connect templates may use `show*`.
2. Form labels → sibling `<Label htmlFor>` + control `id`, outside the leaf
3. Host swap → Base UI `render` on the element that owns focus
4. Field footer → `FieldDescription` or `FieldError`, not both

### Step `api` output

Prop table + part list. Map each Figma axis to one of: **prop | child | demo-only | no export**.

Do not write files until both are shown.

## Output

Part list in the combined `api` artifact.
