# Delivery — where the work lands

Set in **requirements** as `delivery`. Later stages stay inside it. It answers three things: what kind of work (`mode`), where files are written (`targets`), and where it sits in the product (`hostApp` / `route` / `mount`).

Matching an existing product's look is **not** delivery. Put that in requirements `context`, then carry it into UX `context` and each story's `visual`.

## Pick one mode

| `mode`       | Meaning                                                                                       | Must know before confirm                     |
| ------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `greenfield` | New app from scratch. Shell and design-system setup are in scope.                             | `targets` (and Vite vs Next for a new folder) |
| `pages`      | New routes in an existing host app. Reuse its shell; don't invent parallel chrome.            | `hostApp`, `route`, `mount`, `targets`       |
| `feature`    | A slice inside an existing page. Touch only the mount region unless `scope` says otherwise.   | `hostApp`, `route`, `mount`, `targets`       |

Ask if any required value is unknown — never invent it. Scan `hostApp` (shell, nav, theme, design system) before confirming requirements.

## Fields

| Field     | Meaning                                                                 | Example                                              |
| --------- | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| `mode`    | Required. One of the three above.                                       | `"pages"`                                            |
| `hostApp` | Folder root of the existing app. For greenfield, only if it is a design reference. | `"apps/dashboard"`                        |
| `route`   | URL path(s) in the host.                                                | `"/overview"` or `["/overview", "/detail"]`          |
| `mount`   | Where it sits in the host UI, in plain words or a path hint.            | `"inside existing Sidebar shell"`, `"src/app/settings/page.tsx#logs"` |
| `targets` | Required. Paths the agent will write this run.                          | `["src/app/settings/page.tsx"]`, `["prototypes/metrics-overview"]` |
| `notes`   | Optional. Anything else, e.g. Vite vs Next, "prototype folder for review". |                                                   |

"Don't touch the live app" or "prototype beside it" → put that folder in `targets` and say so in `notes`.

## Example

```json
"delivery": {
  "mode": "pages",
  "hostApp": "apps/dashboard",
  "route": "/overview",
  "mount": "Sidebar shell + main content",
  "targets": ["prototypes/metrics-overview"],
  "notes": "Prototype folder; do not edit the live Next app yet"
}
```

Greenfield that should feel like an existing product: `mode: "greenfield"`, add `hostApp` for reference, and put the findings in `context`.

## New app folder

Scaffold with the design system's setup script — do not hand-roll. The script and how to run it come from the active design-system skill (QBDS: [`qbds-library` § Scaffold](../../qbds-library/SKILL.md#scaffold)). Default to a client-side Vite SPA unless the brief says Next / SSR.

## How the mode shapes later stages

| Stage        | `greenfield`                                          | `pages`                                                                 | `feature`                                       |
| ------------ | ----------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| UX           | Shell is in scope; follow any reference product in `context` | Match the existing shell density; pages inherit chrome          | Match the host page; no new chrome              |
| UI structure | App shell + routing in `regions` / `jsx`; theme and component setup in `installs` | One region set per `route`; include the host shell; don't rewrite other pages | Only regions inside the host mount; no new chrome |
| Build        | Scaffold into `targets`, then shell + pages           | Write under `targets`; reuse host shell, or for a side folder run setup if missing and mirror `route` / `mount` / shell from `context` | Touch only the host region(s) in `targets`; leave surrounding chrome |
