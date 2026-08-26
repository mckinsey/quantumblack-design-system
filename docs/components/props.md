# Component props

QBDS binding for step 3 (API). Generic prop principles live in [figma-to-component](../../.agents/skills/figma-to-component/SKILL.md#steps).

Decide the React prop surface from your Figma alignment table. Prefer shadcn names; the goal is a small, familiar API — not a 1:1 mirror of every Figma boolean.

## Guidelines

1. Figma `type` → React `variant`. For new APIs, map Figma `primary` → `default`. If the file already exists, match the shipped API.
2. Figma `reg` → `size="default"`. Ship every size Figma lists (text and icon sets when both exist).

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
