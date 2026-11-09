# Stage 2 — UX design

Open this **only after** `requirements.status` is `confirmed`. Do not open UI structure or build docs yet. No UI code yet.

Subagent OK: pass confirmed requirements JSON + brief + host paths; still confirm with the user.

## Open when you need

| Need                                  | Source                                                                                                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual rules, tokens, a11y, chart hex | [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md) · [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) · installed `globals.css` |
| App shell / layout recipes            | [shared/app-layout-archetypes.md](shared/app-layout-archetypes.md)                                                                                                                                                    |
| Chart type and titles                 | [shared/chart-best-practices.md](shared/chart-best-practices.md)                                                                                                                                                      |
| How delivery shapes UX                | [delivery-modes.md](delivery-modes.md#how-this-affects-later-stages)                                                                                                                                                  |

If requirements `context` names a product, use that scan — don’t invent chrome.

---

## Research first

Do **extensive research** before drafting JSON. Do not invent UX from the brief alone.

- Re-read confirmed `requirements` (`goal`, `scope`, `context`, `delivery`, `constraints`).
- Open and study the host / reference product paths (`hostApp`, named products in requirements `context`). Note shell, nav, density, theme, existing patterns, `@qbds` usage.
- Read DESIGN/TOKENS and [app-layout-archetypes.md](shared/app-layout-archetypes.md) as pattern recipes that match what you will write in each story’s `visual`.
- Read component guidelines [component-guidelines.md](shared/component-guidelines.md)
- Put **everything you learn into the JSON** — especially top-level `context`. Vague or missing adherence notes are not acceptable. If research surfaces open questions → ask the user; don’t guess.

## Think thoroughly

**Goal → stories.** UX completes the confirmed requirements `goal`: top-level `context`, then multiple **stories**. Together the stories cover the goal; each story is one job or screen.

Break the goal (+ `scope`) into stories (usually one per page or distinct job). For each story, walk who arrives, what they need, what the screen looks like, what they can do, and what happens next. Don’t invent chrome that fights existing UX. Don’t jump to component names — that’s [ui-structure.md](ui-structure.md). Vague UX is not confirmable.

## Schema

```json
{
  "status": "draft",
  "context": "Host dashboard: top Navbar h-14, left icon rail Sidebar, dark default, surface-base main with p-6. Existing list pages use toolbar filters above table, not sidebar filters. Theme toggle in header.",
  "stories": [
    {
      "id": "overview",
      "title": "Overview",
      "story": "An analyst opens Overview to see key metrics and recent activity. They scan KPIs, filter by status, then open a row to inspect detail.",
      "visual": "Dense analytics page matching host shell: page title, toolbar filters above content, KPI row (3 summary cards), 2-up charts (activity over time line; status breakdown bar), full-width activity table with status badges. Shell from context.",
      "interaction": "Filters narrow table and charts. Row click opens a right detail panel. Export downloads CSV. No rows → Empty state in the table region."
    },
    {
      "id": "detail",
      "title": "Activity detail",
      "story": "From a row, they open detail to confirm owners and related events.",
      "visual": "Right panel or dedicated page: title, metadata block, related events list.",
      "interaction": "Close returns to Overview with filters preserved."
    }
  ]
}
```

| Field     | Meaning                                                                                                | Values                              |
| --------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `status`  | Confirm state                                                                                          | `draft` \| `confirmed`              |
| `context` | Existing UX we must adhere to (host/reference shell, patterns, theme, density) — shared across stories | string — from research; be specific |
| `stories` | Goal broken into discrete jobs / pages / flows                                                         | object[] — at least one             |

### Each `stories[]` entry

| Field         | Meaning                                                                                     | Values                                                        |
| ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `id`          | Stable key for later stages                                                                 | string — e.g. `overview`, `tokens`                            |
| `title`       | Short label for the Pages table / nav                                                       | string                                                        |
| `story`       | Who comes here, what they find, what they can do                                            | string — be specific                                          |
| `visual`      | Look, density, and what’s on the screen (composition / reading order) relative to `context` | string — be specific; must not contradict top-level `context` |
| `interaction` | What the user can do, how, and what happens next (include empty/error when it matters)      | string — be specific                                          |

No separate `layout` on stories — put composition in `visual`. Region spacing / grids belong in [ui-structure.md](ui-structure.md) `regions`.

Do **not** keep a single top-level `story` / `visual` / `interaction`. Those live on each story. Shared chrome and adherence stay in `context` only.

## How to fill

1. Fill top-level `context` from research.
2. Split `requirements.goal` (+ `scope`) into `stories[]` — each story helps complete the goal; one entry per distinct job or screen. Prefer fewer sharp stories over one mega-story.
3. For each story, fill in order: `id` → `title` → `story` → `visual` → `interaction`.

Be specific enough that a designer could picture each story and a builder could map regions without guessing. Put research findings in the JSON, not only in chat. Greenfield with no host → say so in `context` (QBDS defaults only).

### Show to the user (before confirm)

In the UX confirm Markdown: a **stories table**. Show ASCII sketchs derived from each story’s `visual` so the user can see spatial structure — sketch is confirm chrome only, not a stored field.

## Confirm

Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage) (stories table; ASCII sketches from `visual`). Confirm → `uxdesign.status = "confirmed"`. Then open [ui-structure.md](ui-structure.md).
