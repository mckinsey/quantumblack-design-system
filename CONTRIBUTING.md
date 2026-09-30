# Contributing

Contributions of all experience levels are welcome! Read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [README.md](README.md) to clone the repo and run it locally. Stack, everyday commands, icons, and the PR checklist live in [AGENTS.md](AGENTS.md). Browse components and tokens on the [documentation site](https://designsystem.quantumblack.com).

This guide covers repo layout, registry workflow, environment setup, and Figma-related tasks that are not spelled out in those files.

## Commands beyond AGENTS.md

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run lint:eslint`  | ESLint only                                 |
| `npm run prettier`     | Prettier check                              |
| `npm run test:unit`    | Vitest unit tests                           |
| `npm run test:watch`   | Vitest watch                                |
| `npm run test`         | Unit tests + build + lint (same as CI test) |
| `npm run tokens:check` | Token docs vs `globals.css`                 |

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
│   └── registry/               # Registry site UI (navbar, sidebar, API reference, etc.)
├── lib/                        # Utils, registry helpers, tokens.ts, source extraction
└── styles/globals.css          # Tailwind + design system theme tokens
scripts/                        # API docs + demo example extraction
public/r/                       # Built registry (output of registry:build)
registry.json                   # Source of truth for all registered components
```

## Adding a component

1. Build the component in `src/components/ui/` (primitives) or `src/components/` (larger blocks).
2. Create a demo in `src/app/demo/[name]/index.tsx` and `src/app/demo/[name]/ui/`.
3. Register it in `registry.json` following the existing `alert` / `alert-demo` pattern — include `files`, `registryDependencies`, and any `dependencies`.
4. Run `npm run registry:build` to regenerate `public/r/` files.
5. Complete [AGENTS.md — Before raising a PR](AGENTS.md#before-raising-a-pr).

`registry.json` compiles to `public/r/` via `npx shadcn build`; that output is what consumers install from this registry.

From a Figma spec: **new** component → [create-qbds-component](.agents/skills/create-qbds-component/SKILL.md); **update** an existing one → [figma-parity](.agents/skills/figma-parity/SKILL.md).

## Tokens

[docs/TOKENS.md](docs/TOKENS.md) lists every token: CSS variable, Tailwind class, when to use it, and the matching Figma name. The live **[tokens page](https://designsystem.quantumblack.com/tokens)** is built from that file and [`src/styles/globals.css`](src/styles/globals.css) via [`src/lib/tokens.ts`](src/lib/tokens.ts).

When designers update variables in Figma, follow [figma-token-sync](.agents/skills/figma-token-sync/SKILL.md), then:

```bash
npm run tokens:check
npm run dev    # open /tokens and check the swatches
```

## CI/CD

- **`pr.yml`** — unit tests, build, and lint on push to `main` and pull requests.
- **`deploy-pages.yml`** — builds and deploys to GitHub Pages on push to `main` (or manual trigger).
