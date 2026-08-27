# build

## Description

QBDS binding for step `build`.

## Prompt

Implement `src/components/ui/{name}.tsx` by copying the closest sibling — same file shape, tokens, and primitive wiring.

Pick colours and surfaces from [TOKENS.md](../TOKENS.md). Geometry from the Figma variant × state matrix, not primitive defaults.

Guidelines:

1. Sizes — follow sibling: `cva` or `data-size` + Tailwind
2. Primitive wrappers — only when sibling or in-repo Base UI recipe already uses one
3. Naming — `group/<part>`, hit-area pseudo-elements, `data-slot` as sibling does
4. Exports — root plus documented parts only

## Output

`src/components/ui/{name}.tsx`
