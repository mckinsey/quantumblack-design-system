# create-component eval harness

Offline eval loop for the **create-component** skill. A Cursor agent runs in an isolated worktree, output is graded, and you iterate on docs until cases pass.

Suite: `.agents/skills/create-component/evals/evals.json` — 25 cases (5 components × props / composition / registry / tests / e2e).

## Prerequisites

- `CURSOR_API_KEY` — required for live runs (not for `--dry-run`)
- `NODE_TLS_REJECT_UNAUTHORIZED=0` — required in this environment for the Cursor SDK; do not copy elsewhere

## How to run

```bash
# Start here — one case, no agent, no cost
npm run eval:unit -- --id props-button --dry-run

# One unit case live
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:unit -- --id props-button

# One e2e case live (~5 min)
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run eval:e2e -- --id e2e-tag

# Filter
npm run eval:unit -- --focus props
npm run eval:unit -- --component switch
npm run eval:e2e -- --id e2e-tag --keep   # leave worktree at /tmp/qbds-evals-runs/
```

| Flag                     | Default        | Purpose                             |
| ------------------------ | -------------- | ----------------------------------- |
| `--suite unit\|e2e\|all` | `all`          | Filter by mode                      |
| `--id props-button`      | —              | Run one case                        |
| `--component tag`        | —              | All cases for a component           |
| `--focus props`          | —              | All cases with that focus           |
| `--model composer-2.5`   | `composer-2.5` | Agent + judge model                 |
| `--dry-run`              | off            | Setup + checks only, no agent/judge |
| `--keep`                 | off            | Don't delete the worktree           |

**Avoid** bare `npm run eval` with no filters — it runs all 25 cases live.

## What to expect

### Console output

Each case prints a header and numbered steps:

```text
Running 1 case · model composer-2.5

▶ create-component-props-button (unit · props · button)
  [1] worktree
      /tmp/qbds-evals-runs/create-component-props-button
  [2] overlay
  [3] seed
      fixture → evals-fixture/ (fixtures/button)
  [4] setup · strip button
  [5] baseline commit
  [6] agent · composer-2.5
      Choose the React prop API for button…
  agent still running… 30s
  status: finished
  [7] checks · 1 deterministic
  [8] judge · 4 expectations
  grading still running… 30s
  ✓ c1: evals-out/props-api.md exists
  ✓ 1: variant is default|accent|…
  [9] cleanup worktree
```

Long steps (`agent`, `judge`, `gate`) print a heartbeat every 30s.

### Per-case pipeline

1. **worktree** — detached copy outside the repo (`/tmp/qbds-evals-runs/`)
2. **overlay** — docs + skills copied in
3. **seed** — `.env` + Figma fixture → `evals-fixture/`
4. **setup** — delete whatever encodes the answer (component, registry entry, tests, …)
5. **baseline commit** — orphan commit so git can't restore gold
6. **agent** — Cursor SDK runs the prompt in the worktree _(skipped in dry-run)_
7. **checks** — deterministic assertions (`fileExists`, `grep`, …)
8. **gate** — `npm run lint && typecheck && test && registry:build && figma:parse` _(when `gate: true`)_
9. **judge** — LLM grades subjective `expectations[]` _(skipped in dry-run)_
10. **cleanup** — remove worktree (unless `--keep`)

### Dry-run

Checks are **expected to fail** — that proves the strip removed the answer. No agent, no judge, no results file. Exit 0.

### Live run

Results written to `evals/results/<timestamp>.json` (gitignored). Summary at the end:

```text
Summary
  ✓ props-button

1/1 passed → evals/results/2026-08-24T12-51-38-755Z.json
```

### Exit codes

| Code | Meaning                          |
| ---- | -------------------------------- |
| `0`  | All passed (or dry-run finished) |
| `1`  | No cases matched your filters    |
| `2`  | At least one case failed         |
