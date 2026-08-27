# reference

## Description

Look up three references before building the API.

## Prompt

For component `{name}`, look up:

1. **Library recipe** — nearest match in the host component library
2. **Headless primitive** — docs for the underlying primitive
3. **Sibling** — closest existing component in the host repo

Return a short note per source:

```
library: <what to borrow — naming, file shape>
primitive: <behaviour, a11y, events>
sibling: <structure, styling patterns, public API shape>
```

Apply: structure from sibling, naming from library, behaviour from primitive.

## Output

Three reference notes. Feed into step `api`.
