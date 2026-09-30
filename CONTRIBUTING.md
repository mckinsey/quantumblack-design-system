# Contributing

Contributions welcome. Read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [README.md](README.md) before opening an issue or PR on [GitHub](https://github.com/mckinsey/quantumblack-design-system).

- **README.md** — clone and run locally
- **[AGENTS.md](AGENTS.md)** — stack, commands, icons, PR checklist (also used by Cursor / Claude Code)
- **Documentation site** ([designsystem.quantumblack.com](https://designsystem.quantumblack.com)) — install components, API, tokens

## Extra commands

Beyond [AGENTS.md](AGENTS.md#key-commands):

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run lint:eslint`  | ESLint only                    |
| `npm run prettier`     | Prettier check                 |
| `npm run test:unit`    | Vitest unit tests              |
| `npm run test:watch`   | Vitest watch                   |
| `npm run test`         | Unit tests + build + lint (CI) |
| `npm run tokens:check` | Token docs vs `globals.css`    |

## Environment variables

| Variable            | Description                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `QBDS_REGISTRY_URL` | Public site URL — **no trailing slash**. Registry builds and install commands in docs. Unset locally → install commands use current browser URL. |

`.env` is gitignored — never commit it.

### Figma Code Connect

Mappings in [`code-connect/`](code-connect/) (`*.figma.ts`). [`figma.config.template.json`](figma.config.template.json) is committed; `figma.config.json` is generated + gitignored. New mappings: [code-connect](.agents/skills/code-connect/SKILL.md) skill (not legacy `*.figma.tsx`).

| Variable                  | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `FIGMA_ACCESS_TOKEN`      | Figma token — Code Connect publish and variable reads ([Tokens](#tokens)) |
| `FIGMA_URL_<PLACEHOLDER>` | Figma URL per placeholder in mappings                                     |

```bash
cp .env.example .env
# FIGMA_ACCESS_TOKEN + FIGMA_URL_* for code-connect/
npm run figma:publish
```

**GitHub Actions:** set `QBDS_REGISTRY_URL` under **Settings → Secrets and variables → Actions → Variables**.

## Project structure

```
docs/TOKENS.md
code-connect/
src/
├── app/(registry)/          # Site: docs, registry/[name], /tokens
├── app/demo/[name]/ui/      # Per-component demos (iframes)
├── components/ui/           # Primitives
├── components/registry/     # Site chrome
├── lib/                     # tokens.ts, registry helpers
└── styles/globals.css
scripts/                     # API docs + example extraction
public/r/                    # Built registry (registry:build)
registry.json
```

## Adding a component

1. `src/components/ui/` (or `src/components/` for larger blocks).
2. Demo: `src/app/demo/[name]/index.tsx` and `ui/`.
3. Register in `registry.json` (see `alert` / `alert-demo` — `files`, `registryDependencies`, `dependencies`).
4. `npm run registry:build`.
5. [AGENTS.md — Before raising a PR](AGENTS.md#before-raising-a-pr).

Figma-driven work: [figma-parity](.agents/skills/figma-parity/SKILL.md). New component from scratch: [create-qbds-component](.agents/skills/create-qbds-component/SKILL.md).

## Tokens

[docs/TOKENS.md](docs/TOKENS.md) + [token page](https://designsystem.quantumblack.com/tokens) (from `globals.css` via `src/lib/tokens.ts`).

Designer variable updates: [figma-token-sync](.agents/skills/figma-token-sync/SKILL.md), then `npm run tokens:check` and verify `/tokens` in dev.

## CI/CD

- **`pr.yml`** — tests, build, lint on `main` and PRs.
- **`deploy-pages.yml`** — GitHub Pages on `main` (or manual).
