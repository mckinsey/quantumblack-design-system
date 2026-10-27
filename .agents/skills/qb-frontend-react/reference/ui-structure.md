# Stage 3 — UI structure

Open this **only after** `uxdesign.status` is `confirmed`. Do not open build docs yet. No UI code yet.

Subagent OK: pass confirmed plan JSON + brief + host paths; still confirm with the user.

Map confirmed UX `context` and each entry in `stories[]` (`story` / `visual` / `interaction`) to a **production-ready** structure — enough that build can implement without inventing tokens, region layout, or behavior. Keep domain content, goals, and flows from UX. For `@qbds` chrome and nesting, **prioritize remote example composition** over a custom UX sketch. If example-driven `uxAdjustments` change pages/regions, update the story `visual` to match and tell the user.

## Open when you need

| Need | Source |
| --- | --- |
| Registry names / installable components | [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) |
| **Usage examples (required)** | [Examples index](https://designsystem.quantumblack.com/examples/index.json) · `https://designsystem.quantumblack.com/examples/<name>.json` |
| Component APIs | `src/components/ui/<name>.tsx` on GitHub · `/r/<name>.json` |
| Demo source (fallback if examples JSON missing) | `src/app/demo/[name]/ui/<name>.tsx` on GitHub |
| Missing names / fallbacks | [shared/react-qbds-registry.md](shared/react-qbds-registry.md) |
| **Tokens** (bg, fg, stroke, status, type, space) | [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) · installed `globals.css` |
| Visual / a11y rules | [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md) |
| App shell / layout recipes | [shared/app-layout-archetypes.md](shared/app-layout-archetypes.md) — after examples, not instead of them |
| Chart type / colours | [shared/chart-best-practices.md](shared/chart-best-practices.md) · [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) |
| How delivery shapes structure | [delivery-modes.md](delivery-modes.md#how-this-affects-later-stages) |

---

## Research first — registry + examples before anything new

Do **extensive research** before drafting JSON. Put findings in the JSON, not only in chat.

**Hard rule:** Do **not** add `newComponents` until you have finished the registry + examples check below for that piece of UI. Prefer existing `@qbds` and composition. Inventing a local component first is wrong.

**Hard rule:** Do **not** invent composition from API props or archetype notes alone. For every `@qbds/<name>` you plan to install, fetch its usage examples and match that pattern in `jsx` / `regions` / `how`.

**Hard rule — examples over UX chrome:** When a chosen `/examples/<name>.json` (or demo fallback) composition conflicts with confirmed UX story `visual` / chrome (nesting, which parts wrap what, placement of header/rail/inset, control grouping), **follow the example**. Adopt the example’s structure in `jsx` / `regions`. Put a short delta in `uxAdjustments` and **tell the user** when you show the draft (what changed and why — cite the example name). Do not bend the example to preserve a custom sketch, and do not stay silent about the UX shift.

### Checklist (every UI piece)

For each control / block implied by any story’s `visual` / `interaction`:

1. Search [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) for a matching `@qbds/<name>`.
2. If found → read the API (`src/components/ui/<name>.tsx` or `/r/<name>.json`). Use that exact name in `jsx`, `regions`, and `installs`.
3. **Fetch examples (required)** — open `https://designsystem.quantumblack.com/examples/<name>.json` (confirm the key exists in [examples/index.json](https://designsystem.quantumblack.com/examples/index.json)). Pick the example that best fits the **use case** (e.g. sidebar → `SidebarApp` for app shell), not the one that best preserves a custom UX sketch. Record it on the region as `example` (URL + example `name`). Strip site-only imports (`@/components/registry/*`, `@/lib/demo-utils`) when mapping into the product app — **keep the QBDS composition pattern from the example**. If that shifts UX chrome → add to `uxAdjustments` and tell the user.
4. If `/examples/<name>.json` is missing → fall back to GitHub `src/app/demo/[name]/ui/<name>.tsx`, note that in `example`, and still extract the usage pattern. If neither exists → say so in `notes` and ask the user before guessing.
5. Also check the **host / project** `components/ui` and existing composed patterns (reuse before recreate).
6. Read [react-qbds-registry.md](shared/react-qbds-registry.md) for known **non-registry** names (`theme-toggle`, `menubar`, `data-grid`, …) and their documented fallbacks.
7. Look up **tokens** in TOKENS.md / `globals.css` for surfaces, text, borders, status, focus, spacing, type — use real utility names (`bg-surface-base`, `text-fg-secondary`, …). **No raw hex** / `slate-*` unless DESIGN.md chart hex applies.
8. **Only if** no registry component and no adequate composition covers it → add a full `newComponents` entry (see below). Never invent a fake `@qbds/…` name.
9. If unsure → **ask the user**; don’t guess.

`installs` may only contain names verified in `registry.json`. `newComponents` must be `[]` when everything is covered by registry + composition. Every `@qbds/…` in `installs` should have a corresponding `example` on at least one region (or an explicit `notes` why examples were unavailable).

---

## Schema

```json
{
  "status": "draft",
  "uxAdjustments": [
    "Shell: UX put page header inside the rail; SidebarApp keeps header outside SidebarProvider — followed example"
  ],
  "jsx": "<AppShell>\n  <Navbar />\n  <Sidebar />\n  <Main>\n    <PageHeader />\n    <FilterBar />\n    <KpiRow />\n    <ChartGrid />\n    <ActivityTable />\n  </Main>\n</AppShell>",
  "regions": [
    {
      "region": "shell",
      "components": ["@qbds/sidebar"],
      "example": "https://designsystem.quantumblack.com/examples/sidebar.json#SidebarApp",
      "layout": "Match SidebarApp: header outside provider; SidebarNav rail + NavMenu + SidebarInset",
      "tokens": "main: flex-1 min-h-0 w-full overflow-auto bg-surface-base p-6",
      "notes": "Strip RegistryLogo / demo-utils; keep QBDS nesting from example"
    },
    {
      "region": "filters",
      "components": ["@qbds/tag-toggle", "@qbds/select"],
      "example": "https://designsystem.quantumblack.com/examples/tag-toggle.json + https://designsystem.quantumblack.com/examples/select.json",
      "layout": "horizontal toolbar above content; gap-3; not in sidebar",
      "tokens": "text-fg-primary; controls use component defaults",
      "notes": "Main toolbar only"
    },
    {
      "region": "kpi",
      "components": ["@qbds/card"],
      "example": "https://designsystem.quantumblack.com/examples/card.json",
      "layout": "horizontal row; min-w-[240px] cards; gap-6",
      "tokens": "Card: bg-surface-primary border border-stroke-tertiary p-6 shadow-elevation-1; trends text-status-success / text-status-error + icon"
    },
    {
      "region": "charts",
      "components": ["ECharts in @qbds/card"],
      "example": "https://designsystem.quantumblack.com/examples/card.json",
      "layout": "grid grid-cols-1 xl:grid-cols-2 gap-6; card min-h-[320px]",
      "tokens": "plot colours from DESIGN.md chart hex; card chrome as KPI"
    },
    {
      "region": "table",
      "components": ["@qbds/table", "@qbds/empty", "ActivityTable"],
      "example": "https://designsystem.quantumblack.com/examples/table.json + https://designsystem.quantumblack.com/examples/empty.json",
      "layout": "full width; sticky header",
      "tokens": "see ActivityTable.newComponents.tokens",
      "notes": "ActivityTable is new — see newComponents"
    }
  ],
  "installs": ["@qbds/sidebar", "@qbds/tag-toggle", "@qbds/select", "@qbds/card", "@qbds/table", "@qbds/empty", "@qbds/badge", "@qbds/sheet"],
  "newComponents": [
    {
      "name": "ActivityTable",
      "path": "src/components/activity-table.tsx",
      "description": "Domain table: activity name, status badge, owner, last run; row opens detail.",
      "checkedRegistry": true,
      "whyNotQbds": "No domain activity table in registry; closest is @qbds/table which we compose.",
      "compose": ["@qbds/table", "@qbds/badge", "@qbds/sheet", "@qbds/empty"],
      "tokens": {
        "root": "w-full bg-surface-base",
        "titleBlock": "p-6 border-b border-stroke-divider",
        "title": "text-fg-primary",
        "subtitle": "text-fg-secondary paragraph-small-primary",
        "headerCell": "text-fg-secondary border-stroke-divider",
        "cell": "text-fg-primary border-stroke-divider",
        "rowHover": "hover:bg-surface-primary",
        "statusSuccess": "text-status-success",
        "statusError": "text-status-error",
        "focus": "focus-visible:ring-stroke-status-focus"
      },
      "layout": "sticky Table header; full-width; title block above table",
      "behavior": "Row click / Enter opens Sheet detail. Empty → @qbds/empty in table region. Status uses badge + text, never colour alone.",
      "states": ["default", "loading (Skeleton rows)", "empty", "error message in region"],
      "a11y": "Native table semantics; keyboard-activatable rows; status not colour-alone; Sheet labelled",
      "props": ["rows: { id, name, status, owner, lastRun }[]", "onRowOpen(id: string)", "isLoading?: boolean", "error?: string"],
      "how": "Wrap @qbds/table. Map status → Badge + status token classes. Sheet for detail. Wire empty/loading from props. QBDS utilities only — no new CSS variables."
    }
  ]
}
```

| Field | Meaning | Values |
| --- | --- | --- |
| `status` | Confirm state | `draft` \| `confirmed` |
| `uxAdjustments` | UX chrome/layout shifts taken to match example composition; `[]` if none | string[] — also say these aloud when showing the draft |
| `jsx` | Rough JSX tree; every component named | string (multi-line OK) |
| `regions` | Ordered build map with layout + tokens | see below |
| `installs` | `@qbds/…` to install (**only** in `registry.json`) | string[] |
| `newComponents` | Local components — full build spec after registry check | see below — `[]` if none |

### `regions[]` fields

| Field | Meaning |
| --- | --- |
| `region` | Region id (shell, filters, kpi, …) |
| `components` | `@qbds/…` and/or local `newComponents` names |
| `example` | **Required** for regions with `@qbds/…` — `https://designsystem.quantumblack.com/examples/<name>.json` plus `#ExampleName` when several exist. Fallback: GitHub demo path, or `notes` if none |
| `layout` | Spacing, grid, width, sticky, placement — must reflect the chosen example, not a guessed pattern |
| `tokens` | QBDS utilities / token roles for this region (bg, border, text, status, …) |
| `notes` | Optional wiring / host match / site-import stripping |

### `newComponents[]` fields

| Field | Meaning |
| --- | --- |
| `name` | PascalCase; matches `jsx` / `regions` |
| `path` | Intended file path under `delivery.targets` |
| `description` | What it does for the user / screen |
| `checkedRegistry` | Must be `true` |
| `whyNotQbds` | What you searched; why registry/composition wasn’t enough |
| `compose` | `@qbds/…` (and host) primitives it wraps |
| `tokens` | Object of token/utility classes — root, surfaces, text, borders, status, focus, … from TOKENS.md |
| `layout` | Structure / sizing rules |
| `behavior` | Interactions and outcomes (from the matching story’s `interaction`) |
| `states` | default / loading / empty / error / … |
| `a11y` | Keyboard, semantics, non-colour status, labels |
| `props` | Public props the build should implement |
| `how` | Build recipe in plain language — cite which example(s) the composition follows |

---

## How to fill

1. **Examples first** — For each planned `@qbds/<name>`, fetch `/examples/<name>.json` (or GitHub demo fallback). Choose the use-case example name before writing `jsx`. Example composition wins over conflicting UX chrome.
2. **`uxAdjustments`** — List every UX shift caused by following examples (`[]` if none). When showing the draft, tell the user these deltas in plain language (cite example names). Domain goals/content from UX stay unless the user says otherwise.
3. **`jsx`** — Full-page tree; nesting matches the chosen example compositions. Domain blocks/content still come from each UX story’s `visual` / `story`.
4. **`regions`** — Every visible region with `example` + `layout` + `tokens` so build doesn’t guess chrome. Use real TOKENS.md utilities. `layout` must describe the example pattern, not a conflicting archetype or UX sketch.
5. **`installs`** — Union of all `@qbds/…` used in regions + `newComponents.compose`. Verify each in `registry.json`.
6. **`newComponents`** — Last resort after the checklist. Fill **every** field above. In `how`, name the example(s) used for each composed `@qbds` piece. Thin stubs (`how` only) are not confirmable.
7. Charts: region `tokens` may point at DESIGN.md chart hex; still no `registerTheme`.

**Production-ready bar:** a builder could implement the screen from this JSON + registry APIs + the linked `example` snippets alone — no missing bg/border/text tokens, no undefined behavior, no unnamed new components, no invented composition that fights the examples. Any example-driven UX shifts are listed in `uxAdjustments` and were told to the user.

Stay inside agreed `scope` and delivery.

## Confirm

Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage). Call out `uxAdjustments` in the Markdown, not only in JSON. Confirm → `ui_structure.status = "confirmed"`. Then open [build-react-ui.md](build-react-ui.md).

## Region → `@qbds` pointers

| Region | Where to look |
| --- | --- |
| App shell / KPI / filters / dashboard chrome | [app-layout-archetypes.md](shared/app-layout-archetypes.md) |
| Charts (type, titles, height, colours) | [chart-best-practices.md](shared/chart-best-practices.md) · [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) |
| Table / form / card primitives | `@qbds/table`, `@qbds/field` + `@qbds/input`, `@qbds/card` — verify in `registry.json` |
| Missing names (theme-toggle, menubar, data-grid, …) | [SKILL.md hard traps](../SKILL.md#hard-traps) · [react-qbds-registry.md](shared/react-qbds-registry.md) |
| Focus | `focus-visible:ring-stroke-status-focus` (DESIGN.md) |
