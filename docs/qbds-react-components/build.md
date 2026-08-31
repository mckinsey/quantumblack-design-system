# build

QBDS binding for step `build`. Run after [react-components/build.md](../react-components/build.md).

- Implement `src/components/ui/{name}.tsx` by copying the closest sibling — same file shape, tokens, and primitive wiring
- Colours and surfaces from [TOKENS.md](../TOKENS.md)
- Geometry from the Figma variant × state matrix, not primitive defaults
- Sizes — see size propagation below; use `cva` when the sibling does
- Primitive wrappers — only when sibling or in-repo Base UI recipe already uses one
- Naming — `group/<part>`, hit-area pseudo-elements, `data-slot` as sibling does
- Exports — root plus parts that pass the [composition.md](./composition.md) export decision tree

**Size propagation**

- Default: `data-size` on the styled root, `group/{name}` on that root, descendants use `group-data-[size=…]/{name}:` selectors — see [`card.tsx`](../../src/components/ui/card.tsx)
- Context — last resort only when group selectors cannot reach a descendant **and** the alignment table documents why
- Do not combine Context and `data-size` for the same axis unless both are justified in the alignment table

**Portaled overlays** (dialog, sheet, popover, and similar)

- Fixed Figma widths/heights must not exceed the viewport — wrap pixel targets with `min()`:

```ts
'w-[min(<targetPx>,calc(100%-2rem))] max-h-[min(<targetPx>,calc(100%-2rem))]';
```

- Dismiss / close controls need a visible focus ring — copy the close-button treatment from the nearest overlay sibling (e.g. `sheet.tsx`): `focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden`
