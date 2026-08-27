# demo

## Description

Create `src/app/demo/{name}/ui/{name}.tsx` — named exports plus `examples: DemoExample[]`.

Wire into `index.tsx`: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

## Prompt

1. `examples[0]` = simplest usable form
2. Cover every row in the alignment table — variant axes, meaningful states, composition slots
3. Avoid duplciation of demos in mutliple sections.

## Output

Demo file wired in `index.tsx`.
