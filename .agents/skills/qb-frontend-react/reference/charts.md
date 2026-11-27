# Charts — choosing and titling

**Open when:** choosing chart type or writing card titles, before any chart-library config. Styling, colours and library wiring belong to the active design-system skill (for QBDS: `qbds-library` → `reference/charts.md`).

Default library: ECharts unless the host app already uses another.

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
2. Put units, range, and caveats in the **subtitle** (secondary text style from the design system).

| Weak                 | Preferred                                    |
| -------------------- | -------------------------------------------- |
| Revenue by region    | EMEA revenue grew 12% while APAC flat        |
| Monthly active users | MAU declined for the third consecutive month |

Alt text on the chart = the same insight sentence.
