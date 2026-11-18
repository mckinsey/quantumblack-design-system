## About

This page is a set of examples. Data table is not a component, so there is nothing to add with the CLI and no `DataTable` import.

Install Table, then copy the example you need from its code tab.

Search and sorting live in the example. They use TanStack Table (`useReactTable`, with sorted and filtered row models). Table only draws the rows. Row selection stays in the example as well.

Simple list and usage and metrics start sorted on the first text column. Each header sorts its own column. The toolbar Sort button toggles the column that is currently sorted. Settings toggles every column after the first. The first column stays visible. The search field filters every cell in the row.

Draggable rows starts in manual order. Drag a row by the handle to move it, using the same dnd-kit setup as the TanStack Table row example. A sort applies until the next drag, which keeps the dropped order.

Usage summary and Roadmap are read-only. They do not search or sort.
