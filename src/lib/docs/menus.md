## What this is

QBDS **overlay menus** — shared visual language for action lists and listboxes.

Figma defines one **Menus** surface (`Menu/Context`, `Menu/Select`, `Menu/Avatar`, item primitives). Code stays **shadcn-style**: small styled parts, Radix/Base UI behavior, **composition** for icons, avatars, counters, and custom rows.

This page applies to **`dropdown-menu`**, **`context-menu`**, and **`select`** (listbox popup). **NavMenu** / LeftNav is separate — see the sidebar docs.

## Figma → code

| Figma | Use | Trigger |
| --- | --- | --- |
| `Menu/Context` | `dropdown-menu` or `context-menu` | Click / right-click (or long-press) |
| `Menu/Select` | `select` (`SelectContent` + items) | Field control |
| `Menu/Avatar` | `select` + composed rows | Field control |
| `NavMenu/*` | `sidebar-nav` | Persistent nav, not this doc |

We do **not** ship a single `Menu` root that hides primitives. Pick the interaction first; reuse the same tokens and patterns.

## Dropdown vs context

Same **base styles** on panel and items. Only the primitive differs:

- **`DropdownMenu`** — opened from a button, split control, toolbar action, etc.
- **`ContextMenu`** — opened from pointer context on a surface.

Compose both the same way (`*Content`, `*Item`, `*Sub*`, `*Label`, `*Separator`, checkbox/radio items). Examples may use dropdown or context interchangeably for visuals.

## What the primitives own

Registry components provide **structure + QBDS styling**, not product-specific menus:

- Panel: background, elevation, padding, `size` (`default` / `lg` on content)
- Items: typography, hover/pressed, disabled, `inset`, destructive `variant` (extension; not on the Menus Figma page)
- Radix pieces: submenus, groups, labels, separators, shortcuts, checkbox/radio items
- `data-slot` and accessibility from the underlying primitive

They do **not** own leading icons, selected checkmarks, avatars, counters, or switch-in-row as dedicated props. Build those with **children** (and optional `className`).

## Composition patterns

### Leading icon

Put `IconShell` + `Icon` (or any node) **inside** the item:

```tsx
<DropdownMenuItem>
  <IconShell size="sm" variant="secondary">
    <Icon icon="person" />
  </IconShell>
  Profile
</DropdownMenuItem>
```

Use `inset` when a column aligns with checkbox/radio/submenu rows (Figma `MenuItem/Context` inset).

### Shortcut

Trailing shortcut is composition via `DropdownMenuShortcut` / `ContextMenuShortcut`:

```tsx
<DropdownMenuItem>
  Profile
  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
</DropdownMenuItem>
```

### Selected row (checkmark, not checkbox item)

Figma `selected` on a plain context row is a **leading `done` indicator**, not `*CheckboxItem`. Compose it:

```tsx
<DropdownMenuItem inset>
  <IconShell size="sm" variant="primary">
    <Icon icon="done" />
  </IconShell>
  Current workspace
</DropdownMenuItem>
```

Omit the icon when not selected. For multi-select semantics, use `*CheckboxItem` or `select` with checkbox rows in demos.

### Submenu

Use `*Sub`, `*SubTrigger`, `*SubContent`. Chevron and open state come from the primitive.

### Group heading

Use `*Label` (Figma `MenuItem/Header`). Match `size` on content for reg/lg typography.

### Divider

Use `*Separator`. Figma `inverse` divider: adjust with `className` on the separator wrapper if the surface requires it.

### Select listbox (`Menu/Select`)

Use `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, groups/labels as needed. Radio/checkbox/switch **row types** are **examples** (e.g. checkbox + label + optional counter in the demo), not a closed API on `SelectItem`.

### Avatar rows (`Menu/Avatar`)

Same as select listbox: compose **`Avatar`** (or your markup) + text inside `SelectItem`:

```tsx
<SelectItem value="user-1">
  <Avatar size="sm" />
  <SelectItemText>First Last</SelectItemText>
  <SelectItemIndicator>{/* radio/checkmark when selected */}</SelectItemIndicator>
</SelectItem>
```

Size (`sm` / `default` / `lg`) comes from `Select` `size` on the field and content padding, not a separate avatar-menu component.

## Panel width and layout

Demos often fix width (e.g. `256px`) for screenshots. Production menus can set `className` on `*Content` / `SelectContent`. Min width follows content and design constraints, not a single global prop.

## Examples

Registry **Examples** for `dropdown-menu`, `context-menu`, and `select` show parity-style compositions (icons, shortcuts, subs, checkbox/radio, select multi with counter). Copy and adapt; omit pieces you do not need.

## Out of scope here

- **`menubar`** — stock shadcn; not QBDS registry menu spec
- **`navigation-menu`** — not the Figma Menus page; use sidebar for NavMenu
- Pre-built product menus (File, Edit, …) — app code, not the design library
