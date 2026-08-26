# Component props

Decide the React prop surface from your Figma alignment table. The goal is a small, shadcn-familiar API — not a 1:1 mirror of every Figma boolean.

## Guidelines

1. Prefer shadcn prop names over Figma property names.
2. Map Figma `show*` booleans and SLOT instances to children or composition — not new props.
3. Skip a public `state="…"` enum; interaction states belong in CSS and `data-state`.
4. Figma `type` → React `variant`. For new APIs, map Figma `primary` → `default`. If the file already exists, match the shipped API.
5. Figma `reg` → `size="default"`. Ship every size Figma lists (text and icon sets when both exist).
6. `disabled` is a prop. Hover, focus, pressed, open, and loading come from CSS, `data-state`, or children — not a loading prop.

## Naming

| Figma axis        | React prop       | Notes                               |
| ----------------- | ---------------- | ----------------------------------- |
| `type` / style    | `variant`        | e.g. `default`, `accent`, `ghost`   |
| `size` (`reg`)    | `size="default"` | Include sm, lg when Figma has them  |
| `state=disabled`  | `disabled`       | Other states via CSS / `data-state` |
| `showLeadingIcon` | —                | Icon as child or named part         |
| `showRemove`      | —                | Remove button as part + callback    |

## Example

Tag from Figma:

- `type: primary|secondary` → `variant="default"|"secondary"` (not `type`)
- Leading icon → child inside `<Tag>`, not `showLeadingIcon`
- Remove affordance → `<TagRemove onRemove={…} />`, not `showRemove`
