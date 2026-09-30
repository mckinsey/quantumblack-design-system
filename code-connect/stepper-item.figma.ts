// url=<QBDS_STEPPER_ITEM>
// source=src/components/ui/stepper.tsx
// component=StepperItem
import figma from 'figma';

const instance = figma.selectedInstance;

const status = instance.getEnum('status', {
  incomplete: 'incomplete',
  active: 'active',
  completed: 'completed',
  error: 'error',
});

const figmaIndicator = instance.getEnum('indicator', {
  number: 'number',
  icon: 'icon',
  shape: 'shape',
});

const hasTail = instance.getBoolean('hasTail');
const hasStepCount = instance.getBoolean('hasStepCount');
const hasDescription = instance.getBoolean('hasDescription');

const stepCount = JSON.stringify(
  instance.getString('stepCount#47758:12') || 'STEP #',
);
const title = JSON.stringify(
  instance.getString('title#47758:9') || 'Item Title',
);
const description = JSON.stringify(
  instance.getString('description#47758:15') || 'Short description',
);

const stepNumber = JSON.stringify(
  instance.getString('stepNumber#47430:0') || '1',
);

const iconSlot = instance.findInstance('IconShell');
const iconChildren =
  iconSlot?.type === 'INSTANCE' ? iconSlot.executeTemplate().example : [];

const indicatorBody =
  figmaIndicator === 'icon'
    ? figma.code`${figma.helpers.react.renderChildren(iconChildren)}`
    : figmaIndicator === 'number'
      ? figma.code`${stepNumber}`
      : figma.code``;

const separator = hasTail
  ? figma.code`
      <StepperSeparator />
    `
  : figma.code``;

const label = hasStepCount
  ? figma.code`
      <StepperLabel>{${stepCount}}</StepperLabel>
    `
  : figma.code``;

const desc = hasDescription
  ? figma.code`
      <StepperDescription>{${description}}</StepperDescription>
    `
  : figma.code``;

export default {
  example: figma.code`
    <StepperItem status="${status}">
      <StepperRail>
        <StepperIndicator>${indicatorBody}</StepperIndicator>
        ${separator}
      </StepperRail>
      <StepperContent>
        ${label}
        <StepperTitle>{${title}}</StepperTitle>
        ${desc}
      </StepperContent>
    </StepperItem>
  `,
  imports: [
    'import { StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperRail, StepperSeparator, StepperTitle } from "@/components/ui/stepper"',
    ...(figmaIndicator === 'icon'
      ? [
          'import { IconShell } from "@/components/ui/icon-shell"',
          'import { Icon } from "@/components/ui/icon"',
        ]
      : []),
  ],
  id: 'stepper-item',
  metadata: { nestable: true },
};
