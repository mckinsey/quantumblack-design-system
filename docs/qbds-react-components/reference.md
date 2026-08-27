# reference

## Description

QBDS binding for step `reference`. Run after [react-components/reference.md](../react-components/reference.md).

## Prompt

For `{name}`, look up:

1. **shadcn** — `npx shadcn@latest search {name}`, then `docs` / `view` on the match
2. **Base UI** — `https://base-ui.com/react/components/{name}`
3. **Sibling** — closest match in `src/components/ui/`

Return the three reference notes (library / primitive / sibling).

Diverging from shadcn naming needs a one-line Figma reason in the notes.

## Output

Three reference notes. Feed into step `api`.
