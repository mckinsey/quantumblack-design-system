# api — props

Step `api` (props). Parts/slots → [composition.md](./composition.md).

- From the alignment table for `{name}`, decide which design axes become React props
- Return a prop table: `Prop | Type | Default | Notes`
- Prefer library prop names over design-tool property names
- Interaction states → CSS / `data-*` attributes, not a new public state prop (unless the library already ships one)
- Shared variant axes → root props or context; parts read them via group selectors or context — not duplicated per part
- Pair with the part list from [composition.md](./composition.md)
- Do not write component, demo, or test files until both are shown
- Prop table approved before step `build`
