Use get_metadata, get_screenshot from desktop figma mcp to understand the structure of the page at a high level.

## Output format

```json
{
  "mainComponents": [""], // main component(s) on the figma link, usually 1 or 2 component
  "description": "", // description of what is happening on the whole figma
  "figmaFrames": [
    {
      "link": "",
      "description": ""
    }
  ],
  "components": [
    // all components present including main components
    {
      "name": "",
      "figmaLink": ""
    }
  ]
}
```

- `description` — top-level frame
- `figmaFrames[].description` — each frame
