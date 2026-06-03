import type { ReactElement, ReactNode } from 'react';

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
  ButtonIconOnly,
  ButtonIconRounded,
  ButtonLoading,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
  button,
  examples as buttonExamples,
} from '@/app/demo/[name]/ui/button';
import {
  ButtonGroupConfigs,
  ButtonGroupDemo,
  ButtonGroupIconOnly,
  ButtonGroupSizes,
  ButtonGroupVertical,
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
  CheckboxItemGroup,
  CheckboxItemGroupSection,
  CheckboxItemSizes,
  CheckboxSizes,
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
  DropdownMenuWithCheckboxes,
  DropdownMenuWithIcons,
  DropdownMenuWithRadioGroup,
  DropdownMenuWithShortcuts,
  DropdownMenuWithSubmenu,
  dropdownMenu,
  examples as dropdownMenuExamples,
} from '@/app/demo/[name]/ui/dropdown-menu';
import {
  EmptyCompact,
  EmptyDemo,
  EmptyError,
  EmptyWithAction,
  EmptyWithIcon,
  EmptyWithMultipleActions,
  empty,
  examples as emptyExamples,
} from '@/app/demo/[name]/ui/empty';
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
  IconCatalog,
  IconInButtons,
  IconInputAffordances,
  IconLoading,
  IconNavigation,
  IconOpticalSizing,
  IconShellAll,
  IconShellDemo,
  IconShellSizes,
  IconShellTypes,
  IconShellVariants,
  IconStandalone,
  IconStatus,
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
  SelectMultipleDemo,
  SelectSizes,
  SelectWithDisabled,
  SelectWithGroups,
  select,
  examples as selectExamples,
} from '@/app/demo/[name]/ui/select';
import {
  SliderDemo,
  SliderLabeled,
  SliderRange,
  SliderRanges,
  SliderSteps,
  SliderStepsLabeled,
  SliderVolume,
  slider,
  examples as sliderExamples,
} from '@/app/demo/[name]/ui/slider';
import {
  SonnerCustom,
  SonnerDemo,
  SonnerError,
  SonnerInfo,
  SonnerPersistent,
  SonnerSuccess,
  SonnerVariants,
  SonnerWarning,
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
  DataTableDemo,
  TableRich,
  TableSizes,
  dataTable,
  dataTableExamples,
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
  TextareaError,
  TextareaRows,
  TextareaSizes,
  TextareaStates,
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
  ToggleIconSizes,
  ToggleIcons,
  ToggleIconsRound,
  TogglePressed,
  ToggleSizes,
  ToggleVariants,
  toggle,
  examples as toggleExamples,
} from '@/app/demo/[name]/ui/toggle';
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
  },
  'button-group': {
    ButtonGroupDemo,
    ButtonGroupConfigs,
    ButtonGroupSizes,
    ButtonGroupVertical,
    ButtonGroupIconOnly,
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
    CheckboxSizes,
    CheckboxGroupItem,
    CheckboxItemSizes,
    CheckboxItemGroup,
    CheckboxItemGroupSection,
  },
  'data-table': {
    DataTableDemo,
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
  'dropdown-menu': {
    DropdownMenuDemo,
    DropdownMenuWithShortcuts,
    DropdownMenuWithIcons,
    DropdownMenuWithSubmenu,
    DropdownMenuWithCheckboxes,
    DropdownMenuWithRadioGroup,
    DropdownMenuDestructive,
  },
  empty: {
    EmptyDemo,
    EmptyWithIcon,
    EmptyWithAction,
    EmptyWithMultipleActions,
    EmptyError,
    EmptyCompact,
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
    IconStandalone,
    IconCatalog,
    IconNavigation,
    IconStatus,
    IconInButtons,
    IconLoading,
    IconOpticalSizing,
    IconInputAffordances,
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
    SelectSizes,
    SelectWithDisabled,
    SelectWithGroups,
    SelectMultipleDemo,
  },
  slider: {
    SliderDemo,
    SliderRanges,
    SliderSteps,
    SliderStepsLabeled,
    SliderLabeled,
    SliderRange,
    SliderVolume,
  },
  sonner: {
    SonnerDemo,
    SonnerSuccess,
    SonnerError,
    SonnerWarning,
    SonnerInfo,
    SonnerVariants,
    SonnerWithAction,
    SonnerCustom,
    SonnerPersistent,
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
    DataTableDemo,
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
    TextareaStates,
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
    TogglePressed,
    ToggleIcons,
    ToggleIconsRound,
    ToggleIconSizes,
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
  'aspect-ratio': aspectRatioExamples,
  avatar: avatarExamples,
  badge: badgeExamples,
  button: buttonExamples,
  'button-group': buttonGroupExamples,
  calendar: calendarExamples,
  card: cardExamples,
  checkbox: checkboxExamples,
  'data-table': dataTableExamples,
  'date-picker': datePickerExamples,
  dialog: dialogExamples,
  'dropdown-menu': dropdownMenuExamples,
  empty: emptyExamples,
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
  tooltip: tooltipExamples,
};

// All demos - all now use new format
export const demos: { [name: string]: Demo | NewDemo } = {
  alert: {
    ...alert,
    examples: alertExamples,
    exampleComponents: exampleComponentMaps.alert,
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
  'data-table': {
    ...dataTable,
    examples: dataTableExamples,
    exampleComponents: exampleComponentMaps['data-table'],
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
  'dropdown-menu': {
    ...dropdownMenu,
    examples: dropdownMenuExamples,
    exampleComponents: exampleComponentMaps['dropdown-menu'],
  },
  empty: {
    ...empty,
    examples: emptyExamples,
    exampleComponents: exampleComponentMaps.empty,
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
  tooltip: {
    ...tooltip,
    examples: tooltipExamples,
    exampleComponents: exampleComponentMaps.tooltip,
  },
};
