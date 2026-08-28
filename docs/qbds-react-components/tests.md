# tests

QBDS binding for step `tests`. Generic rules: [react-components/tests.md](../react-components/tests.md).

- Write `src/tests/{name}.test.tsx` — Vitest + Testing Library, `afterEach(cleanup)`, query by role first
- **Demo smoke** — `it.each` over `exampleComponentMaps['{name}']` with `Renderer`
- **Behaviour** — click, disabled, remove, `data-slot`; dismiss via `getByRole` + `onRemove` without root bubble
- Base UI controls needing pointer events: `PointerEvent` polyfill when missing; prefer `fireEvent` + polyfill
- Skip CSS classes, colours, variant-helper output
