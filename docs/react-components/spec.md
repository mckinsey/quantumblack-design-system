# spec

## Description

Fetch the component set from the design tool before any implementation.

## Prompt

Use the design-tool MCP to fetch the component set at `{component_set_url}`.

Build:

1. **Alignment table** — every design axis mapped to React props
2. **Variant × state matrix** — pass/drift per meaningful variant × interaction state

Do not write component, demo, or test files in this step.

No `{component_set_url}` → ask the user.

## Output

Show the alignment table and variant × state matrix before step `api`.
