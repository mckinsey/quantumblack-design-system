# QuantumBlack Design System

A [shadcn](https://ui.shadcn.com/)-based component registry for the QuantumBlack Design System (QBDS). Components are built on [Radix UI](https://www.radix-ui.com/) primitives, styled to the QBDS design spec, and served as a registry that other apps can consume via shadcn's CLI.

The registry site itself is a Vite + React Router app with docs, installation guides, and live component demos.

## Stack

- **Vite**, **React 19**, **React Router 7**, **TypeScript 5**
- **Tailwind CSS v4** + PostCSS
- **shadcn/ui** (new-york style) for registry tooling
- **TanStack Query** for component detail pages
- **TanStack Table**, **react-hook-form**, **zod** for complex component demos
- Icons from Material Symbols sharp (`@material-symbols/svg-400`)

## Running locally

```bash
npm install
npm run dev
```

The app runs at [localhost:4123](http://localhost:4123).

`npm run dev` automatically rebuilds the registry before starting the dev server. If you only need to rebuild registry files without starting the server:

```bash
npm run registry:build
```

## Key commands

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | Rebuild registry + start dev server (port 4123)    |
| `npm run build`          | Rebuild registry + Vite production build → `dist/` |
| `npm run preview`        | Preview production build (port 4123)               |
| `npm run registry:build` | Rebuild registry files only (`public/r/`)          |
| `npm run lint`           | Run ESLint                                         |
| `npm run test:unit`      | Run Vitest unit tests                              |
| `npm run test:watch`     | Run Vitest in watch mode                           |
| `npm run test`           | Run unit tests + build + lint (used in CI)         |

## Environment variables

| Variable            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `QBDS_REGISTRY_URL` | Base URL for the component registry — **no trailing slash**. Used by `registry:build` to inject dependency URLs into `public/r/*.json`, and by the app for install command URLs. In the browser, defaults to `window.location.origin` when unset. |

### Local development

Copy `.env.example` to `.env` and set `QBDS_REGISTRY_URL` to your local dev server:

```bash
cp .env.example .env
```

`.env` is gitignored — never commit it.

## Project structure

```
src/
├── app/
│   ├── (registry)/             # Registry site routes
│   │   ├── docs/               # Intro, components list, installation guide
│   │   └── registry/[name]/    # Component detail page (API docs, source, demos)
│   └── demo/[name]/            # Isolated demo pages rendered in iframes
│       └── ui/                 # Per-component demo files
├── components/
│   ├── ui/                     # QBDS component primitives (30+ components)
│   ├── icons/                  # Material Symbols–based icon components
│   └── registry/               # Registry site UI (navbar, sidebar, API reference, etc.)
├── hooks/                      # Shared React hooks
├── lib/                        # Utils, registry helpers, source extraction
└── styles/
    └── globals.css             # Tailwind + QBDS theme tokens
scripts/
├── generate-api-docs.ts        # Extracts prop types from components via react-docgen-typescript
└── extract-examples.ts         # Extracts demo source code for display in the registry
public/
└── r/                          # Built registry files (output of `registry:build`)
registry.json                   # Source of truth for all registered components
```

## Adding a component

1. Build the component in `src/components/ui/` (primitives) or `src/components/` (larger blocks).
2. Create a demo in `src/app/demo/[name]/index.tsx` and `src/app/demo/[name]/ui/`.
3. Register it in `registry.json` following the existing `alert` / `alert-demo` pattern — include `files`, `registryDependencies`, and any `dependencies`.
4. Run `npm run registry:build` to regenerate `public/r/` files.
5. Before raising a PR, run `npm run build` and `npm run lint` to confirm everything passes.

## Icons

Icons are React components wrapping Material Symbols sharp SVG paths. All icons live in `src/components/icons/` and are exported from `src/components/icons/index.ts`.

### Adding a new icon

1. Find the SVG in `node_modules/@material-symbols/svg-400/sharp/{icon-name}.svg` and copy the `d` attribute from the `<path>` element.

2. Create `src/components/icons/{IconName}.tsx`:

```tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function IconName({ className, ...props }: IconProps) {
  return (
    <svg
      className={cn('', className)}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path d="..." />
    </svg>
  );
}
```

3. Export from `src/components/icons/index.ts`:

```ts
export { IconName } from './IconName';
```

4. If the icon is used by a registered component, add it to that component's `files` array in `registry.json`.

## Registry

`registry.json` is the source of truth for all components. Running `npm run registry:build` compiles it into individual JSON files under `public/r/` via `npx shadcn build`. These files are what other shadcn-based projects consume when installing components from this registry.

The build also runs `generate-api-docs` and `extract-examples` to produce the prop tables and source snippets shown in the registry UI.

## CI/CD

- **`pr.yml`** — unit tests, build, and lint on push to `main` and pull requests.
- **`deploy-pages.yml`** — builds and deploys to GitHub Pages on push to `main` (or manual trigger). Includes a `404.html` for SPA routing.
