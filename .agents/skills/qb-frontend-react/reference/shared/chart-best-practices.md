# Charts

**Open when:** choosing chart type, writing titles, or styling/wiring charts — before ECharts (or other library) config.

**Also read:** [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) for card chrome · [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours) if you need the full upstream colour tables · dashboard card height / KPI / filters → [app-layout-archetypes.md](app-layout-archetypes.md#analytics--dashboard).

**Default library:** ECharts. Apply QBDS colours and ink **inline** in `setOption`. Do not use `echarts.registerTheme()`, theme JSON, or CDN theme files. Re-init (`dispose` + `init`) on dark/light toggle.

---

## 1. How to choose a chart

Work in this order:

1. Write the **one-sentence insight** the card must communicate (who / what changed / direction).
2. Name the **relationship** that sentence depends on (table below). One chart → one relationship.
3. Prefer the chart in **Prefer**. Only then configure ECharts.
4. If unsure → **bar or line**.

Taxonomy: [FT Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md).

| Relationship         | Story focus                           | Prefer                                                                          | Avoid                                          |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Change over time** | Trend, trajectory                     | Line (continuous); column (one series, discrete periods); fan (forecast + band) | Pie; overlapping area >2 series                |
| **Magnitude**        | Size of counts (not rates)            | Column (zero baseline); horizontal bar (long labels)                            | Truncated bar axis                             |
| **Deviation**        | Distance from zero / target / average | Diverging bar or stacked; filled line vs baseline                               | Omitting the reference point                   |
| **Ranking**          | Order matters more than exact gap     | Ordered bar/column; slope; lollipop                                             | Unsorted when rank is the point                |
| **Distribution**     | Spread, skew, frequency               | Histogram; box; strip                                                           | Unequal bin widths as columns                  |
| **Part-to-whole**    | Parts sum to a whole                  | Stacked ≤5; 100% stacked; treemap; waterfall                                    | Pie unless ≤5 readable slices; pie for trends  |
| **Correlation**      | How variables relate                  | Scatter; bubble; connected scatter                                              | Dual y-axis — split into two charts            |
| **Spatial**          | Geography is the story                | Choropleth (rates); proportional symbol (counts)                                | Choropleth of raw totals; map when a bar works |
| **Flow**             | Volume between stages                 | Sankey; waterfall; network                                                      | Too many nodes to read                         |
| **Few values (≤5)**  | Precise figures                       | KPI card or table                                                               | Decorative chart                               |

**Extra choice rules**

- **Change over time:** line for subtle trends; column needs zero baseline; stack area only (≤8 series); slope when the story is 2–3 time points.
- **Part-to-whole:** if readers only care about component size (not the total), use magnitude bars instead of stacks. Use 100% stacked to compare composition across groups.
- **Magnitude vs deviation:** magnitude = absolute size; deviation = vs a fixed reference. Match the insight sentence.
- **> ~4 series:** use small multiples (`grid` array or separate instances), identical scales — not one rainbow plot.

### Brief → chart (examples)

| Ask                              | Chart                                              | Why                              |
| -------------------------------- | -------------------------------------------------- | -------------------------------- |
| MAU, last 12 months              | Line                                               | Change over time                 |
| Revenue by 8 regions             | Ordered horizontal bar                             | Magnitude + ranking; long labels |
| Trade surplus/deficit by quarter | Diverging bar                                      | Deviation from zero              |
| Agree / neutral / disagree       | Diverging stacked bar                              | Deviation / sentiment            |
| Budget across 4 departments      | Stacked bar                                        | Part-to-whole; total matters     |
| Income vs life expectancy        | Scatter (bubble if 3rd var)                        | Correlation                      |
| Actual vs forecast               | Line — solid actual, dashed forecast (fan if band) | Change over time                 |
| Sales by state (per capita)      | Choropleth                                         | Spatial; rates                   |
| Fund flows between units         | Sankey                                             | Flow                             |
| Three KPIs                       | Three KPI cards                                    | Few values                       |

### Common comparison patterns

| Comparison                      | How to draw it                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **vs prior period (YoY / MoM)** | Two-series line (current solid, prior dashed) or side-by-side columns; same colour family, different opacity; index to 100 if scales differ |
| **vs target / plan**            | Labeled reference line, or bullet (actual + target marker). If the gap is the story → deviation chart                                       |
| **vs benchmark**                | Band or reference line; name the benchmark in the subtitle                                                                                  |

---

## 2. How to title the card

1. Turn the insight sentence into the **action title** (what changed / who / direction) — not a topic label.
2. Put units, range, and caveats in the **subtitle** (`text-fg-secondary` + `paragraph-small-primary`).

| Weak                 | Preferred                                    |
| -------------------- | -------------------------------------------- |
| Revenue by region    | EMEA revenue grew 12% while APAC flat        |
| Monthly active users | MAU declined for the third consecutive month |

Alt text on the chart = the same insight sentence.

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
  "#097DFE",
  "#6F39E3",
  "#05D0F0",
  "#0F766E",
  "#8C8DE9",
  "#11B883",
  "#E77EC2",
  "#C84189",
  "#C0CA33",
  "#3E495B",
];
```
