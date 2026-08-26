# Component composition

QBDS binding for step 3 (API). Generic composition principles live in [figma-to-component](../../.agents/skills/figma-to-component/SKILL.md#steps).

Map Figma slots to QBDS parts and children.

## Guidelines

1. Optional chrome is structure, not props. Use `show*` booleans only in Code Connect templates, not on the React API.
2. Form-control labels → sibling `<Label htmlFor>` + control `id`, outside the leaf — not a `label` prop or `showLeftLabel` on the control.
3. Host swap → Base UI `render` on the element that owns focus.
4. Field footer → `FieldDescription` or `FieldError`, not both.

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
