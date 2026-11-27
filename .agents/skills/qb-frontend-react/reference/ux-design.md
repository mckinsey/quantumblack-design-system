# Step 2 — UX design

Open only after `requirements.status` is `confirmed`. Turn the one goal into the **screens** that complete it. Say what each screen shows and does, in words the user can judge. No component names, token classes or code — that is step 3.

## Research first

Don't invent UX from the brief. Re-read the confirmed requirements, then look at what already exists:

- The host or reference product (`hostApp`, anything named in `context`): shell, navigation, density, theme, existing patterns.
- The design system's layout recipes, via its skill (QBDS: [`qbds-library`](../../qbds-library/SKILL.md)).
- Chart choice and titles: [charts.md](charts.md). How the delivery mode shapes UX: [delivery-modes.md](delivery-modes.md#how-the-mode-shapes-later-stages).

Write what you find into `context`. If research raises a question the user must answer, ask; don't guess. Greenfield with no host: say so in `context`.

## Stories

Break the `goal` into a few sharp **stories**, usually one per page or distinct job. Prefer fewer over one mega-story. For each, think through who arrives, what they need, what they see, what they can do, and what happens next. Don't invent chrome that fights the existing UX.

Before confirming, check coverage: **every `scope` item appears in a story, and the stories can meet every `success` check.**

## Fields

```json
{
  "status": "draft",
  "context": "Host dashboard: header across the top, icon menu on the left, dark theme. Existing list pages put filters above the table, not in a side panel.",
  "stories": [
    {
      "id": "overview",
      "title": "Overview",
      "story": "An analyst opens Overview to see key metrics and recent activity, filters by status, then opens a row to inspect it.",
      "visual": [
        "Page title",
        "Filter bar above the content",
        "Row of 3 summary figures",
        "Two charts side by side: activity over time, status breakdown",
        "Full-width activity table with status labels"
      ],
      "interaction": "Filters narrow the table and charts. Clicking a row opens its detail. Export downloads a CSV. No rows: show an empty message in the table area. While loading: placeholders.",
      "leadsTo": "detail",
      "sketch": "+------------------------------+\n| Overview        [Status v]   |\n| [KPI] [KPI] [KPI]            |\n| [ chart ]  [ chart ]         |\n| [ activity table ........ ]  |\n+------------------------------+"
    }
  ]
}
```

| Field         | What to write                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`     | The existing look and feel to follow, shared by all stories. Specific, in plain words.                                                        |
| `id`, `title` | Stable key and short label.                                                                                                                   |
| `story`       | Who comes here, what they find, what they can do.                                                                                             |
| `visual`      | Blocks on the screen from top to bottom. Must not contradict `context`. Composition only; spacing and grids come in step 3.                   |
| `interaction` | What the user can do and what happens next. Include empty and error; add loading, narrow screens and keyboard use when the screen needs them. |
| `leadsTo`     | Which story the user goes to next, if any.                                                                                                    |
| `sketch`      | Optional text sketch of the screen, drawn from `visual`. Stored so step 3 and any re-run use what the user approved.                          |

Be specific enough that a designer could picture each screen and a builder could map regions without guessing. Put what you learned in the JSON, not only in chat.

## Confirm

Show the user per [SKILL.md § Showing a step to the user](../SKILL.md#showing-a-step-to-the-user), with:

1. One table row per screen: **screen · who and why · what's on it · what they can do · where it leads**.
2. The text `sketch` for each screen.

When they agree, set `uxdesign.status = "confirmed"` and open [ui-structure.md](ui-structure.md).
