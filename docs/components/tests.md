# Component tests

Write `src/tests/<name>.test.tsx` (Vitest + Testing Library). `afterEach(cleanup)`. Query by role first.

Always two blocks — both required:

1. **Demo smoke** — `it.each` over `exampleComponentMaps['<name>']` with `Renderer` (template below).
2. **Behaviour** — click / disabled / remove / `data-slot` as needed. Dismissable: `getByRole` for remove + `onRemove` does not bubble to root `onClick`. Disabled: change callback (`onCheckedChange` / `onClick`) must **not** fire. `it.each` for variant/size smoke only.

Assert: roles, `aria-*`, `data-slot`, callbacks.  
Never: Tailwind classes, colours, `cva()` / `iconVariants()`, keyboard matrices.

Base UI controls that need pointer events (e.g. Switch): add a `PointerEvent` polyfill when `globalThis.PointerEvent` is undefined. Prefer `fireEvent` + polyfill over skipping the disabled-callback assertion.

```tsx
import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';

const componentName = '<name>';

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});
```
