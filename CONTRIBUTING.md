# Contributing

Contributions of all experience levels are welcome! Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [README.md](README.md) (for prerequisites and running locally) before opening an issue or pull request on [GitHub](https://github.com/mckinsey/quantumblack-design-system).

- **README.md** — clone and run this repository locally
- **Documentation site** ([designsystem.quantumblack.com](https://designsystem.quantumblack.com)) — install components in your app, browse the API, read tokens
- **This file** — development setup, project structure, and contributing components back to the registry

## Stack

- **Vite**, **React 19**, **React Router 7**, **TypeScript 5**
- **Tailwind CSS v4** + PostCSS
- **shadcn/ui** (new-york style) for registry tooling
- **Base UI** (`@base-ui/react`) and **Radix UI** (`@radix-ui/*`) for headless component primitives
- **TanStack Query** for component detail pages
- **TanStack Table**, **react-hook-form**, **zod** for complex component demos
- Icons via Material Symbols Sharp variable font (`<Icon />` + `<IconShell />`)

Base UI is the target for new components and in-flight migrations; Radix remains in the components not yet migrated. Check the imports in the file you're editing and in the closest sibling in `src/components/ui/` before reaching for a primitive.

## Key commands

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | Rebuild registry + start dev server (port 4123)    |
| `npm run build`          | Rebuild registry + Vite production build → `dist/` |
| `npm run preview`        | Preview production build (port 4123)               |
| `npm run registry:build` | Rebuild registry files only (`public/r/`)          |
| `npm run lint`           | Run ESLint and Prettier (check)                    |
| `npm run lint:eslint`    | Run ESLint only                                    |
| `npm run prettier`       | Check formatting with Prettier                     |
| `npm run prettier:fix`   | Apply Prettier formatting                          |
| `npm run test:unit`      | Run Vitest unit tests                              |
| `npm run test:watch`     | Run Vitest in watch mode                           |
| `npm run test`           | Run unit tests + build + lint (used in CI)         |
| `npm run tokens:check`   | Check token docs against `globals.css` (Vitest)    |

## Environment variables

| Variable            | Description                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `QBDS_REGISTRY_URL` | Public URL of this site — **no trailing slash** (e.g. `https://designsystem.quantumblack.com` or `http://localhost:4123`). Used for registry builds and install commands in the docs. If unset locally, install commands use your current browser URL. |

`.env` is gitignored — never commit it.

### Figma Code Connect

Mappings live in [`code-connect/`](code-connect/) as flat `*.figma.ts` template files. [`figma.config.template.json`](figma.config.template.json) is committed; `figma.config.json` is generated from the template + `.env` and gitignored.

A few older mappings still use the deprecated parser style (`figma.connect(...)` in `*.figma.tsx`). Do not author new ones — follow [code-connect](.agents/skills/code-connect/SKILL.md) for the template conventions.

| Variable                  | Description                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `FIGMA_ACCESS_TOKEN`      | Figma personal access token — Code Connect publish and reading design system variables (see [Tokens](#tokens)) |
| `FIGMA_URL_<PLACEHOLDER>` | Full Figma URL for each placeholder used in mappings                                                           |

Local publish (from repo root):

```bash
cp .env.example .env
# Set FIGMA_ACCESS_TOKEN and FIGMA_URL_* for placeholders in code-connect/
npm run figma:publish
```

### CI / GitHub Actions

Set `QBDS_REGISTRY_URL` as a **repository variable** under **Settings → Secrets and variables → Actions → Variables**. All workflows read it via `${{ vars.QBDS_REGISTRY_URL }}`.

## Project structure

```
docs/
└── TOKENS.md                   # Token catalogue (feeds the /tokens page)
code-connect/                   # Figma Code Connect mappings (*.figma.ts)
src/
├── app/
│   ├── (registry)/             # Registry site routes
│   │   ├── docs/               # Intro, components list, installation guide, /tokens
│   │   └── registry/[name]/    # Component detail page (API docs, source, demos)
│   └── demo/[name]/            # Isolated demo pages rendered in iframes
│       └── ui/                 # Per-component demo files
├── components/
│   ├── ui/                     # Design system component primitives
│   ├── ui/icon.tsx             # Material Symbols Sharp (variable font)
│   └── registry/               # Registry site UI (navbar, sidebar, API reference, etc.)
├── hooks/                      # Shared React hooks
├── lib/                        # Utils, registry helpers, tokens.ts, source extraction
└── styles/
    └── globals.css             # Tailwind + design system theme tokens
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

When implementing or updating a component from a Figma spec, follow [figma-parity](.agents/skills/figma-parity/SKILL.md). Cursor and Claude Code both discover it automatically — describe the task or share the Figma URL.

## Tokens

[docs/TOKENS.md](docs/TOKENS.md) lists every token: CSS variable, Tailwind class, when to use it, and the matching Figma name.

The **`/tokens`** page on the registry site is built from that file plus [`src/styles/globals.css`](src/styles/globals.css) ([`src/lib/tokens.ts`](src/lib/tokens.ts) ties them together at build time).

### Syncing from Figma

When designers update variables in the design system Figma file, follow [figma-token-sync](.agents/skills/figma-token-sync/SKILL.md). That workflow covers updating [`src/styles/globals.css`](src/styles/globals.css) and [`docs/TOKENS.md`](docs/TOKENS.md).

After editing:

```bash
npm run tokens:check
npm run dev    # open /tokens and check the swatches
```

For component work from a Figma spec, use [figma-parity](.agents/skills/figma-parity/SKILL.md) instead.

## Icons

Icons use the **Material Symbols Sharp** variable font via `<Icon icon="search" />`. Use Google's snake_case ligature names (e.g. `keyboard_arrow_down`). Wrap in `<IconShell>` for design system size, colour, and opacity tokens.

```tsx
<IconShell size="sm" variant="secondary">
  <Icon icon="search" />
</IconShell>
```

Install via registry: `npx shadcn add icon` (ships `icon.tsx` and the Google Fonts `@import`).

## Registry

`registry.json` is the source of truth for all components. Running `npm run registry:build` compiles it into individual JSON files under `public/r/` via `npx shadcn build`. These files are what other shadcn-based projects consume when installing components from this registry.

## CI/CD

- **`pr.yml`** — unit tests, build, and lint on push to `main` and pull requests.
- **`deploy-pages.yml`** — builds and deploys to GitHub Pages on push to `main` (or manual trigger).

## Before raising a PR

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `registry.json` updated and `npm run registry:build` run (if component added/changed)
- [ ] Component matched to Figma (new or updated from spec): completed [figma-parity](.agents/skills/figma-parity/SKILL.md) checklist
