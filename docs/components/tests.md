# Component tests

QBDS binding for step 6 (Tests). Generic test principles live in [figma-to-component](../../.agents/skills/figma-to-component/SKILL.md#steps).

Write tests in `src/tests/<name>.test.tsx`. Use Vitest + Testing Library. `afterEach(cleanup)`. Query by role first.

## Two blocks (both required)

1. **Demo smoke** — `it.each` over `exampleComponentMaps['<name>']` with `Renderer` (template below).
2. **Behaviour** — click, disabled, remove, `data-slot` as needed. Dismissable: `getByRole` for remove + `onRemove` does not bubble to root `onClick`. Disabled: change callback (`onCheckedChange` / `onClick`) must not fire. Use `it.each` for variant/size smoke only.

Base UI controls that need pointer events (e.g. Switch): add a `PointerEvent` polyfill when `globalThis.PointerEvent` is undefined. Prefer `fireEvent` + polyfill over skipping the disabled-callback assertion.

## Demo smoke template

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
