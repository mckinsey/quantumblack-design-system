# QBDS v2.0.0 — Figma Component Checklist

Canonical reference of every published component in the QBDS Figma library, cross-referenced against code exports in `src/components/ui/`.

## Source of truth

| | |
|---|---|
| Figma file | `QBDS v2.0.0` |
| Figma file key | `iuMWqCsIohoKAUB0tBS0xr` |
| Figma URL | https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0 |
| Registry root | `src/components/ui/` |
| Code Connect config | `figma.config.json` |

## Publish state

| | Count |
|---|---|
| Public (visible in Assets panel) | 78 |
| Hidden internals (`.base/*`) | 8 |
| Total component sets in file | 86 |

## Naming conventions

- **Singular PascalCase** for single-concept components (`Avatar`, `Button`, `IconShell`, `AlertBanner`, `RangeSlider`).
- **Hyphen** for variant pairs and group wrappers (`Button-Icon`, `Tag-Toggle`, `Tags-Dismissable`, `InputGroup-Horizontal`).
- **Slash** for category trees in Figma (`Badge/Numeric`, `Field/Text-Filled`, `Tooltip/OneLine`).
- **Leading dot** `.base/*` for hidden internals (not shown in Assets panel).

## Public components

Each row shows the Figma component name, the matching React export in `src/components/ui/`, and Code Connect mapping status.

### Alerts and feedback

| Figma | Code | Code Connect |
|---|---|---|
| `AlertBanner` | `Alert` | unmapped |
| `Snackbars` | `Toaster` / `toast` | unmapped |

### Layout and media

| Figma | Code | Code Connect |
|---|---|---|
| `AspectRatio` | *(none — candidate for new code component)* | n/a |
| `DataTable-Starter` | `Table` | unmapped |

### Avatars

| Figma | Code | Code Connect |
|---|---|---|
| `Avatar` | `Avatar` | unmapped |
| `GroupStacked` | `AvatarGroup` | unmapped |

### Badges

| Figma | Code | Code Connect |
|---|---|---|
| `Badge/Dot+Label` | `StatusBadge` | unmapped |
| `Badge/Hint-Dot` | *(dot-only, no code yet)* | n/a |
| `Badge/Icon+Label` | `Badge` *(with icon prop)* | unmapped |
| `Badge/Label-Only` | `Badge` | unmapped |
| `Badge/Numeric` | `NumericBadge` | unmapped |

### Buttons

| Figma | Code | Code Connect |
|---|---|---|
| `Button` | `Button` | unmapped |
| `Button-Icon` | `Button` *(iconOnly prop)* | unmapped |
| `Button-Split` | *(none — candidate)* | n/a |
| `ButtonsGroup/CTAs` | *(composition pattern, no single code component)* | n/a |
| `IconButton-Split` | *(none — candidate)* | n/a |
| `ToolBar-Button` | *(none — candidate)* | n/a |

### Selection controls

| Figma | Code | Code Connect |
|---|---|---|
| `Checkbox` | `Checkbox` | unmapped |
| `CheckboxGroup/Item` | `Checkbox` + `Label` | unmapped |
| `CheckboxGroup/List Horizontal` | *(composition)* | n/a |
| `CheckboxGroup/List Vertical` | *(composition)* | n/a |
| `RadioButton` | `RadioGroupItem` *(primitive)* | unmapped |
| `RadioGroup/Item` | `RadioGroupItem` | unmapped |
| `RadioGroup/List Horizontal` | `RadioGroup` | unmapped |
| `RadioGroup/List Vertical` | `RadioGroup` | unmapped |
| `Switch` | `Switch` | unmapped |

### Fields (inputs)

| Figma | Code | Code Connect |
|---|---|---|
| `Field/DateRange-Filled` | *(Calendar + custom input)* | n/a |
| `Field/DateRange-Ghost` | *(Calendar + custom input)* | n/a |
| `Field/DateSingle-Filled` | *(Calendar + custom input)* | n/a |
| `Field/DateSingle-Ghost` | *(Calendar + custom input)* | n/a |
| `Field/MultiSelect-Filled` | `Combobox` | unmapped |
| `Field/MultiSelect-Ghost` | `Combobox` | unmapped |
| `Field/SingleSelect-Filled` | `Select` | unmapped |
| `Field/SingleSelect-Ghost` | `Select` | unmapped |
| `Field/Stepper-Filled` | *(none — candidate)* | n/a |
| `Field/Stepper-Ghost` | *(none — candidate)* | n/a |
| `Field/Text-Filled` | `Input` *(variant=filled)* | unmapped |
| `Field/Text-Ghost` | `Input` *(variant=ghost)* | unmapped |
| `Field/TextVariant-Filled` | `Input` *(variant)* | unmapped |
| `Field/TextVariant-Ghost` | `Input` *(variant)* | unmapped |
| `Field/Time-Filled` | `TimeInput` | unmapped |
| `Field/Time-Ghost` | `TimeInput` | unmapped |

### Field elements

| Figma | Code | Code Connect |
|---|---|---|
| `Elements/Characters-Counter` | `TextareaCounter` | unmapped |
| `Elements/Help-Text` | `FieldDescription` / `FieldError` | unmapped |
| `Elements/Label` | `Label` / `FieldLabel` | unmapped |
| `Elements/Status-Messages` | *(covered by Field components)* | n/a |

### Input groups

| Figma | Code | Code Connect |
|---|---|---|
| `InputGroup-Horizontal` | `InputGroup` | unmapped |
| `InputGroup-Vertical` | `InputGroup` | unmapped |
| `DropdownGroup/Horizontal` | *(composition)* | n/a |
| `DropdownGroup/Vertical` | *(composition)* | n/a |
| `PickerGroup/Horizontal` | *(composition)* | n/a |
| `PickerGroup/Vertical` | *(composition)* | n/a |

### Text area

| Figma | Code | Code Connect |
|---|---|---|
| `Textarea-Input` | `Textarea` / `TextareaRoot` | unmapped |

### Forms

| Figma | Code | Code Connect |
|---|---|---|
| `Form` | `Form` | unmapped |

### Icons

| Figma | Code | Code Connect |
|---|---|---|
| `IconShell` | `IconShell` | **mapped** (`src/components/ui/icon-shell.figma.tsx`) |

### Menus

| Figma | Code | Code Connect |
|---|---|---|
| `Menu/Avatar` | *(composition)* | n/a |
| `Menu/Context` | `DropdownMenuContent` | unmapped |
| `Menu/Select` | *(composition)* | n/a |
| `MenuItem/Avatar` | `DropdownMenuItem` *(custom)* | unmapped |
| `MenuItem/Context` | `DropdownMenuItem` | unmapped |
| `MenuItem/Divider` | `DropdownMenuSeparator` | unmapped |
| `MenuItem/Header` | `DropdownMenuLabel` | unmapped |
| `MenuItem/Select` | `DropdownMenuCheckboxItem` / `DropdownMenuRadioItem` | unmapped |
| `MenuItem/Subtrigger` | `DropdownMenuSubTrigger` | unmapped |

### Sliders

| Figma | Code | Code Connect |
|---|---|---|
| `RangeSlider` | `Slider` *(range mode)* | unmapped |
| `SingleValueSlider` | `Slider` | unmapped |

### Navigation and layout

| Figma | Code | Code Connect |
|---|---|---|
| `Tab-Group` | `Tabs` | unmapped |
| `SegmentedControls` | *(none — candidate)* | n/a |
| `ScrollBar` | `ScrollBar` | unmapped |

### Tags

| Figma | Code | Code Connect |
|---|---|---|
| `Tag-Avatar-Dismissable` | `Tag` + `Avatar` | unmapped |
| `Tag-Dismissable` | `Tag` | unmapped |
| `Tag-Toggle` | `TagToggle` | unmapped |
| `Tags-Avatar` | *(group wrapper)* | n/a |
| `Tags-Dismissable` | *(group wrapper)* | n/a |
| `Tags-Toggle` | *(group wrapper)* | n/a |

### Tooltips

| Figma | Code | Code Connect |
|---|---|---|
| `Tooltip/OneLine` | `Tooltip` | unmapped |
| `Tooltip/MultipleLines` | `Tooltip` | unmapped |

### Time

| Figma | Code | Code Connect |
|---|---|---|
| `Overflow-TimePicker` | `TimePicker` components | unmapped |

## Hidden internals (`.base/*`)

Not shown in the Assets panel. Used internally by other components; instances keep working.

| Figma | Purpose |
|---|---|
| `.base/ActiveTrack` | Slider internal |
| `.base/BadgeDotRing` | Badge hint-dot internal |
| `.base/CellContent` | Table cell internal |
| `.base/EmptyTrack` | Slider internal |
| `.base/Header` | Table header internal |
| `.base/RangeSlider` | Range slider primitive |
| `.base/SingleSlider` | Single slider primitive |
| `.base/Tab` | Tab item primitive |

## Code components with no Figma counterpart

Candidates for adding to the library if you want full parity:

- `Calendar`, `CalendarDayButton`
- `Card` (+ `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent`)
- `Collapsible` (+ `CollapsibleTrigger`, `CollapsibleContent`)
- `Dialog` (+ `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`)
- `Empty` (+ `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyMedia`)
- `Field` (+ `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldContent`, `FieldTitle`)
- `Label` *(partial — `Elements/Label` covers input-label use only, not the standalone label)*
- `Menubar` (+ 15 sub-parts)
- `Popover` (+ `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`)
- `Progress`
- `ScrollArea`
- `Separator`
- `Sidebar` (+ 22 sub-parts)
- `Skeleton`
- `Toggle`

## Code Connect scorecard

| | Count |
|---|---|
| Figma components with Code Connect mapping | 1 (`IconShell`) |
| Figma components mappable to existing code | 52 |
| Figma components without code equivalent | 25 (mostly composition patterns, sliders/pickers, date fields, split buttons, segmented controls) |
| Code components without Figma equivalent | 15 families |

## Changelog

- 2026-05-02 — Rename pass to enforce consistent PascalCase/hyphen/slash conventions and hide internal primitives under `.base/*`. 4 typo fixes (`ChecboxGroup/List Vertical`, `Taggs Toggle`, `Scrollbar`, `TextArea-Input`) and 22 consistency renames applied and published. File renamed from `QBDS_(v2.0.0)` to `QBDS v2.0.0`.
