# build

## Description

QBDS binding for step `build`.

## Prompt

Implement `src/components/ui/{name}.tsx` by copying the closest sibling — same file shape, tokens, and primitive wiring.

Pick colours and surfaces from [TOKENS.md](../TOKENS.md). Geometry from the Figma variant × state matrix, not primitive defaults.

Guidelines:

1. Sizes — see **Size propagation** below; also `cva` when the sibling uses it
2. Primitive wrappers — only when sibling or in-repo Base UI recipe already uses one
3. Naming — `group/<part>`, hit-area pseudo-elements, `data-slot` as sibling does
4. Exports — root plus parts that pass the [composition.md](./composition.md) export decision tree

### Size propagation

**Default:** set `data-size` (or the relevant variant axis) on the styled root; add `group/{name}` on that root; descendants use `group-data-[size=…]/{name}:` selectors. See [`card.tsx`](../../src/components/ui/card.tsx).

**Context — last resort only** when a descendant cannot be styled via group selectors (e.g. deep third-party primitive) **and** the alignment table documents why.

Do not combine Context and `data-size` for the same axis unless both are justified in the alignment table.

## Output

`src/components/ui/{name}.tsx`
