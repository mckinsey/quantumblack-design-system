# api — props

QBDS binding for step `api`. Generic rules: [react-components/props.md](../react-components/props.md). Parts/slots → [composition.md](./composition.md).

- Prefer shadcn prop names
- Small API — don't mirror every Figma boolean

**Size**

- React sizes: `xxs`, `xs`, `sm`, `md`, `default`, `lg`, `xl`
- Ship the subset the Figma set lists — map to the closest React size above
- Common Figma → React: `reg` → `default`, `xlg` → `xl`, `xxsm` → `xxs`, `xsm` → `xs`
- Never use Figma size names in code, demos, or Code Connect

**Variant**

- For `variant`, use `default` instead of `primary`

**Don't prop these**

- `show*` booleans → children or named parts
- Icons → child or named part
- Slots → children or sub-components
- Interaction states → CSS / `data-state` (except `disabled`)
