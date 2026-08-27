---
name: figma-to-react-code
description: Generic skill — spec, reference, api, build, tests. Portable layer only. Do not invoke when the host ships a binding skill. Do not use for updates to an existing component or token sync only.
disable-model-invocation: true
---

# figma-to-react-code

Turn a design-tool component set into a shippable React component. Run steps in order. Each step has one concern.

For updates to an existing component, use the host parity/review skill.

```
spec → reference → api → build → tests → {host exit gate}
```

## Steps

| Step        | Description                                                       | Doc                                                         |
| ----------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| `spec`      | Fetch the component set; alignment table + variant × state matrix | [spec.md](../../../docs/react-components/spec.md)           |
| `reference` | Library recipe, primitive docs, sibling                           | [reference.md](../../../docs/react-components/reference.md) |
| `api`       | Prop table + part list — show before build                        | [api.md](../../../docs/react-components/api.md)             |
| `build`     | Implement the component file                                      | [build.md](../../../docs/react-components/build.md)         |
| `tests`     | Functional smoke + behaviour                                      | [tests.md](../../../docs/react-components/tests.md)         |

Ask before continuing when: a design axis has no sensible React expression, sibling contradicts library naming, or a new token is needed.
