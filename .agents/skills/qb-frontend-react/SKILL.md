---
name: qb-frontend-react
description: 'Plan and build React UIs in stages (requirements → UX stories → UI structure → build) with user confirmation at each stage. Use when the user asks for a dashboard, app shell, new pages, an in-app feature, a greenfield Vite/Next scaffold or chart wiring in React. Uses QuantumBlack Design System (@qbds / QBDS) by default and loads qbds-library for all QBDS-specific steps; if the user names a different design system, use that one instead.'
---

# qb-frontend-react

Plan first, then build. Confirm each stage with the user before moving on. Do not write UI code until the UI structure stage is confirmed — unless they say “just build” with a clear brief (see [Just build](#just-build)).

This skill is the **workflow**. Anything about a specific design system — tokens, component registry, usage examples, scaffold scripts, layout recipes, chart colours — comes from that design system's skill. **The default design system is QBDS.**

## Design-system skill

**Default: QBDS** → load [qbds-library](../qbds-library/SKILL.md) at the start, even if the brief does not say “QBDS”.

Switch only when the user names another design system (or the host app clearly uses one and they want it matched):

| Situation                                    | Use                                                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| No design system named (default)             | QBDS — [qbds-library](../qbds-library/SKILL.md): rules/tokens, registry + examples, Vite/Next scaffold scripts, install, layouts, chart styling, stage 3 |
| User names another design system (e.g. MUI, Chakra, a company system) | That system's skill if one exists; otherwise its docs and the host app's own `components/ui`. Use the generic stage 3 in [ui-structure.md](reference/ui-structure.md). Do not load or apply `qbds-library`. |
| User says “no design system” / plain React   | Host conventions only; generic stage 3                                                               |

State the chosen design system in the requirements `context` so the user can correct it at stage 1. Never mix two design systems in one plan.

## Workflow

Open **only** the file for the current stage. Do not load later stage docs early.

1. **Requirements** — Read [requirements.md](reference/requirements.md). Fill lean `requirements` only (`goal`, `actors`, `delivery`, product `context`, capability `scope`, `constraints`, `assumptions`). One goal — no stories or how-to-fulfill detail. Delivery keys: [delivery-modes.md](reference/delivery-modes.md). Ask until `openQuestions` is `[]`. Confirm.
2. **UX design** — After requirements confirmed, read [ux-design.md](reference/ux-design.md) + the design system's foundations. Research host/existing UX thoroughly. Fill top-level `context`, then break the **goal** into multiple `stories[]` that together complete it (each: `id`, `title`, `story`, `visual`, `interaction`). Show **Markdown** stories table; optional ASCII from `visual`. Confirm.
3. **UI structure** — After UX confirmed, read [ui-structure.md](reference/ui-structure.md) (default QBDS: [qbds-library ui-structure.md](../qbds-library/reference/ui-structure.md)). Resolve every component from the design system and host before any `newComponents`. Record deltas vs UX in `uxAdjustments` and tell the user. Fill `jsx`, `regions`, `installs`, `newComponents`. Confirm.
4. **Build** — After UI structure confirmed, read [build-react-ui.md](reference/build-react-ui.md). Implement only: scaffold → wire design system → install `installs` → assemble from `jsx` / regions → build `newComponents`. No redesign.

If requirements or design change, follow [re-run.md](reference/re-run.md).

## Show to the user (every stage)

Keep the plan as **JSON internally** (file e.g. `plans/<id>.ui-plan.json`, or in memory). When you present a stage for review or confirm, **do not lead with raw JSON**.

1. **Markdown first** — short human-readable summary (headings, bullets, tables) for that stage so the user can scan and approve. The audience for this is non technical, hence explain the impact and reasoning for it. For eg `Vite vs Next js` without context is not useful. Provide a reasoning and why a reason can be chosen and why.
2. **JSON last** — the stage object (or full plan) in `json` block at the bottom.

Ask for confirmation on the Markdown summary.

## Just build

When the user says “just build” (or equivalent) with a clear brief: **skip confirmation gates only**. Run all the steps. Choose the best options and complete the task.
