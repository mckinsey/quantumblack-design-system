// url=<QBDS_RADIO_BUTTON>
// source=src/components/ui/radio-group.tsx
// component=RadioGroupItem
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    sm: 'sm',
    reg: 'default',
    lg: 'lg',
  }) ?? 'default';

const disabled = instance.getEnum('state', {
  enabled: false,
  focused: false,
  disabled: true,
});

export default {
  example: figma.code`
    <RadioGroup defaultValue="option">
      <RadioGroupItem value="option" size="${size}"${disabled ? ' disabled' : ''} />
    </RadioGroup>
  `,
  imports: [
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
  ],
  id: 'radio-button',
  metadata: { nestable: true },
};
