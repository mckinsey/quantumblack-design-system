// url=<QBDS_STEPPER_ITEM_LIST>
// source=src/components/ui/stepper.tsx
// component=Stepper
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  reg: 'default',
  sm: 'sm',
}) ?? 'default') as 'sm' | 'default';

const orientation = (instance.getEnum('orientation', {
  horizontal: 'horizontal',
  vertical: 'vertical',
}) ?? 'vertical') as 'horizontal' | 'vertical';

const figmaIndicator = (instance.getEnum('indicator', {
  number: 'number',
  icon: 'icon',
  shape: 'shape',
}) ?? 'number') as 'number' | 'icon' | 'shape';

const indicator = figmaIndicator === 'number' ? 'number' : 'custom';

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.flatMap(n => n.executeTemplate().example)
    : figma.properties.children(['Stepper/Item']);

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const orientationProp =
  orientation === 'vertical' ? '' : ` orientation="${orientation}"`;
const indicatorProp = indicator === 'number' ? '' : ` indicator="${indicator}"`;

export default {
  example: figma.code`
    <Stepper${sizeProp}${orientationProp}${indicatorProp}>
      ${figma.helpers.react.renderChildren(items)}
    </Stepper>
  `,
  imports: ['import { Stepper } from "@/components/ui/stepper"'],
  id: 'stepper-item-list',
  metadata: { nestable: false },
};
