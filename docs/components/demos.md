# Component demos

Prove every Figma variant in the demo registry so reviewers and the visual pass have something to compare against.

File: `src/app/demo/[name]/ui/<name>.tsx` — named exports plus `examples: DemoExample[]`. First example = simplest usable form; add one example per Figma axis.

Wire into `index.tsx` in all four places: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

## Guidelines

1. Keep the one-line `/** … */` docstring on each example.
2. Cover every Figma axis from the alignment table. For a control, size × checked/selected × disabled is the minimum.
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
