# Captured Figma MCP — Tag (Tag-Dismissable)

Treat files under `mcp/` as offline stand-ins for live Figma MCP. Eval agents must **not** call live Figma MCP.

## Source

| Field           | Value                                                                              |
| --------------- | ---------------------------------------------------------------------------------- |
| File            | QBDS-v2.0.0                                                                        |
| fileKey         | `iuMWqCsIohoKAUB0tBS0xr`                                                           |
| Section node    | `34197:94082`                                                                      |
| Component set   | Tag-Dismissable                                                                    |
| Set node        | `34197:94087`                                                                      |
| Default variant | `34197:94148` (`type=primary, size=reg, outline=false, pill=false, state=enabled`) |
| Captured        | 2026-08-12                                                                         |

## MCP dumps (agent primary input)

1. `get_metadata` on section → [`mcp/section-index.xml`](mcp/section-index.xml)
2. `get_metadata` on Tag-Dismissable → [`mcp/get_metadata.xml`](mcp/get_metadata.xml)
3. `get_design_context` on default variant → [`mcp/get_design_context.md`](mcp/get_design_context.md)

## Optional distill

- [`props/alignment.md`](props/alignment.md)
- [`composition/slots.md`](composition/slots.md)
