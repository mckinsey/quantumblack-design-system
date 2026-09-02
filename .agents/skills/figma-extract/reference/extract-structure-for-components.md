Use `get_metadata` from the desktop Figma MCP. For each name in `mainComponent` from step 1, walk the matching layers and `components` to build a JSX-like hierarchy (element names from Figma layer names, nesting from parent/child order).

## Output format

```json
[
  {
    "name": "",
    "jsxStructure": "<MainComponent>\n  <Title />\n  ...\n</MainComponent>"
  }
]
```

- `name` — entry from `mainComponent` in step 1
