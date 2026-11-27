# Charts — QBDS styling

**Open when:** styling or wiring charts in a QBDS app. Choosing the chart type and writing titles: [qb-frontend-react charts.md](../../qb-frontend-react/reference/charts.md).

**Also read:** [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) for card chrome · [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) for the full upstream colour tables · dashboard card height / KPI / filters → [app-layout-archetypes.md](app-layout-archetypes.md#analytics--dashboard).

**Default library:** ECharts. Apply QBDS colours and ink **inline** in `setOption`. Do not use `echarts.registerTheme()`, theme JSON, or CDN theme files. Re-init (`dispose` + `init`) on dark/light toggle.

---

## 3. How to style the chart

### 3.1 Card and layout

- Put the chart in a `Card`: `bg-surface-primary border border-stroke-tertiary p-6`.
- Explicit plot height: **320px** default; **280px** minimum; **480px** for dense time series or scatter.
- Multi-chart row: `grid grid-cols-1 xl:grid-cols-2 gap-6`.
- Aspect: time series wide (≥3:1); scatter ~1:1; horizontal bar ~28px per category row (min ~200px total height).
- On narrow viewports, prefer horizontal bars over many vertical columns.

### 3.2 Which colour system

Pick **one** encoding that matches the data:

| Data meaning                                 | Use                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| Unrelated categories                         | **Qualitative** palette at chart root                                     |
| Low → high (no midpoint)                     | **Sequential** scale                                                      |
| Meaningful midpoint (above/below, sentiment) | **Diverging** scale (anchor `#C9D0D9` at neutral, often 0)                |
| Single-direction sentiment range             | `sequential_plus` / `sequential_minus`                                    |
| Increase / decrease / good / bad             | **Directional** `#00B5A9` / `#EA5748` only — not for arbitrary categories |

Never invent hex. Prefer values from DESIGN.md / the constants below.

**Qualitative assignment:** set `color: QBDS_QUALITATIVE` at the chart root and let the library cycle. Do **not** set per-series colours for categories. Per-item colour overrides only for directional/status meaning.

**Continuous fills** (heatmap, choropleth, bubble colour, treemap): key to normalised values (rates, %, z-scores) — not raw totals where population dominates.

### 3.3 Qualitative palette

```js
const QBDS_QUALITATIVE = [
  '#097DFE',
  '#6F39E3',
  '#05D0F0',
  '#0F766E',
  '#8C8DE9',
  '#11B883',
  '#E77EC2',
  '#C84189',
  '#C0CA33',
  '#3E495B',
];
```
