# Captured Figma MCP — Switch

Treat files under `mcp/` as offline stand-ins for live Figma MCP. Eval agents must **not** call live Figma MCP.

## Source

| Field                 | Value                                                |
| --------------------- | ---------------------------------------------------- |
| File                  | QBDS-v2.0.0                                          |
| fileKey               | `iuMWqCsIohoKAUB0tBS0xr`                             |
| Component set / frame | Switch                                               |
| Set node              | `34082:106669`                                       |
| Default variant       | `34082:106819` (`on=false, size=reg, state=enabled`) |
| Captured              | 2026-08-12                                           |

## MCP dumps (agent primary input)

1. `get_metadata` on Switch → [`mcp/get_metadata.xml`](mcp/get_metadata.xml)
2. `get_design_context` on default variant with **`disableCodeConnect: true`** → [`mcp/get_design_context.md`](mcp/get_design_context.md)

## Optional distill

- [`props/alignment.md`](props/alignment.md)
- [`composition/slots.md`](composition/slots.md)
