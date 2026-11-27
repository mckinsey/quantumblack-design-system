---
name: qb-frontend-react
description: 'Build any React UI feature in four confirmed steps: requirements, UX, UI structure, build. Use for dashboards, app shells, new pages, in-app features, greenfield apps or chart wiring. Uses QuantumBlack Design System (QBDS / @qbds) by default; if the user names another design system, use that instead.'
---

# qb-frontend-react

Whenever the user wants to build any UI, they go through **four steps**. Each step ends with the user confirming before the next begins. No UI code is written until step 3 is confirmed.

| # | Step             | What happens                                             | The user confirms                              | Open                                             |
| - | ---------------- | -------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| 1 | **Requirements** | Agree the goal, where it lands, and what is in scope     | What we are building and where                 | [requirements.md](reference/requirements.md)     |
| 2 | **UX design**    | Turn the goal into screens (stories) that complete it    | What each screen shows and does                | [ux-design.md](reference/ux-design.md)           |
| 3 | **UI structure** | Choose components, layout and tokens for each screen     | The page structure and any change from step 2  | [ui-structure.md](reference/ui-structure.md)     |
| 4 | **Build**        | Implement the confirmed plan, no redesign                | Review the finished result                     | [build-react-ui.md](reference/build-react-ui.md) |

Open only the doc for the current step; do not read later ones early. If requirements or design change mid-way, follow [re-run.md](reference/re-run.md).

## Just build

If the user says “just build” (or equivalent) with a clear brief, skip the confirmations only. Still run all four steps and choose the best options.

## Design system

Default is QBDS: load [qbds-library](../qbds-library/SKILL.md), even if the brief doesn't say “QBDS”. If the user names another design system, use its skill or docs and the host app's own components, use the generic [ui-structure.md](reference/ui-structure.md), and don't load `qbds-library`. Never mix two design systems in one plan. Step 1 records it as `designSystem` so the user can correct it.

## Showing a step to the user

Keep the plan as JSON internally (e.g. `plans/<id>.ui-plan.json`, or in memory). At each step:

1. **Markdown first** — a short summary the user can scan and approve (headings, bullets, tables). The audience is non-technical, so explain the impact and the reasoning. “Vite vs Next.js” alone is not useful; say why one fits.
2. **JSON last** — the stage object in a `json` block at the bottom.

Ask for confirmation on the Markdown summary.
