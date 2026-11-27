---
name: qb-frontend-react
description: 'Plan and build React UIs in stages (requirements → UX stories → UI structure → build) with user confirmation at each stage. Use when the user asks for a dashboard, app shell, new pages, an in-app feature, a greenfield Vite/Next scaffold or chart wiring in React. When the work uses QuantumBlack Design System (@qbds / QBDS), also load qbds-library for all QBDS-specific steps.'
---

# qb-frontend-react

Plan first, then build. Confirm each stage with the user before moving on. Do not write UI code until the UI structure stage is confirmed — unless they say “just build” with a clear brief (see [Just build](#just-build)).

This skill is the **workflow** and is design-system-agnostic. Anything about a specific design system — tokens, component registry, usage examples, scaffold scripts, layout recipes, chart colours — comes from that design system's skill.

## Design-system skill

| Design system        | Skill                                       | Provides                                                                                                   |
| -------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| QBDS (`@qbds`)       | [qbds-library](../qbds-library/SKILL.md)    | Rules/tokens, registry + examples, Vite/Next scaffold scripts, install steps, layouts, chart styling, stage 3 |
| None / host-specific | —                                           | Use the host app's own `components/ui` and docs; stage 3 generic schema                                     |

Load the design-system skill at the start. If the brief or host mentions `@qbds` / QBDS, it is `qbds-library`.

## Workflow

Open **only** the file for the current stage. Do not load later stage docs early.

1. **Requirements** — Read [requirements.md](reference/requirements.md). Fill lean `requirements` only (`goal`, `actors`, `delivery`, product `context`, capability `scope`, `constraints`, `assumptions`). One goal — no stories or how-to-fulfill detail. Delivery keys: [delivery-modes.md](reference/delivery-modes.md). Ask until `openQuestions` is `[]`. Confirm.
2. **UX design** — After requirements confirmed, read [ux-design.md](reference/ux-design.md) + the design system's foundations. Research host/existing UX thoroughly. Fill top-level `context`, then break the **goal** into multiple `stories[]` that together complete it (each: `id`, `title`, `story`, `visual`, `interaction`). Show **Markdown** stories table; optional ASCII from `visual`. Confirm.
3. **UI structure** — After UX confirmed, read [ui-structure.md](reference/ui-structure.md) (QBDS: [qbds-library ui-structure.md](../qbds-library/reference/ui-structure.md)). Resolve every component from the design system and host before any `newComponents`. Record deltas vs UX in `uxAdjustments` and tell the user. Fill `jsx`, `regions`, `installs`, `newComponents`. Confirm.
4. **Build** — After UI structure confirmed, read [build-react-ui.md](reference/build-react-ui.md). Implement only: scaffold → wire design system → install `installs` → assemble from `jsx` / regions → build `newComponents`. No redesign.

If requirements or design change, follow [re-run.md](reference/re-run.md).

## Show to the user (every stage)

Keep the plan as **JSON internally** (file e.g. `plans/<id>.ui-plan.json`, or in memory). When you present a stage for review or confirm, **do not lead with raw JSON**.

1. **Markdown first** — short human-readable summary (headings, bullets, tables) for that stage so the user can scan and approve. The audience for this is non technical, hence explain the impact and reasoning for it. For eg `Vite vs Next js` without context is not useful. Provide a reasoning and why a reason can be chosen and why.
2. **JSON last** — the stage object (or full plan) in `json` block at the bottom.

Ask for confirmation on the Markdown summary.

## Just build

When the user says “just build” (or equivalent) with a clear brief: **skip confirmation gates only**. Run all the steps. Choose the best options and complete the task.

## Open when you need

| Need                                                     | Open                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Stage 1 — start plan + requirements                      | [requirements.md](reference/requirements.md)                              |
| New app vs page vs feature; where files land             | [delivery-modes.md](reference/delivery-modes.md)                          |
| Stage 2 — UX (`stories[]`: story / visual / interaction) | [ux-design.md](reference/ux-design.md)                                    |
| Stage 3 — UI structure                                   | [ui-structure.md](reference/ui-structure.md)                              |
| Stage 4 — Build                                          | [build-react-ui.md](reference/build-react-ui.md)                          |
| Which chart type and how to title it                     | [charts.md](reference/charts.md)                                          |
| Plan invalidated mid-flight                              | [re-run.md](reference/re-run.md)                                          |
| Anything QBDS: tokens, install, scaffold, shell, chart colours, logos | [qbds-library](../qbds-library/SKILL.md)                     |
