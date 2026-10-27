# Delivery — where the work lands

Set in **requirements** as `delivery`. Later stages stay inside this contract.

Delivery answers:

1. **What kind of work?** → `mode`
2. **Where do files get written?** → `targets` (+ `notes` if needed)
3. **Where does it live in the product?** → `hostApp` / `route` / `mount` when there is a host

**Matching an existing product’s look or shell is not delivery.** Put that in `context` (and into UX `context` / story `visual` when you get there). Example: greenfield app that should follow an existing host shell → `mode: "greenfield"`, design notes in `context`.

---

## Fields (meaning + allowed values)

### `mode`

**Meaning:** Blast radius — how much of an app this work is allowed to create or change.

| Value        | Meaning                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `greenfield` | New app from scratch (or empty project). Shell + `@qbds` setup are in scope.                          |
| `pages`      | One or more new routes in an existing host app. Reuse that app’s shell; don’t invent parallel chrome. |
| `feature`    | A slice inside an existing page/flow. Touch only the mount region unless `scope` says otherwise.      |

**Required.** Pick exactly one.

---

### `hostApp`

**Meaning:** Path to the existing app this work belongs to (folder root of that frontend).

| Allowed      |                                              |
| ------------ | -------------------------------------------- |
| string path  | e.g. `apps/dashboard`                        |
| omit / empty | for `greenfield` with no host                |

**Required** for `pages` and `feature`. For greenfield, set only if the user points at a product to **reference** for design — still put visual findings in `context`, not here alone. Scan the path before confirming requirements (shell, nav, theme, `@qbds`).

---

### `route`

**Meaning:** Intended URL path(s) in the host product.

| Allowed  |                                                    |
| -------- | -------------------------------------------------- |
| string   | e.g. `"/overview"`, `"/settings"`                  |
| string[] | e.g. `["/overview", "/detail"]` when several pages |
| omit     | for `greenfield` when no host routes yet           |

**Required** for `pages` and `feature` before confirm.

---

### `mount`

**Meaning:** Where this work sits in the host UI — shell slot or file region, in plain words or a path hint.

| Allowed          |                                                                             |
| ---------------- | --------------------------------------------------------------------------- |
| free-text string | e.g. `"inside existing Sidebar shell"`, `"src/app/settings/page.tsx#logs"` |

**Required** for `pages` and `feature` before confirm. Omit for greenfield when there is no host mount yet.

---

### `targets`

**Meaning:** Paths the agent will write or change this run. This is the write location — a folder under the host, a new app root, or a side folder like `prototypes/…`.

| Allowed  |                                                                                     |
| -------- | ----------------------------------------------------------------------------------- |
| string[] | e.g. `["src/app"]`, `["src/app/settings/page.tsx"]`, `["prototypes/metrics-overview"]` |

**Required.** If the user says “don’t touch the live app” / “prototype beside it”, put that path in `targets` and say so in `notes`. No separate workspace flag.

---

### `notes`

**Meaning:** Extra placement context that doesn’t fit other fields.

| Allowed |                                                                          |
| ------- | ------------------------------------------------------------------------ |
| string  | e.g. Vite vs Next, “prototype folder for review”, “wire into host later” |
| omit    | if nothing extra                                                         |

Optional.

---

## Examples by mode

### New app (`greenfield`)

```json
"delivery": {
  "mode": "greenfield",
  "targets": ["metrics-app"],
  "notes": "Vite app from scratch"
}
```

If they want it to **feel like** an existing product:

```json
"delivery": {
  "mode": "greenfield",
  "hostApp": "apps/dashboard",
  "targets": ["metrics-app"],
  "notes": "New app; match host shell density for reference only"
}
```

…and put the actual UI findings in `context` (then reflect them in UX `context` and each story’s `visual`).

Scaffold with a script — do not hand-roll:

| Ask                     | Script                                                         |
| ----------------------- | -------------------------------------------------------------- |
| Vite / SPA / unnamed    | [setup-qbds-vite.sh](scripts/setup-qbds-vite.sh) **(default)** |
| Next / SSR / App Router | [setup-qbds-next.sh](scripts/setup-qbds-next.sh)               |

`bash …/setup-qbds-vite.sh <folder>` (or next). Folder name only; optional extra `@qbds/…` args.

### New page(s) (`pages`)

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

### Feature slice (`feature`)

```json
"delivery": {
  "mode": "feature",
  "hostApp": "apps/dashboard",
  "route": "/settings",
  "mount": "src/app/settings/page.tsx#logs",
  "targets": ["src/app/settings/page.tsx"],
  "notes": "Replace logs stub; keep page chrome"
}
```

---

## Confirm gates (requirements)

| Mode                | Must know before confirm                     |
| ------------------- | -------------------------------------------- |
| `greenfield`        | `targets` (and Vite vs Next if a new folder) |
| `pages` / `feature` | `hostApp`, `route`, `mount`, `targets`       |

Ask if any of those are unknown. Do not invent them.

If the user wants design borrowed from a product, document it in `context` before confirm — don’t leave it as a vague “match current design”.

---

## How this affects later stages

### UX design

| Mode         | Bias                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `greenfield` | Shell is in scope; shape UX from the brief. If `context` names a reference product, align density/chrome to that scan. |
| `pages`      | Match existing shell density; pages inherit chrome                                                                   |
| `feature`    | Match host page; no new chrome unless `scope` says so                                                                |

### UI structure

| Mode         | Must                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `greenfield` | App shell + routing in `regions` / `jsx`; theme + registry setup in `installs`                                  |
| `pages`      | One region set per intended `route`; **include host shell** when matching a host; no rewrite of unrelated pages |
| `feature`    | Only regions inside the host mount; no new app chrome                                                           |

### Build

| Mode         | What to do                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `greenfield` | Vite or Next script into `targets` → then shell + pages                                                                                                   |
| `pages`      | Write under `targets`; if under host, reuse shell; if a side folder, setup script if missing and **mirror** `route` / `mount` / host shell from `context` |
| `feature`    | Touch only the host region(s) in `targets`; leave surrounding chrome alone                                                                                |
