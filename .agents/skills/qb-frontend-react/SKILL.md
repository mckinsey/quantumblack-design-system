---
name: qb-frontend-react
description: 'Plan and build React UIs with QuantumBlack Design System (@qbds / shadcn registry). Use when the user asks for a QBDS dashboard, app shell, new pages, in-app feature, greenfield Vite/Next scaffold, chart wiring, or mentions @qbds / QBDS or wants to convert an existing app with QBDS'
---

# qb-frontend-react

Plan first, then build with `@qbds`. Confirm each stage with the user before moving on. Do not write UI code until the UI structure stage is confirmed — unless they say “just build” with a clear brief (see [Just build](#just-build)).

Fetch QBDS rules from upstream.

- [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md)
- [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md)
- [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json)

## Workflow

Open **only** the file for the current stage. Do not load later stage docs early.

1. **Requirements** — Read [requirements.md](reference/requirements.md). Fill lean `requirements` only (`goal`, `actors`, `delivery`, product `context`, capability `scope`, `constraints`, `assumptions`). One goal — no stories or how-to-fulfill detail. Delivery keys: [delivery-modes.md](reference/delivery-modes.md). Ask until `openQuestions` is `[]`. Confirm.
2. **UX design** — After requirements confirmed, read [ux-design.md](reference/ux-design.md) + DESIGN/TOKENS. Research host/existing UX thoroughly. Fill top-level `context`, then break the **goal** into multiple `stories[]` that together complete it (each: `id`, `title`, `story`, `visual`, `interaction`). Show **Markdown** stories table; optional ASCII from `visual`. Confirm.
3. **UI structure** — After UX confirmed, read [ui-structure.md](reference/ui-structure.md) + TOKENS.md. Thorough registry + host check **and fetch `/examples/<name>.json` for every `@qbds` component** before any `newComponents`. **Example composition wins** over conflicting UX chrome — record deltas in `uxAdjustments` and tell the user. Fill production-ready `jsx`, `regions` (`example` + layout + tokens), `installs`, `newComponents` (tokens, props, states, a11y, how). Confirm.
4. **Build** — After UI structure confirmed, read [build-react-ui.md](reference/build-react-ui.md). Implement only: scaffold → wire QBDS → install `installs` → assemble from `jsx` / regions → build `newComponents`. No redesign.

If requirements or design change, follow [re-run.md](reference/re-run.md).

## Show to the user (every stage)

Keep the plan as **JSON internally** (file e.g. `plans/<id>.ui-plan.json`, or in memory). When you present a stage for review or confirm, **do not lead with raw JSON**.

1. **Markdown first** — short human-readable summary (headings, bullets, tables) for that stage so the user can scan and approve. The audience for this is non technical, hence explain the impact and reasoning for it. For eg `Vite vs Next js` without context is not useful. Provide a reasoning and why a reason can be chosen and why.
2. **JSON last** — the stage object (or full plan) in `json` block at the bottom.

Ask for confirmation on the Markdown summary.

## Just build

When the user says “just build” (or equivalent) with a clear brief: **skip confirmation gates only**. Run all the steps. Choose the best options and complete the task.

## Open when you need

| Need                                                             | Open                                                                                                                       |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Stage 1 — start plan + requirements                              | [requirements.md](reference/requirements.md)                                                                               |
| New app vs page vs feature; where files land                     | [delivery-modes.md](reference/delivery-modes.md)                                                                           |
| Stage 2 — UX (`stories[]`: story / visual / interaction)         | [ux-design.md](reference/ux-design.md)                                                                                     |
| Stage 3 — UI structure (`jsx`, regions, installs, newComponents) | [ui-structure.md](reference/ui-structure.md)                                                                               |
| Stage 4 — Build                                                  | [build-react-ui.md](reference/build-react-ui.md)                                                                           |
| App shell, sidebar layout, page structure                        | [app-layout-archetypes.md](reference/shared/app-layout-archetypes.md)                                                      |
| Which chart type and how to title it                             | [chart-best-practices.md](reference/shared/chart-best-practices.md)                                                        |
| Chart colours (hex, plot ink, no `registerTheme`)                | [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) |
| Adding `@qbds` components, partial install, missing names        | [react-qbds-registry.md](reference/shared/react-qbds-registry.md)                                                          |
| Plan invalidated mid-flight                                      | [re-run.md](reference/re-run.md)                                                                                           |
| New Vite app folder                                              | [setup-qbds-vite.sh](reference/scripts/setup-qbds-vite.sh) — do not hand-roll                                              |
| New Next / SSR app folder                                        | [setup-qbds-next.sh](reference/scripts/setup-qbds-next.sh) — do not hand-roll                                              |
