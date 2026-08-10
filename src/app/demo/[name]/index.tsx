import type { ReactElement, ReactNode } from 'react';

import {
  AccordionDemo,
  AccordionExpandLeft,
  AccordionLarge,
  AccordionLargeExpandLeft,
  AccordionWithoutTrailing,
  accordion,
  examples as accordionExamples,
} from '@/app/demo/[name]/ui/accordion';
// New format imports - all components migrated to new format
import {
  AlertDemo,
  AlertLongLayout,
  AlertLongWithButtons,
  AlertVariants,
  AlertWithButtons,
  AlertWithoutIcon,
  alert,
  examples as alertExamples,
} from '@/app/demo/[name]/ui/alert';
import {
  AspectRatioDemo,
  AspectRatioLandscapeRatios,
  AspectRatioPortraitRatios,
  aspectRatio,
  examples as aspectRatioExamples,
} from '@/app/demo/[name]/ui/aspect-ratio';
import {
  AvatarCheckboxList,
  AvatarDemo,
  AvatarDisabled,
  AvatarFallbacks,
  AvatarGroupStacked,
  AvatarPickerMultiple,
  AvatarPickerSingle,
  AvatarRadioList,
  AvatarSizes,
  AvatarWithCount,
  AvatarWithStatus,
  AvatarWithTooltip,
  avatar,
  examples as avatarExamples,
} from '@/app/demo/[name]/ui/avatar';
import {
  BadgeDemo,
  BadgeDotLabel,
  BadgeIconLabel,
  BadgeLabelOnly,
  BadgeNumericSection,
  BadgeStatusSection,
  badge,
  examples as badgeExamples,
} from '@/app/demo/[name]/ui/badge';
import {
  ButtonDemo,
  ButtonDisabled,
  ButtonDropdown,
  ButtonIconOnly,
  ButtonIconRounded,
  ButtonLoading,
  ButtonRadiusMode,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
  button,
  examples as buttonExamples,
} from '@/app/demo/[name]/ui/button';
import {
  ButtonGroupConfigs,
  ButtonGroupDemo,
  ButtonGroupSizes,
  ButtonGroupSplit,
  buttonGroup,
  examples as buttonGroupExamples,
} from '@/app/demo/[name]/ui/button-group';
import {
  CalendarDemo,
  CalendarDisabledDays,
  CalendarPreSelected,
  CalendarRange,
  CalendarSizes,
  calendar,
  examples as calendarExamples,
} from '@/app/demo/[name]/ui/calendar';
import {
  CardDemo,
  CardSimple,
  CardWithAction,
  CardWithFooter,
  card,
  examples as cardExamples,
} from '@/app/demo/[name]/ui/card';
import {
  CheckboxDemo,
  CheckboxGroupItem,
  CheckboxHorizontal,
  CheckboxItemGroup,
  CheckboxItemGroupSection,
  CheckboxItemSizes,
  checkbox,
  examples as checkboxExamples,
} from '@/app/demo/[name]/ui/checkbox';
import {
  ComboboxCustomCheckbox,
  ComboboxCustomToggle,
  ComboboxDemo,
  ComboboxInline,
  ComboboxMultiSelect,
  ComboboxMultiSelectInline,
  ComboboxSizes,
  combobox,
  examples as comboboxExamples,
} from '@/app/demo/[name]/ui/combobox';
import {
  ContextMenuDemo,
  ContextMenuDestructive,
  ContextMenuLarge,
  ContextMenuWithCheckboxes,
  ContextMenuWithIcons,
  ContextMenuWithRadioGroup,
  ContextMenuWithShortcuts,
  ContextMenuWithSubmenu,
  contextMenu,
  examples as contextMenuExamples,
} from '@/app/demo/[name]/ui/context-menu';
import {
  DatePickerDemo,
  DatePickerDisabled,
  DatePickerInlineSizes,
  DatePickerRange,
  DatePickerRangeInline,
  DatePickerSizes,
  DatePickerValidation,
  datePicker,
  examples as datePickerExamples,
} from '@/app/demo/[name]/ui/date-picker';
import {
  DialogConfirmation,
  DialogCustomContent,
  DialogDemo,
  dialog,
  examples as dialogExamples,
} from '@/app/demo/[name]/ui/dialog';
import {
  DropdownMenuDemo,
  DropdownMenuDestructive,
  DropdownMenuLarge,
  DropdownMenuWithCheckboxes,
  DropdownMenuWithIcons,
  DropdownMenuWithRadioGroup,
  DropdownMenuWithShortcuts,
  DropdownMenuWithSubmenu,
  dropdownMenu,
  examples as dropdownMenuExamples,
} from '@/app/demo/[name]/ui/dropdown-menu';
import {
  FieldDemo,
  FieldOtherVariants,
  FieldSizes,
  FieldStates,
  field,
  examples as fieldExamples,
} from '@/app/demo/[name]/ui/field';
import {
  ReactHookForm,
  TanStackForm,
  form,
  examples as formExamples,
} from '@/app/demo/[name]/ui/form';
import {
  IconColors,
  IconDemo,
  IconSizes,
  IconSpinner,
  icon,
  examples as iconExamples,
} from '@/app/demo/[name]/ui/icon';
import {
  IconShellAll,
  IconShellCustomColor,
  IconShellDemo,
  IconShellHoverable,
  IconShellSizes,
  IconShellTypes,
  IconShellVariants,
  iconShell,
  examples as iconShellExamples,
} from '@/app/demo/[name]/ui/icon-shell';
import {
  InputDemo,
  InputSizes,
  InputStates,
  InputTypes,
  InputVariants,
  input,
  examples as inputExamples,
} from '@/app/demo/[name]/ui/input';
import {
  InputGroupBothSides,
  InputGroupDeleteOnFocus,
  InputGroupDemo,
  InputGroupLeadingIcon,
  InputGroupSizes,
  InputGroupStatusStates,
  InputGroupStepperSizes,
  InputGroupStepperStates,
  InputGroupTrailing,
  inputGroup,
  examples as inputGroupExamples,
} from '@/app/demo/[name]/ui/input-group';
import {
  LabelDemo,
  LabelDisabled,
  LabelSizes,
  label,
  examples as labelExamples,
} from '@/app/demo/[name]/ui/label';
import {
  PopoverAlignment,
  PopoverDemo,
  PopoverSimple,
  popover,
  examples as popoverExamples,
} from '@/app/demo/[name]/ui/popover';
import {
  RadioGroupDemo,
  RadioGroupDensity,
  RadioGroupDisabled,
  RadioGroupHorizontal,
  RadioGroupPartialDisabled,
  RadioGroupStates,
  radioGroup,
  examples as radioGroupExamples,
} from '@/app/demo/[name]/ui/radio-group';
import {
  SegmentedControlsDemo,
  SegmentedControlsDisabled,
  SegmentedControlsGhost,
  SegmentedControlsIconOnly,
  SegmentedControlsSizes,
  SegmentedControlsTypes,
  segmentedControls,
  examples as segmentedControlsExamples,
} from '@/app/demo/[name]/ui/segmented-controls';
import {
  SelectDemo,
  SelectHorizontal,
  SelectInline,
  SelectMultiple,
  SelectSizes,
  SelectTagsWrap,
  SelectValidation,
  SelectWithGroups,
  select,
  examples as selectExamples,
} from '@/app/demo/[name]/ui/select';
import {
  SidebarApp,
  SidebarNavMenuDemo,
  SidebarNavRailSizes,
  sidebar,
  examples as sidebarExamples,
} from '@/app/demo/[name]/ui/sidebar';
import {
  SliderComposed,
  SliderDemo,
  SliderInlineInput,
  SliderRange,
  SliderStepsLabeled,
  SliderStepsLabeledRange,
  slider,
  examples as sliderExamples,
} from '@/app/demo/[name]/ui/slider';
import {
  SonnerCustom,
  SonnerDemo,
  SonnerMinWidth,
  SonnerPersistent,
  SonnerVariants,
  SonnerWithAction,
  sonner,
  examples as sonnerExamples,
} from '@/app/demo/[name]/ui/sonner';
import {
  SwitchChecked,
  SwitchDemo,
  SwitchDisabled,
  SwitchSizes,
  SwitchStates,
  switchComponent,
  examples as switchExamples,
} from '@/app/demo/[name]/ui/switch';
import {
  TableRich,
  TableSizes,
  table,
  examples as tableExamples,
} from '@/app/demo/[name]/ui/table';
import {
  TabsBaseline,
  TabsCentered,
  TabsCompact,
  TabsDemo,
  TabsDisabled,
  TabsSizes,
  tabs,
  examples as tabsExamples,
} from '@/app/demo/[name]/ui/tabs';
import {
  TagDemo,
  TagDisabled,
  TagPill,
  TagSizes,
  TagVariants,
  TagWithAvatar,
  tag,
  examples as tagExamples,
} from '@/app/demo/[name]/ui/tag';
import {
  TagGroupAvatarDismissable,
  TagGroupDismissable,
  TagToggleGroup,
  tagGroup,
  examples as tagGroupExamples,
} from '@/app/demo/[name]/ui/tag-group';
import {
  TagToggleDemo,
  TagToggleDisabled,
  TagTogglePill,
  TagToggleSizes,
  TagToggleVariants,
  tagToggle,
  examples as tagToggleExamples,
} from '@/app/demo/[name]/ui/tag-toggle';
import {
  TextareaDemo,
  TextareaDisabled,
  TextareaError,
  TextareaRows,
  TextareaSizes,
  TextareaWithCounter,
  textarea,
  examples as textareaExamples,
} from '@/app/demo/[name]/ui/textarea';
import {
  TimeInputDemo,
  TimeInputDisabled,
  TimeInputInline,
  TimeInputSteps,
  TimeInputValidation,
  timeInput,
  examples as timeInputExamples,
} from '@/app/demo/[name]/ui/time-input';
import {
  TimePickerDemo,
  TimePickerInline,
  TimePickerOverlaySizes,
  timePicker,
  examples as timePickerExamples,
} from '@/app/demo/[name]/ui/time-picker';
import {
  ToggleDemo,
  ToggleSizes,
  ToggleToggled,
  ToggleVariants,
  toggle,
  examples as toggleExamples,
} from '@/app/demo/[name]/ui/toggle';
import {
  ToolbarBoxed,
  ToolbarDemo,
  ToolbarShapes,
  ToolbarSizes,
  ToolbarVertical,
  ToolbarWithDropdown,
  toolbar,
  examples as toolbarExamples,
} from '@/app/demo/[name]/ui/toolbar';
import {
  TooltipAlignment,
  TooltipDemo,
  TooltipLongContent,
  TooltipPositions,
  tooltip,
  examples as tooltipExamples,
} from '@/app/demo/[name]/ui/tooltip';
import type { ExampleMeta } from '@/lib/registry';

// Legacy Demo interface (old format)
interface Demo {
  name: string;
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

// New Demo interface with examples support
interface NewDemo extends Demo {
  examples?: ExampleMeta[];
  exampleComponents?: Record<string, () => ReactNode>;
}

// Example component maps for new format demos
export const exampleComponentMaps: Record<
  string,
  Record<string, () => ReactNode>
> = {
  alert: {
    AlertDemo,
    AlertWithButtons,
    AlertLongLayout,
    AlertLongWithButtons,
    AlertVariants,
    AlertWithoutIcon,
  },
  accordion: {
    AccordionDemo,
    AccordionExpandLeft,
    AccordionLarge,
    AccordionLargeExpandLeft,
    AccordionWithoutTrailing,
  },
  'aspect-ratio': {
    AspectRatioDemo,
    AspectRatioLandscapeRatios,
    AspectRatioPortraitRatios,
  },
  avatar: {
    AvatarDemo,
    AvatarSizes,
    AvatarFallbacks,
    AvatarDisabled,
    AvatarWithTooltip,
    AvatarWithCount,
    AvatarWithStatus,
    AvatarGroupStacked,
    AvatarCheckboxList,
    AvatarRadioList,
    AvatarPickerSingle,
    AvatarPickerMultiple,
  },
  badge: {
    BadgeDemo,
    BadgeLabelOnly,
    BadgeNumericSection,
    BadgeStatusSection,
    BadgeIconLabel,
    BadgeDotLabel,
  },
  button: {
    ButtonDemo,
    ButtonVariants,
    ButtonSizes,
    ButtonDisabled,
    ButtonWithIcons,
    ButtonLoading,
    ButtonIconOnly,
    ButtonIconRounded,
    ButtonDropdown,
    ButtonRadiusMode,
  },
  'button-group': {
    ButtonGroupDemo,
    ButtonGroupConfigs,
    ButtonGroupSizes,
    ButtonGroupSplit,
  },
  calendar: {
    CalendarDemo,
    CalendarRange,
    CalendarSizes,
    CalendarPreSelected,
    CalendarDisabledDays,
  },
  card: {
    CardDemo,
    CardSimple,
    CardWithAction,
    CardWithFooter,
  },
  checkbox: {
    CheckboxDemo,
    CheckboxGroupItem,
    CheckboxItemSizes,
    CheckboxItemGroup,
    CheckboxItemGroupSection,
    CheckboxHorizontal,
  },
  'date-picker': {
    DatePickerDemo,
    DatePickerRange,
    DatePickerSizes,
    DatePickerInlineSizes,
    DatePickerRangeInline,
    DatePickerValidation,
    DatePickerDisabled,
  },
  dialog: {
    DialogDemo,
    DialogConfirmation,
    DialogCustomContent,
  },
  'context-menu': {
    ContextMenuDemo,
    ContextMenuWithShortcuts,
    ContextMenuWithIcons,
    ContextMenuWithSubmenu,
    ContextMenuWithCheckboxes,
    ContextMenuWithRadioGroup,
    ContextMenuLarge,
    ContextMenuDestructive,
  },
  'dropdown-menu': {
    DropdownMenuDemo,
    DropdownMenuWithShortcuts,
    DropdownMenuWithIcons,
    DropdownMenuWithSubmenu,
    DropdownMenuWithCheckboxes,
    DropdownMenuWithRadioGroup,
    DropdownMenuLarge,
    DropdownMenuDestructive,
  },
  field: {
    FieldDemo,
    FieldSizes,
    FieldStates,
    FieldOtherVariants,
  },
  form: {
    ReactHookForm,
    TanStackForm,
  },
  icon: {
    IconDemo,
    IconSizes,
    IconColors,
    IconSpinner,
  },
  'icon-shell': {
    IconShellDemo,
    IconShellSizes,
    IconShellVariants,
    IconShellTypes,
    IconShellAll,
    IconShellCustomColor,
    IconShellHoverable,
  },
  input: {
    InputDemo,
    InputVariants,
    InputSizes,
    InputStates,
    InputTypes,
  },
  'input-group': {
    InputGroupDemo,
    InputGroupLeadingIcon,
    InputGroupTrailing,
    InputGroupBothSides,
    InputGroupSizes,
    InputGroupStatusStates,
    InputGroupDeleteOnFocus,
    InputGroupStepperSizes,
    InputGroupStepperStates,
  },
  combobox: {
    ComboboxDemo,
    ComboboxSizes,
    ComboboxInline,
    ComboboxCustomCheckbox,
    ComboboxCustomToggle,
    ComboboxMultiSelect,
    ComboboxMultiSelectInline,
  },
  label: {
    LabelDemo,
    LabelSizes,
    LabelDisabled,
  },
  popover: {
    PopoverDemo,
    PopoverSimple,
    PopoverAlignment,
  },
  'radio-group': {
    RadioGroupDemo,
    RadioGroupDensity,
    RadioGroupHorizontal,
    RadioGroupStates,
    RadioGroupDisabled,
    RadioGroupPartialDisabled,
  },
  'segmented-controls': {
    SegmentedControlsDemo,
    SegmentedControlsTypes,
    SegmentedControlsGhost,
    SegmentedControlsSizes,
    SegmentedControlsIconOnly,
    SegmentedControlsDisabled,
  },
  select: {
    SelectDemo,
    SelectInline,
    SelectSizes,
    SelectHorizontal,
    SelectValidation,
    SelectMultiple,
    SelectTagsWrap,
    SelectWithGroups,
  },
  sidebar: {
    SidebarApp,
    SidebarNavRailSizes,
    SidebarNavMenuDemo,
  },
  slider: {
    SliderDemo,
    SliderComposed,
    SliderInlineInput,
    SliderRange,
    SliderStepsLabeled,
    SliderStepsLabeledRange,
  },
  sonner: {
    SonnerDemo,
    SonnerVariants,
    SonnerWithAction,
    SonnerCustom,
    SonnerPersistent,
    SonnerMinWidth,
  },
  switch: {
    SwitchDemo,
    SwitchSizes,
    SwitchChecked,
    SwitchDisabled,
    SwitchStates,
  },
  table: {
    TableSizes,
    TableRich,
  },
  tabs: {
    TabsDemo,
    TabsSizes,
    TabsBaseline,
    TabsCentered,
    TabsCompact,
    TabsDisabled,
  },
  tag: {
    TagDemo,
    TagVariants,
    TagPill,
    TagSizes,
    TagWithAvatar,
    TagDisabled,
  },
  'tag-group': {
    TagGroupDismissable,
    TagGroupAvatarDismissable,
    TagToggleGroup,
  },
  'tag-toggle': {
    TagToggleDemo,
    TagToggleVariants,
    TagTogglePill,
    TagToggleSizes,
    TagToggleDisabled,
  },
  textarea: {
    TextareaDemo,
    TextareaSizes,
    TextareaDisabled,
    TextareaRows,
    TextareaWithCounter,
    TextareaError,
  },
  'time-input': {
    TimeInputDemo,
    TimeInputInline,
    TimeInputSteps,
    TimeInputDisabled,
    TimeInputValidation,
  },
  'time-picker': {
    TimePickerDemo,
    TimePickerInline,
    TimePickerOverlaySizes,
  },
  toggle: {
    ToggleDemo,
    ToggleVariants,
    ToggleSizes,
    ToggleToggled,
  },
  toolbar: {
    ToolbarDemo,
    ToolbarBoxed,
    ToolbarShapes,
    ToolbarSizes,
    ToolbarVertical,
    ToolbarWithDropdown,
  },
  tooltip: {
    TooltipDemo,
    TooltipPositions,
    TooltipAlignment,
    TooltipLongContent,
  },
};

// Example metadata for new format demos
export const examplesMeta: Record<string, ExampleMeta[]> = {
  alert: alertExamples,
  accordion: accordionExamples,
  'aspect-ratio': aspectRatioExamples,
  avatar: avatarExamples,
  badge: badgeExamples,
  button: buttonExamples,
  'button-group': buttonGroupExamples,
  calendar: calendarExamples,
  card: cardExamples,
  checkbox: checkboxExamples,
  'date-picker': datePickerExamples,
  dialog: dialogExamples,
  'context-menu': contextMenuExamples,
  'dropdown-menu': dropdownMenuExamples,
  field: fieldExamples,
  form: formExamples,
  icon: iconExamples,
  'icon-shell': iconShellExamples,
  input: inputExamples,
  'input-group': inputGroupExamples,
  combobox: comboboxExamples,
  label: labelExamples,
  popover: popoverExamples,
  'radio-group': radioGroupExamples,
  'segmented-controls': segmentedControlsExamples,
  select: selectExamples,
  sidebar: sidebarExamples,
  slider: sliderExamples,
  sonner: sonnerExamples,
  switch: switchExamples,
  table: tableExamples,
  tabs: tabsExamples,
  tag: tagExamples,
  'tag-group': tagGroupExamples,
  'tag-toggle': tagToggleExamples,
  textarea: textareaExamples,
  'time-input': timeInputExamples,
  'time-picker': timePickerExamples,
  toggle: toggleExamples,
  toolbar: toolbarExamples,
  tooltip: tooltipExamples,
};

// All demos - all now use new format
export const demos: { [name: string]: Demo | NewDemo } = {
  alert: {
    ...alert,
    examples: alertExamples,
    exampleComponents: exampleComponentMaps.alert,
  },
  accordion: {
    ...accordion,
    examples: accordionExamples,
    exampleComponents: exampleComponentMaps.accordion,
  },
  'aspect-ratio': {
    ...aspectRatio,
    examples: aspectRatioExamples,
    exampleComponents: exampleComponentMaps['aspect-ratio'],
  },
  avatar: {
    ...avatar,
    examples: avatarExamples,
    exampleComponents: exampleComponentMaps.avatar,
  },
  badge: {
    ...badge,
    examples: badgeExamples,
    exampleComponents: exampleComponentMaps.badge,
  },
  button: {
    ...button,
    examples: buttonExamples,
    exampleComponents: exampleComponentMaps.button,
  },
  'button-group': {
    ...buttonGroup,
    examples: buttonGroupExamples,
    exampleComponents: exampleComponentMaps['button-group'],
  },
  calendar: {
    ...calendar,
    examples: calendarExamples,
    exampleComponents: exampleComponentMaps.calendar,
  },
  card: {
    ...card,
    examples: cardExamples,
    exampleComponents: exampleComponentMaps.card,
  },
  checkbox: {
    ...checkbox,
    examples: checkboxExamples,
    exampleComponents: exampleComponentMaps.checkbox,
  },
  'date-picker': {
    ...datePicker,
    examples: datePickerExamples,
    exampleComponents: exampleComponentMaps['date-picker'],
  },
  dialog: {
    ...dialog,
    examples: dialogExamples,
    exampleComponents: exampleComponentMaps.dialog,
  },
  'context-menu': {
    ...contextMenu,
    examples: contextMenuExamples,
    exampleComponents: exampleComponentMaps['context-menu'],
  },
  'dropdown-menu': {
    ...dropdownMenu,
    examples: dropdownMenuExamples,
    exampleComponents: exampleComponentMaps['dropdown-menu'],
  },
  field: {
    ...field,
    examples: fieldExamples,
    exampleComponents: exampleComponentMaps.field,
  },
  form: {
    ...form,
    examples: formExamples,
    exampleComponents: exampleComponentMaps.form,
  },
  icon: {
    ...icon,
    examples: iconExamples,
    exampleComponents: exampleComponentMaps.icon,
  },
  'icon-shell': {
    ...iconShell,
    examples: iconShellExamples,
    exampleComponents: exampleComponentMaps['icon-shell'],
  },
  input: {
    ...input,
    examples: inputExamples,
    exampleComponents: exampleComponentMaps.input,
  },
  'input-group': {
    ...inputGroup,
    examples: inputGroupExamples,
    exampleComponents: exampleComponentMaps['input-group'],
  },
  combobox: {
    ...combobox,
    examples: comboboxExamples,
    exampleComponents: exampleComponentMaps.combobox,
  },
  label: {
    ...label,
    examples: labelExamples,
    exampleComponents: exampleComponentMaps.label,
  },
  popover: {
    ...popover,
    examples: popoverExamples,
    exampleComponents: exampleComponentMaps.popover,
  },
  'radio-group': {
    ...radioGroup,
    examples: radioGroupExamples,
    exampleComponents: exampleComponentMaps['radio-group'],
  },
  'segmented-controls': {
    ...segmentedControls,
    examples: segmentedControlsExamples,
    exampleComponents: exampleComponentMaps['segmented-controls'],
  },
  select: {
    ...select,
    examples: selectExamples,
    exampleComponents: exampleComponentMaps.select,
  },
  sidebar: {
    ...sidebar,
    examples: sidebarExamples,
    exampleComponents: exampleComponentMaps.sidebar,
  },
  slider: {
    ...slider,
    examples: sliderExamples,
    exampleComponents: exampleComponentMaps.slider,
  },
  sonner: {
    ...sonner,
    examples: sonnerExamples,
    exampleComponents: exampleComponentMaps.sonner,
  },
  switch: {
    ...switchComponent,
    examples: switchExamples,
    exampleComponents: exampleComponentMaps.switch,
  },
  table: {
    ...table,
    examples: tableExamples,
    exampleComponents: exampleComponentMaps.table,
  },
  tabs: {
    ...tabs,
    examples: tabsExamples,
    exampleComponents: exampleComponentMaps.tabs,
  },
  tag: {
    ...tag,
    examples: tagExamples,
    exampleComponents: exampleComponentMaps.tag,
  },
  'tag-group': {
    ...tagGroup,
    examples: tagGroupExamples,
    exampleComponents: exampleComponentMaps['tag-group'],
  },
  'tag-toggle': {
    ...tagToggle,
    examples: tagToggleExamples,
    exampleComponents: exampleComponentMaps['tag-toggle'],
  },
  textarea: {
    ...textarea,
    examples: textareaExamples,
    exampleComponents: exampleComponentMaps.textarea,
  },
  'time-input': {
    ...timeInput,
    examples: timeInputExamples,
    exampleComponents: exampleComponentMaps['time-input'],
  },
  'time-picker': {
    ...timePicker,
    examples: timePickerExamples,
    exampleComponents: exampleComponentMaps['time-picker'],
  },
  toggle: {
    ...toggle,
    examples: toggleExamples,
    exampleComponents: exampleComponentMaps.toggle,
  },
  toolbar: {
    ...toolbar,
    examples: toolbarExamples,
    exampleComponents: exampleComponentMaps.toolbar,
  },
  tooltip: {
    ...tooltip,
    examples: tooltipExamples,
    exampleComponents: exampleComponentMaps.tooltip,
  },
};
