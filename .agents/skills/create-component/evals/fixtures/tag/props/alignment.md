# Figma alignment — Tag (Tag-Dismissable)

Treat as `get_metadata` + component-set description. Do **not** call Figma MCP.

Shipped gold: `src/components/ui/tag.tsx`.

## Axes

| Axis            | Figma values                             | Default |
| --------------- | ---------------------------------------- | ------- |
| type            | primary, accent, high-emphasis           | primary |
| size            | xsm, sm, reg, lg                         | reg     |
| outline         | true, false                              | false   |
| pill            | true, false                              | false   |
| showLeadingIcon | true, false                              | true    |
| label           | string                                   | "Label" |
| state           | enabled, hover, focus, pressed, disabled | enabled |

## React API (gold)

| Prop       | Values                                                        | Default   |
| ---------- | ------------------------------------------------------------- | --------- |
| `variant`  | `primary`, `secondary`, `accent`, `outline`, `accent-outline` | `primary` |
| `size`     | `xs`, `sm`, `default`, `lg`                                   | `default` |
| `pill`     | `boolean`                                                     | `false`   |
| `disabled` | `boolean`                                                     | —         |
| `onRemove` | `(event) => void`                                             | —         |
| `children` | label + optional leading `IconShell`                          | —         |

### Mapping

| Figma                             | React                          |
| --------------------------------- | ------------------------------ |
| type=primary, outline=false       | `variant="primary"`            |
| type=high-emphasis, outline=false | `variant="secondary"`          |
| type=accent, outline=false        | `variant="accent"`             |
| type=primary, outline=true        | `variant="outline"`            |
| type=accent, outline=true         | `variant="accent-outline"`     |
| size xsm/sm/reg/lg                | `xs` / `sm` / `default` / `lg` |

## Notes

- Tag keeps `variant="primary"` (not shadcn `default`) — match shipped API.
- showLeadingIcon / label → composition / `children`.
- Dismiss → `onRemove` (no `showRemove`).
- hover/focus/pressed → CSS; disabled → `disabled`.
- Leading IconShell tone: `tagIconTone[variant]`.
