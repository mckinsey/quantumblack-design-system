# demo

## Description

Create `src/app/demo/{name}/ui/{name}.tsx` — named exports plus `examples: DemoExample[]`.

Wire into `index.tsx`: import, `exampleComponentMaps`, `examplesMeta`, `demos`.

## Prompt

1. `examples[0]` = simplest usable form — one instance, one trigger, default props
2. **Size and variant axes → one example each.** Show every value from the alignment table in the **same section** (grid, row, or `.map()` over the axis). Do not register a separate `examples[]` entry per size or variant.
3. **Separate examples only for different composition or state** — e.g. minimal header, footer link off, disabled, error. Not for sm/md/reg/lg alone.
4. Cover every alignment-table row without repeating the same axis across multiple sections.

### Pattern

```tsx
export function DialogSizes() {
  const sizes = ['sm', 'md', 'default', 'lg'] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map(size => (
        <DialogExample key={size} size={size} title={`${size} dialog`} />
      ))}
    </div>
  );
}
```

Follow siblings: `button.tsx` (variants in one block), `avatar.tsx` / `combobox.tsx` (sizes in one block).

## Output

Demo file wired in `index.tsx`.
