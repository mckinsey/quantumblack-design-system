# demo

## Description

QBDS binding for step `demo`. Run before step `tests`.

## Prompt

Create `src/app/demo/{name}/ui/{name}.tsx` — named exports plus `examples: DemoExample[]`.

Wire into `index.tsx` in all four places: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

Guidelines:

1. One-line `/** … */` docstring on each example
2. Controls: size × checked/selected × disabled minimum
3. Label and Field chrome **outside** the leaf component

First example = simplest usable form. Cover every alignment-table row.

## Output

Demo file wired in `index.tsx`.
