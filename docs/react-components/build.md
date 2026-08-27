# build

## Description

Implement the component from spec, references, and approved API.

## Prompt

Implement `{component_path}` for `{name}`.

Inputs:

- Alignment table and variant × state matrix (step `spec`)
- Reference notes (step `reference`)
- Approved prop table and part list (step `api`)

Use the host styling system and tokens. Geometry comes from the variant × state matrix, not primitive defaults.

Do not add props beyond the approved API.

## Output

Component file at `{component_path}`.
