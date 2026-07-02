---
name: create-component
description: Build a QBDS registry component from Figma. Defaults to Plan mode (spec + screenshots, no code). Implement only on explicit request after plan approval. Branch component/<name>, shadcn naming, cross-library research. Triggers — "create component", "build from Figma", "plan component", figma.com URL + src/components/ui/.
---

# Create QBDS component

**Scope:** New/rebuilt UI in `src/components/ui/` from Figma. Skip code-only fixes, deps, CI.

## Default: Plan mode

| Mode          | Default?                                             | Writes code? |
| ------------- | ---------------------------------------------------- | ------------ |
| **Plan**      | Yes                                                  | No           |
| **Implement** | No — user says "implement" + plan `status: approved` | Yes          |

Never write component code on turn one.

---

## Plan loop (minimum 3 iterations)

After each draft of `docs/plans/<name>/<name>.md`:

1. Read the full plan as a reviewer
2. Run [checklist](#review-checklist) + [flexibility test](#flexibility-test)
3. Grep codebase for `data-slot` / export name collisions
4. Update skill if a new generic rule emerged
5. Rewrite plan; append one bullet to `## Review log`
6. Repeat until checklist passes **and** iteration count ≥ 3

Stop early only if iter 3 passes with zero checklist failures.

---

## Review checklist

| #   | Check                                                    | Fail → fix                                                 |
| --- | -------------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Every export matches shadcn name when reference exists   | Rename; stub unused — never delete                         |
| 2   | ≤1 new export per compound component                     | layout via `data-layout`, not new PascalCase               |
| 3   | No invented props when composition covers it             | children, `Collapsible`, `className`, `data-*`             |
| 4   | No new props if `data-*` + CSS vars work                 | `data-density` on root, not typed enum prop                |
| 5   | Figma booleans → composition                             | icon in children, not `withIcons`                          |
| 6   | Figma hierarchy → nesting                                | sub-components, not `hierarchy="secondary"`                |
| 7   | Figma slots → existing sub-components + `data-slot`      | no array props                                             |
| 8   | Visual state → cva `variant`/`size` or ancestor slot CSS | not one-off bool props                                     |
| 9   | Region styles → ancestor `[data-slot=…]` selector        | not per-item prop                                          |
| 10  | Dimensions → CSS vars on root Provider/wrapper           | override via `style` / `className`                         |
| 11  | **No `data-slot` name collisions**                       | grep `src/components/ui/`; never repurpose existing slots  |
| 12  | **Convention values match shadcn/cva**                   | `default`/`sm`/`lg`, not Figma-internal `reg`              |
| 13  | **Layout inference over consumer markers**               | left-nav grid targets existing Header/Footer/Content slots |
| 14  | Plan ≤250 lines                                          | merge tables; trim usage to two short examples max         |
| 15  | Usage copy-pasteable; shadcn docs shape                  | panel default + one variant layout                         |

Log every iteration under `## Review log`.

---

## API principles (all components)

1. **shadcn first** — same export names, composition, props where visuals allow.
2. **`data-*` + CSS vars before props** — extension surface; React props only as sugar → `data-*`.
3. **Style in cva + slot CSS** — Figma states → `variant`/`size` + `data-[active=true]` + tokens.
4. **Reuse existing `data-slot` names** — new layouts style known slots; never steal a slot for a new meaning.
5. **One layout knob** — `data-layout` on root; new layouts = new value, not new export.
6. **Keep reference API surface** — unused shadcn exports stay (no-op ok).
7. **Document override path** — every convention row notes `className` / `style` / var name.

### Flexibility test (per planned prop)

| question                          | if no → drop                  |
| --------------------------------- | ----------------------------- |
| Consumer override without fork?   | CSS var                       |
| New Figma variant needs new prop? | cva or `data-layout`          |
| Region-specific?                  | ancestor `data-slot` selector |
| shadcn already exposes it?        | reuse                         |
| Slot name already in codebase?    | pick inference, not rename    |

### Anti-patterns (all components)

| anti-pattern                                     | fix                                     |
| ------------------------------------------------ | --------------------------------------- |
| Figma boolean matrix → Provider props            | composition                             |
| Figma frame → new export                         | `data-layout` + existing slots          |
| Repurpose `data-slot`                            | grep; use layout CSS on existing slots  |
| Figma codenames in public API (`reg`, `LeftNav`) | shadcn names (`default`, `data-layout`) |
| Duplicate attrs on siblings                      | layout inference                        |
| `Open?` section                                  | autonomous `## Decisions` table         |

---

## Plan artifact

```
docs/plans/<name>/<name>.md
docs/plans/<name>/assets/*.png
```

Plan and assets live in the **same folder** — image refs use `./assets/<slug>.png`. Path: `docs/plans/sidebar/sidebar.md` not `docs/plans/sidebar.md` (file/folder collision breaks preview).

```yaml
---
component: sidebar
branch: component/sidebar
figma: [urls]
reference: <shadcn url>
status: draft | approved
---
```

---

## Plan writing rules

**Unsummarizable** — scannable in &lt;2 min.

**Do:** one-line goal · Figma PNGs · Map + API (one table each) · two short usage blocks · phases · review log · Decisions

**Don't:** filler · duplicate rejected-props table (fold into Decisions) · full variant matrix · unresolved questions

---

## Figma screenshots

1. `get_screenshot` per component set (`maxDimension` 400–800)
2. `mkdir -p docs/plans/<name>/assets && curl -sL -o docs/plans/<name>/assets/<slug>.png "<url>"`
3. Verify: `file docs/plans/<name>/assets/*.png` — must be PNG, not empty/HTML
4. Embed in plan as `./assets/<slug>.png` (plan at `docs/plans/<name>/<name>.md`)

Commit PNGs — MCP URLs expire ~7d; uncommitted assets = broken images in preview.

---

## Plan mode steps

1. Name — user → shadcn slug → Figma kebab-case
2. Branch — `component/<name>` (Implement only)
3. Figma — metadata, design context, descriptions
4. Screenshots → assets/
5. Cross-library — Adopt / Skip / Primitives
6. QBDS sibling — tokens/patterns
7. Write plan from [template](#plan-template)
8. **Review loop** — min 3 iterations
9. Pause — user approves or redirects

No `src/components/ui/` edits in Plan mode.

---

## Plan template

```markdown
# <Name>

<one line>

## Review log

## Figma

![...](<name>/assets/<slug>.png)

## Map

| Figma | React | override |

## API

exports · conventions (data-\*, CSS vars) · rejected (inline)

## Tokens

| Figma | utility |

## Usage

### default

### <variant layout>

## Phases

| Phase | build | done when |

## Decisions

| topic | choice | why |
```

---

## Naming & branch

```bash
git fetch origin main && git checkout -b component/<name> origin/main
```

| Concern | Convention                                             |
| ------- | ------------------------------------------------------ |
| Slug    | kebab-case                                             |
| Exports | PascalCase; shadcn when referenced                     |
| File    | `src/components/ui/<name>.tsx` or folder if >200 lines |

---

## Cross-library research

`"<component> shadcn ui"` · `"<component> radix"` · `"<component> base ui"` · `"<component> MUI"`

Adopt / Skip / Primitives — shadcn = API shape; Figma = visuals.

---

## Implement mode

Approved plan only. Phases A→D. Pause each phase. [figma-parity](../figma-parity/SKILL.md) · [code-connect](../code-connect/SKILL.md) in D.

---

## Related skills

[figma-parity](../figma-parity/SKILL.md) · [code-connect](../code-connect/SKILL.md) · [figma-token-sync](../figma-token-sync/SKILL.md)
