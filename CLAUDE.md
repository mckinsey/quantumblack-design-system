# QB Design Library

Vite + React Router + shadcn/ui component registry for the QB Design System.

## Stack

- Vite, React 19, React Router v7, TypeScript, Tailwind CSS v4
- TanStack Query for data fetching on component detail pages
- Components built on Radix UI, styled to QB DS Figma spec
- Registry generated via `npx shadcn build` → `public/r/`

## Key commands

```bash
npm run dev             # rebuild registry + dev server (port 4123)
npm run build           # rebuild registry + Vite production build → dist/
npm run preview         # preview production build (port 4123)
npm run registry:build  # rebuild registry only
npm run lint            # ESLint
```

## Adding a new component

1. Add the component to `src/components/ui/`
2. Add a demo in `src/app/demo/[name]/index.tsx` and `src/app/demo/[name]/ui/`
3. Register it in `registry.json` (follow the `alert` / `alert-demo` pattern)
4. Run `npm run registry:build` to regenerate registry files

## Before raising a PR

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `registry.json` updated and `npm run registry:build` run (if component added/changed)
