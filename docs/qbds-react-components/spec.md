# spec

## Description

QBDS binding for step `spec`. Run after [react-components/spec.md](../react-components/spec.md).

## Prompt

Use the Figma MCP on `{component_set_url}` (generic step).

Then run [figma-parity](../../.agents/skills/figma-parity/SKILL.md) sections **0–3** on the component set:

| Section                                | Extract                                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| 0 Code Connect                         | Downstream only — not source of truth. `disableCodeConnect: true` on `get_design_context` |
| 1 Structure & variants                 | Description, alignment table, field chrome when Elements/\* nested                        |
| 2 Tokens                               | `get_variable_defs` per variant × state → [TOKENS.md](../TOKENS.md)                       |
| 3 Layout, spacing, typography & states | Per-cell geometry, CTA underline, spacing verification                                    |

Sources: [TOKENS.md](../TOKENS.md), [globals.css](../../src/styles/globals.css). Spacing scale: `gap-1`/`p-1` = 4px, `gap-2`/`p-2` = 8px, `gap-3`/`p-3` = 12px.

Do not seed the alignment table from `code-connect/<name>.figma.ts`.

## Output

Alignment table + variant × state matrix. No files written.
