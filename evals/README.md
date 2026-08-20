# create-component eval harness — overview

Branch: `research/evals` (uncommitted WIP). This doc explains what was built, why, and how to run it.

## What this is

An **offline eval loop** for the QBDS **create-component** workflow. Cursor Agent SDK runs an agent in an isolated git worktree, grades the output with a second agent pass, and iterates on **minimal docs + skills** until cases pass.

Goal: prove agents can add a component from Figma fixtures + short rules — not from copying production or restoring git history.

## Architecture

```text
npm run eval / eval:unit / eval:e2e
        │
        ▼
   evals/run.ts          ← Cursor @cursor/sdk Agent.prompt
        │
        ├─ git worktree   → /tmp/qbds-evals-runs/<run-id>  (outside repo)
        ├─ overlay docs   → docs/components/*.md + skills
        ├─ seed fixture   → evals-fixture/  (from .agents/.../fixtures/<comp>/)
        ├─ strip (e2e)    → ui, demo, tests, CC, registry, public/r/*.json
        ├─ orphan commit  → baseline so git checkout cannot restore gold
        ├─ agent run      → short prompt; rules in docs/skills
        └─ grade          → second Agent.prompt checks expectations[]
```

**Suite definition:** `.agents/skills/create-component/evals/evals.json` — flat Agent Skills shape `{ skill_name, evals: [...] }` (25 cases today).

**Per-case fields:** `id`, `mode` (`unit` | `e2e`), `component`, `prompt`, `expected_output`, `expectations[]`, optional `focus`, `setup`, `files`, `codeConnect`.

## Components under test (5)

| Component    | Unit                                | E2e                              |
| ------------ | ----------------------------------- | -------------------------------- |
| **tag**      | props, composition, registry, tests | full create-component (hold-out) |
| **button**   | props, composition, registry, tests | full                             |
| **textarea** | props, composition, registry, tests | full                             |
| **select**   | props, composition, registry, tests | full                             |
| **switch**   | props, composition, registry, tests | full                             |

**25 eval cases total** — 5 e2e + 20 unit (4 focuses × 5 components).

Gold expectations align with **shipped** `src/components/ui/<name>.tsx` (e.g. Tag keeps `variant="primary"`, Button includes icon sizes, Select needs `icon-shell` in registry).

## Unit vs e2e

### Unit (`--suite unit`)

One skill slice per case. Agent writes a small artifact or one file; judge checks `evals-out/` or the target path.

| Focus           | Output                      | Setup           |
| --------------- | --------------------------- | --------------- |
| **props**       | `evals-out/props-api.md`    | fixture seeded  |
| **composition** | `evals-out/composition.md`  | fixture seeded  |
| **registry**    | `registry.json` entry       | `drop-registry` |
| **tests**       | `src/tests/<name>.test.tsx` | `drop-tests`    |

Prompts are short (“Follow docs/components/props.md”). Rules live in docs.

### E2e (`--suite e2e`)

Hold-out test: strip the component end-to-end, agent must rebuild steps 1–8 from **create-component** skill + fixtures.

Strips:

- `src/components/ui/<name>.tsx`
- `src/app/demo/[name]/ui/<name>.tsx` + demo index wiring
- `src/tests/<name>.test.tsx`
- `code-connect/<templates>.figma.ts`
- `registry.json` item
- **`public/r/<name>.json`** (embedded source — agents were copying from here)

Expects: `evals-out/steps.md` (exactly 8 lines), ui, demo, tests, CC, registry.

## Minimal docs (`docs/components/`)

Shrunk to **1–2 line rules** each; evals overlay these into every worktree.

| File             | Role                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `props.md`       | shadcn names; no `show*`; `type`→`variant`; `reg`→`default`; match shipped API when file exists    |
| `composition.md` | optional chrome = structure; no `show*`; root context; Field XOR footer                            |
| `demos.md`       | simplest first; one example per axis; four index.tsx wires                                         |
| `tests.md`       | two blocks (demo smoke + behaviour); no class/colour/cva asserts; PointerEvent polyfill for Switch |
| `registry.md`    | one entry per component; deps from imports; every `@/components/ui/*` → registryDependencies       |

## Skill updates (`.agents/skills/create-component/`)

**`SKILL.md`** — workflow owner; links to docs per step.

Additions from the eval loop:

- **Step log:** exactly eight lines in `evals-out/steps.md`
- **Eval / hold-out:** no git restore, no `public/r/*.json`, no parent-checkout copy
- **Gotchas table** — drift seen when comparing agent output vs production (Switch cva rewrite, missing IconShell, CC `Label size=`, registry missing deps, etc.)

**`evals/`** — suite + offline Figma fixtures per component:

```text
fixtures/<component>/
  SOURCE.md
  mcp/get_metadata.xml
  mcp/get_design_context.md   # disableCodeConnect: true
  props/alignment.md          # optional distill; gold API notes
  composition/slots.md        # optional
```

Agents must **not** call live Figma MCP during evals.

## Runner (`evals/run.ts`)

| Flag                     | Purpose                                                 |
| ------------------------ | ------------------------------------------------------- |
| `--suite unit\|e2e\|all` | filter by mode                                          |
| `--id props-button`      | one case (repeatable)                                   |
| `--component tag`        | all cases for a component                               |
| `--focus props`          | all props unit cases                                    |
| `--model composer-2.5`   | agent + judge model                                     |
| `--keep`                 | leave worktree for diff (under `/tmp/qbds-evals-runs/`) |

Requires `CURSOR_API_KEY` in env.

**Integrity fixes** (learned mid-loop):

1. Worktrees moved **outside repo** (`/tmp/qbds-evals-runs`) — in-repo worktrees let agents read production via `../..`
2. **Orphan git commit** after strip — blocks `git checkout` restore
3. Strip **`public/r/*.json`** — agents were pasting embedded registry source
4. Overlay **skills** into worktree, not just docs
5. E2e prompts explicitly forbid restore / parent copy

## npm scripts & deps

```json
"eval": "tsx evals/run.ts",
"eval:unit": "tsx evals/run.ts --suite unit",
"eval:e2e": "tsx evals/run.ts --suite e2e"
```

Added devDependency: `@cursor/sdk`.

`.gitignore`: `/.evals-runs/`, `/evals/results/` (legacy path; runs now use `/tmp`).

## Eval format evolution

**Before:** nested `unit.cases[]` + `by_component` + separate `e2e[]` — runner expanded combinations.

**After:** flat `evals[]` — one JSON object per case (`props-button`, `e2e-tag`, …). Agent Skills compatible + QBDS extensions (`setup`, `focus`, `codeConnect`).

## Results (last run on this branch)

| Suite           | Status |
| --------------- | ------ |
| Unit (20 cases) | pass   |
| E2e (5 cases)   | pass   |

**Prod parity notes** (with honest harness, `--keep` diffs):

| Component        | Match                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **select**       | ui file byte-identical to prod after registry fix                                                             |
| **switch**       | ui/tests/CC matched prod when agent followed siblings; earlier runs drifted on cva/tokens until skill gotchas |
| **textarea**     | functional pass; ~300 lines implementation diff vs prod (structure/tokens)                                    |
| **tag / button** | pass expectations; demos/tests close to prod patterns                                                         |

Common agent failures we fixed via docs/skill:

- Missing **demo smoke** block in tests
- Duplicate **`8 Registry`** in steps.md
- **`icon-shell`** omitted from select registryDependencies
- Restoring gold from **git / public/r / parent repo**

## How to run

```bash
# needs CURSOR_API_KEY
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:unit -- --focus props
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:unit -- --component switch
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:e2e -- --id e2e-tag
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:e2e -- --keep   # inspect /tmp/qbds-evals-runs/
```

## How to extend

1. Capture Figma fixture under `.agents/skills/create-component/evals/fixtures/<name>/`
2. Append cases to `evals.json` (copy a sibling case; edit `id`, `component`, `expectations`)
3. Run one case: `npm run eval:unit -- --id props-<name>`
4. If fail → tighten the **smallest** doc rule or skill gotcha; re-run until pass

See also: `.agents/skills/create-component/evals/README.md` (case schema + fixture refresh).

## Files touched (summary)

| Path                                               | Change                       |
| -------------------------------------------------- | ---------------------------- |
| `evals/run.ts`                                     | new — Cursor SDK runner      |
| `evals/README.md`                                  | this doc                     |
| `.agents/skills/create-component/SKILL.md`         | new — workflow + gotchas     |
| `.agents/skills/create-component/evals/evals.json` | 25 cases                     |
| `.agents/skills/create-component/evals/fixtures/*` | offline MCP mocks ×5         |
| `docs/components/*.md`                             | new — minimal rules          |
| `package.json`                                     | eval scripts + `@cursor/sdk` |
| `.gitignore`                                       | eval run dirs                |

Nothing in `src/components/ui/` was changed for this work — evals validate against existing production as gold.
