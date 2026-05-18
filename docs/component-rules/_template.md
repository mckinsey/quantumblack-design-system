---
component: "{{kebab-name}}"            # e.g. "button", "data-table"
display-name: "{{PascalName}}"          # the exported React symbol
status: "stable"                        # stable | beta | deprecated
last-updated: "YYYY-MM-DD"
registry-name: "{{registry-id}}"        # the entry in registry.json
figma:
  file-key: "iuMWqCsIohoKAUB0tBS0xr"
  page: "❖ ⎯ {{Page Name}}"             # the Figma page hosting the component
  primary-node-id: "{{node-id}}"        # the canonical component / component-set
code-connect:
  mapped: false                          # true once `*.figma.tsx` exists
  file: "src/components/ui/{{kebab-name}}.figma.tsx"  # planned path
related:                                 # cross-links to sibling cards
  - "{{related-component-1}}"
  - "{{related-component-2}}"
---

# {{PascalName}}

> One-line elevator pitch. The kind of sentence a designer or engineer would say when justifying the component's existence. Drop adjectives. Keep concrete.

## Purpose

Two to three sentences. What problem does this component solve, what's the affordance it offers, and what's its single job? If you can't say it in three sentences, the component is doing too much.

## When to use

- Use case 1, phrased as a concrete user goal (not a design adjective).
- Use case 2.
- Use case 3.

## When not to use

- Anti-use case 1, with a redirect: `{{wrong-pattern}} -> use {{better-component}} instead`.
- Anti-use case 2.

## Anatomy

The exported sub-components and `data-slot` attributes that compose this component.

| Sub-component         | data-slot        | Required? | Notes                                                      |
| --------------------- | ---------------- | --------- | ---------------------------------------------------------- |
| `{{ComponentName}}`   | `{{slot-name}}`  | yes       | Root wrapper.                                              |
| `{{SubComponentA}}`   | `{{slot-name}}`  | optional  | Brief contextual note.                                     |

If the component is a single primitive (e.g. `Button`), drop the table and write a one-line note instead.

## API surface

Use the data from `public/api/{{kebab-name}}.json` as the source of truth.

| Prop       | Type                                  | Default     | Notes                                                  |
| ---------- | ------------------------------------- | ----------- | ------------------------------------------------------ |
| `variant`  | `"default" \| "{{...}}"`              | `"default"` | Visual treatment. Each variant maps to a Figma variant. |
| `size`     | `"default" \| "{{...}}"`              | `"default"` | Sizing scale. Each size maps to a Figma `size=` axis.  |
| `asChild`  | `boolean`                             | `false`     | If true, merges props into the immediate child via Radix `Slot`. |

If the component does not use `cva`, document the relevant `data-*` attributes and class hooks instead.

## Hard rules

Numbered, imperative, testable. Each rule must be falsifiable — an LLM or a linter should be able to flag a violation.

1. **{{rule-1}}** — one sentence stating the rule, then "Why: {{rationale}}".
2. **{{rule-2}}** — ditto.
3. **{{rule-3}}** — ditto.

Aim for 4–8 hard rules. More than 10 means the component is unclear or you're padding.

## Soft rules

Looser preferences. Violations are a code smell, not an error.

- {{soft-rule-1}}.
- {{soft-rule-2}}.

## Composition patterns

Two to four named patterns that the component is designed for. Each pattern: one heading, one paragraph of context, one code block referencing real QBDS imports.

### Pattern: {{descriptive-name}}

Brief context. When/why this pattern applies.

```tsx
import { {{ComponentName}} } from '@/components/ui/{{kebab-name}}';

<{{ComponentName}} variant="default">
  {{example-children}}
</{{ComponentName}}>
```

### Pattern: {{another-pattern}}

...

## Accessibility contract

Concrete, non-negotiable a11y requirements:

- **Keyboard**: which keys do what. (e.g. `ESC` closes; `Tab` moves focus; `Enter` activates.)
- **ARIA**: which roles and attributes are applied automatically vs. what the consumer must supply.
- **Focus**: where does focus go when the component opens / closes / changes state.
- **Contrast**: which token guarantees AA/AAA contrast in which mode.
- **Screen reader**: the announcement order and any `aria-label` / `sr-only` requirements.

If a requirement only applies in a sub-component, scope it: `DialogTitle: ...`.

## Tokens used

The semantic CSS variables this component reads from. Only list tokens used in the component's own classes; do not list tokens consumed transitively.

| Role                | Token                                                          |
| ------------------- | -------------------------------------------------------------- |
| Foreground          | `--color-fg-primary`                                           |
| Background          | `--color-surface-bg-primary`                                   |
| Hover state layer   | `--color-stateslayer-overlay-hover`                            |

## Code Connect

State the current mapping status and the planned file path.

- **Status**: `not-mapped` | `partial` | `mapped`
- **File**: `src/components/ui/{{kebab-name}}.figma.tsx`
- **Figma node**: `https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr?node-id={{node-id}}`
- **Mapping notes**: any quirks (e.g. "Figma `size=reg` maps to code `size='default'`").

If a Figma component has multiple variants per code prop, list each one as a separate `figma.connect` block in the planned mapping file.

## Anti-patterns

Concrete BAD / GOOD pairs. Each pair must be runnable code, not pseudo-code.

### BAD

```tsx
{{bad-example}}
```

Reason: {{why-this-breaks}}.

### GOOD

```tsx
{{good-example}}
```

Reason: {{why-this-works}}.

Aim for 2–4 pairs. Pick the failures most likely to occur in real code (especially: hardcoded hex, wrong `size` mapping, ignoring `asChild` for links, missing `aria-*`).

## Migration notes

Only when the component has changed shape recently or has a deprecated alternative. Otherwise omit this section.

- `{{deprecated-name}}` -> `{{ComponentName}}` (since {{date}}). Codemod: `{{path-or-link}}`.

## Related components

Cross-links to siblings the consumer might confuse this with.

- `{{Sibling}}` — when to reach for it instead.
- `{{ParentPattern}}` — composition recipe that uses this component.

---

## Authoring notes (delete in the published card)

- **Tone**: imperative for rules, descriptive for context. No marketing language.
- **No emojis.** Anywhere. Use plain words for status (`Done`, `Open question`, `Blocked`).
- **Token names** must match `src/styles/globals.css`. If a token doesn't exist, flag it as an open issue rather than inventing one.
- **Code snippets** import from `@/components/ui/{{kebab-name}}` (the registry path). Avoid relative paths in examples.
- **Length target**: 800–1500 words. Longer cards are usually a sign of a component that should be split.
- **Update the front matter**, especially `last-updated`, `code-connect.mapped`, and `figma.primary-node-id`. The front matter is the only machine-readable contract.
