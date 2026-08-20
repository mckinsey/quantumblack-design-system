# Figma slots fixture — Tag (Tag-Dismissable)

Treat this as Figma SLOT / `show*` / composition output. Do **not** call Figma MCP.

Source: `evals-fixture/mcp/get_design_context.md`.

## Optional chrome

| Figma           | Kind                                                          |
| --------------- | ------------------------------------------------------------- |
| showLeadingIcon | boolean (default true) — when true, Leading-Icon before label |
| Leading-Icon    | composition slot — IconShell + Material icon instance         |
| Label           | text content                                                  |
| Dismiss         | close trigger (always in this dismissable set)                |
| State-Overlays  | interaction layer — CSS / overlays, not a React part prop     |

## Shared axes (root)

- type → React `variant`
- size → React `size` (`reg` → `default`)
- outline, pill → geometry / variant folding per props.md
- state → CSS + `disabled`

## How to compose (expected direction)

- No `showLeadingIcon` React prop — leading icon is `children` or a named part (`TagLeadingIcon` / `<IconShell><Icon … /></IconShell>`).
- Dismiss via `onRemove` and/or a dismiss control part — not a `showRemove` boolean (Figma description lists Dismiss in composition, not as showRemove).
- Shared size/variant/pill/outline on the root; parts read context or inherit.
