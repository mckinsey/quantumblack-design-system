# Figma alignment — Switch

Treat as `get_metadata` + component-set description. Do **not** call Figma MCP.

Shipped gold: `src/components/ui/switch.tsx`.

## Axes

| Axis           | Figma values               | Default |
| -------------- | -------------------------- | ------- |
| size           | sm, reg, lg                | reg     |
| on             | false, true                | false   |
| showLeftLabel  | true, false                | false   |
| showRightLabel | true, false                | false   |
| leftEntry      | string                     | "Label" |
| rightEntry     | string                     | "Label" |
| state          | enabled, disabled, focused | enabled |

## React API (gold)

| Prop                                             | Values                | Default   |
| ------------------------------------------------ | --------------------- | --------- |
| `size`                                           | `sm`, `default`, `lg` | `default` |
| `checked` / `defaultChecked` / `onCheckedChange` | Base UI Switch        | —         |
| `disabled`                                       | boolean               | —         |

## Mapping

| Figma                                                   | React                                                 |
| ------------------------------------------------------- | ----------------------------------------------------- |
| size sm/reg/lg                                          | `sm` / `default` / `lg`                               |
| on                                                      | `checked` / `defaultChecked` / `onCheckedChange`      |
| showLeftLabel / showRightLabel / leftEntry / rightEntry | `Label` composition outside Switch (`htmlFor` + `id`) |
| state focused                                           | CSS / focus-visible                                   |
| state disabled                                          | `disabled`                                            |

## Notes

- No `show*` or entry props on `Switch`.
- Thumb / track are internal (`data-slot="switch-thumb"`); not public parts.
- `lg` ships an optional decorative off-state dot in production — size-gated in the component, not a prop.
