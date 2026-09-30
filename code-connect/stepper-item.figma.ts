// url=<QBDS_STEPPER_ITEM>
// source=src/components/ui/stepper.tsx
// component=StepperItem
import figma from 'figma';

const instance = figma.selectedInstance;

const status = (instance.getEnum('status', {
  incomplete: 'incomplete',
  active: 'active',
  completed: 'completed',
  error: 'error',
}) ?? 'incomplete') as string;

const figmaIndicator = (instance.getEnum('indicator', {
  number: 'number',
  icon: 'icon',
  shape: 'shape',
}) ?? 'number') as 'number' | 'icon' | 'shape';

const railInst = instance.findInstance('.base/stepper/Rail', {
  traverseInstances: true,
});
const titleInst = instance.findInstance('.base/stepper/Title', {
  traverseInstances: true,
});
const indicatorInst = instance.findInstance('.base/stepper/Indicator', {
  traverseInstances: true,
});

const hasTail =
  railInst?.type === 'INSTANCE'
    ? (railInst.getBoolean('hasTail') ?? true)
    : true;

const hasStepCount =
  titleInst?.type === 'INSTANCE'
    ? (titleInst.getBoolean('hasStepCount') ?? true)
    : true;
const hasDescription =
  titleInst?.type === 'INSTANCE'
    ? (titleInst.getBoolean('hasDescription') ?? true)
    : true;

const stepCount = JSON.stringify(
  (titleInst?.type === 'INSTANCE' ? titleInst.getString('stepCount') : null) ||
    'STEP #',
);
const title = JSON.stringify(
  (titleInst?.type === 'INSTANCE' ? titleInst.getString('title') : null) ||
    'Item Title',
);
const description = JSON.stringify(
  (titleInst?.type === 'INSTANCE'
    ? titleInst.getString('description')
    : null) || 'Short description',
);

const stepNumber = JSON.stringify(
  (indicatorInst?.type === 'INSTANCE'
    ? indicatorInst.getString('stepNumber')
    : null) || '1',
);

const markerType =
  indicatorInst?.type === 'INSTANCE'
    ? ((indicatorInst.getEnum('type', {
        number: 'number',
        icon: 'icon',
        circle: 'circle',
        square: 'square',
      }) ?? 'number') as 'number' | 'icon' | 'circle' | 'square')
    : 'number';

let iconName = 'person_outline';
const iconShell =
  figmaIndicator === 'icon'
    ? instance.findInstance('IconShell', { traverseInstances: true })
    : null;

if (iconShell?.type === 'INSTANCE') {
  const swaps = ['IconSwap-24', 'IconSwap-32', 'IconSwap-16'];
  for (const name of swaps) {
    const glyph = iconShell.getInstanceSwap(name);
    if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
      iconName = glyph.name.replace(/\s+/g, '_').toLowerCase();
      break;
    }
  }

  if (iconName === 'person_outline') {
    const nested = iconShell.findLayers(
      node =>
        node.type === 'INSTANCE' &&
        !!node.name &&
        node.name !== iconShell.name &&
        !String(node.name).startsWith('Tooltip'),
    );
    const glyph = nested[0];
    if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
      iconName = glyph.name.replace(/\s+/g, '_').toLowerCase();
    }
  }
}

const indicatorBody =
  figmaIndicator === 'icon'
    ? figma.code`
        <StepperMarkerIcon>
          <Icon icon="${iconName}" />
        </StepperMarkerIcon>
      `
    : figmaIndicator === 'shape'
      ? markerType === 'square'
        ? figma.code`<StepperMarkerSquare />`
        : figma.code`<StepperMarkerCircle />`
      : figma.code`${stepNumber}`;

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

const statusProp = status === 'incomplete' ? '' : ` status="${status}"`;

const markerImports =
  figmaIndicator === 'icon'
    ? [
        'import { Icon } from "@/components/ui/icon"',
        'import { StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperMarkerIcon, StepperRail, StepperSeparator, StepperTitle } from "@/components/ui/stepper"',
      ]
    : figmaIndicator === 'shape'
      ? markerType === 'square'
        ? [
            'import { StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperMarkerSquare, StepperRail, StepperSeparator, StepperTitle } from "@/components/ui/stepper"',
          ]
        : [
            'import { StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperMarkerCircle, StepperRail, StepperSeparator, StepperTitle } from "@/components/ui/stepper"',
          ]
      : [
          'import { StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperRail, StepperSeparator, StepperTitle } from "@/components/ui/stepper"',
        ];

export default {
  example: figma.code`
    <StepperItem${statusProp}>
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
  imports: markerImports,
  id: 'stepper-item',
  metadata: { nestable: true },
};
