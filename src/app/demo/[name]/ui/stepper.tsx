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
  useStepper,
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

function StepIndicatorContent({
  indicator,
  status,
  step,
}: {
  indicator: StepperIndicatorType;
  status: StepperStatus;
  step: number;
}) {
  const { size } = useStepper();
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
              <StepIndicatorContent
                indicator={indicator}
                status={step.status}
                step={index + 1}
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

export function StepperComposition() {
  return (
    <Stepper orientation="vertical" indicator="number" className="max-w-md">
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
          <StepperTitle>Uploaded</StepperTitle>
          <StepperDescription>3 files attached.</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="active">
        <StepperRail>
          <StepperIndicator>2</StepperIndicator>
          <StepperSeparator className="min-h-10" />
        </StepperRail>
        <StepperContent className="gap-3">
          <StepperTitle>Assign owner</StepperTitle>
          <StepperDescription>
            Pick who receives the handoff.
          </StepperDescription>
          <p className="paragraph-small-primary text-fg-secondary">
            Any extra UI belongs here — the stepper only styles the rail slots.
          </p>
        </StepperContent>
      </StepperItem>
      <StepperItem status="incomplete">
        <StepperRail>
          <StepperIndicator>3</StepperIndicator>
        </StepperRail>
        <StepperContent>
          <StepperTitle>Publish</StepperTitle>
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
    description: 'Number, icon, and shape indicator styles.',
  },
  {
    name: 'StepperStates',
    title: 'States',
    description: 'Incomplete, active, completed, and error item states.',
  },
  {
    name: 'StepperComposition',
    title: 'Composition',
    description:
      'Custom indicator content, optional copy slots, and arbitrary children in the body.',
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
