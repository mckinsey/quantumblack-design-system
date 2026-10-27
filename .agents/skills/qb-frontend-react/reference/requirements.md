# Stage 1 — Requirements

Start here. Do not open UX, UI structure, or build docs yet.

One living plan as **JSON** (file e.g. `plans/<id>.ui-plan.json`, or in memory). Fill and confirm **this section only**. When showing the user, follow [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage): Markdown first, JSON at the bottom.

**No UI code** until `ui_structure` is confirmed later (unless the user says “just build” with a clear brief — see [SKILL.md § Just build](../SKILL.md#just-build)).

## Start the plan

```json
{
  "version": 1,
  "id": "metrics-overview",
  "title": "Metrics overview",
  "requirements": { "status": "draft" },
  "uxdesign": { "status": "pending" },
  "ui_structure": { "status": "pending" },
  "build": { "status": "pending", "deviations": [] }
}
```

Fill `requirements` below. Leave later keys `pending` until those stages.

## Before you fill

- Understand the brief thoroughly. Read the host/product if named — don’t guess.
- Document findings in `goal`, `context`, `delivery`, `scope`, `constraints`, `assumptions`.
- Unclear → put full human-readable questions in `openQuestions` (JSON) and ask the user the same text. No slug keys (`"stack"`, `"actors"`).
- Subagent OK: pass brief + any paths found; return a draft `requirements` object; you still confirm with the user.

## What belongs here vs later

**Model:** one `goal` in requirements → multiple **stories** in UX that complete that goal.

Requirements answer **what** and **where** — not how each screen fulfills the goal.

| Put in `requirements`                          | Defer to UX (`uxdesign`)                      |
| ---------------------------------------------- | --------------------------------------------- |
| One `goal`                                     | `context` (shell / density adherence)         |
| `actors`, `delivery`, capability-level `scope` | `stories[]` — together they complete the goal |
| Hard `constraints` / `assumptions`             | Per story: `story`, `visual`, `interaction`   |
| Product name in `context`                      | How each story’s screen looks and behaves     |

**Do not** draft stories or extra schema keys here. If the brief names screens (“tokens / models / users”), put those as short `scope` items only — how each screen completes the goal is UX.

## Schema

```json
{
  "status": "draft",
  "goal": "Show key metrics and let users drill into recent activity.",
  "actors": ["analyst", "ops lead"],
  "delivery": {
    "mode": "pages",
    "hostApp": "apps/dashboard",
    "route": "/overview",
    "mount": "inside existing Sidebar shell",
    "targets": ["prototypes/metrics-overview"],
    "notes": "Prototype folder; do not edit the live Next app yet"
  },
  "context": {
    "product": "Metrics dashboard",
    "notes": "Host uses @qbds, Sidebar rail, dark theme — match this chrome"
  },
  "scope": ["KPI cards", "activity table", "drill-down"],
  "constraints": ["fit existing app shell", "dark-first"],
  "openQuestions": [
    "Should this live inside the existing app (reuses current navigation and look), or as a separate prototype folder for review first? A separate folder means we do not touch the live app until you say so.",
    "Who is the main audience — analysts watching live metrics, or leads reviewing weekly summaries? That chooses which details we surface first."
  ],
  "assumptions": ["Dummy data for the first pass"]
}
```

When everything is answered, set `"openQuestions": []` before confirm.

| Field           | Meaning                                                                                                                                               | Values                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `status`        | Confirm state                                                                                                                                         | `draft` \| `confirmed`                     |
| `goal`          | One job — enough that the user is happy                                                                                                               | string                                     |
| `actors`        | Who it’s for (optional)                                                                                                                               | string[]                                   |
| `delivery`      | Placement contract                                                                                                                                    | see [delivery-modes.md](delivery-modes.md) |
| `context`       | Product / host UI findings — not component lists. Put “match this design” here.                                                                       | object (`product`, `notes`, …)             |
| `scope`         | Agreed items for this run                                                                                                                             | string[]                                   |
| `constraints`   | Hard limits                                                                                                                                           | string[]                                   |
| `openQuestions` | Must be `[]` before confirm. Each item is a full sentence (or short paragraph) a non-technical reader can answer — include impact/tradeoff, not a tag. Store that same text in the plan JSON; Markdown summary mirrors it. Ban: slug/id keys like `"stack"`. | string[]                                   |
| `assumptions`   | Stated bets                                                                                                                                           | string[]                                   |

### `openQuestions` shape

- **Do:** one readable question per string; explain what changes if they pick A vs B.
- **Don’t:** `"stack"`, `"home-overview"`, `"q1"`, or other machine keys.
- Present the list to the user; loop until every item is answered (move answers into `scope` / `constraints` / `assumptions` / other fields) and the array is `[]`.

Set `delivery` per [delivery-modes.md](delivery-modes.md).

## Scope

1. Propose a clear list of **options** (what could be in this work) — capability / screen / feature names, not story drafts.
2. User chooses what goes in.
3. Write only the chosen items into `scope`.

Keep each scope item short (e.g. `"Tokens screen"`, `"dummy data"`). Out-of-scope is whatever the user did not pick (note big exclusions in `constraints` or `assumptions` if needed).

## Confirm

Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage). User agrees (`goal`, `delivery`, `context`, `scope`, `constraints`) **and** `openQuestions` is `[]` (answered or moved into `assumptions` / `scope` / `constraints`).

Delivery field gates (`hostApp` / `route` / `mount` / `targets`): see [delivery-modes.md](delivery-modes.md#confirm-gates-requirements).

When confirmed → open [ux-design.md](ux-design.md). Do not open UX docs while questions are open.
