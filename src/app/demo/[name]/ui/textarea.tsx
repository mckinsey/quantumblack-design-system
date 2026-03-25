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

const fieldConfig = {
  default: {
    label: 'label-regular-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
} as const;

/** Default textarea with label and helper text */
export function TextareaDemo() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Textarea placeholder="Hint text" />

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Default and large textarea sizes */
export function TextareaSizes() {
  return (
    <div className="w-full max-w-sm space-y-4">
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

/** Filled, disabled, and error states */
export function TextareaStates() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Filled</FieldTitle>
        <Textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />

        <FieldDescription className={fieldConfig.default.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Disabled</FieldTitle>
        <Textarea placeholder="Hint text" disabled />

        <FieldDescription className={fieldConfig.default.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Error</FieldTitle>
        <Textarea
          aria-invalid
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <FieldError>Feedback message here</FieldError>
      </FieldSet>
    </div>
  );
}

/** Textarea with character counter */
export function TextareaWithCounter() {
  return (
    <TextareaRoot maxCharacters={150}>
      <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
        <div className="flex items-center justify-between">
          <FieldTitle className={fieldConfig.default.label}>Bio</FieldTitle>
          <TextareaCounter />
        </div>
        <Textarea placeholder="Tell us about yourself..." />

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
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Notes</FieldTitle>
      <Textarea rows={8} placeholder="Hint text" />

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Textarea in error state with counter exceeded */
export function TextareaError() {
  return (
    <TextareaRoot maxCharacters={20}>
      <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
        <div className="flex items-center justify-between">
          <FieldTitle className={fieldConfig.default.label}>
            Feedback
          </FieldTitle>
          <TextareaCounter />
        </div>
        <Textarea defaultValue="This text is way too long for the limit of 20 characters." />
        <FieldError>
          Character limit exceeded. Please shorten your text.
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
    description: 'Default and large textarea sizes.',
  },
  {
    name: 'TextareaStates',
    title: 'States',
    description: 'Filled, disabled, and error textarea states.',
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
  TextareaStates: <TextareaStates />,
  TextareaRows: <TextareaRows />,
  TextareaWithCounter: <TextareaWithCounter />,
  TextareaError: <TextareaError />,
});
