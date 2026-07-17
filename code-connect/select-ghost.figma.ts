// url=<QBDS_SELECT_GHOST>
// source=src/components/ui/select.tsx
// component=Select
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  filled: false,
  hover: false,
  focus: false,
  open: false,
  'filled-hover': false,
  'filled-open': false,
  success: false,
  warning: false,
  error: false,
  disabled: true,
});

const status = instance.getEnum('state', {
  enabled: '',
  filled: '',
  hover: '',
  focus: '',
  open: '',
  'filled-hover': '',
  'filled-open': '',
  success: 'success',
  warning: 'warning',
  error: 'error',
  disabled: '',
});

const placeholder = instance.getString('placeholderText');
const showLeading = instance.getBoolean('showLeadingIcon');

const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const statusClass =
  status === 'warning'
    ? ' !border-b-status-warning'
    : status === 'success'
      ? ' !border-b-status-success'
      : '';

const invalidProp = status === 'error' ? ' aria-invalid' : '';

export default {
  example: figma.code`
    <Select size="${size}"${disabled ? ' disabled' : ''}>
      <SelectTrigger variant="inline" className="w-[240px]${statusClass}"${invalidProp}>
        ${leadingCode}
        <SelectValue placeholder="${placeholder}" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">
          <SelectItemText>Option 1</SelectItemText>
        </SelectItem>
        <SelectItem value="option-2">
          <SelectItemText>Option 2</SelectItemText>
        </SelectItem>
        <SelectItem value="option-3">
          <SelectItemText>Option 3</SelectItemText>
        </SelectItem>
      </SelectContent>
    </Select>
  `,
  imports: [
    'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
  id: 'select-ghost',
  metadata: { nestable: true },
};
