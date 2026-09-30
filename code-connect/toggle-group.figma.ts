// url=<QBDS_TOGGLE_GROUP>
// source=src/components/ui/toggle-group.tsx
// component=ToggleGroup
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  'secondary-filled': 'secondary',
  ghost: 'ghost',
});

const size = instance.getEnum('size', {
  reg: 'default',
  sm: 'sm',
  xsm: 'xs',
  xxs: 'xxs',
});

const segments = figma.properties.children(['Button']);

export default {
  example: figma.code`
    <ToggleGroup variant="${type}" size="${size}" defaultValue={['option-a']} aria-label="Options">
      ${figma.helpers.react.renderChildren(segments)}
    </ToggleGroup>
  `,
  imports: [
    'import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"',
  ],
  id: 'toggle-group',
  metadata: { nestable: false },
};
