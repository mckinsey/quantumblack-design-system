# Stage 3 — UI structure

Open this **only after** `uxdesign.status` is `confirmed`. Do not open build docs yet. No UI code yet.

Subagent OK: pass confirmed plan JSON + brief + host paths; still confirm with the user.

Map confirmed UX `context` and each `stories[]` entry (`story` / `visual` / `interaction`) to a **buildable structure** — enough that build can implement without inventing tokens, region layout, or behaviour.

## Design-system skill decides how components are resolved

This stage is design-system-agnostic. **How** you find components, usage examples, tokens and install names is owned by the active design-system skill.

| Design system | Open instead of (or alongside) this file                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| QBDS (`@qbds`) | [`qbds-library/reference/ui-structure.md`](../../qbds-library/reference/ui-structure.md) — it extends this schema with registry + examples gates and `uxAdjustments` |
| Other / none  | Use the schema below; resolve components from the host app’s own `components/ui` and its docs        |

## Rules (any design system)

1. **Reuse before recreate.** Search the host app and the design system for each control before adding a `newComponents` entry. Never invent a component name.
2. **Use real tokens.** Surfaces, text, borders, status, focus, spacing and type come from the design system’s token docs / installed stylesheet — no raw hex or ad-hoc palette classes unless the design system explicitly allows it (e.g. chart colours).
3. **Follow documented compositions.** If the design system ships usage examples, match their nesting; if that conflicts with the UX chrome, record the delta in `uxAdjustments` and tell the user.
4. **Ask, don’t guess,** when a component, token or behaviour is unknown.
5. Stay inside agreed `scope` and `delivery`.

## Schema

```json
{
  "status": "draft",
  "uxAdjustments": [],
  "jsx": "<AppShell>\n  <Sidebar />\n  <Main>\n    <PageHeader />\n    <KpiRow />\n    <ActivityTable />\n  </Main>\n</AppShell>",
  "regions": [
    {
      "region": "shell",
      "components": ["<design-system component>"],
      "example": "link to the usage example / demo this follows (if the design system has one)",
      "layout": "nesting, spacing, grid, width, sticky",
      "tokens": "token utilities / roles for bg, border, text, status",
      "notes": "wiring, host match"
    }
  ],
  "installs": ["<design-system packages to add — verified to exist>"],
  "newComponents": []
}
```

| Field           | Meaning                                                          |
| --------------- | ---------------------------------------------------------------- |
| `status`        | `draft` \| `confirmed`                                           |
| `uxAdjustments` | UX shifts taken to match documented compositions; `[]` if none   |
| `jsx`           | Rough JSX tree; every component named                            |
| `regions`       | Ordered build map: components, example, layout, tokens, notes    |
| `installs`      | Design-system components to add; only names that actually exist  |
| `newComponents` | Local components — full spec, last resort (fields below)         |

### `newComponents[]` fields

`name`, `path` (under `delivery.targets`), `description`, `checkedRegistry` (`true`), `whyNotInDesignSystem`, `compose`, `tokens`, `layout`, `behavior`, `states`, `a11y`, `props`, `how`. A `how`-only stub is not confirmable.

## Confirm

Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage). Call out `uxAdjustments` in the Markdown, not only in JSON. Confirm → `ui_structure.status = "confirmed"`. Then open [build-react-ui.md](build-react-ui.md).
