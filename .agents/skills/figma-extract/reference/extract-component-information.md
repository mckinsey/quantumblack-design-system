Use `get_metadata` from the desktop Figma MCP. For each entry in `components` from step 1, call with that node’s id from `figmaLink`.

## Output format

```json
[
  {
    "name": "",
    "cssValue": {
      /**
       * Extract all NON properties based css styles i.e css values which are not changing based on properties
       **/
    },
    // find and record all properties of the components
    "properties": [
      {
        "name": "variant",
        "values": ["", ""],
        "default": "",
        "style": [
          {
            "key": "", // variant value
            "cssValue": {
              // css which is changing because of the key
            }
          }
        ]
      },
      ...
    ]
  }
]
```

- `name` — `components[].name` from step 1
