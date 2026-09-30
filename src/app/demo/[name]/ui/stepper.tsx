import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  type StepperIndicatorType,
  StepperItem,
  StepperLabel,
  StepperMarkerCircle,
  StepperMarkerIcon,
  StepperMarkerNumber,
  StepperMarkerSquare,
  type StepperOrientation,
  StepperRail,
  StepperSeparator,
  type StepperSize,
  type StepperStatus,
  StepperTitle,
} from '@/components/ui/stepper';
import { type DemoExample } from '@/lib/demo-utils';

const listStatuses: StepperStatus[] = [
  'completed',
  'completed',
  'active',
  'incomplete',
  'incomplete',
];

const customStatuses: StepperStatus[] = [
  'completed',
  'active',
  'error',
  'incomplete',
];

const progressSteps = [
  { title: 'Account', description: 'Create your sign-in details.' },
  { title: 'Business', description: 'Tell us about your company.' },
  { title: 'Review', description: 'Confirm and submit.' },
  { title: 'Done', description: 'You are all set.' },
] as const;

type MarkerKind = 'number' | 'icon' | 'circle' | 'square';

function statusesFor(
  current: number,
  total: number,
  error: boolean,
): StepperStatus[] {
  return Array.from({ length: total }, (_, i) =>
    i < current
      ? 'completed'
      : i === current
        ? error
          ? 'error'
          : 'active'
        : 'incomplete',
  );
}

function Marker({ kind, index }: { kind: MarkerKind; index: number }) {
  if (kind === 'icon') {
    return (
      <StepperMarkerIcon>
        <Icon icon="person_outline" />
      </StepperMarkerIcon>
    );
  }

  if (kind === 'circle') {
    return <StepperMarkerCircle />;
  }

  if (kind === 'square') {
    return <StepperMarkerSquare />;
  }

  return <StepperMarkerNumber>{index + 1}</StepperMarkerNumber>;
}

function ItemList({
  size = 'default',
  orientation = 'vertical',
  indicator = 'number',
  showLabel = true,
  statuses = listStatuses,
  marker,
  statusAsDescription = false,
  className,
}: {
  size?: StepperSize;
  orientation?: StepperOrientation;
  indicator?: StepperIndicatorType;
  showLabel?: boolean;
  statuses?: StepperStatus[];
  marker?: MarkerKind;
  statusAsDescription?: boolean;
  className?: string;
}) {
  return (
    <Stepper
      size={size}
      orientation={orientation}
      indicator={indicator}
      className={className}>
      {statuses.map((status, index) => (
        <StepperItem key={index} status={status}>
          <StepperRail>
            <StepperIndicator>
              {marker ? <Marker kind={marker} index={index} /> : index + 1}
            </StepperIndicator>
            {index < statuses.length - 1 ? <StepperSeparator /> : null}
          </StepperRail>
          <StepperContent>
            {showLabel ? <StepperLabel>STEP #</StepperLabel> : null}
            <StepperTitle>Item Title</StepperTitle>
            <StepperDescription>
              {statusAsDescription ? status : 'Short description'}
            </StepperDescription>
          </StepperContent>
        </StepperItem>
      ))}
    </Stepper>
  );
}

/** Default: vertical number list with Back / Next / Error. */
export function StepperDemo() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const last = progressSteps.length - 1;
  const statuses = statusesFor(current, progressSteps.length, error);

  return (
    <div className="flex max-w-[220px] flex-col gap-6">
      <Stepper>
        {progressSteps.map((step, index) => (
          <StepperItem key={step.title} status={statuses[index]}>
            <StepperRail>
              <StepperIndicator>{index + 1}</StepperIndicator>
              {index < last ? <StepperSeparator /> : null}
            </StepperRail>
            <StepperContent>
              <StepperLabel>STEP {index + 1}</StepperLabel>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperContent>
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={current === 0}
          onClick={() => {
            setError(false);
            setCurrent(c => Math.max(c - 1, 0));
          }}>
          Back
        </Button>
        <Button
          size="sm"
          disabled={current >= last}
          onClick={() => {
            setError(false);
            setCurrent(c => Math.min(c + 1, last));
          }}>
          Next
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setError(e => !e)}>
          {error ? 'Clear error' : 'Add error'}
        </Button>
      </div>
    </div>
  );
}

/** sm + default, number / vertical. */
export function StepperSizes() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <ItemList size="sm" className="w-[180px]" />
      <ItemList size="default" className="w-[220px]" />
    </div>
  );
}

/** number / reg / horizontal — 4 steps. */
export function StepperOrientation() {
  return (
    <div className="flex w-full items-center justify-center px-8 py-10">
      <ItemList
        orientation="horizontal"
        statuses={['completed', 'completed', 'active', 'incomplete']}
      />
    </div>
  );
}

const markerKinds: { kind: MarkerKind; label: string }[] = [
  { kind: 'icon', label: 'Icon' },
  { kind: 'circle', label: 'Circle' },
  { kind: 'square', label: 'Square' },
];

/** All Figma markers × statuses (completed / active / error / incomplete). */
export function StepperCustomIndicator() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      {markerKinds.map(({ kind, label }) => (
        <div key={kind} className="flex w-[180px] flex-col gap-3">
          <p className="label-small-primary text-fg-secondary uppercase">
            {label}
          </p>
          <ItemList
            indicator="custom"
            showLabel={false}
            marker={kind}
            statuses={customStatuses}
            statusAsDescription
          />
        </div>
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'StepperDemo',
    title: 'Default',
    description: 'Vertical number stepper with Back / Next / Add error.',
  },
  {
    name: 'StepperSizes',
    title: 'Sizes',
    description: 'Small and default sizes.',
  },
  {
    name: 'StepperOrientation',
    title: 'Orientation',
    description: 'Horizontal ItemList.',
  },
  {
    name: 'StepperCustomIndicator',
    title: 'Custom indicator',
    description: 'Icon, circle, and square markers across all statuses.',
  },
];

export const stepper = {
  name: 'stepper',
  components: {
    Default: <StepperDemo />,
    Sizes: <StepperSizes />,
    Orientation: <StepperOrientation />,
    'Custom indicator': <StepperCustomIndicator />,
  },
};

export const stepperExamples = {
  StepperDemo: <StepperDemo />,
  StepperSizes: <StepperSizes />,
  StepperOrientation: <StepperOrientation />,
  StepperCustomIndicator: <StepperCustomIndicator />,
};
