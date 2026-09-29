// url=<QBDS_MENU_ITEM_SELECT>
// source=src/components/ui/select.tsx
// component=SelectItem
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    radio: 'radio',
    checkbox: 'checkbox',
    switch: 'switch',
  }) ?? 'radio';

const disabled =
  instance.getEnum('state', {
    enabled: false,
    hover: false,
    pressed: false,
    disabled: true,
  }) ?? false;

const label = JSON.stringify(String(instance.getString('label') ?? 'Option #'));
const showCheck = instance.getBoolean('hasCheckmark');
const showLeading = instance.getBoolean('hasLeadingSlot');
const showTrailing = instance.getBoolean('hasTrailingSlot');
const showCounter = instance.getBoolean('hasCounter');
const showDivider = instance.getBoolean('hasDivider');

const counter = JSON.stringify(
  String(instance.getString('counterValue') ?? ''),
);

const leadingSlot = instance.getSlot('leadingSlot');
const leadingConnected = showLeading
  ? (leadingSlot?.connectedInstances ?? [])
  : [];
const leading =
  leadingConnected.length > 0
    ? leadingConnected.map(n => n.executeTemplate().example).flat()
    : [];

const trailingSlot = instance.getSlot('trailingSlot');
const trailingConnected = showTrailing
  ? (trailingSlot?.connectedInstances ?? [])
  : [];
const trailing =
  trailingConnected.length > 0
    ? trailingConnected.map(n => n.executeTemplate().example).flat()
    : [];

const mark = instance.findInstance('Active-Status');
const sw = instance.findInstance('Switch');

const radioMark =
  type === 'radio' && showCheck && mark?.type === 'INSTANCE'
    ? mark.executeTemplate().example
    : [];

const checkboxControl =
  type === 'checkbox' && mark?.type === 'INSTANCE'
    ? mark.executeTemplate().example
    : [];

const switchControl =
  type === 'switch' && sw?.type === 'INSTANCE'
    ? sw.executeTemplate().example
    : [];

const counterBlock =
  showCounter && counter !== '""'
    ? figma.code`<span className="text-fg-tertiary shrink-0">{${counter}}</span>`
    : figma.code``;

const divider = showDivider ? figma.code`<SelectSeparator />` : figma.code``;

const disabledProp = disabled ? ' disabled' : '';

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <>
      <SelectItem value="item"${disabledProp}>
        ${leading}
        ${checkboxControl}
        <SelectItemText>{${label}}</SelectItemText>
        ${trailing}
        ${counterBlock}
        ${switchControl}
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
  id: 'menu-item-select',
  metadata: { nestable: true },
};
