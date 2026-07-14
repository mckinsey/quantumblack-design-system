import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function RadioGroupDemo() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-1">
        Options
      </FieldLegend>
      <RadioGroup defaultValue="option-one" className="pt-3 pb-3">
        <Field orientation="horizontal">
          <RadioGroupItem value="option-one" id="r1" />
          <FieldLabel
            htmlFor="r1"
            className="text-fg-secondary label-regular-primary">
            Option One
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option-two" id="r2" />
          <FieldLabel
            htmlFor="r2"
            className="text-fg-secondary label-regular-primary">
            Option Two
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option-three" id="r3" />
          <FieldLabel
            htmlFor="r3"
            className="text-fg-secondary label-regular-primary">
            Option Three
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

export function RadioGroupStates() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-1">
        States
      </FieldLegend>
      <RadioGroup defaultValue="state-one" className="pt-3 pb-3">
        <Field orientation="horizontal">
          <RadioGroupItem value="state-one" id="s1" />
          <FieldLabel
            htmlFor="s1"
            className="text-fg-secondary label-regular-primary">
            Checked (default)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="state-two" id="s2" />
          <FieldLabel
            htmlFor="s2"
            className="text-fg-secondary label-regular-primary">
            Unchecked
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="state-three" id="s3" disabled />
          <FieldLabel
            htmlFor="s3"
            className="text-fg-secondary label-regular-primary"
            disabled>
            Disabled (unchecked)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

export function RadioGroupDisabled() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-1">
        Disabled Group
      </FieldLegend>
      <RadioGroup defaultValue="disabled-one" disabled className="pt-3 pb-3">
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-one" id="d1" />
          <FieldLabel
            htmlFor="d1"
            className="text-fg-secondary label-regular-primary"
            disabled>
            Option One (Selected)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-two" id="d2" />
          <FieldLabel
            htmlFor="d2"
            className="text-fg-secondary label-regular-primary"
            disabled>
            Option Two
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-three" id="d3" />
          <FieldLabel
            htmlFor="d3"
            className="text-fg-secondary label-regular-primary"
            disabled>
            Option Three
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

export function RadioGroupPartialDisabled() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-1">
        Partial Disabled
      </FieldLegend>
      <RadioGroup defaultValue="partial-one" className="pt-3 pb-3">
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-one" id="p1" />
          <FieldLabel
            htmlFor="p1"
            className="text-fg-secondary label-regular-primary">
            Option One
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-two" id="p2" disabled />
          <FieldLabel
            htmlFor="p2"
            className="text-fg-secondary label-regular-primary"
            disabled>
            Option Two (Disabled)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-three" id="p3" />
          <FieldLabel
            htmlFor="p3"
            className="text-fg-secondary label-regular-primary">
            Option Three
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

const sizeVariants = [
  {
    label: 'Regular',
    prefix: 'r',
    radioSize: undefined as 'lg' | undefined,
    labelClass: 'text-fg-secondary label-regular-primary',
    legendClass: 'label-regular-primary',
    default: { groupGap: 'gap-3', legendGap: 'mb-1' },
    comfortable: { groupGap: 'gap-4', legendGap: 'mb-1' },
  },
  {
    label: 'Small',
    prefix: 's',
    radioSize: undefined as 'lg' | undefined,
    labelClass: 'text-fg-secondary label-small-primary',
    legendClass: 'label-regular-primary',
    default: { groupGap: 'gap-3', legendGap: 'mb-1' },
    comfortable: { groupGap: 'gap-4', legendGap: 'mb-1' },
  },
  {
    label: 'Large',
    prefix: 'l',
    radioSize: 'lg' as const,
    labelClass: 'text-fg-secondary label-large-primary',
    legendClass: 'label-large-primary',
    default: { groupGap: 'gap-3', legendGap: 'mb-1' },
    comfortable: { groupGap: 'gap-4', legendGap: 'mb-1' },
  },
];

const densityVariants = [
  {
    key: 'default' as const,
    label: 'default',
    prefix: 'd',
    padding: 'pt-3 pb-3',
  },
  {
    key: 'comfortable' as const,
    label: 'comfortable',
    prefix: 'c',
    padding: 'pt-4 pb-4',
  },
];

export function RadioGroupDensity() {
  return (
    <div className="space-y-10">
      {densityVariants.map(density => (
        <div key={density.key} className="flex flex-wrap gap-3">
          {sizeVariants.map(size => {
            const prefix = `${density.prefix}${size.prefix}`;
            const { groupGap, legendGap } = size[density.key];
            const ids = [1, 2, 3, 4, 5].map(i => `${prefix}-${i}`);

            return (
              <FieldSet key={prefix} className="w-60">
                <FieldLegend
                  variant="label"
                  className={`${size.legendClass} ${legendGap}`}>
                  {size.label} ({density.label})
                </FieldLegend>

                <RadioGroup
                  defaultValue={ids[0]}
                  className={`${groupGap} ${density.padding}`}>
                  {ids.map(id => (
                    <Field key={id} orientation="horizontal">
                      <RadioGroupItem
                        value={id}
                        id={id}
                        size={size.radioSize}
                      />
                      <FieldLabel htmlFor={id} className={size.labelClass}>
                        Label
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function RadioGroupHorizontal() {
  return (
    <div className="flex flex-wrap gap-8">
      <FieldSet className="w-auto">
        <FieldLegend variant="label" className="label-regular-primary mb-1">
          Options (default)
        </FieldLegend>
        <RadioGroup
          orientation="horizontal"
          defaultValue="h1"
          className="gap-3">
          <Field orientation="horizontal">
            <RadioGroupItem value="h1" id="h1" />
            <FieldLabel
              htmlFor="h1"
              className="text-fg-secondary label-regular-primary">
              Option 1
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="h2" id="h2" />
            <FieldLabel
              htmlFor="h2"
              className="text-fg-secondary label-regular-primary">
              Option 2
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="h3" id="h3" />
            <FieldLabel
              htmlFor="h3"
              className="text-fg-secondary label-regular-primary">
              Option 3
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>

      <FieldSet className="w-auto">
        <FieldLegend variant="label" className="label-large-primary mb-1">
          Options (large, comfortable)
        </FieldLegend>
        <RadioGroup
          orientation="horizontal"
          defaultValue="hl1"
          className="gap-4">
          <Field orientation="horizontal">
            <RadioGroupItem value="hl1" id="hl1" size="lg" />
            <FieldLabel
              htmlFor="hl1"
              className="text-fg-secondary label-large-primary">
              Option 1
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="hl2" id="hl2" size="lg" />
            <FieldLabel
              htmlFor="hl2"
              className="text-fg-secondary label-large-primary">
              Option 2
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="hl3" id="hl3" size="lg" />
            <FieldLabel
              htmlFor="hl3"
              className="text-fg-secondary label-large-primary">
              Option 3
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  );
}

export const examples = [
  {
    name: 'RadioGroupDemo',
    title: 'Default',
    description: 'Basic radio group with labels.',
  },
  {
    name: 'RadioGroupDensity',
    title: 'Sizes & Density',
    description:
      'Regular, small label, and large sizes in default and comfortable density.',
  },
  {
    name: 'RadioGroupHorizontal',
    title: 'Horizontal',
    description: 'Inline radio groups for compact horizontal selection.',
  },
  {
    name: 'RadioGroupStates',
    title: 'States',
    description: 'Checked, unchecked, and disabled states.',
  },
  {
    name: 'RadioGroupDisabled',
    title: 'Disabled Group',
    description: 'Fully disabled radio group.',
  },
  {
    name: 'RadioGroupPartialDisabled',
    title: 'Partial Disabled',
    description: 'Some options disabled.',
  },
];

export const radioGroup = {
  name: 'radio-group',
  components: {
    Default: <RadioGroupDemo />,
    'Sizes & Density': <RadioGroupDensity />,
    Horizontal: <RadioGroupHorizontal />,
    States: <RadioGroupStates />,
    'Disabled Group': <RadioGroupDisabled />,
    'Partial Disabled': <RadioGroupPartialDisabled />,
  },
};
