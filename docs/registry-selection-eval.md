# Registry selection evals

## Run locally (OpenAI)

```bash
export OPENAI_API_KEY=sk-...
npm run eval:registry-llm
```

```bash
# subset of cases
npm run eval:registry-llm -- date-picker-field,toast-success

# fresh API calls (ignore cache)
npm run eval:registry-llm -- --no-cache

# model override
OPENAI_MODEL=gpt-4o npm run eval:registry-llm
```

Cache: `evals/.cache/` (gitignored). Re-run with `--no-cache` after editing `registry.json` or cases.

## Files

| Path | Purpose |
|------|---------|
| `evals/component-selection.cases.json` | Task prompts + expected `install` names |
| `src/lib/registry-selection-eval.ts` | Catalog, prompts, deterministic scoring |
| `scripts/eval-registry-selection-llm.ts` | OpenAI caller + CLI |
| `src/tests/registry-selection-eval.test.ts` | Smoke tests (no API key) |

## What shadcn does (reference)

- MCP `search_items_in_registries` uses **fuzzysort** on `name`, `title`, `description` — no LLM in the loop.
- Most **UI primitives have no description**; **names** carry intent (`date-picker-demo`, `date-picker-form`).
- **~238 `registry:example` items** vs ~54 UI; recipes are separate install targets.
- **`get_item_examples_from_registries`** nudges queries like `accordion-demo`, `button example`.
- Vitest covers search/pagination only (`packages/registry/src/registry/search.test.ts`).

## QBDS roadmap

### Phase 1 — Metadata (registry.json)

1. **`date-picker`**: set `type` to `registry:example` (today it is `registry:ui` with only example files).
2. **Descriptions**: keep shadcn-style one-liners on UI; examples start with **“Example recipe for …”** and name primitives in parentheses.
3. **Disambiguation** only where evals fail: checkbox vs switch (identical text today), sonner → toast, select vs combobox.
4. **New example items** (only when LLM/fuzzy evals fail): composed time picker (time-input + popover + time-picker list), optional sidebar layout recipe.

### Phase 2 — Fuzzy eval (CI, no API key)

1. Add `fuzzysort` devDependency (same as shadcn).
2. `src/tests/registry-selection.fuzzy.test.ts`: same cases file, assert expected name in **top 3** of fuzzy search on `name`/`title`/`description`.
3. Wire into `test:unit` (fast).

### Phase 3 — LLM eval (local / optional CI secret)

1. `npm run eval:registry-llm` (this repo).
2. Do **not** add to default `npm test` (cost + key).
3. Optional: GitHub Action with `OPENAI_API_KEY` on schedule.

### Phase 4 — Harness alignment

1. Document two-step flow like shadcn: **search primitives** vs **search examples** (`date-picker`, `form`).
2. Consider example naming: shadcn uses `date-picker-demo`; QBDS can keep product names (`date-picker`) if descriptions say “recipe”.
3. Optional `categories` / `llms.txt` index pointing at `/r/registry.json` (audit report QW).

### Phase 5 — Governance

1. New `registry:example` → add at least one case in `component-selection.cases.json`.
2. New `registry:ui` → add case if it competes with siblings (date-input vs calendar).
3. CONTRIBUTING: run `eval:registry-llm` when changing descriptions on confused pairs.
