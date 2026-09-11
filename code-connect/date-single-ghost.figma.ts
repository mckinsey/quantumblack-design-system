// url=<QBDS_DATE_SINGLE_GHOST>
// source=src/components/ui/date-input.tsx
// component=DateInput
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as 'sm' | 'default' | 'lg';

const state = instance.getEnum('state', {
  enabled: 'enabled',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  open: 'open',
  filled: 'filled',
  error: 'error',
  warning: 'warning',
  success: 'success',
  disabled: 'disabled',
});

const showFeedback = instance.getBoolean('hasFeedbackMessage');
const showHintText = instance.getBoolean('hasHintText');

const disabled = state === 'disabled';
const invalid = state === 'error';
const open = state === 'open';

const statusClass =
  state === 'warning'
    ? 'border-stroke-status-warning'
    : state === 'success'
      ? 'border-stroke-status-success'
      : '';

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const classProp = statusClass ? ` className="${statusClass}"` : '';
const openProp = open ? ' open' : '';

const helpInst = instance.findInstance('Elements/Help-Text', {
  traverseInstances: true,
});
const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});

const helperText =
  helpInst?.type === 'INSTANCE'
    ? JSON.stringify(helpInst.getString('helperText') || 'Helper text')
    : null;
const statusMessage =
  statusInst?.type === 'INSTANCE'
    ? JSON.stringify(statusInst.getString('statusMessage') || 'Feedback')
    : null;

const showErrorFooter = Boolean(invalid && showFeedback && statusMessage);
const showHintFooter = Boolean(
  !invalid && showHintText && helperText && !showErrorFooter,
);

const footer = showErrorFooter
  ? figma.code`<FieldError size="${size}">{${statusMessage}}</FieldError>`
  : showHintFooter
    ? figma.code`<FieldDescription size="${size}">{${helperText}}</FieldDescription>`
    : figma.code``;

const hasFooter = showErrorFooter || showHintFooter;

const calendarInst = instance.findInstance(
  '.base/datePicker/DaySelectionSingle',
  { traverseInstances: true },
);

const connectedCalendar =
  calendarInst?.type === 'INSTANCE' && calendarInst.hasCodeConnect()
    ? calendarInst.executeTemplate().example
    : null;

const calendarSize = size === 'lg' ? 'lg' : 'default';
const calendarFallback = figma.code`<Calendar mode="single" size="${calendarSize}" />`;

const dateInput = figma.code`
  <DateInput
    variant="inline"
    ${sizeProp}
    ${disabled ? 'disabled' : ''}
    ${invalid ? 'aria-invalid' : ''}
    ${openProp}
    ${classProp}
  />
`;

const popoverOpenProp = open ? ' defaultOpen' : '';

const body = figma.code`
  <Popover${popoverOpenProp}>
    ${dateInput}
    <PopoverContent
      className="w-auto overflow-hidden border-none p-0"
      align="start"
      sideOffset={4}>
      ${
        connectedCalendar
          ? figma.helpers.react.renderChildren(connectedCalendar)
          : calendarFallback
      }
    </PopoverContent>
  </Popover>
`;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${body}${footer}</FieldSet>`
  : body;

const pickerImports = [
  'import { Calendar } from "@/components/ui/calendar"',
  'import { DateInput } from "@/components/ui/date-input"',
  'import { Popover, PopoverContent } from "@/components/ui/popover"',
];

const imports = hasFooter
  ? showErrorFooter
    ? [
        ...pickerImports,
        'import { FieldError, FieldSet } from "@/components/ui/field"',
      ]
    : [
        ...pickerImports,
        'import { FieldDescription, FieldSet } from "@/components/ui/field"',
      ]
  : pickerImports;

export default {
  example,
  imports,
  id: 'date-single-ghost',
  metadata: { nestable: true },
};
