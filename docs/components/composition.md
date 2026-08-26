# Component composition

Map Figma slots and optional chrome to React structure — parts and children, not boolean toggles.

## Guidelines

1. Optional chrome is structure, not props. Prefer `show*` booleans only in Code Connect templates, not on the React API.
2. Content (icon, label, avatar) → `children` or a named part (`<TagRemove>`, `<ButtonIcon>`, …).
3. Shared axes (`size`, `variant`, …) → root props or context; parts read them — don't repeat on every part.
4. Dismiss and actions → a part plus callback (`onRemove`) or a composed control.
5. Form-control labels → sibling `<Label htmlFor>` + control `id`, outside the leaf — not a `label` prop or `showLeftLabel` on the control.
6. Host swap → Base UI `render` on the element that owns focus.
7. Field footer → `FieldDescription` or `FieldError`, not both.
8. Figma group frames (button groups, tag lists) → demo composition only, not a leaf prop.

## Example

Dismissable tag:

```tsx
<Tag variant="default" size="default">
  <IconShell size="sm">
    <Icon icon="sell" />
  </IconShell>
  Label
  <TagRemove onRemove={() => {}} />
</Tag>
```

Not:

```tsx
<Tag showLeadingIcon showRemove onRemove={() => {}} />
```
