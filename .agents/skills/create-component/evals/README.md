# create-component evals

Agent Skills–style flat suite: one object per case under `evals[]`.

## Layout

```text
evals/
  evals.json             # { skill_name, evals: [...] }
  fixtures/<component>/
    SOURCE.md
    mcp/                 # raw Figma MCP (disableCodeConnect: true)
      get_metadata.xml
      get_design_context.md
    props/alignment.md   # optional distill
    composition/slots.md
  README.md
```

## Case shape

| Field             | Required             | Notes                                             |
| ----------------- | -------------------- | ------------------------------------------------- |
| `id`              | yes                  | stable string (`props-button`); use with `--id`   |
| `mode`            | yes                  | `unit` \| `e2e`                                   |
| `component`       | yes                  | QBDS name                                         |
| `prompt`          | yes                  | short task; rules live in docs                    |
| `expected_output` | yes                  | human summary for the judge                       |
| `expectations`    | yes                  | grade checklist (component-specific)              |
| `focus`           | unit                 | `props` \| `composition` \| `registry` \| `tests` |
| `files`           | when fixtures needed | seeded as `evals-fixture/`; first path used       |
| `setup`           | optional             | `drop-registry` \| `drop-tests`                   |
| `codeConnect`     | e2e                  | templates to strip                                |

## Adding a case

1. Capture `fixtures/<component>/` if needed.
2. Append one object to `evals[]`.
3. Run: `npm run eval:unit -- --id props-button`

Working-tree `docs/components/*.md` and create-component / figma-parity / code-connect skills are overlaid into each run.

E2e strips the component, demos, tests, Code Connect, `registry.json` entry, and `public/r/<name>.json` (embedded source). Worktrees live under `/tmp/qbds-evals-runs` (outside the repo) and commit an orphan baseline so agents cannot restore from git history or a parent checkout.

```bash
npm run eval:unit -- --focus props
npm run eval:unit -- --id tests-button
npm run eval:e2e -- --id e2e-tag
```

## Refresh Figma fixtures

Outside evals (no live MCP in runs):

1. Open the **component set** URL.
2. `get_metadata` → `mcp/get_metadata.xml`
3. `get_design_context` with **`disableCodeConnect: true`** → `mcp/get_design_context.md`
4. Optional `props/alignment.md`; update `SOURCE.md`.

Agent primary input is **`mcp/`** (same shape as live `get_metadata` + `get_design_context` with **`disableCodeConnect: true`**). Distilled `props/alignment.md` is optional helper only. Do not treat Code Connect snippets in MCP output as Spec.
