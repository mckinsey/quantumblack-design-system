// url=<QBDS_STEPPER_ITEM_LIST>
// source=src/components/ui/stepper.tsx
// component=Stepper
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  sm: 'sm',
});

const orientation = instance.getEnum('orientation', {
  horizontal: 'horizontal',
  vertical: 'vertical',
});

const figmaIndicator = instance.getEnum('indicator', {
  number: 'number',
  icon: 'icon',
  shape: 'shape',
});
const indicator = figmaIndicator === 'number' ? 'number' : 'custom';

const items = figma.properties.children(['Stepper/Item']);

export default {
  example: figma.code`
    <Stepper size="${size}" orientation="${orientation}" indicator="${indicator}">
      ${figma.helpers.react.renderChildren(items)}
    </Stepper>
  `,
  imports: ['import { Stepper } from "@/components/ui/stepper"'],
  id: 'stepper-item-list',
  metadata: { nestable: false },
};
