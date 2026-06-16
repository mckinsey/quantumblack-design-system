# QuantumBlack Design System

A [shadcn](https://ui.shadcn.com/)-based component registry for the QuantumBlack Design System (QBDS). Components are built on [Radix UI](https://www.radix-ui.com/) primitives, styled to the QBDS design spec, and served as a registry that other apps can consume via shadcn's CLI.

The registry site itself is a Vite + React Router app with docs, installation guides, and live component demos.

## Stack

- **Vite**, **React 19**, **React Router 7**, **TypeScript 5**
- **Tailwind CSS v4** + PostCSS
- **shadcn/ui** (new-york style) for registry tooling
- **TanStack Query** for component detail pages
- **TanStack Table**, **react-hook-form**, **zod** for complex component demos
- Icons via Material Symbols Sharp variable font (`<Icon />` + `<IconShell />`)

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
| `npm run tokens:check`   | Check token docs against `globals.css` (Vitest)    |

## Environment variables

| Variable            | Description                                                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `QBDS_REGISTRY_URL` | Public URL of this site — **no trailing slash** (e.g. `https://designsystem.quantumblack.com` or `http://localhost:4123`). Used for registry builds and install commands in the docs. If unset locally, install commands use your current browser URL. |

### Local development

Copy `.env.example` to `.env` and set `QBDS_REGISTRY_URL` to your local dev server:

```bash
cp .env.example .env
```

`.env` is gitignored — never commit it.

### Figma Code Connect

Mappings live in [`code-connect/`](code-connect/) (flat `*.figma.tsx` files). [`figma.config.template.json`](figma.config.template.json) is committed; `figma.config.json` is generated from the template + `.env` and gitignored.

| Variable | Description |
| -------- | ----------- |
| `FIGMA_ACCESS_TOKEN` | Figma personal access token — Code Connect publish and reading QBDS variables (see [Tokens](#tokens)) |
| `FIGMA_URL_<PLACEHOLDER>` | Full Figma URL for each `<QBDS_*>` placeholder used in mappings |

Local publish (from repo root):

```bash
cp .env.example .env
# Set FIGMA_ACCESS_TOKEN and FIGMA_URL_* for placeholders in code-connect/
npm run figma:publish
```

New bindings are added in a [stacked PR chain](https://github.com/McK-Internal/qbds-internal/pulls): each branch is cut from the previous phase branch for review.

### CI / GitHub Actions

Set `QBDS_REGISTRY_URL` as a **repository variable** under **Settings → Secrets and variables → Actions → Variables**. All workflows read it via `${{ vars.QBDS_REGISTRY_URL }}`.

## Project structure

```
docs/
└── TOKENS.md                   # Token catalogue (feeds the /tokens page)
code-connect/                   # Figma Code Connect mappings (*.figma.tsx)
src/
├── app/
│   ├── (registry)/             # Registry site routes
│   │   ├── docs/               # Intro, components list, installation guide, /tokens
│   │   └── registry/[name]/    # Component detail page (API docs, source, demos)
│   └── demo/[name]/            # Isolated demo pages rendered in iframes
│       └── ui/                 # Per-component demo files
├── components/
│   ├── ui/                     # QBDS component primitives (30+ components)
│   ├── ui/icon.tsx             # Material Symbols Sharp (variable font)
│   └── registry/               # Registry site UI (navbar, sidebar, API reference, etc.)
├── hooks/                      # Shared React hooks
├── lib/                        # Utils, registry helpers, tokens.ts, source extraction
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

## Tokens

[docs/TOKENS.md](docs/TOKENS.md) lists every token: CSS variable, Tailwind class, when to use it, and the matching Figma name.

The **`/tokens`** page on the registry site is built from that file plus [`src/styles/globals.css`](src/styles/globals.css) ([`src/lib/tokens.ts`](src/lib/tokens.ts) ties them together at build time). There is no separate hand-maintained colour list.

### Syncing from Figma

When designers update variables in the [QBDS v2.0.0 file](https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0), follow the [figma-token-sync](.agents/skills/figma-token-sync/SKILL.md) skill (auto-discovered in Cursor and Claude Code). That workflow covers reading `DS-Primitives`, `DS_Themes`, and `Radius`, updating [`src/styles/globals.css`](src/styles/globals.css) and [`docs/TOKENS.md`](docs/TOKENS.md), and fixing downstream references.

After editing:

```bash
npm run tokens:check
npm run dev    # open /tokens and check the swatches
```

For component work from a Figma spec, use the [figma-parity](.agents/skills/figma-parity/SKILL.md) skill instead — not the token-sync workflow.

## Icons

Icons use the **Material Symbols Sharp** variable font via `<Icon icon="search" />`. Use Google's snake_case ligature names (e.g. `keyboard_arrow_down`). Wrap in `<IconShell>` for QBDS size, colour, and opacity tokens.

```tsx
<IconShell size="sm" variant="secondary">
  <Icon icon="search" />
</IconShell>
```

Install via registry: `npx shadcn add icon` (ships `icon.tsx` and the Google Fonts `@import`).

## Registry

`registry.json` is the source of truth for all components. Running `npm run registry:build` compiles it into individual JSON files under `public/r/` via `npx shadcn build`. These files are what other shadcn-based projects consume when installing components from this registry.

The build also runs `generate-api-docs` and `extract-examples` to produce the prop tables and source snippets shown in the registry UI.

## CI/CD

- **`pr.yml`** — unit tests, build, and lint on push to `main` and pull requests. Uses `vars.QBDS_REGISTRY_URL` when set, otherwise `https://designsystem.quantumblack.com`.
- **`deploy-pages.yml`** — builds and deploys to GitHub Pages on push to `main` (or manual trigger). Includes a `404.html` for SPA routing.
