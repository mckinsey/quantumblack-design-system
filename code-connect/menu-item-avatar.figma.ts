// url=<QBDS_MENU_ITEM_AVATAR>
// source=src/components/ui/select.tsx
// component=SelectItem
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    radio: 'radio',
    checkbox: 'checkbox',
  }) ?? 'radio';

const disabled =
  instance.getEnum('state', {
    enabled: false,
    hover: false,
    pressed: false,
    disabled: true,
  }) ?? false;

const name = JSON.stringify(
  String(instance.getString('firstLastName') ?? 'First Last'),
);
const showCheck = instance.getBoolean('hasCheckmark');
const showDivider = instance.getBoolean('hasDivider');

const avatar = instance.findInstance('Avatar');
const avatarBlock =
  avatar?.type === 'INSTANCE' ? avatar.executeTemplate().example : [];

const mark = instance.findInstance('Active-Status');

const radioMark =
  type === 'radio' && showCheck && mark?.type === 'INSTANCE'
    ? mark.executeTemplate().example
    : [];

const checkboxControl =
  type === 'checkbox' && mark?.type === 'INSTANCE'
    ? mark.executeTemplate().example
    : [];

const divider = showDivider ? figma.code`<SelectSeparator />` : figma.code``;

const disabledProp = disabled ? ' disabled' : '';

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <>
      <SelectItem value={${name}}${disabledProp}>
        ${avatarBlock}
        ${checkboxControl}
        <SelectItemText>{${name}}</SelectItemText>
        ${
          radioMark.length > 0
            ? figma.code`<SelectItemIndicator>${radioMark}</SelectItemIndicator>`
            : figma.code``
        }
      </SelectItem>
      ${divider}
    </>
  `,
  imports: [
    'import { SelectItem, SelectItemIndicator, SelectItemText, SelectSeparator } from "@/components/ui/select"',
  ],
  id: 'menu-item-avatar',
  metadata: { nestable: true },
};
