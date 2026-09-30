import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  type StepperIndicatorType,
  StepperItem,
  StepperLabel,
  type StepperOrientation,
  StepperRail,
  StepperSeparator,
  type StepperSize,
  type StepperStatus,
  StepperTitle,
} from '@/components/ui/stepper';
import { type DemoExample } from '@/lib/demo-utils';

type DemoStep = {
  label: string;
  title: string;
  description: string;
  status: StepperStatus;
};

const defaultSteps: DemoStep[] = [
  {
    label: 'Step 1',
    title: 'Account',
    description: 'Create your sign-in details.',
    status: 'completed',
  },
  {
    label: 'Step 2',
    title: 'Business',
    description: 'Tell us about your company.',
    status: 'active',
  },
  {
    label: 'Step 3',
    title: 'Review',
    description: 'Confirm and submit.',
    status: 'incomplete',
  },
];

/**
 * Marker content is consumer-owned. The stepper styles the marker shell from
 * `indicator` + `status`; what goes inside is an app decision.
 */
function StepMarker({
  indicator,
  status,
  step,
  size,
}: {
  indicator: StepperIndicatorType;
  status: StepperStatus;
  step: number;
  size?: StepperSize;
}) {
  const iconSize = size === 'sm' ? 'sm' : 'default';

  if (indicator === 'number' && status === 'completed') {
    return (
      <IconShell size={iconSize} type="custom" className="text-status-success">
        <Icon icon="check_circle" />
      </IconShell>
    );
  }

  if (indicator === 'number' && status === 'error') {
    return (
      <IconShell size={iconSize} type="custom" className="text-status-error">
        <Icon icon="cancel" />
      </IconShell>
    );
  }

  if (indicator === 'icon') {
    return (
      <IconShell
        size={iconSize}
        type="neutral"
        variant={status === 'active' ? 'primary' : 'secondary'}>
        <Icon icon="person_outline" />
      </IconShell>
    );
  }

  if (indicator === 'number') {
    return step;
  }

  return null;
}

function StepperFlow({
  steps = defaultSteps,
  size,
  orientation = 'vertical',
  indicator = 'number',
  className,
}: {
  steps?: DemoStep[];
  size?: StepperSize;
  orientation?: StepperOrientation;
  indicator?: StepperIndicatorType;
  className?: string;
}) {
  return (
    <Stepper
      size={size}
      orientation={orientation}
      indicator={indicator}
      className={className}>
      {steps.map((step, index) => (
        <StepperItem key={step.title} status={step.status}>
          <StepperRail>
            <StepperIndicator>
              <StepMarker
                indicator={indicator}
                status={step.status}
                step={index + 1}
                size={size}
              />
            </StepperIndicator>
            {index < steps.length - 1 ? <StepperSeparator /> : null}
          </StepperRail>
          <StepperContent>
            <StepperLabel>{step.label}</StepperLabel>
            <StepperTitle>{step.title}</StepperTitle>
            <StepperDescription>{step.description}</StepperDescription>
          </StepperContent>
        </StepperItem>
      ))}
    </Stepper>
  );
}

export function StepperDemo() {
  return <StepperFlow className="max-w-md" />;
}

export function StepperSizes() {
  return (
    <div className="flex flex-col gap-10">
      <StepperFlow size="sm" className="max-w-md" />
      <StepperFlow className="max-w-md" />
    </div>
  );
}

export function StepperLayouts() {
  return (
    <div className="flex flex-col gap-10">
      <StepperFlow orientation="vertical" className="max-w-md" />
      <StepperFlow orientation="horizontal" className="max-w-3xl" />
    </div>
  );
}

export function StepperIndicators() {
  return (
    <div className="flex flex-col gap-10">
      <StepperFlow indicator="number" className="max-w-md" />
      <StepperFlow indicator="icon" className="max-w-md" />
      <StepperFlow indicator="shape" className="max-w-md" />
    </div>
  );
}

export function StepperStates() {
  const steps: DemoStep[] = [
    {
      label: 'Step 1',
      title: 'Incomplete',
      description: 'Waiting to start.',
      status: 'incomplete',
    },
    {
      label: 'Step 2',
      title: 'Active',
      description: 'Currently in progress.',
      status: 'active',
    },
    {
      label: 'Step 3',
      title: 'Completed',
      description: 'Finished successfully.',
      status: 'completed',
    },
    {
      label: 'Step 4',
      title: 'Error',
      description: 'Needs attention.',
      status: 'error',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {steps.map(step => (
        <StepperFlow key={step.status} steps={[step]} className="max-w-md" />
      ))}
    </div>
  );
}

/**
 * Composition: optional copy slots, custom marker content, extra body UI, and a
 * connector stretched to the item height with `self-stretch` + `flex-1`.
 */
export function StepperComposition() {
  return (
    <Stepper className="max-w-md">
      <StepperItem status="completed">
        <StepperRail className="self-stretch">
          <StepperIndicator>
            <IconShell
              size="default"
              type="custom"
              className="text-status-success">
              <Icon icon="check_circle" />
            </IconShell>
          </StepperIndicator>
          <StepperSeparator className="flex-1" />
        </StepperRail>
        <StepperContent className="gap-3 pb-6">
          <StepperTitle render={<h3 />}>Uploaded</StepperTitle>
          <StepperDescription>3 files attached.</StepperDescription>
          <p className="paragraph-small-primary text-fg-secondary">
            Extra UI lives in StepperContent — the stepper adds no props for it.
          </p>
        </StepperContent>
      </StepperItem>
      <StepperItem status="incomplete">
        <StepperRail>
          <StepperIndicator>2</StepperIndicator>
        </StepperRail>
        <StepperContent>
          <StepperTitle render={<h3 />}>Publish</StepperTitle>
        </StepperContent>
      </StepperItem>
    </Stepper>
  );
}

/**
 * Element swapping via `render`: semantic `ol`/`li` markup and step markers that
 * are real buttons, without the stepper owning navigation state.
 */
export function StepperInteractive() {
  const steps = ['Account', 'Business', 'Review'];
  const current = 1;

  return (
    <Stepper
      orientation="horizontal"
      render={<ol />}
      className="max-w-3xl list-none">
      {steps.map((title, index) => (
        <StepperItem
          key={title}
          render={<li />}
          status={
            index < current
              ? 'completed'
              : index === current
                ? 'active'
                : 'incomplete'
          }>
          <StepperRail>
            <StepperIndicator
              render={<button type="button" />}
              aria-current={index === current ? 'step' : undefined}
              className="focus-visible:ring-stroke-status-focus cursor-pointer focus-visible:ring-2 focus-visible:outline-hidden">
              {index < current ? (
                <IconShell
                  size="default"
                  type="custom"
                  className="text-status-success">
                  <Icon icon="check_circle" />
                </IconShell>
              ) : (
                index + 1
              )}
            </StepperIndicator>
            {index < steps.length - 1 ? <StepperSeparator /> : null}
          </StepperRail>
          <StepperContent>
            <StepperTitle>{title}</StepperTitle>
          </StepperContent>
        </StepperItem>
      ))}
    </Stepper>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'StepperDemo',
    title: 'Default',
    description: 'Vertical stepper with numbered indicators and step copy.',
  },
  {
    name: 'StepperSizes',
    title: 'Sizes',
    description: 'Small and default stepper sizes.',
  },
  {
    name: 'StepperLayouts',
    title: 'Layouts',
    description: 'Vertical and horizontal orientations.',
  },
  {
    name: 'StepperIndicators',
    title: 'Indicators',
    description:
      'number, icon, and shape marker treatments. Marker content stays consumer-owned.',
  },
  {
    name: 'StepperStates',
    title: 'States',
    description:
      'Status on StepperItem drives marker and connector tokens via data-status.',
  },
  {
    name: 'StepperComposition',
    title: 'Composition',
    description:
      'Optional copy slots, custom markers, extra body content, stretched connector.',
  },
  {
    name: 'StepperInteractive',
    title: 'Interactive & semantic',
    description:
      'render swaps the host element: ol/li markup with button markers and aria-current.',
  },
];

export const stepper = {
  name: 'stepper',
  components: {
    Default: <StepperDemo />,
    Sizes: <StepperSizes />,
    Layouts: <StepperLayouts />,
    Indicators: <StepperIndicators />,
    States: <StepperStates />,
    Composition: <StepperComposition />,
    'Interactive & semantic': <StepperInteractive />,
  },
};

export const stepperExamples = {
  StepperDemo: <StepperDemo />,
  StepperSizes: <StepperSizes />,
  StepperLayouts: <StepperLayouts />,
  StepperIndicators: <StepperIndicators />,
  StepperStates: <StepperStates />,
  StepperComposition: <StepperComposition />,
  StepperInteractive: <StepperInteractive />,
};
