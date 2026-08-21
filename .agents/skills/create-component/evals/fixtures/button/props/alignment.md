# Figma alignment — Button

Treat as `get_metadata` + component-set description. Do **not** call Figma MCP.

Shipped gold: `src/components/ui/button.tsx` (text Button + icon Button sizes in one API).

## Axes (Button text set `34797:9013`)

| Axis                    | Figma values                                                                  | Default  |
| ----------------------- | ----------------------------------------------------------------------------- | -------- |
| type                    | primary, primary-accent, secondary-filled, secondary-outline, ghost           | primary  |
| size                    | xxsm, xsm, sm, reg, lg                                                        | reg      |
| showLabel               | true, false                                                                   | true     |
| showLeadingIcon         | true, false                                                                   | false    |
| showTrailingIcon        | true, false                                                                   | false    |
| show\*Menu / menu slots | booleans + slots                                                              | —        |
| showTooltip\*           | booleans                                                                      | false    |
| label                   | string                                                                        | "Button" |
| state                   | enabled, hover, focused, pressed, dropdown-open, toggle-on, disabled, loading | enabled  |

## Icon sizes (Button icon set `36167:9301`)

Same `variant` axis. Icon-only sizes ship on the same React `Button`: `icon-xxs`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`.

## React API (gold)

| Prop       | Values                                                                                  | Default   |
| ---------- | --------------------------------------------------------------------------------------- | --------- |
| `variant`  | `default`, `accent`, `secondary`, `outline`, `ghost`                                    | `default` |
| `size`     | `xxs`, `xs`, `sm`, `default`, `lg`, `icon-xxs`, `icon-xs`, `icon-sm`, `icon`, `icon-lg` | `default` |
| `disabled` | boolean (primitive)                                                                     | —         |
| `children` | label text + optional `IconShell` / icons                                               | —         |

## Notes

- `type` → `variant`: primary→default, primary-accent→accent, secondary-filled→secondary, secondary-outline→outline, ghost→ghost.
- Text sizes: xxsm→xxs, xsm→xs, sm→sm, reg→default, lg→lg.
- show* / SLOT / menus / tooltips / label → composition or `children`, not React show* / `label` props.
- hover/focus/pressed/dropdown-open/loading → CSS / `data-state` / spinner child — not `state="…"` or a `loading` prop.
