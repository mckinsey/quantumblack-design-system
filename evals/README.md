# create-component eval harness

An **offline eval loop** for the QBDS **create-component** workflow. A Cursor agent runs in an isolated git worktree, its output is graded, and the loop iterates on **minimal docs + skills** until cases pass.

Goal: prove agents can add a component from Figma fixtures + short rules — not by copying production or restoring git history.

The docs are the artifact under optimization; the shipped components are the fixed gold.

## Architecture

```text
npm run eval / eval:unit / eval:e2e
        │
        ▼
   evals/run.ts          ← Cursor @cursor/sdk Agent.prompt
        │
        ├─ git worktree   → /tmp/qbds-evals-runs/<run-id>  (outside repo)
        ├─ overlay docs   → docs/components/*.md + skills
        ├─ seed .env      → QBDS_REGISTRY_URL (registry:build needs it)
        ├─ seed fixture   → evals-fixture/  (from evals/fixtures/<comp>/)
        ├─ strip          → whatever encodes the answer for this case
        ├─ orphan commit  → baseline so git checkout cannot restore gold
        ├─ agent run      → short prompt; rules live in docs/skills
        ├─ tier 1         → deterministic checks[] + the exit gate
        └─ tier 2         → Agent.prompt judge over expectations[]
```

**Suite:** `.agents/skills/create-component/evals/evals.json` — flat Agent Skills shape `{ skill_name, preamble, preamble_e2e, evals: [...] }`, 25 cases over 5 components (tag, button, textarea, select, switch).

## Strip rule

**Whatever encodes the answer gets deleted.** Otherwise the case grades an agent that can read the answer off disk.

| Focus         | Answer lives in                | `setup`         |
| ------------- | ------------------------------ | --------------- |
| `props`       | `src/components/ui/<name>.tsx` | `strip`         |
| `composition` | `src/components/ui/<name>.tsx` | `strip`         |
| `registry`    | the `registry.json` entry      | `drop-registry` |
| `tests`       | `src/tests/<name>.test.tsx`    | `drop-tests`    |
| e2e           | everything                     | (implied)       |

A full strip removes the ui file, the demo (+ its `index.tsx` wiring), tests, Code Connect templates, the registry entry, and `public/r/<name>.json` — which embeds the component source.

## Grading — two tiers

**Tier 1 — deterministic (`checks[]`).** No LLM call, no nondeterminism. Anything mechanically checkable belongs here.

| Check           | Asserts                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `fileExists`    | artifact was written                                                                                      |
| `fileAbsent`    | artifact was not written                                                                                  |
| `grep`          | pattern present/absent (`export default`, `data-slot`, `show*`, an inline `figma.com` URL, `toHaveClass`) |
| `registryEntry` | entry exists and carries the required `registryDependencies`                                              |
| `stepsLog`      | `evals-out/steps.md` is 8 lines, once each, in order                                                      |

**Tier 1b — the exit gate (`gate: true`).** Runs the canonical gate from [create-component](../.agents/skills/create-component/SKILL.md#exit-gate) inside the worktree, so the harness cannot pass a component that does not compile or tests that never ran.

Gated wherever the agent writes **code into an otherwise-complete tree**: `e2e`, `tests`, `registry`. Not `props` / `composition` — those strip the component, so lint/typecheck would fail by construction, and they only produce a markdown artifact.

**Tier 2 — LLM judge (`expectations[]`).** Only what is genuinely subjective: API naming, composition choices, demo axis coverage.

Currently 109 deterministic checks and 88 judged expectations.

## Case shape

| Field             | Required             | Notes                                                            |
| ----------------- | -------------------- | ---------------------------------------------------------------- |
| `id`              | yes                  | stable string (`props-button`); use with `--id`                  |
| `mode`            | yes                  | `unit` \| `e2e`                                                  |
| `component`       | yes                  | QBDS name                                                        |
| `prompt`          | yes                  | the task only — shared rules live in `preamble` / `preamble_e2e` |
| `expected_output` | yes                  | human summary for the judge                                      |
| `expectations`    | yes\*                | tier-2 judge checklist                                           |
| `checks`          | yes\*                | tier-1 deterministic assertions                                  |
| `gate`            | optional             | run the exit gate in the worktree                                |
| `focus`           | unit                 | `props` \| `composition` \| `registry` \| `tests`                |
| `files`           | when fixtures needed | seeded as `evals-fixture/`; first path used                      |
| `setup`           | optional             | `strip` \| `drop-registry` \| `drop-tests`                       |
| `codeConnect`     | e2e                  | templates to strip                                               |

\* at least one of `expectations` / `checks`.

## Fixtures

```text
.agents/skills/create-component/evals/fixtures/<component>/
  SOURCE.md              # fileKey + node ids + capture date (no raw Figma URLs — see .gitleaks.toml)
  mcp/get_metadata.xml
  mcp/get_design_context.md   # captured with disableCodeConnect: true
  props/alignment.md     # optional distill
  composition/slots.md   # optional
```

Agents must **not** call live Figma MCP during evals.

**Refresh** (outside evals): open the component-set URL → `get_metadata` → `mcp/get_metadata.xml`; `get_design_context` with **`disableCodeConnect: true`** → `mcp/get_design_context.md`; update `SOURCE.md`. Do not treat Code Connect snippets in MCP output as Spec.

## Runner

| Flag                     | Purpose                        |
| ------------------------ | ------------------------------ |
| `--suite unit\|e2e\|all` | filter by mode                 |
| `--id props-button`      | one case (repeatable)          |
| `--component tag`        | all cases for a component      |
| `--focus props`          | all cases with that focus      |
| `--model composer-2.5`   | agent + judge model            |
| `--keep`                 | leave the worktree for diffing |

Requires `CURSOR_API_KEY`. Results are written to `evals/results/<timestamp>.json` (gitignored) so runs are diffable.

## Integrity (learned mid-loop)

The harness is largely an anti-cheating apparatus. Each of these came from watching an agent cheat:

1. Worktrees moved **outside the repo** (`/tmp/qbds-evals-runs`) — in-repo worktrees let agents read production via `../..`
2. **Orphan git commit** after strip — blocks `git checkout` restore
3. Strip **`public/r/*.json`** — agents were pasting the embedded registry source
4. Overlay **skills** into the worktree, not just docs
5. Prompts explicitly forbid restore / parent copy (once, in `preamble`)

## How to run

`NODE_TLS_REJECT_UNAUTHORIZED=0` is currently required for the Cursor SDK to connect from this environment. It disables TLS verification for the run — do not copy it into anything else.

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:unit -- --focus props
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:unit -- --component switch
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:e2e -- --id e2e-tag
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:e2e -- --keep   # inspect /tmp/qbds-evals-runs/
```

## How to extend

1. Capture `fixtures/<name>/`.
2. Append a case to `evals[]` — copy a sibling, edit `id`, `component`, `expectations`, `checks`.
3. Run one case: `npm run eval:unit -- --id props-<name>`
4. If it fails → tighten the **smallest** doc rule, or convert the expectation into a deterministic `check`. Re-run.

Rules belong in `docs/components/*.md` — one home each. Do not restate a rule in the skill and again in an expectation string; that is how the three copies drifted last time.

## Known gap

Every expectation encodes one of 5 **shipped** components' APIs, so passing proves reproduction, not that the docs generalize to component #6. A no-gold case — a component with no shipped implementation, graded only on rule-following — is the real generalization test.
