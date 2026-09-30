import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperRail,
  StepperSeparator,
  type StepperSize,
  type StepperStatus,
  StepperText,
} from '@/components/ui/stepper';
import { type DemoExample } from '@/lib/demo-utils';

type DemoStep = {
  label: string;
  title: string;
  description: string;
  status: StepperStatus;
};

type IndicatorKind = 'number' | 'icon' | 'shape';

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

function StepIndicatorContent({
  kind,
  status,
  step,
  size,
}: {
  kind: IndicatorKind;
  status: StepperStatus;
  step: number;
  size?: StepperSize;
}) {
  const iconSize = size === 'sm' ? 'sm' : 'default';

  if (kind === 'number' && status === 'completed') {
    return (
      <IconShell size={iconSize} type="custom" className="text-status-success">
        <Icon icon="check_circle" />
      </IconShell>
    );
  }

  if (kind === 'number' && status === 'error') {
    return (
      <IconShell size={iconSize} type="custom" className="text-status-error">
        <Icon icon="cancel" />
      </IconShell>
    );
  }

  if (kind === 'icon') {
    return (
      <IconShell
        size={iconSize}
        type="neutral"
        variant={status === 'active' ? 'primary' : 'secondary'}>
        <Icon icon="person_outline" />
      </IconShell>
    );
  }

  if (kind === 'number') {
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
  orientation?: 'horizontal' | 'vertical';
  indicator?: IndicatorKind;
  className?: string;
}) {
  return (
    <Stepper
      size={size}
      orientation={orientation}
      data-indicator={indicator}
      className={className}>
      {steps.map((step, index) => (
        <StepperItem key={step.title} status={step.status}>
          <StepperRail>
            <StepperIndicator>
              <StepIndicatorContent
                kind={indicator}
                status={step.status}
                step={index + 1}
                size={size}
              />
            </StepperIndicator>
            {index < steps.length - 1 ? <StepperSeparator /> : null}
          </StepperRail>
          <StepperContent>
            <StepperText variant="label">{step.label}</StepperText>
            <StepperText variant="title">{step.title}</StepperText>
            <StepperText variant="description">{step.description}</StepperText>
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

export function StepperComposition() {
  return (
    <Stepper
      orientation="vertical"
      data-indicator="number"
      className="max-w-md">
      <StepperItem status="completed">
        <StepperRail>
          <StepperIndicator>
            <IconShell
              size="default"
              type="custom"
              className="text-status-success">
              <Icon icon="check_circle" />
            </IconShell>
          </StepperIndicator>
          <StepperSeparator />
        </StepperRail>
        <StepperContent>
          <StepperText variant="title">Uploaded</StepperText>
          <StepperText variant="description">3 files attached.</StepperText>
        </StepperContent>
      </StepperItem>
      <StepperItem status="active">
        <StepperRail>
          <StepperIndicator>2</StepperIndicator>
          <StepperSeparator className="min-h-10" />
        </StepperRail>
        <StepperContent className="gap-3">
          <StepperText variant="title">Assign owner</StepperText>
          <StepperText variant="description">
            Pick who receives the handoff.
          </StepperText>
          <p className="paragraph-small-primary text-fg-secondary">
            Extra UI lives in StepperContent — not in the stepper API.
          </p>
        </StepperContent>
      </StepperItem>
      <StepperItem status="incomplete">
        <StepperRail>
          <StepperIndicator>3</StepperIndicator>
        </StepperRail>
        <StepperContent>
          <StepperText variant="title">Publish</StepperText>
        </StepperContent>
      </StepperItem>
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
      'Set data-indicator on Stepper; compose marker content yourself.',
  },
  {
    name: 'StepperStates',
    title: 'States',
    description:
      'Step status on StepperItem drives rail tokens via data-status.',
  },
  {
    name: 'StepperComposition',
    title: 'Composition',
    description:
      'Optional StepperText slots, custom markers, arbitrary body content.',
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
  },
};

export const stepperExamples = {
  StepperDemo: <StepperDemo />,
  StepperSizes: <StepperSizes />,
  StepperLayouts: <StepperLayouts />,
  StepperIndicators: <StepperIndicators />,
  StepperStates: <StepperStates />,
  StepperComposition: <StepperComposition />,
};
