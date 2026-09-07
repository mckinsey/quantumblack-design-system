# QB Design Library

Vite + React Router + shadcn/ui component registry for the QB Design System.

## Stack

- Vite, React 19, React Router v7, TypeScript, Tailwind CSS v4
- TanStack Query for data fetching on component detail pages
- Components built on **Base UI** and **Radix UI** primitives, styled to the QBDS design spec
- Registry generated via `npx shadcn build` → `public/r/`

**Which primitive to use:** Base UI (`@base-ui/react`) is the target for new components and in-flight migrations. Radix (`@radix-ui/*`) remains in the components not yet migrated. Before adding a primitive, check the imports in the file you're editing and in the closest sibling in `src/components/ui/` — do not switch a component from one to the other unless that migration is the task.

## Key commands

```bash
npm run dev             # rebuild registry + dev server (port 4123)
npm run build           # rebuild registry + Vite production build → dist/
npm run preview         # preview production build (port 4123)
npm run registry:build  # rebuild registry only
npm run lint            # ESLint + Prettier (check)
npm run prettier:fix    # apply Prettier formatting
```

## Icons

Icons use the **Material Symbols Sharp** variable font via `<Icon icon="search" />`. Ligature names are Google's snake_case (e.g. `keyboard_arrow_down`, `check_circle`). No per-icon files or codegen — any icon in the font catalog works.

Wrap icons in `<IconShell>` for QBDS size and opacity. For interactive icons (e.g. in a button), pass `hoverable`. Use `disabled` for disabled state. Passes size to `<Icon>`:

```tsx
<IconShell size="sm" variant="secondary">
  <Icon icon="search" />
</IconShell>

<IconShell hoverable>
  <Icon icon="edit" />
</IconShell>

<IconShell type="custom" className="text-status-success" variant="primary">
  <Icon icon="check" />
</IconShell>
```

Optical-size contract (same as Figma): `sm` → 20dp@wght400, `default` → 24dp@wght300, `lg` → 40dp@wght300 via `fontVariationSettings`. Set `size` on `<Icon>` directly when not using `IconShell`.

Registry: `npx shadcn add icon` ships `icon.tsx` and appends the Google Fonts `@import` to the consumer's CSS.

**Tests (`src/tests/icon-shell.test.tsx`):** functional only — demos render, `data-slot`, children, prop combos don't crash. Do not assert Tailwind classes, opacity tokens, or `cva` output.

## Before raising a PR

PR title and description: [docs/PULL_REQUESTS.md](docs/PULL_REQUESTS.md) (`<type>(<scope>):` format, types, scopes, summary rules).

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `registry.json` updated and `npm run registry:build` run (if component added/changed)
- [ ] Component matched to Figma (new or updated from spec): completed [figma-parity](.agents/skills/figma-parity/SKILL.md) checklist
