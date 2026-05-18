# QBDS — LLM-Readiness Plan

> A 10-week plan to take QBDS from a clean component library to a system that powers near-shippable application code via AI agents (Cursor, Figma MCP, Code Connect).

---

## TL;DR

Today, "build me a dashboard" prompts using QBDS hit ~65–70% quality. The plan moves that to ~98–99% in 10 weeks of focused work, run as two parallel tracks (Design + Code) joining at three milestones.

The biggest single multiplier is a **pattern library** (canonical compositions of atoms). Most of the remaining lift comes from **Code Connect** for atoms and **per-property descriptions** that make Figma metadata machine-readable.

---

## Three audiences we're building for

| User | What they need | Today | After plan |
|---|---|---|---|
| **Designer** in Figma — customising a starter pack | Strong atoms with clear documentation | ~85% (recent slot/variant work) | 100% |
| **Claude / LLM** generating code from Figma URLs or screengrabs | Deterministic mapping from Figma to React | ~50% | ~95% |
| **Generic prompts** — "build me a dashboard" | Patterns to compose, project conventions to follow | ~40% | ~95% |

---

## Where we are today

```
Foundations:    ████████████░░  ~85% — variant/slot/naming audits done
Atom coverage:  █████████░░░░░  ~70% — 24/34 atoms in Figma+code parity
Code Connect:   █░░░░░░░░░░░░░  ~5%  — icons only, no atoms yet
Patterns:       ░░░░░░░░░░░░░░  0%
Rules / tokens: ████░░░░░░░░░░  ~30% — globals.css mature, not exposed to LLM
LLM quality:    ~65–70% across all three audiences
```

---

## The plan — 8 phases, 2 parallel tracks

```
Week:                 1   2   3   4   5   6   7   8   9   10
                      |   |   |   |   |   |   |   |   |   |
DESIGN  P1 atoms ────────────────●
        P3 prop desc       ──────────●
        P5 patterns                     ──────────────●
                                        |             |
JOIN POINTS              ●─────────────●  publish     ● ship #2
                                        |
CODE    P2 Code Connect ──────────────●
        P4 token bridge       ────●
        P6 cursor rules       ───●
        P7 validation                       ────●
        P8 visual regression                       ────●
```

| # | Phase | Owner | Time | LLM Quality |
|---|---|---|---|---|
| **1** | **Atom gap close + library publish** | Design | 2–3 wk | 70 → 78% |
| **2** | **Code Connect for atoms** (parallel after Wk 3) | Dev | 2–3 wk | 78 → 88% |
| **3** | **Per-property descriptions** (variants, booleans, text) | Design | 1 wk | 88 → 91% |
| **4** | **Token bridge clarity** | Dev | 2–3 d | 91 → 92% |
| **5** | **Pattern library (8–12 patterns)** ⭐ | Design + Dev | 2–3 wk | 92 → 96% |
| **6** | **Cursor rules (4 short docs)** | Dev | 2–3 d | 96 → 97% |
| **7** | **Type / lint enforcement + fixtures** | Dev | 1 wk | 97 → 98% |
| **8** | **Visual regression in CI** | Dev | 1 wk | safety net |

---

## Phase detail

### Phase 1 — Atom gap close + library publish

Five atoms missing entirely; three need promotion from drafts; library not yet published.

| Build new in Figma | Promote / fix | Add code-side too |
|---|---|---|
| Card | Dialog (from `playground/.Modal`) | Skeleton |
| Empty | Calendar (top-level atom) | Progress |
| Popover | Time-Input (top-level atom) | Collapsible |
| Separator | Sonner / Snackbars name align | AspectRatio |
| Toggle | | Scroll-Area (register existing) |

Apply the slot/naming conventions (`figma-slot-properties` skill) on every new atom from day one.

**Exit:** 34/34 atoms in parity, library published.

### Phase 2 — Code Connect for atoms

| Sub-phase | Atoms | Time |
|---|---|---|
| 2a — Top 10 | Button, Field/Text-*, SingleSelect, MultiSelect, Tabs, Tag, Tooltip, Badge, Checkbox, Radio | 1 wk |
| 2b — Remainder | All other atoms in registry | 1.5 wk |
| 2c — Phase 1 atoms | Card, Empty, Popover, Separator, Toggle, etc. | 0.5 wk |

**Exit:** running `npx figma connect publish` covers every registry atom.

### Phase 3 — Per-property descriptions

Apply the same audit pattern as slots, for **variants**, **booleans**, **text props**, and **instance-swap props**. Becomes the v2 of the `figma-slot-properties` skill.

**Exit:** 100% of properties on the top 20 atoms have inline descriptions.

### Phase 4 — Token bridge clarity

| Task |
|---|
| Document the QBDS token list (output `docs/tokens.md`) |
| Add cursor rule: "use semantic tokens, never raw colour or px values" |
| Verify Figma variable names match code variables |
| ESLint rule flagging hardcoded colours/spacing |

**Exit:** generated code uses `bg-surface-bg-accent` rather than `bg-gray-50`.

### Phase 5 — Pattern library (the multiplier)

Suggested 8 patterns:

1. Page header (title + breadcrumb + actions)
2. Empty state (illustration + message + CTA)
3. Filter bar (search + chips + sort)
4. Login form
5. Settings panel (sectioned form)
6. Dashboard shell (sidebar + topbar + content)
7. Search-with-results (search + list + pagination)
8. Confirmation dialog

Each pattern ships in **Figma + `registry:example` + Code Connect mapping**.

**Exit:** designer can drop any pattern in Figma; dev can `npx shadcn add <pattern>` to scaffold.

### Phase 6 — Cursor rules

Four short rule files at `.cursor/rules/`:

| File | Codifies |
|---|---|
| `components.md` | Atom selection guidance (use Field over Input directly, etc.) |
| `data-fetching.md` | TanStack Query patterns, error/loading shapes |
| `styling.md` | Token-only, density rules |
| `accessibility.md` | Required ARIA, focus management, keyboard flow |

### Phase 7 — Validation + fixtures

| Task |
|---|
| Tighten component prop types (no `any`; explicit unions) |
| ESLint custom rule: forbid hardcoded colour / spacing |
| Public fixture data: `public/fixtures/users.json`, `transactions.json` etc. |

**Exit:** LLM-generated code passes `npm run lint && tsc` first try in 90% of cases.

### Phase 8 — Visual regression in CI

Storybook stories for every atom + pattern; Chromatic or Playwright visual snapshots in CI.

---

## Outcomes by milestone

| End of week | "Build me X" prompts can produce |
|---|---|
| Wk 3 | Single screens with the right atoms, slightly off layouts |
| Wk 5 | Production-quality individual screens |
| Wk 8 | Multi-screen flows with proper composition |
| Wk 10 | Near-shippable application skeletons |

---

## Faster path (if 4 weeks > 10 weeks matters)

```
Wk 1–2: Phase 1 — atoms + publish (priority Card, Dialog, Empty)
Wk 1–2: Phase 2a — Code Connect top 10 atoms (parallel)
Wk 3:   Phase 6 (cursor rules) + Phase 4 (token bridge)
Wk 4:   Phase 5 — first 4 patterns (Page header, Empty state, Filter bar, Login)
```

Result: **~92% LLM quality after 4 weeks**. The remaining 7% takes the full plan but each percentage point gets harder to win.

---

## Resource model

- **1 designer** + **1 developer** in parallel — fits in 8 calendar weeks.
- **1 of each, sequential** — closer to 12 calendar weeks.
- **Solo (one person across both)** — 14–16 weeks; parallelisation lost.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| New atoms accumulate the same naming/slot debt | Apply `figma-slot-properties` skill from day 1 on every new atom |
| Code Connect mappings drift as Figma changes | Make Code Connect publish part of the library publish flow |
| Patterns become brittle to atom changes | Patterns reuse atoms via component instances, not copies |
| LLM still hallucinates because rules aren't read | Keep rules ≤ 100 lines each; prefer concrete examples over prose |
| Visual regression CI runs flaky | Bring in only after atoms + patterns stabilise (Phase 8 last) |

---

## Definition of done

The whole programme is "done" when:

1. A designer in Figma can build a screen using only QBDS components and patterns.
2. A developer can run `npx shadcn add <pattern>` to scaffold any of the 8 patterns.
3. Claude given a Figma URL or natural-language brief produces React code that:
   - Imports correct atoms by exact name
   - Uses semantic design tokens (no raw values)
   - Composes atoms via documented patterns
   - Passes type checks and lint rules first try in ≥ 90% of attempts
4. Visual regression CI catches drift before merge.

---

*Generated alongside the QBDS slot-properties cleanup work. Last updated alongside this plan.*
