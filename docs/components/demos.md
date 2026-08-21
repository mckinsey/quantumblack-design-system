# Component demos

`src/app/demo/[name]/ui/<name>.tsx`: first example = simplest usable form; one example per Figma axis; named exports + `examples: DemoExample[]`.

Wire into `index.tsx`: import, `exampleComponentMaps`, `examplesMeta`, `demos` — all four required.

- One-line `/** … */` docstring per example — keep them.
- Cover every Figma axis. For a control, size + checked/selected + disabled is the minimum.
- Label / Field chrome stays **outside** the leaf component.
