# api — props

## Description

QBDS binding for step `api` (props). Pair with [composition.md](./composition.md).

## Prompt

From the Figma alignment table for `{name}`, decide the React prop surface.

Prefer shadcn names. Small familiar API — not a 1:1 mirror of every Figma boolean.

| Figma axis        | React prop       | Notes                                                           |
| ----------------- | ---------------- | --------------------------------------------------------------- |
| `type` / style    | `variant`        | Figma `primary` → `default` for new APIs                        |
| `size` (`reg`)    | `size="default"` | Ship every size Figma lists                                     |
| `state=disabled`  | `disabled`       | Other states via CSS / `data-state`                             |
| `show*` booleans  | —                | Map to children or named parts — not props (see composition.md) |
| `showLeadingIcon` | —                | Icon as child or named part                                     |
| `showRemove`      | —                | Remove part + callback                                          |

Dismiss and actions → part + callback, not a show boolean.

Show prop table before step `build`.

## Output

Prop table in the combined `api` artifact.
