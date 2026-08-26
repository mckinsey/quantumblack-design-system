# Component demos

QBDS binding for step 5 (Demo). Generic demo principles live in [figma-to-component](../../.agents/skills/figma-to-component/SKILL.md#steps).

File: `src/app/demo/[name]/ui/<name>.tsx` — named exports plus `examples: DemoExample[]`.

Wire into `index.tsx` in all four places: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

## Guidelines

1. Keep the one-line `/** … */` docstring on each example.
2. For a control, size × checked/selected × disabled is the minimum.
3. Label and Field chrome stay **outside** the leaf component.

## Example

Checkbox minimum coverage:

| Example        | Axes shown                           |
| -------------- | ------------------------------------ |
| Default        | `size="default"`, unchecked, enabled |
| Checked        | default size, checked                |
| Small disabled | `size="sm"`, disabled                |

```tsx
/** Default unchecked checkbox */
export function CheckboxDefault() {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="cb">Label</Label>
      <Checkbox id="cb" />
    </div>
  );
}
```
