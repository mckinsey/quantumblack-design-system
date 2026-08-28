# demo

- Create `src/app/demo/{name}/ui/{name}.tsx` — named exports plus `examples: DemoExample[]`
- Wire into `index.tsx`: import, `exampleComponentMaps`, `examplesMeta`, `demos`
- Demo count and axes — see [composition.md](./composition.md) for exported vs demo-only
- `examples[0]` = simplest usable form — one instance, default props, default composition
- Variant and size axes → **one example each** — all values in the same section (grid, row, or `.map()`). No separate `examples[]` entry per size or variant
- Separate examples only for different interaction or layout modes (disabled, error, horizontal vs vertical). Not for individual size/variant values or Figma `show*` toggles
- Overlay components (dialog, sheet, popover, portaled dropdown): closed by default; each size/variant gets its own trigger
- Cover every alignment-table row without repeating the same axis across sections
- Follow siblings: `button.tsx` (variants), `avatar.tsx` / `combobox.tsx` (sizes)

```tsx
export function {Component}Sizes() {
  const sizes = ['sm', 'md', 'default', 'lg'] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map(size => (
        <{Component}Example key={size} size={size} />
      ))}
    </div>
  );
}
```
