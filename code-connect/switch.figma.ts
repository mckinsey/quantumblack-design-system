// url=<QBDS_SWITCH>
// source=src/components/ui/switch.tsx
// component=Switch
import figma from 'figma';

const instance = figma.selectedInstance;

const on = instance.getEnum('on', {
  true: true,
  false: false,
});

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  focused: false,
  disabled: true,
});

const showLeft = instance.getBoolean('showLeftLabel');
const showRight = instance.getBoolean('showRightLabel');
const left = instance.getString('leftEntry');
const right = instance.getString('rightEntry');

const checked = on ? ' checked' : '';
const disabledProp = disabled ? ' disabled' : '';

const labelTypography =
  size === 'sm'
    ? 'paragraph-small-primary'
    : size === 'lg'
      ? 'label-large-primary'
      : 'label-regular-primary';

const labelProps = `${figma.helpers.react.renderProp('className', labelTypography)}${figma.helpers.react.renderProp('disabled', disabled || undefined)}`;

const labelGap = size === 'sm' ? 'gap-2' : 'gap-3';

const switchCode = figma.code`<Switch id="switch" size="${size}"${checked}${disabledProp} />`;

const labeled = showLeft || showRight;

export default {
  example: labeled
    ? figma.code`
        <div className="flex items-center ${labelGap}">
          ${showLeft ? figma.code`<Label htmlFor="switch"${labelProps}>${left}</Label>` : ''}
          ${switchCode}
          ${showRight ? figma.code`<Label htmlFor="switch"${labelProps}>${right}</Label>` : ''}
        </div>
      `
    : switchCode,
  imports: [
    ...(labeled ? ['import { Label } from "@/components/ui/label"'] : []),
    'import { Switch } from "@/components/ui/switch"',
  ],
  id: 'switch',
  metadata: { nestable: true },
};
