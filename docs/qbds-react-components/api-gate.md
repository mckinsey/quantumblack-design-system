# api_gate

Gate before `build`. Run after [props.md](./props.md) and [composition.md](./composition.md).

- Output export list (one-line purpose each) + demo plan (`examples[]` names and what each proves)
- Trim exports and demo plan per [composition.md](./composition.md) and [demos.md](./demos.md)
- Stop if exports exceed shadcn baseline + QBDS axes from the alignment table
- Stop if the demo plan splits axis values or `show*` toggles into separate examples
- Confirm with the user before moving to `build`
