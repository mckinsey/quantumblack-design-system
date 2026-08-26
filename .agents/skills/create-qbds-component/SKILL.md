---
name: create-qbds-component
description: End-to-end workflow for adding a new QBDS component from a Figma spec — parity, prior art, props/composition, demos, tests, Code Connect, registry. Use when creating a component that does not exist yet in src/components/ui/. Triggers — "add a new component", "create the <name> component", "build <name> from Figma", or a figma.com component-set URL for a missing ui file. Do not use for updates to an existing component (figma-parity), token sync only (figma-token-sync), or Code Connect-only edits (code-connect).
---

# Create a QBDS component

Self-contained — everything you need is below. [figma-to-react-code](../figma-to-react-code/SKILL.md) is the portable, host-agnostic copy of this workflow: reference only, not a dependency.

For updates to an existing component, use [figma-parity](../figma-parity/SKILL.md) instead.

## Bindings

| Slot      | QBDS                                                                  |
| --------- | --------------------------------------------------------------------- |
| Component | `src/components/ui/<name>.tsx`                                        |
| Demo      | `src/app/demo/[name]/ui/<name>.tsx`                                   |
| Tests     | `src/tests/<name>.test.tsx`                                           |
| Primitive | Base UI (migration in progress — see [CLAUDE.md](../../../CLAUDE.md)) |
| Styling   | Tailwind + `cva` + [docs/TOKENS.md](../../../docs/TOKENS.md)          |
| Publish   | `registry.json` → `npm run registry:build`                            |
| Exit gate | see below                                                             |

## Checklist

Copy this into your reply and tick items off as you go:

```
- [ ] 0 Confirmed src/components/ui/<name>.tsx does not exist
- [ ] 1 Spec — alignment table + variant × state matrix   (NO CODE YET)
- [ ] 2 Prior art — shadcn, Base UI, closest sibling
- [ ] 3 API — prop table + part list SHOWN to the user
- [ ] 4 Build
- [ ] 5 Demo
- [ ] 6 Tests
- [ ] 7 Code Connect
- [ ] 8 Registry
- [ ] Exit gate passes clean
```

## Steps

> **Two hard gates.** Steps 0–3 produce the spec; nothing is written before that.
>
> - **MUST NOT** write any component, demo, or test file before the step 3 prop table and part list have been shown.
> - **MUST NOT** infer the spec when no Figma URL was given — ask for it.

**0. Exists?** — `ls src/components/ui/<name>.tsx`. If it exists, **stop** and use [figma-parity](../figma-parity/SKILL.md) instead; this skill is for new components only.

1. **Spec** — [figma-parity](../figma-parity/SKILL.md): _Structure & variants_ → _Tokens_ → _Layout, spacing, typography & states_ on the component set. Stop at alignment table + variant × state matrix; visual pass after step 5. No code.
2. **Prior art** — shadcn (`npx shadcn@latest search <name>`, then `docs` / `view` on the match), Base UI docs (`https://base-ui.com/react/components/<name>`), closest sibling in `src/components/ui/`. Structure from sibling, naming from shadcn, behaviour from primitive.
3. **API** — [props.md](../../../docs/components/props.md) + [composition.md](../../../docs/components/composition.md). Show prop table and part list before building. Diverging from shadcn needs a one-line Figma reason.
   - Prefer React/shadcn prop names over Figma property names.
   - `show*` booleans and slot instances → children or named parts, never new props.
   - No public `state="…"` enum — interaction states belong in CSS and `data-*` attributes.
   - Figma style axis → `variant`; size axis → `size`.
   - Shared axes (`size`, `variant`, …) → root props or context; parts read them.
   - Dismiss and actions → a part plus callback, not a show boolean.
   - Group frames in Figma → demo composition only, never a leaf prop.
4. **Build** — [build.md](../../../docs/components/build.md).
5. **Demo** — [demos.md](../../../docs/components/demos.md).
   - `examples[0]` = simplest usable form; one example per axis.
   - Cover every row in the alignment table.
6. **Tests** — [tests.md](../../../docs/components/tests.md).
   - Demo smoke: render every demo example without crashing.
   - Behaviour: click, disabled, remove, `data-*` attributes as needed.
   - Assert roles, aria, callbacks.
   - Skip CSS classes, colours, `cva` output, keyboard matrices.
7. **Code Connect** — [code-connect](../code-connect/SKILL.md).
8. **Registry** — [registry.md](../../../docs/components/registry.md).

## Exit gate

Canonical for all component work — [figma-parity](../figma-parity/SKILL.md) defers to this.

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse
```

Fix until all five pass — do not stop at the first failure (`&&` hides the rest; run them individually when triaging). `npm run lint` is check-only: use `npm run prettier:fix` for formatting failures. If a fix changes the prop surface, return to **step 3**, re-show the table, then continue forward.

Ask before continuing when: a Figma axis has no sensible React expression, sibling contradicts shadcn naming, or a new token is needed.
