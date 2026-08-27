# api

## Description

Decide props and composition from the alignment table. Show before build.

## Prompt

From the alignment table for `{name}`, decide the React API.

Return a markdown artifact:

```markdown
## Prop table

| Prop | Type | Default | Notes |

## Part list

| Part | Role |
```

Rules:

- Prefer library prop names over design-tool property names
- Interaction states → CSS / data attributes, not a new public state prop (unless the library already ships one)
- Shared variant axes → root props or context; parts read them
- Optional chrome, slots, and nested groups in the design file → parts or children — host binding defines the mapping

Show the prop table and part list to the user.

Do not write component, demo, or test files until both are shown.

## Output

Prop table + part list approved (implicitly or explicitly) before step `build`.
