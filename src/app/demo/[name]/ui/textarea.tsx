import {
  FieldDescription,
  FieldError,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import {
  Textarea,
  TextareaCounter,
  TextareaRoot,
} from '@/components/ui/textarea';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const demoFieldWidth = 'w-[320px]';

const fieldConfig = {
  sm: {
    label: 'label-small-primary text-fg-secondary',
    description: 'paragraph-small-primary text-fg-tertiary',
    error: 'paragraph-small-primary text-fg-error',
    gap: 'gap-2',
  },
  default: {
    label: 'label-regular-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    error: 'paragraph-large-primary text-fg-error',
    disabledLabel: 'label-regular-primary text-fg-disabled',
    gap: 'gap-2',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    error: 'paragraph-large-primary text-fg-error',
    gap: 'gap-2',
  },
} as const;

/** Default textarea with label and helper text */
export function TextareaDemo() {
  return (
    <FieldSet className={`${demoFieldWidth} ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Textarea size="default" placeholder="Hint text" />

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Small, default, and large textarea sizes */
export function TextareaSizes() {
  return (
    <div className={`${demoFieldWidth} space-y-4`}>
      <FieldSet className={fieldConfig.sm.gap}>
        <FieldTitle className={fieldConfig.sm.label}>Small</FieldTitle>
        <Textarea size="sm" placeholder="Hint text" />

        <FieldDescription className={fieldConfig.sm.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Default</FieldTitle>
        <Textarea size="default" placeholder="Hint text" />

        <FieldDescription className={fieldConfig.default.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.lg.gap}>
        <FieldTitle className={fieldConfig.lg.label}>Large</FieldTitle>
        <Textarea size="lg" placeholder="Hint text" />

        <FieldDescription className={fieldConfig.lg.description}>
          Helper text
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

/** Disabled textarea */
export function TextareaDisabled() {
  return (
    <FieldSet className={`${demoFieldWidth} ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.disabledLabel}>
        Label
      </FieldTitle>
      <Textarea
        size="default"
        disabled
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Textarea with character counter */
export function TextareaWithCounter() {
  return (
    <TextareaRoot maxCharacters={150} size="default">
      <FieldSet className={`${demoFieldWidth} ${fieldConfig.default.gap}`}>
        <div className="flex items-center justify-between">
          <FieldTitle className={fieldConfig.default.label}>Bio</FieldTitle>
          <TextareaCounter />
        </div>
        <Textarea size="default" placeholder="Tell us about yourself..." />

        <FieldDescription className={fieldConfig.default.description}>
          Write a brief description about yourself.
        </FieldDescription>
      </FieldSet>
    </TextareaRoot>
  );
}

/** Textarea with custom row count */
export function TextareaRows() {
  return (
    <FieldSet className={`${demoFieldWidth} ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Notes</FieldTitle>
      <Textarea size="default" rows={8} placeholder="Hint text" />

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Textarea in error state with counter exceeded */
export function TextareaError() {
  return (
    <TextareaRoot maxCharacters={20} size="default">
      <FieldSet className={`${demoFieldWidth} ${fieldConfig.default.gap}`}>
        <div className="flex items-center justify-between">
          <FieldTitle className={fieldConfig.default.label}>
            Feedback
          </FieldTitle>
          <TextareaCounter />
        </div>
        <Textarea
          size="default"
          defaultValue="This text is way too long for the limit of 20 characters."
        />
        <FieldError className={fieldConfig.default.error}>
          Character limit exceeded.
        </FieldError>
      </FieldSet>
    </TextareaRoot>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'TextareaDemo',
    title: 'Default',
    description: 'Basic textarea with label and helper text.',
  },
  {
    name: 'TextareaSizes',
    title: 'Sizes',
    description: 'Small, default, and large textarea sizes.',
  },
  {
    name: 'TextareaDisabled',
    title: 'Disabled',
    description: 'Disabled textarea with filled content.',
  },
  {
    name: 'TextareaRows',
    title: 'Custom Rows',
    description: 'Textarea with a custom row count.',
  },
  {
    name: 'TextareaWithCounter',
    title: 'With Counter',
    description: 'Textarea with character counter.',
  },
  {
    name: 'TextareaError',
    title: 'Error with Counter',
    description: 'Textarea showing error when character limit is exceeded.',
  },
];

export const textarea = createLegacyDemo('textarea', examples, {
  TextareaDemo: <TextareaDemo />,
  TextareaSizes: <TextareaSizes />,
  TextareaDisabled: <TextareaDisabled />,
  TextareaRows: <TextareaRows />,
  TextareaWithCounter: <TextareaWithCounter />,
  TextareaError: <TextareaError />,
});
