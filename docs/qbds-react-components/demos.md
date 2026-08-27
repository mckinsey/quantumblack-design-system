# demo

## Description

Create `src/app/demo/{name}/ui/{name}.tsx` — named exports plus `examples: DemoExample[]`.

Wire into `index.tsx`: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

Authority for demo count and axes — see [composition.md](./composition.md) for what is exported vs demo-only.

## Prompt

1. `examples[0]` = simplest usable form — one instance, one trigger or control, default props, default composition
2. **Variant and size axes → one example each.** Show every alignment-table value in the **same section** (grid, row, or `.map()` over the axis). Do not register a separate `examples[]` entry per size or variant value.
3. **Separate examples only for different interaction or layout modes** — e.g. disabled set, error state, horizontal vs vertical list. **Not** for: individual size/variant values; Figma `show*` toggles (omit optional children in `examples[0]` or the axis example instead).
4. **Overlay components** (modal dialog, sheet, popover, portaled dropdown): closed by default. Axis showcase = one example; each variant gets its **own trigger** (or one controlled-state demo). Do not force `open` on the root for static layout comparison.
5. Cover every alignment-table row without repeating the same axis across multiple sections.

### Pattern

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

Follow siblings: `button.tsx` (variants in one block), `avatar.tsx` / `combobox.tsx` (sizes in one block).

## Output

Demo file wired in `index.tsx`.
