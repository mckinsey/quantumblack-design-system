---
name: create-qbds-component
description: End-to-end QBDS skill — spec through registry for a new component from Figma. Use when src/components/ui/<name>.tsx does not exist. Triggers — "add a new component", "create the <name> component", "build <name> from Figma", or a figma.com URL for a missing ui file. Do not use for updates (figma-parity), token sync (figma-token-sync), or Code Connect-only edits (code-connect).
---

# create-qbds-component

QBDS skill executor. Steps **1–4** and **6** follow [figma-to-react-code](../figma-to-react-code/SKILL.md). This skill adds **5, 7, 8** (demo, Code Connect, publish).

For updates, use [figma-parity](../figma-parity/SKILL.md).

## Checklist

```
- [ ] 0 exists — ls src/components/ui/{name}.tsx (stop → figma-parity if present)
- [ ] 1 spec
- [ ] 2 reference
- [ ] 3 api
- [ ] 4 build
- [ ] 5 demo
- [ ] 6 tests
- [ ] 7 code_connect
- [ ] 8 publish
- [ ] exit_gate
```

## Steps

**0. exists** — `ls src/components/ui/{name}.tsx`. If present, stop → [figma-parity](../figma-parity/SKILL.md).

| Step           | Doc                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spec`         | [react-components/spec.md](../../../docs/react-components/spec.md) + [qbds-react-components/spec.md](../../../docs/qbds-react-components/spec.md) + [figma-parity](../figma-parity/SKILL.md)       |
| `reference`    | [react-components/reference.md](../../../docs/react-components/reference.md) + [qbds-react-components/reference.md](../../../docs/qbds-react-components/reference.md)                              |
| `api`          | [react-components/api.md](../../../docs/react-components/api.md) + [props.md](../../../docs/qbds-react-components/props.md) + [composition.md](../../../docs/qbds-react-components/composition.md) |
| `build`        | [react-components/build.md](../../../docs/react-components/build.md) + [build.md](../../../docs/qbds-react-components/build.md)                                                                    |
| `demo`         | [demos.md](../../../docs/qbds-react-components/demos.md)                                                                                                                                           |
| `tests`        | [react-components/tests.md](../../../docs/react-components/tests.md) + [tests.md](../../../docs/qbds-react-components/tests.md)                                                                    |
| `code_connect` | [code-connect](../code-connect/SKILL.md)                                                                                                                                                           |
| `publish`      | [registry.md](../../../docs/qbds-react-components/registry.md)                                                                                                                                     |

Run `demo` before `tests` — tests smoke-render every demo example.

## exit_gate

Canonical — [figma-parity](../figma-parity/SKILL.md) defers here.

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse
```

Fix until all five pass. Triage individually when `&&` hides failures. `npm run prettier:fix` for format. Prop surface change → return to `api`, re-show table, continue forward.

Ask before continuing when: Figma axis has no sensible React expression, sibling contradicts shadcn naming, or a new token is needed.
