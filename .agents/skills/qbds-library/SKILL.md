---
name: qbds-library
description: 'Everything about the QuantumBlack Design System (QBDS, @qbds shadcn registry) for React: design rules and tokens, installing @qbds components, registry and usage examples, Vite/Next scaffold scripts, app shell and layout recipes, chart styling and colours, logo guidelines. Use whenever work touches @qbds / QBDS — building, installing, wiring, styling or answering questions about it. For planned multi-stage UI builds, pair with qb-frontend-react.'
---

# qbds-library

The single source for QBDS knowledge. The [qb-frontend-react](../qb-frontend-react/SKILL.md) skill owns the plan-and-build **workflow** and delegates every QBDS-specific step here. This skill also works on its own for quick QBDS tasks (add a component, fix a token, scaffold an app, style a chart).

## Foundations

Fetch the rules from upstream (do not work from memory):

- [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md) — visual rules, a11y, chart colours
- [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) — token utilities (`bg-surface-base`, `text-fg-secondary`, …)
- [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) — installable `@qbds/*` names
- Usage examples: `https://designsystem.quantumblack.com/examples/<name>.json` (index: `/examples/index.json`)

Stack: React 19 · TypeScript · Tailwind v4 · Base UI + Radix · ECharts for charts (no QBDS chart package). Dark is the default theme.

## Scaffold

New app folder — never hand-roll:

| Ask                     | Script                                                                   |
| ----------------------- | ------------------------------------------------------------------------ |
| Vite / SPA / unnamed    | [setup-qbds-vite.sh](reference/scripts/setup-qbds-vite.sh) **(default)** |
| Next / SSR / App Router | [setup-qbds-next.sh](reference/scripts/setup-qbds-next.sh)               |

`bash <path>/setup-qbds-vite.sh <folder>` (or next). Folder name only; optional extra `@qbds/…` args. Scripts reject any existing path.

## Open when you need

| Need                                                                  | Open                                                                   |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Add `@qbds` components, partial install, `globals.css`, missing names | [registry.md](reference/registry.md)                                   |
| Plan stage 3 for a QBDS app (jsx, regions, installs, newComponents)   | [ui-structure.md](reference/ui-structure.md)                           |
| App shell, sidebar nesting, page recipes (dashboard, form, table)     | [app-layout-archetypes.md](reference/app-layout-archetypes.md)         |
| Chart styling: card chrome, colours, qualitative palette, theme       | [charts.md](reference/charts.md)                                       |
| Which chart type and how to title it (generic)                        | [qb-frontend-react charts.md](../qb-frontend-react/reference/charts.md) |

## Hard rules

- Only install names present in `registry.json`; never invent `@qbds/…`. Missing names → fallbacks in [registry.md](reference/registry.md).
- Fetch the component's usage example before composing UI; example composition beats guessed chrome.
- Tokens only — no raw hex or `slate-*` (chart hex from DESIGN.md is the exception). No CDN `qbds.css` in React apps.
- Install alone is not done: import `globals.css` after Tailwind and set `class="dark"` on `<html>`.

## Header logo

Every product header needs a logo; if none is given, ask for it. For a QBDS application use:

- Light mode: https://designsystem.quantumblack.com/assets/logos/qb-logo-white.svg
- Dark mode: https://designsystem.quantumblack.com/assets/logos/qb-logo-black.svg
