# Component composition

Optional chrome is **structure**, not booleans. Never `show*` props (`showLeadingIcon`, `showRemove`, …).

- Content (icon, label, avatar) → `children` or a named part
- Shared axes (`size`, `variant`, …) → root props/context; parts read them — do not repeat on every part
- Dismiss / actions → part, callback (`onRemove`), or composed control — not a show boolean
- Form-control labels → sibling `<Label htmlFor>` + control `id`, outside the leaf — never a `label` prop or `showLeftLabel` on the control
- Host swap → Base UI `render` on the focus owner
- Field footer → `FieldDescription` **or** `FieldError`, never both
- Figma group frames → demo only, not a leaf prop
