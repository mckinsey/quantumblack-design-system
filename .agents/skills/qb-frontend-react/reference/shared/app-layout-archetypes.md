# App layouts and page structure

React / `@qbds`. Tokens: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) · layout/a11y: [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md). Component APIs: [registry.json](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) + demos on GitHub / [designsystem.quantumblack.com](https://designsystem.quantumblack.com/).

Use these as **recipes** that match confirmed UX story `visual` / `interaction`. Hybrids compose via [ui-structure.md](../ui-structure.md) regions.

---

## App shell

Persistent chrome + scrollable main. Pick a chrome shape, then **read the source** — don’t guess dimensions.

| Shape | When | React source |
| --- | --- | --- |
| **Full nav sidebar** | Multiple nav sections; optional sidebar filters | [`registry-sidebar.tsx`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/registry/registry-sidebar.tsx) + [`navbar.tsx`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/registry/navbar.tsx) |
| **Icon nav rail** | Few top-level sections | [`sidebar.tsx` demo](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/app/demo/%5Bname%5D/ui/sidebar.tsx) (site → Sidebar → **App shell**) |
| **LeftNav** | Rail icons + always-visible text panel | Compose rail + NavMenu from rows above |

Install `@qbds/sidebar` (in `registry.json`).

**Nesting** — Navbar `<header>` **outside** `SidebarProvider`; provider wraps Sidebar + `SidebarInset` only:

```
outer div
  <header>        ← Navbar, outside SidebarProvider
  SidebarProvider
    Sidebar
    SidebarInset  ← scrollable main
```

Never hand-roll `<aside>`/`<nav>` when `@qbds/sidebar` exists. Full-nav Navbar height **`h-14`** (sidebar `top-14` depends on it). Theme toggle and other missing `@qbds` names: [react-qbds-registry.md](react-qbds-registry.md).

**Main:** `flex-1 min-h-0 w-full overflow-auto bg-surface-base p-6`.

| When | Width |
| --- | --- |
| Dense dashboards / data tables | Full viewport — no `max-w-screen-xl` on the shell |
| Long-form docs / forms | Full shell; optional `max-w-screen-xl mx-auto` on an **inner** wrapper |

---

## Layout recipes

### Documentation / multi-section

Long-form: headings, `Card` sections, `Tabs`, occasional `Table` / charts. Reading or multi-section config.

### Analytics / dashboard

Full-width dense main. Scrollable stack: `flex flex-col gap-8` (header → KPI → charts → table).

**Filters — one place only** (sidebar **or** main toolbar, not both):

| Placement | When |
| --- | --- |
| Main toolbar | Few filters; wide main |
| Sidebar (last group in `<nav>`) | Persistent scope next to nav |

Controls: `@qbds/tag-toggle` (toggle chip, no X, `aria-pressed`), `Select`, or `Combobox` — check registry + demos.

**KPI banner:** horizontal `Card`s; `min-w-[240px]`; `bg-surface-primary border border-stroke-tertiary p-6 shadow-elevation-1`. Trends: `text-status-success` / `text-status-error` + icon — never colour alone.

**Charts:** ECharts in `Card`; height ≥ `280px` (prefer `320px`). Grid: `grid grid-cols-1 xl:grid-cols-2 gap-6`.

**Table:** sticky header; `p-6 border-b border-stroke-divider` title block.

### Form-centric

`Field` + `Input` / `Select` / etc. Single column or stacked `Card`s; wizard via `Tabs`. Prefer `react-hook-form` + `zod`.

### Table-centric

Toolbar (`Input` search, `Select`, export) + full-width sticky `Table`; row → `Dialog` / detail column; empty → `Empty`.
