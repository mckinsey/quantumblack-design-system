Use `get_metadata` from the Desktop Figma MCP. For each name in `mainComponents` from step 1, walk the matching layers and `components` to build a JSX-like hierarchy (element names from Figma layer names, nesting from parent/child order).

## Output format

```jsonc
[
  {
    "name": "",
    "jsxStructure": "<MainComponent>\n  <Title />\n  <!-- additional children -->\n</MainComponent>",
  },
]
```

- `name` — entry from `mainComponents` in step 1
