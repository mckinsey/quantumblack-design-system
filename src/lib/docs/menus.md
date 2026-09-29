## Menus

Dropdown menu, context menu, and select share one panel. Pick how it opens, then build the rows inside it.

- **Dropdown menu** opens from a button, split button, or toolbar action.
- **Context menu** opens from a right-click or long-press.
- **Select** opens from a field. An avatar list is a select with an avatar in each row.

Icons, shortcuts, avatars, and counters sit inside the item. They are not props. Left nav is a separate component.

## Rows

Dropdown

```tsx
<DropdownMenuItem>
  <IconShell size="sm" variant="secondary">
    <Icon icon="person" />
  </IconShell>
  Profile
  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
</DropdownMenuItem>
```

Context menu

```tsx
<ContextMenuItem>
  <IconShell size="sm" variant="secondary">
    <Icon icon="person" />
  </IconShell>
  Profile
  <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
</ContextMenuItem>
```

## Select

```tsx
<SelectItem value="user-1">
  <Avatar size="sm" />
  <SelectItemText>First Last</SelectItemText>
</SelectItem>
```

Checkbox, radio, and counter rows in the select examples are built the same way, inside `SelectItem`. Size comes from the select: `sm`, `default`, or `lg`.
