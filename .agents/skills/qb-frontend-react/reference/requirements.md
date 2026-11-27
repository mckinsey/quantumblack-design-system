# Step 1 — Requirements

Agree **what** we are building and **where** it lands. Not how each screen works — that is step 2.

Start the plan from [plan.json](plan.json) (save as `plans/<id>.ui-plan.json`, or keep in memory) and fill only `requirements`. Leave the later stages `pending`.

## Find out first

Read the host app or product if one is named; don't guess. Then settle these, asking only what you can't see for yourself:

| Question                      | Goes in                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| What is the one outcome, for whom? | `goal`, `actors`                                            |
| Where does it live? New app, new pages in an existing app, or a slice of a page? | `delivery` ([delivery-modes.md](delivery-modes.md)) |
| Which design system? Default QBDS | `designSystem`                                               |
| Must it match an existing look? | `context`                                                      |
| What is in, and what is out?  | `scope`, `constraints`                                           |
| Real data or dummy data?      | `scope` / `assumptions`                                          |
| How will we know it's done?   | `success`                                                        |

## Ask or assume

- **Ask** only what would change the build. Batch the questions into one message.
- **Assume** everything else, and list it under `assumptions` so the user can correct it.
- Every question is a full sentence a non-technical reader can answer, with what changes if they pick A or B. No tags like `"stack"` or `"q1"`.
- Loop until every answer is moved into the fields and `openQuestions` is `[]`.

## Fields

```json
{
  "status": "draft",
  "goal": "Analysts can see key metrics at a glance and drill into recent activity.",
  "actors": ["analyst", "ops lead"],
  "designSystem": "QBDS",
  "delivery": {
    "mode": "pages",
    "hostApp": "apps/dashboard",
    "route": "/overview",
    "mount": "inside existing Sidebar shell",
    "targets": ["prototypes/metrics-overview"],
    "notes": "Prototype folder; do not edit the live app yet"
  },
  "context": "Host uses a left Sidebar rail and dark theme — match this chrome.",
  "scope": ["KPI cards", "activity table", "drill-down"],
  "constraints": ["fit existing app shell", "dark-first"],
  "success": ["Overview shows 3 KPIs and a filterable activity table", "Works in dark and light"],
  "assumptions": ["Dummy data for the first pass"],
  "openQuestions": []
}
```

| Field           | Rule                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| `goal`          | One sentence: who gets what outcome. One goal only — no stories or screen detail.          |
| `actors`        | Who it is for (optional).                                                                  |
| `designSystem`  | `"QBDS"` by default, or the one the user named. Shown to the user so they can change it.   |
| `delivery`      | `mode` + `hostApp` / `route` / `mount` / `targets`. See [delivery-modes.md](delivery-modes.md). |
| `context`       | What the host or reference product looks like, and “match this” notes. No component lists. |
| `scope`         | Short capability or screen names the user picked, e.g. `"Tokens screen"`. Out of scope is what they didn't pick; note big exclusions in `constraints`. |
| `constraints`   | Hard limits.                                                                               |
| `success`       | 1–3 checks the user can use at the final review.                                           |
| `assumptions`   | Stated bets, including dummy data.                                                         |
| `openQuestions` | Unanswered questions. Must be `[]` to confirm.                                             |

**Scope:** propose a list of options, let the user choose, write only the chosen items. If the brief names screens (“tokens / models / users”), they are `scope` items; how each one completes the goal is step 2.

## Confirm

Show the user per [SKILL.md § Showing a step to the user](../SKILL.md#showing-a-step-to-the-user). They agree to `goal`, `designSystem`, `delivery`, `context`, `scope`, `constraints` and `success`, and `openQuestions` is `[]`. Delivery needs its required values ([delivery-modes.md](delivery-modes.md#pick-one-mode)). Then set `status` to `confirmed` and open [ux-design.md](ux-design.md).
