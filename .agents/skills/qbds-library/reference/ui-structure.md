# Stage 3 — UI structure (QBDS)

Open this **only after** `uxdesign.status` is `confirmed`. No UI code yet. Extends the generic [Stage 3](../../qb-frontend-react/reference/ui-structure.md) with QBDS registry and example gates.

Turn the confirmed UX `context` and `stories[]` into a structure a builder can implement without guessing tokens, layout or behaviour. Keep domain content and flows from UX; for `@qbds` chrome and nesting, **follow the example composition**.

Full filled-in sample: [example-ui-structure.json](example-ui-structure.json).

## Three hard rules

1. **Registry and examples first.** No `newComponents` until each piece of UI has been checked against the registry and its examples.
2. **Examples over invented composition.** For every `@qbds/<name>` you plan to use, fetch `https://designsystem.quantumblack.com/examples/<name>.json` (index: `/examples/index.json`) and match its nesting in `jsx` / `regions` / `how`. Never build composition from API props or layout recipes alone.
3. **Examples over UX chrome.** If an example conflicts with the UX sketch (what wraps what, header/rail/inset placement, control grouping), follow the example. Put a short delta in `uxAdjustments`, name the example, and tell the user in plain words. Update the story `visual` if pages or regions change.

## Checklist for every UI piece

1. Find the `@qbds/<name>` in [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json). Use that exact name in `jsx`, `regions` and `installs`.
2. Read its API: `src/components/ui/<name>.tsx` or `/r/<name>.json`.
3. Fetch its example and pick the one that fits the **use case** (e.g. sidebar → `SidebarApp` for an app shell). Record URL + example name on the region. Strip site-only imports (`@/components/registry/*`, `@/lib/demo-utils`) but keep the QBDS nesting.
4. Example missing → use GitHub `src/app/demo/[name]/ui/<name>.tsx` and say so in `example`. Neither exists → note it and ask the user.
5. Reuse the host's `components/ui` and existing patterns before creating anything.
6. Names not in the registry (`theme-toggle`, `menubar`, `data-grid`, …): use the fallbacks in [registry.md](registry.md).
7. Tokens: real utility names from [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) or `globals.css` (`bg-surface-base`, `text-fg-secondary`, …). No raw hex or `slate-*`, except chart hex from [DESIGN.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours).
8. Only if nothing covers it → add a full `newComponents` entry. Never invent an `@qbds/…` name.
9. Unsure → ask the user.

## Where to look

| Need                                   | Open                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| App shell, KPI, filters, page recipes  | [app-layout-archetypes.md](app-layout-archetypes.md) — after examples, not instead of them     |
| Charts: styling and colours            | [charts.md](charts.md)                                                                         |
| Missing names / fallbacks              | [registry.md](registry.md)                                                                     |
| How delivery mode shapes structure     | [delivery-modes.md](../../qb-frontend-react/reference/delivery-modes.md)                       |
| Focus ring                             | `focus-visible:ring-stroke-status-focus`                                                       |

## What to fill

| Field           | Rule                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `uxAdjustments` | Every UX shift caused by an example; `[]` if none.                                                                            |
| `jsx`           | Full-page tree; nesting follows the chosen examples. Domain content comes from the stories.                                   |
| `regions[]`     | Every visible region: `region`, `components`, `example` (required when it uses `@qbds/…`), `layout`, `tokens`, optional `notes`. `layout` describes the example pattern. |
| `installs`      | Only names verified in `registry.json`; the union of all `@qbds/…` in regions and `newComponents.compose`.                    |
| `newComponents` | `[]` when registry plus composition covers everything. Otherwise every field below; a `how`-only stub is not confirmable.     |

`newComponents[]` fields: `name`, `path` (under `delivery.targets`), `description`, `checkedRegistry` (`true`), `whyNotQbds`, `compose`, `tokens`, `layout`, `behavior`, `states`, `a11y`, `props`, `how` (cite the examples it follows).

**Ready to build when** a builder could implement the screen from this plan, the registry APIs and the linked examples alone: no missing tokens, no undefined behaviour, no unnamed new components. Stay inside `scope` and `delivery`.

## Confirm

Present per [Show to the user](../../qb-frontend-react/SKILL.md#showing-a-step-to-the-user) and say the `uxAdjustments` in the Markdown, not only the JSON. On confirm set `ui_structure.status = "confirmed"`, then open [build-react-ui.md](../../qb-frontend-react/reference/build-react-ui.md).
