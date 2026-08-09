# QBDS Maturity & AI-Readiness Audit

**Repository:** `mckinsey/quantumblack-design-system`
**Audited:** 9 August 2026, against working tree at commit `6431e18` (`chore(tidy): Add codespace devcontainer for PR doc preview (#127)`)
**Scope:** Read-only. No files were modified other than this report.
**Method:** Full repo walk; read `CLAUDE.md`, all three `.agents/skills/*/SKILL.md`, `registry.json`, `components.json`, `figma.config.template.json`, `package.json`, `CONTRIBUTING.md`, both CI workflows, `docs/TOKENS.md`, `docs/DESIGN.md`, `src/styles/globals.css`; sampled components `button.tsx`, `dialog.tsx`, `input.tsx`, `field.tsx`, `select.tsx`, `textarea.tsx`, `icon-shell.tsx`, `tag.tsx`, `sidebar.tsx`, `time-input.tsx`; scripted coverage diffs across `registry.json` ↔ `src/components/ui/` ↔ `public/r/` ↔ `public/api/` ↔ `code-connect/` ↔ `src/tests/` ↔ demos.

---

## 1. Executive summary

QBDS is a well-run design system with unusually strong Figma-to-code discipline and a genuinely good agent-skill layer — the `figma-parity` skill (`.agents/skills/figma-parity/SKILL.md`, 152 lines) is better than most published examples of its kind, encoding anti-patterns, a variant × state matrix, and an acceptance checklist rather than vague advice. The token system is coherent and well documented: 505 CSS custom properties in `src/styles/globals.css` and a 283-line `docs/TOKENS.md` that maps every semantic variable to its Tailwind utility _and_ its upstream Figma name, with per-row AA contrast guidance — the Figma-name column is a real asset most systems lack. Structural naming is predictable enough that an agent can guess correctly: kebab-case filenames match registry names, `data-slot` is near-universal, and 21 components export their `cva` variants.

The weaknesses are concentrated in three places. First, **the machine-readable surface is thin and partly unreachable**: tokens exist only as CSS and markdown (no DTCG/JSON export), 92% of generated prop descriptions in `public/api/*.json` are empty because only 12 of 45 components carry JSDoc, all generated artifacts are gitignored, there is no `llms.txt` anywhere, `public/robots.txt` is a blanket `Disallow: /`, and the one MCP affordance in the repo (`src/components/registry/mcp-tabs.tsx`) is written but never imported, so no user or agent ever sees it. Second, **automated enforcement stops at the conventions that were easy to test**: the registry-dependency and token-parser tests are genuinely good drift gates, but nothing prevents the drift that actually exists — 11 components still carry stock shadcn utilities (`bg-accent`, `text-muted-foreground`, `bg-background`) that resolve through an undocumented alias layer at `globals.css:391-409`, 13 hand-roll typography the skills forbid, 17 components have no test, 3 exist in `src/components/ui/` but are absent from `registry.json`, and there is no a11y or visual-regression gate of any kind. Third, **versioning is absent**: zero git tags, no `CHANGELOG.md`, no changesets, and `package.json` frozen at `0.0.1-beta.1` — for a copy-the-source registry this means a consuming project (or an agent updating one) has no signal whatsoever about what changed or what broke.

Two findings will actively mislead an agent today and should be fixed first. `CLAUDE.md:9`, `README.md:3`, and `CONTRIBUTING.md:11-16` all state the system is built on Radix UI, but the codebase is mid-migration to Base UI — 14 components already import `@base-ui/react` and the last ten weeks of commits are explicitly Base UI migrations, so an agent following the documented convention will reach for the wrong primitive. And `CONTRIBUTING.md` links four times to `.cursor/rules/*.mdc`, which `.gitignore:5` excludes from the repository — those links are broken in every fresh clone, and the `.cursor` copies that do exist locally are stale forks of the `.agents/skills/` versions.

Overall: **strong design-system fundamentals, above-average agent scaffolding, weak machine-readable output and weak automated enforcement.** Most of the gap is closable with a day of documentation fixes plus two or three focused engineering initiatives; none of it requires re-architecting the system.

---

## 2. Rubric scorecard

| #   | Criterion                                 | Rating      | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Gap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ----------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Machine-readable design tokens            | **Partial** | 505 CSS custom properties across `:root` (`globals.css:417`), `.dark` (`:528`), and `@theme inline` (`:10`). `docs/TOKENS.md` (283 lines) is markdown tables with columns `CSS variable / Tailwind / Use for / Design name` — the Design-name column maps to Figma variables. `src/lib/tokens.ts:1` imports `TOKENS.md?raw` and parses it at build time.                                                                                                                                                                                                                                                                                                       | No DTCG/W3C JSON, no typed token export, no committed `tokens.json`. `src/lib/tokens.ts` parses **colours only** — `COLOR_DOC_END = '## Typography'` (`tokens.ts:20`) means typography, radius, spacing tables never reach the runtime `Token[]`. A second, conflicting token snapshot exists as hardcoded hex/`Inter, sans-serif` YAML in `docs/DESIGN.md:1-254`, wired to nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2   | Structured component metadata             | **Partial** | `registry.json` — 47 items with `title`, `description`, `dependencies`, `registryDependencies`, `files`. `scripts/generate-api-docs.ts:40-51` emits `{type, defaultValue, description, required}` per prop to `public/api/*.json`, with unions flattened to readable strings (`:59-67`). `scripts/extract-examples.ts` emits copy-pasteable TSX to `public/examples/*.json`. 21 components export `*Variants` from `cva`.                                                                                                                                                                                                                                      | 192/208 props (**92.3%**) have empty `description`; only 12/45 component files contain any JSDoc; only 9 files export a named `*Props` type. **Zero** registry items carry `categories`, `docs`, or `meta`. 10 descriptions are placeholder-thin (`"A badge component."`, `"A dialog component."`, `"A switch component."`). `collapsible`, `menubar`, `progress` exist in `src/components/ui/` but are **absent from `registry.json`**. `public/r/` holds stale `data-table.json` and `empty.json` with no registry source. All artifacts gitignored (`.gitignore:25-27`) → unavailable until built.                                                                                                                                                                                                                                                                                                                                                                                            |
| 3   | Design-to-code fidelity (Code Connect)    | **Partial** | 59 mappings in `code-connect/`, all committed. Template-based `figma.config.template.json` + `scripts/generate-figma-config.ts` keeps Figma URLs out of git — a genuinely good pattern. `.env.example` carries 58 `FIGMA_URL_*` placeholders; all 55 tokens used by templates are present (no missing keys). Actively maintained: 8 of the last 20 commits touch Code Connect.                                                                                                                                                                                                                                                                                 | **21 of 45 components have no mapping**: `calendar`, `card`, `collapsible`, `combobox`, `dialog`, `dropdown-menu`, `input`, `input-group`, `label`, `menubar`, `popover`, `progress`, `scroll-area`, `segmented-controls`, `separator`, `sheet`, `skeleton`, `table`, `time-input`, `time-picker`, `toolbar`. 4 files still use the parser style the repo's own skill calls deprecated (`accordion`, `alert`, `aspect-ratio`, `context-menu` `.figma.tsx`, all using `figma.connect()`; see `.agents/skills/code-connect/SKILL.md:10`). 3 orphan env keys (`FIGMA_URL_QBDS_ACCORDION`, `_ACCORDION_ITEM`, `_ASPECT_RATIO`) with no template consuming them. `npm run figma:parse` is not run in CI.                                                                                                                                                                                                                                                                                              |
| 4   | Agent-facing entry points                 | **Partial** | `CLAUDE.md` (159 lines) is committed and its 6 documented commands all exist in `package.json`. Three high-quality committed skills: `figma-parity` (152 lines), `code-connect` (145), `figma-token-sync` (104). `figma-parity` encodes explicit anti-patterns ("Red flag: shared `focus-visible:… data-[state=open]:…` classes with no focus-vs-open Figma comparison", `:118`) and a 16-item acceptance checklist. `package.json:37` auto-symlinks skills into `.claude/skills/` on install.                                                                                                                                                                 | **No `llms.txt` or `llms-full.txt` anywhere** (repo, `public/`, `index.html`, `dist/`) — confirmed absent. No `AGENTS.md`. `CLAUDE.md:9` says "built on Radix UI" — 14 components import `@base-ui/react` and the migration is ongoing. Broken relative links in 2 of 3 committed skills: `figma-parity/SKILL.md:14-15` and `figma-token-sync/SKILL.md` link `docs/TOKENS.md` and `src/styles/globals.css`, which resolve relative to `.agents/skills/<name>/` and do not exist. `CLAUDE.md` omits `test`, `typecheck`, `test:e2e`, `tokens:check`, `figma:*` from its command list, and its PR checklist omits tests even though `.husky/pre-commit` runs them. No guidance anywhere on the shadcn alias layer, so agents copying `dialog.tsx` propagate off-convention tokens.                                                                                                                                                                                                                 |
| 5   | Programmatic access (MCP)                 | **Missing** | No MCP server implementation in the repo (0 matches for `modelcontextprotocol`). `src/components/registry/mcp-tabs.tsx` generates a valid `npx -y shadcn@canary registry:mcp` config pointing at `/r/registry.json` — but **it is never imported** (0 references outside its own file), so it is dead code and the installation page has no MCP section.                                                                                                                                                                                                                                                                                                       | Agents must clone and grep. The deployed registry JSON _would_ work with shadcn's registry MCP today, but that path is undocumented and unsurfaced. `public/robots.txt` is `User-agent: *` / `Disallow: /`, reinforced by `noindex, nofollow, noarchive, nosnippet` in `index.html:6-8` — agents that browse the docs site are blocked. **Question:** is the crawler block deliberate pre-GA policy, or a leftover? It materially limits agent access and is worth an explicit decision.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 6   | Naming conventions                        | **Strong**  | kebab-case filenames match registry item names 1:1 (44/47, the 3 exceptions being `utils`/`theme`/examples). `data-slot` used pervasively and predictably (`dialog-content`, `field-description`, `time-input-trigger`). Token families are semantic and consistently prefixed: `surface-*`, `fill-*`, `text-*`, `border-*`, `status-*`, `stateslayer-overlay-*`, `elevations-*`, each with a documented `-inverse` form. Typography is class-based and self-describing (`paragraph-regular-primary`, `cta-button-02`, `headings-h2-semibold`). `TOKENS.md:67` and `:83` explicitly document the two bridge renames.                                           | Two guessing hazards, both documented but still hazards: `--text-*` surfaces as `text-fg-*` and `--border-*` as `border-stroke-*`, so an agent generating from CSS variable names alone guesses wrong. The undocumented shadcn alias layer means two valid names exist for the same colour (`bg-accent` ≡ `bg-fill-subtle`). Code Connect filenames follow no single rule (`tooltip-multiple-lines.figma.ts` → token `QBDS_TOOLTIP_MULTI`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 7   | Automated drift / consistency enforcement | **Partial** | Real gates exist: `src/tests/registry-dependencies.test.ts:151` cross-checks that UI/icon imports in shipped files match registry metadata — a genuine drift gate. `registry-deps.test.ts` verifies every `registryDependencies` entry resolves. `tokens-from-docs.test.ts` (13 assertions) validates the TOKENS.md ↔ globals.css parse and that every non-pattern token resolves to 8-digit hex. `figma-url-gitleaks.test.ts` + `scripts/secret-scan.sh` + `.gitleaks.toml` block committed Figma URLs. `.husky/pre-commit` runs lint + typecheck + unit + secretscan. `.github/workflows/pr.yml` runs 4 parallel jobs (test / build / lint+typecheck / e2e). | No **token lint**: nothing stops `bg-accent` (`skeleton.tsx:9`, `menubar.tsx:59,242`), `text-muted-foreground` (`dialog.tsx:127`), `bg-background` (`sheet.tsx:63`, `sidebar.tsx:363,380`), or hand-rolled typography (`dialog.tsx:114` `text-lg leading-none font-semibold`), all of which the skills forbid. **No visual regression.** **No a11y gate.** No CI check that every `src/components/ui/*.tsx` is registered (3 aren't), has a demo (4 registry items lack one: `scroll-area`, `separator`, `sheet`, `skeleton`), or has a test (17 don't). `npm run figma:parse` absent from CI. `registry:build` does not clean `public/r/`, so stale outputs persist.                                                                                                                                                                                                                                                                                                                            |
| 8   | Versioning & changelogs                   | **Missing** | `package.json:3` — `"version": "0.0.1-beta.1"`. `package.json:137-139` declares `"files": ["public/r/*.json"]`, implying publish intent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **0 git tags. No `CHANGELOG.md`. No `.changeset/`. No release workflow.** The version string has never been bumped. Because consumers copy source rather than install a package, there is no version stamp in the copied files either — an agent updating a consuming project has literally nothing to diff against and cannot tell a breaking change from a patch. Note also that `"files"` points at `public/r/`, which `.gitignore:25` excludes, so an `npm publish` from a clean clone would ship nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 9   | Governance                                | **Partial** | `CONTRIBUTING.md` (148 lines) covers stack, commands, env vars, project structure, add-a-component steps, tokens, CI/CD, and a PR checklist. `CODEOWNERS`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE.txt` (Apache-2.0) all present. Two CI workflows with least-privilege `permissions:` blocks and concurrency cancellation.                                                                                                                                                                                                                                                                                                                              | **No component lifecycle metadata anywhere** — 0 matches for experimental/stable/deprecated across `registry.json`, `src/components/ui/`, and docs. An agent cannot tell that `collapsible`/`menubar`/`progress` are unregistered on purpose vs. by oversight. `CODEOWNERS` is a single catch-all line (`* @6-people`) with no path-scoped ownership. No PR template, no issue templates, no `.github/dependabot.yml` despite dependabot PRs in history (**question:** org-level config?). `CONTRIBUTING.md` has four broken links to gitignored `.cursor/rules/` (`:101`, `:111`, `:120`, `:148`), describes mappings as `*.figma.tsx` (`:45`, `:69`) when the convention is `.figma.ts`, and describes `npm run test` as "unit tests + build + lint" when it also runs typecheck and is not what CI invokes.                                                                                                                                                                                   |
| 10  | Accessibility as data                     | **Partial** | 28 of 45 components delegate to Radix or Base UI primitives. `icon.tsx:48` hardcodes `aria-hidden` on the glyph. `field.tsx:277-279` — `FieldError` is `role="alert" aria-live="assertive"`. `sonner.tsx:109-111` switches `role`/`aria-live` on toast type. `textarea.tsx:223-234` wires `aria-invalid`, `aria-describedby`, and `id` from context. `TOKENS.md:65,76-79,102` encode contrast as data per row ("AA-compliant 4.5:1"; `status-*` marked not-AA and text-forbidden). ~90 `getByRole` queries and ~32 aria assertions across 21 test files; `toolbar.test.tsx` and `slider.test.tsx` test keyboard navigation.                                    | **Zero a11y tooling** — no `axe-core`, `jest-axe`, `eslint-plugin-jsx-a11y`, `pa11y`, or lighthouse config; `eslint.config.mjs` loads only typescript-eslint, unused-imports, and prettier. **A11y is not typed**: no discriminated union requires `aria-label` on icon-only button sizes (`button.tsx:205` accepts `size: 'icon'` with no naming constraint), and `alt` is optional on `AvatarImage` (`avatar.tsx:144`). Concrete unlabelled icon-only controls: `time-input.tsx:477-499` (`TimeInputTrigger`) and `combobox.tsx:62-75` (`ComboboxClear`). `field.tsx:183-190` — `FieldDescription` generates no `id` and wires no `aria-describedby`, so `Input` gets no description link while `Textarea` does (inconsistent). `tag.tsx:214-221` builds a `div role="button"` with no required accessible name. `skeleton.tsx:5-11` has no `aria-hidden`/`aria-busy`. 17 components have no test file. `e2e/docs-smoke.spec.ts` is docs navigation only — no a11y scan, no visual regression. |

**Tally:** 1 Strong · 8 Partial · 1 Missing

---

## 3. Quick wins

Each completable in well under a day. Ranked by impact ÷ effort.

### Tier 1 — correctness of what agents read (do these first)

**QW-1. Fix the Radix/Base UI staleness.** _Impact: high · Effort: 10 min_
`CLAUDE.md:9`, `README.md:3`, `CONTRIBUTING.md:11-16` all say the system is built on Radix UI. 14 components import `@base-ui/react` (`button`, `checkbox`, `select`, `slider`, `switch`, `tabs`, `toggle`, `radio-group`, `avatar`, `accordion`, `combobox`, `field`, `tag-toggle`, `button-group`) and the last ten weeks of commits are Base UI migrations (`#101`, `#103`, `#106`, `#107`, `#108`, `#109`, `#110`, `#126`). State both, and say which is the target for new work. An agent following the current text picks the wrong primitive on its first try.

**QW-2. Repoint the four broken CONTRIBUTING links.** _Impact: high · Effort: 5 min_
`CONTRIBUTING.md:101`, `:111`, `:120`, `:148` link to `.cursor/rules/figma-parity.mdc` and `.cursor/rules/figma-token-sync.mdc`. `.gitignore:5` excludes `.cursor` — these files are not in the repository. Point them at `.agents/skills/figma-parity/SKILL.md` and `.agents/skills/figma-token-sync/SKILL.md`, matching what `CLAUDE.md:29` already does correctly.

**QW-3. Fix the broken relative links inside the committed skills.** _Impact: high · Effort: 5 min_
`.agents/skills/figma-parity/SKILL.md:14-15` and the equivalent lines in `.agents/skills/figma-token-sync/SKILL.md` link `docs/TOKENS.md` and `src/styles/globals.css`. From `.agents/skills/<name>/` these resolve to non-existent paths; they need `../../../`. The `.cursor` forks got this right (`../../docs/TOKENS.md`), the committed versions did not. This breaks the first instruction of the skill ("Sources of truth — read before styling").

**QW-4. Retire the stale `.cursor/rules/*.mdc` forks.** _Impact: medium-high · Effort: 15 min_
`.cursor/rules/figma-parity.mdc` (111 lines) is an older fork of `.agents/skills/figma-parity/SKILL.md` (152 lines) — it lacks the `text-status-*` guidance, the field-chrome table, the spacing-verification rules, and the "Code Connect is not source of truth" reversal. Both are loaded by Cursor. Since `.cursor` is gitignored, the drift is invisible in review and unfixable for other contributors. Either delete the forks and rely on `.agents/skills/` discovery, or un-ignore `.cursor/rules/` and make it a generated symlink like `package.json:37` already does for `.claude/skills/`.

**QW-5. Fix the `.figma.tsx` / `.figma.ts` contradiction.** _Impact: medium · Effort: 10 min_
`CONTRIBUTING.md:45` and `:69` describe mappings as "flat `*.figma.tsx` files". `.agents/skills/code-connect/SKILL.md:10` says that style is deprecated and new files must be `.figma.ts`. 55 of 59 files follow the skill; `CONTRIBUTING.md` documents the exception as the rule.

### Tier 2 — cheap machine-readable surface

**QW-6. Surface the MCP config that already exists.** _Impact: high · Effort: 30 min_
`src/components/registry/mcp-tabs.tsx` is written, correct, and imported by nothing. Render `<MCPTabs>` on `src/app/(registry)/docs/installation/page.tsx` and every agent user gets a one-click path to the registry over MCP instead of cloning. This is the single highest-leverage change relative to effort in the whole report.

**QW-7. Add `public/llms.txt`.** _Impact: high · Effort: 1-2 hr_
Absent today. A ~50-line index pointing at `/r/registry.json`, `/api/index.json`, `/examples/index.json`, `docs/TOKENS.md`, and the composition rules, plus the three non-obvious conventions (`text-fg-*` bridge, `border-stroke-*` bridge, `IconShell`+`Icon` pairing) would give any agent a correct first-try mental model. Consider `llms-full.txt` with the TOKENS.md tables inlined.

**QW-8. Document the shadcn alias layer in `docs/TOKENS.md`.** _Impact: medium-high · Effort: 30 min_
`globals.css:391-409` aliases 12 stock shadcn names onto QBDS semantics (`--color-accent: var(--fill-subtle)`, `--color-muted-foreground: var(--text-secondary)`, `--color-ring: var(--border-status-focus)`, …). None appear in `TOKENS.md`. The result is that 11 components legitimately use utilities the token guide implicitly forbids, and an agent has no way to know whether `bg-accent` is an interop affordance or a bug. **Question:** is this layer intentional shadcn interop that should be documented and kept, or a migration leftover that should be burned down? The answer determines whether QW-8 is "document it" or turns into roadmap item E. Recommend documenting it as _interop-only, not for new QBDS components_.

**QW-9. Clean stale registry build output.** _Impact: medium · Effort: 5 min_
`public/r/data-table.json` and `public/r/empty.json` have no corresponding entry in `registry.json` — leftovers from removed items that `npx shadcn build` does not clean. Any agent enumerating `public/r/` gets two phantom components. Prefix `registry:build` in `package.json:20` with `rm -rf public/r`.

**QW-10. Fill the 10 placeholder registry descriptions.** _Impact: medium · Effort: 1 hr_
`badge`, `card`, `dialog`, `popover`, `radio-group`, `sonner`, `switch`, `table`, `tabs`, `toggle` all read like `"A badge component."`. Compare to the good ones (`button-group`, `time-input`, `tag`, `toolbar`) which state variants, defaults, and exported sub-components in one sentence — exactly what an agent needs to choose a component without reading source. `registry.json` descriptions are the highest-read-rate metadata in the repo.

**QW-11. Resolve the three unregistered components.** _Impact: medium · Effort: 30 min_
`collapsible`, `menubar`, `progress` exist in `src/components/ui/` but not in `registry.json`, so they cannot be installed and do not appear on the docs site. Either register them or add an explicit exclusion note. **Question:** deliberate (not yet Figma-verified) or oversight? Note the correlation: these three plus `sheet`/`skeleton`/`scroll-area` are also the components carrying the most stock-shadcn tokens and no Code Connect mapping, which suggests "not yet migrated" — worth stating that explicitly rather than leaving it inferable.

### Tier 3 — targeted a11y and hygiene

**QW-12. Add default accessible names to two icon-only controls.** _Impact: medium · Effort: 20 min_
`src/components/ui/time-input.tsx:477-499` (`TimeInputTrigger`) and `src/components/ui/combobox.tsx:62-75` (`ComboboxClear`) render icon-only buttons with no `aria-label` or `sr-only` fallback. Every sibling gets this right — `alert.tsx:99` (`sr-only` "Close"), `sonner.tsx:93` (`aria-label="Close toast"`), `sidebar.tsx:327` (`sr-only` "Toggle Sidebar"). Match the pattern.

**QW-13. Add `eslint-plugin-jsx-a11y`.** _Impact: medium · Effort: 1-2 hr_
Absent from `eslint.config.mjs`. Adding it in `recommended` mode catches the `div role="button"` in `tag.tsx:214` and the click-handler-on-div in `input-group.tsx:184-195` at lint time, and prevents regression. Expect a handful of initial violations; scope to `src/components/ui/` first if the demo layer is noisy.

**QW-14. Remove or wire the three orphan Figma env keys.** _Impact: low-medium · Effort: 15 min_
`FIGMA_URL_QBDS_ACCORDION`, `FIGMA_URL_QBDS_ACCORDION_ITEM`, `FIGMA_URL_QBDS_ASPECT_RATIO` in `.env.example` have no template consuming them — residue from the four un-migrated `.figma.tsx` files. Either migrate those four to templates (which needs the keys) or drop the keys.

**QW-15. Tag a release and start a changelog.** _Impact: medium · Effort: 1 hr_
`git tag v0.0.1-beta.1` on the current main and create `CHANGELOG.md` with a Keep-a-Changelog header. Not a full release process (see roadmap F), but it establishes the anchor point that currently does not exist.

---

## 4. Strategic roadmap

### A. Emit DTCG-format tokens as a build artifact — **Effort: M**

**Problem:** Tokens exist only as 505 CSS custom properties plus markdown prose. Any external tool — a token pipeline, a Figma Variables sync, a non-React consumer, an agent generating styles for a different framework — has to reverse-engineer `globals.css` and parse `TOKENS.md` tables. `src/lib/tokens.ts` already does exactly this parse, but keeps the result in memory and only for colours (`tokens.ts:20` cuts off at `## Typography`).
**Approach:** Extend the existing parser into a build step emitting W3C DTCG JSON (`$value`/`$type`/`$description`, `{alias.reference}` for the primitive→semantic chain, light/dark as modes) to `public/tokens.json`, covering colour, typography, radius, spacing, and elevation. Commit the output or publish it alongside the registry. Fold `docs/DESIGN.md`'s YAML block (`:1-254`) into it or delete that block — a second hardcoded token snapshot with `Inter, sans-serif` and raw hex is a live drift risk.
**Unlocks:** roadmap D; kills the second-source-of-truth problem; makes the Figma Variables round-trip in `figma-token-sync` mechanical rather than manual.

### B. Component metadata + lifecycle in the registry — **Effort: M**

**Problem:** No component declares its status, category, a11y contract, or Figma node. An agent cannot distinguish stable from unmigrated, and cannot tell why `menubar` is missing from the site. Zero of 47 items carry `categories`, `docs`, or `meta`.
**Approach:** Extend each `registry.json` item with `categories` (form / overlay / navigation / display / feedback), `meta.status` (`experimental` | `stable` | `deprecated`, with `deprecatedBy`), `meta.figmaNode`, `meta.a11y` (required labels, keyboard contract, role), and `meta.since`. Define a JSON Schema and validate it in CI. Surface status as a badge on the docs site and in `public/r/*.json`.
**Solves:** rubric criteria 2 and 9 simultaneously; makes the "is this ready to use?" question answerable without reading git history.

### C. JSDoc pass to activate the API-docs pipeline — **Effort: M**

**Problem:** `scripts/generate-api-docs.ts` works correctly and already flows JSDoc through — `checkbox.tsx:109-127` proves it, producing rich per-prop descriptions with `@default` annotations. But only 12 of 45 files carry any JSDoc, so 92.3% of props in `public/api/*.json` have `"description": ""`. The most valuable AI-facing artifact in the repo is 8% populated.
**Approach:** Author JSDoc on the ~33 files lacking it, prioritising the high-traffic ones (`button`, `dialog`, `select`, `input`, `field`, `table`, `sidebar`). Document variant semantics, not just names — "`accent`: QB brand accent, use for the single primary action on a page" beats restating the union. Add a CI check that new exported props carry a description.
**Why it ranks high:** pure authoring effort, no architecture, and it directly raises the quality of what agents read at install time. Pairs naturally with QW-10.

### D. Ship an MCP server for the registry — **Effort: S (documented) → M (bespoke)**

**Problem:** Agents must clone and grep. Nothing exposes components, tokens, or composition rules to agent tooling.
**Approach, staged:**

1. _(S, do now — this is QW-6)_ Surface the existing `MCPTabs` shadcn `registry:mcp` config on the installation page. Zero new code.
2. _(M, after A and B)_ A first-party QBDS MCP exposing: `list_components` (with lifecycle + category filters), `get_component` (props, variants, examples, a11y contract, Figma node), `get_tokens` (DTCG, filterable by family, light/dark), `search_tokens` (by intent — "background for a side panel"), and `get_composition_rules` (the guidance currently living in `.cursor/skills/qbds-composition/`).
   **Prerequisite:** A and B, otherwise the server exposes the same thin metadata over a nicer transport.
   **Also decide:** `public/robots.txt` blanket `Disallow: /` and the `noindex` in `index.html:6-8`. If the intent is that agents _should_ be able to reach the docs, that policy needs revisiting; if it is deliberate pre-GA, MCP becomes the only sanctioned access path and should be prioritised accordingly.

### E. Automated drift gates — **Effort: M → L**

**Problem:** Every convention the skills document is enforced by human review only, and measurable drift already exists.
**Approach, in ascending cost:**

1. **Token lint (S-M).** A CI script or custom ESLint rule banning, in `src/components/ui/`: the 12 stock shadcn aliases (unless the interop decision in QW-8 says otherwise), hand-rolled typography (`text-sm`/`font-*`/`leading-*` outside the `@utility` definitions), primitives (`slate-*`, `mist-*`), arbitrary colour (`bg-[#…]`), and arbitrary px spacing. Baseline the current 11 + 13 violating files as an allowlist and burn down. This turns the strongest written convention in the repo into a machine check.
2. **Coverage gates (S).** Assert every `src/components/ui/*.tsx` is in `registry.json`, every registry item has a demo, every exported component has a test. Current failures: 3, 4, and 17 respectively. Extend `src/tests/registry-dependencies.test.ts`, which already does work of exactly this shape.
3. **A11y gate (M).** `@axe-core/playwright` across the demo routes — the Playwright harness and per-component demo pages already exist, so this is mostly wiring. Gate on serious/critical.
4. **Visual regression (M-L).** Playwright screenshot comparison over the same demo routes, in light and dark. This is the enforcement mechanism the `figma-parity` skill's "≥2px" rule assumes but does not have.
5. **`npm run figma:parse` in CI (S).** Catches broken Code Connect templates before publish; verify it exits cleanly with empty `FIGMA_URL_*` values first, since `generate-figma-config.ts` skips empties.

### F. Versioning and release process — **Effort: S-M**

**Problem:** 0 tags, no changelog, version frozen at `0.0.1-beta.1`. A consuming project that copied `button.tsx` three months ago has no way to know what changed, and neither does an agent asked to update it.
**Approach:** Adopt changesets (or equivalent), enforce a changeset on PRs touching `src/components/ui/` or `registry.json`, generate `CHANGELOG.md`, tag releases, and — critically for a copy-the-source registry — stamp a version into each `public/r/*.json` item so a consumer can compare what they hold against current. Fix `package.json:137-139`, which points `files` at gitignored `public/r/`. Write the changelog in a shape an agent can act on: breaking changes should name the prop or export that changed.

### G. Code Connect to full coverage + CI parse gate — **Effort: M**

**Problem:** 21 of 45 components have no Figma mapping, and 4 use a deprecated parser style the repo's own skill forbids. Figma Dev Mode shows generic codegen instead of QBDS snippets for nearly half the library, which is precisely where design-to-code agents get their first impression.
**Approach:** Migrate the 4 `.figma.tsx` files to templates, then work through the 21 uncovered components in traffic order (`input`, `dialog`, `dropdown-menu`, `table`, `card`, `popover` first). Add `figma:parse` to CI (see E5). Note the strong correlation between "no Code Connect", "not in registry", and "carries stock shadcn tokens" — these are the same un-migrated tail, and one sweep per component closes all three.

### H. Agent documentation surface — **Effort: S-M**

**Problem:** No `llms.txt`, no `AGENTS.md`, docs site uncrawlable, and the substantial composition guidance in `.cursor/skills/qbds-composition/` (4 reference files on component selection, composition rules, UI patterns, and dos-and-don'ts) is gitignored and therefore invisible to everyone but its author.
**Approach:** Ship `llms.txt` and `llms-full.txt` (QW-7); promote `qbds-composition` into `.agents/skills/` so it is committed and discoverable; add `AGENTS.md` (or symlink to `CLAUDE.md`) for Cursor/Codex convention parity; revisit the robots policy. Consider generating `llms-full.txt` from `registry.json` + `TOKENS.md` in `registry:build` so it cannot go stale.

### Suggested sequencing

| Phase     | Items                                                          | Rationale                                            |
| --------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| Week 1    | All Tier-1 and Tier-2 quick wins                               | Removes actively misleading guidance; near-zero risk |
| Weeks 2-4 | C (JSDoc), E1-E2 (token lint + coverage gates), F (versioning) | Highest AI payoff per unit effort; no dependencies   |
| Weeks 4-8 | A (DTCG), B (lifecycle metadata), G (Code Connect)             | Prerequisites for D; also close criteria 1, 2, 3, 9  |
| Weeks 8+  | D (MCP server), E3-E4 (a11y + visual gates), H (docs surface)  | Highest ceiling, depends on the above                |

---

## 5. Appendix — file-level evidence

### A5.1 Coverage arithmetic

| Set                                     | Count                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| Files in `src/components/ui/`           | 45                                                                                |
| Items in `registry.json`                | 47 (44 `registry:ui`, 2 `registry:example`, 1 `registry:theme`, 1 `registry:lib`) |
| Files in `public/r/`                    | 50                                                                                |
| Files in `public/api/`                  | 49                                                                                |
| Mappings in `code-connect/`             | 59 (55 `.figma.ts` templates, 4 legacy `.figma.tsx`)                              |
| Test files in `src/tests/`              | 34 (29 component, 5 infrastructure)                                               |
| Demo files in `src/app/demo/[name]/ui/` | 44                                                                                |
| CSS custom properties in `globals.css`  | 505                                                                               |

**In `src/components/ui/` but not `registry.json`:** `collapsible`, `menubar`, `progress`
**In `public/r/` but not `registry.json`:** `data-table`, `empty` _(stale build output)_
**Registry items with no demo:** `scroll-area`, `separator`, `sheet`, `skeleton`
**Components with no test file (17):** `aspect-ratio`, `collapsible`, `combobox`, `icon`, `input-group`, `label`, `menubar`, `popover`, `progress`, `scroll-area`, `segmented-controls`, `separator`, `sheet`, `sidebar`, `skeleton`, `time-input`, `time-picker`
**Components with no Code Connect mapping (21):** `calendar`, `card`, `collapsible`, `combobox`, `dialog`, `dropdown-menu`, `input`, `input-group`, `label`, `menubar`, `popover`, `progress`, `scroll-area`, `segmented-controls`, `separator`, `sheet`, `skeleton`, `table`, `time-input`, `time-picker`, `toolbar`
**Registry items with placeholder descriptions (10):** `badge`, `card`, `dialog`, `popover`, `radio-group`, `sonner`, `switch`, `table`, `tabs`, `toggle`

Note the overlap: `collapsible`, `menubar`, `progress`, `scroll-area`, `separator`, `sheet`, `skeleton` recur across almost every gap list. This is one un-migrated tail, not seven independent problems.

### A5.2 Token drift — stock shadcn utilities in `src/components/ui/`

Alias definitions, `src/styles/globals.css:391-409`:

```
--color-background: var(--surface-base);
--color-foreground: var(--text-primary);
--color-card: var(--surface-primary);
--color-popover: var(--surface-primary);
--color-primary: var(--fill-active);
--color-secondary: var(--fill-tertiary);
--color-muted: var(--fill-muted);
--color-muted-foreground: var(--text-secondary);
--color-accent: var(--fill-subtle);
--color-accent-foreground: var(--text-primary);
--color-destructive: var(--status-error);
--color-border: var(--border-divider);
--color-input: var(--border-secondary);
--color-ring: var(--border-status-focus);
```

None of these 12 appear in `docs/TOKENS.md`. They resolve correctly at runtime — these are not broken classes — but they are a parallel vocabulary the token guide does not acknowledge.

Usage, 24 occurrences across 11 files:

| File                | Hits | Examples                                                                                                       |
| ------------------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| `menubar.tsx`       | 9    | `:59` `bg-accent text-accent`, `:106` `text-destructive bg-destructive`, `:242` `bg-accent`                    |
| `sheet.tsx`         | 4    | `:63` `bg-background`, `:77` `ring-ring ring-offset-background`, `:114` `text-foreground`, `:127` `text-muted` |
| `sidebar.tsx`       | 2    | `:363`, `:380` `bg-background`                                                                                 |
| `dialog.tsx`        | 2    | `:71` `data-[state=open]:bg-accent text-muted-foreground`, `:127` `text-muted-foreground`                      |
| `skeleton.tsx`      | 1    | `:9` `bg-accent`                                                                                               |
| `scroll-area.tsx`   | 1    | `:20` `ring-ring`                                                                                              |
| `dropdown-menu.tsx` | 1    | `:131` `text-destructive`                                                                                      |
| `context-menu.tsx`  | 1    | `:125` `text-destructive`                                                                                      |
| `combobox.tsx`      | 1    | —                                                                                                              |
| `badge.tsx`         | 1    | `:24` `ring-destructive`                                                                                       |
| `avatar.tsx`        | 1    | —                                                                                                              |

Hand-rolled typography (`text-xs|sm|base|lg|xl`, `font-*`, `leading-*`) — forbidden by `figma-parity/SKILL.md:29` — appears in 13 files: `sidebar.tsx` (9), `menubar.tsx` (7), `combobox.tsx` (7), `input-group.tsx` (3), `table.tsx` (2), `sheet.tsx` (2), `input.tsx` (2), `dialog.tsx` (2), `card.tsx` (2), `textarea.tsx` (1), `label.tsx` (1), `icon.tsx` (1), `field.tsx` (1).

Clean on the harder checks: **zero** raw hex or arbitrary colour (`bg-[#…]`), **zero** arbitrary px spacing (`gap-[Npx]`) anywhere in `src/components/ui/`. The core convention holds; the drift is confined to unmigrated stock-shadcn files.

Representative example — `src/components/ui/dialog.tsx:63-74`, still substantially stock shadcn:

```
'bg-surface-primary … bg-black/50 …'      // :41 raw black, QBDS token available
'text-fg-secondary ring-offset-background  // :71 mixed QBDS + stock in one string
 focus:ring-ring data-[state=open]:bg-accent
 data-[state=open]:text-muted-foreground'
'text-lg leading-none font-semibold'       // :114 hand-rolled; headings-h4-semibold exists
'text-muted-foreground text-sm'            // :127 hand-rolled; paragraph-regular-secondary exists
```

### A5.3 Agent-facing files

| Path                                                                                                 | Committed?              | Lines     | Assessment                                                                                                                 |
| ---------------------------------------------------------------------------------------------------- | ----------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE.md`                                                                                          | Yes                     | 159       | Commands accurate; stack line stale (Radix only); icon section disproportionately long; no token-drift or Base UI guidance |
| `.agents/skills/figma-parity/SKILL.md`                                                               | Yes                     | 152       | Excellent — anti-patterns, variant × state matrix, field-chrome table, 16-item checklist. Two broken links (`:14-15`)      |
| `.agents/skills/code-connect/SKILL.md`                                                               | Yes                     | 145       | Excellent — env-var conventions, SLOT patterns, reference examples. No broken links                                        |
| `.agents/skills/figma-token-sync/SKILL.md`                                                           | Yes                     | 104       | Good. Two broken links                                                                                                     |
| `.cursor/rules/figma-parity.mdc`                                                                     | **No** (`.gitignore:5`) | 111       | Stale fork of the above; linked 4× from `CONTRIBUTING.md`                                                                  |
| `.cursor/rules/figma-token-sync.mdc`                                                                 | **No**                  | 103       | Stale fork                                                                                                                 |
| `.cursor/skills/qbds-composition/`                                                                   | **No**                  | 5 files   | Substantial composition guidance, invisible to the team                                                                    |
| `.cursor/skills/qb-frontend-design/`, `qb-frontend-dev/`, `mds-design-system/`, `design-code-gap-*/` | **No**                  | ~50 files | Significant local-only skill investment                                                                                    |
| `.claude/skills/*`                                                                                   | **No** (generated)      | symlinks  | Created by `package.json:37` `skills:link` on install — correct pattern                                                    |
| `llms.txt` / `llms-full.txt`                                                                         | —                       | —         | **Absent everywhere**                                                                                                      |
| `AGENTS.md`                                                                                          | —                       | —         | **Absent**                                                                                                                 |

### A5.4 CI, tests, and enforcement

`.github/workflows/pr.yml` — 4 parallel jobs on PR and push to main: `test` (`npm run test:unit`), `build`, `lint` (ESLint + Prettier + `tsc --noEmit`), `e2e` (Playwright). Least-privilege `permissions: contents: read`, concurrency cancellation, node from `.nvmrc`.
`.github/workflows/deploy-pages.yml` — build + GitHub Pages deploy on main.
`.husky/pre-commit` → `npm run precommit` → lint + typecheck + unit tests + secret scan, in parallel.

Existing drift gates worth preserving:

- `src/tests/registry-dependencies.test.ts:130` — every `registry:ui` item includes `theme` in `registryDependencies`
- `src/tests/registry-dependencies.test.ts:151` — UI/icon imports in shipped files match registry metadata
- `src/tests/registry-deps.test.ts:13` — all `registryDependencies` resolve
- `src/tests/tokens-from-docs.test.ts` — 13 assertions on the TOKENS.md ↔ globals.css contract, including that every non-pattern token resolves to 8-digit hex
- `src/tests/figma-url-gitleaks.test.ts` + `scripts/secret-scan.sh` + `.gitleaks.toml` — blocks committed Figma URLs

Absent: token lint, visual regression, a11y scan, `figma:parse` in CI, registry/demo/test coverage gates, `.github/dependabot.yml`, PR template, issue templates, release workflow.

### A5.5 Generated artifacts

| Artifact                 | Producer                                               | Committed            | Content quality                                                       |
| ------------------------ | ------------------------------------------------------ | -------------------- | --------------------------------------------------------------------- |
| `public/r/*.json`        | `npx shadcn build` + `scripts/inject-registry-urls.ts` | No (`.gitignore:25`) | Good — full source, resolved deps                                     |
| `public/api/*.json`      | `scripts/generate-api-docs.ts`                         | No (`:26`)           | Structure good, content thin — 192/208 props have empty `description` |
| `public/examples/*.json` | `scripts/extract-examples.ts`                          | No (`:27`)           | Good — self-contained, Prettier-formatted TSX                         |
| `assets/css/qbds.css`    | `npm run assets:build`                                 | Yes                  | Compiled Tailwind for non-React consumers                             |
| `figma.config.json`      | `scripts/generate-figma-config.ts`                     | No (`.gitignore`)    | Correct — keeps URLs out of git                                       |

Because all three JSON artifact sets are gitignored, they exist only after a build. Any agent working from a fresh clone must run `npm run registry:build` before the machine-readable layer exists at all — worth stating explicitly in `CLAUDE.md`.

### A5.6 Open questions for the team

These are flagged as questions rather than findings because the intent is genuinely ambiguous from the repo alone:

1. **Is the shadcn alias layer (`globals.css:391-409`) intentional interop, or migration residue?** Determines whether QW-8 is a documentation task or the seed of a burn-down.
2. **Are `collapsible`, `menubar`, `progress` deliberately unregistered** (not yet Figma-verified) or an oversight? Either way it should be stated in metadata rather than left inferable.
3. **Is `robots.txt: Disallow: /` plus `noindex` deliberate pre-GA policy?** It is the single biggest constraint on agent access to the docs site and should be an explicit decision, not a default.
4. **Is dependabot configured at org level?** PRs exist in history (`#114`, `#119`, `#120`, `#124`, `#125`) but there is no `.github/dependabot.yml`.
5. **Is `docs/DESIGN.md`'s YAML block (`:1-254`) still live?** It carries hardcoded hex and `Inter, sans-serif` and is wired to no route or script. If it feeds an external consumer that matters for roadmap A; if not, it is a drift risk worth deleting.
6. **Is npm publication intended?** `package.json:137-139` declares `files: ["public/r/*.json"]`, but that directory is gitignored, so publishing from a clean clone would ship nothing.
