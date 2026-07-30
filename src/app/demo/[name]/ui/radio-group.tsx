import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const legendMb = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  default: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
} as const;

function listLegendMb(
  size: keyof typeof legendMb,
  density: 'default' | 'comfortable',
  orientation: 'vertical' | 'horizontal',
) {
  if (orientation === 'horizontal') {
    return 'mb-3';
  }

  return legendMb[size][density];
}

export function RadioGroupDemo() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Options
      </FieldLegend>
      <RadioGroup defaultValue="option-one">
        <Field orientation="horizontal">
          <RadioGroupItem value="option-one" id="r1" />
          <FieldLabel htmlFor="r1" className="label-regular-primary">
            Option One
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option-two" id="r2" />
          <FieldLabel htmlFor="r2" className="label-regular-primary">
            Option Two
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option-three" id="r3" />
          <FieldLabel htmlFor="r3" className="label-regular-primary">
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
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        States
      </FieldLegend>
      <RadioGroup defaultValue="state-one">
        <Field orientation="horizontal">
          <RadioGroupItem value="state-one" id="s1" />
          <FieldLabel htmlFor="s1" className="label-regular-primary">
            Checked (default)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="state-two" id="s2" />
          <FieldLabel htmlFor="s2" className="label-regular-primary">
            Unchecked
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="state-three" id="s3" disabled />
          <FieldLabel htmlFor="s3" className="label-regular-primary" disabled>
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
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Disabled Group
      </FieldLegend>
      <RadioGroup defaultValue="disabled-one" disabled>
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-one" id="d1" />
          <FieldLabel htmlFor="d1" className="label-regular-primary" disabled>
            Option One (Selected)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-two" id="d2" />
          <FieldLabel htmlFor="d2" className="label-regular-primary" disabled>
            Option Two
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="disabled-three" id="d3" />
          <FieldLabel htmlFor="d3" className="label-regular-primary" disabled>
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
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Partial Disabled
      </FieldLegend>
      <RadioGroup defaultValue="partial-one">
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-one" id="p1" />
          <FieldLabel htmlFor="p1" className="label-regular-primary">
            Option One
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-two" id="p2" disabled />
          <FieldLabel htmlFor="p2" className="label-regular-primary" disabled>
            Option Two (Disabled)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="partial-three" id="p3" />
          <FieldLabel htmlFor="p3" className="label-regular-primary">
            Option Three
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

const sizeVariants = [
  {
    label: 'Small',
    key: 'sm' as const,
    prefix: 's',
    radioSize: 'sm' as const,
    labelClass: 'label-small-primary',
    legendClass: 'label-regular-primary',
  },
  {
    label: 'Regular',
    key: 'default' as const,
    prefix: 'r',
    radioSize: 'default' as const,
    labelClass: 'label-regular-primary',
    legendClass: 'label-regular-primary',
  },
  {
    label: 'Large',
    key: 'lg' as const,
    prefix: 'l',
    radioSize: 'lg' as const,
    labelClass: 'label-large-primary',
    legendClass: 'label-large-primary',
  },
];

const densityVariants = [
  {
    key: 'default' as const,
    label: 'default',
    prefix: 'd',
  },
  {
    key: 'comfortable' as const,
    label: 'comfortable',
    prefix: 'c',
  },
];

export function RadioGroupDensity() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div
          key={density.key}
          className="border-stroke-tertiary border-b pb-6 last:border-b-0 last:pb-0">
          <h4 className="label-regular-primary mb-4">
            Density: {density.label}
          </h4>
          <div className="border-stroke-tertiary flex justify-center gap-12 border-b pb-6 last:border-b-0 last:pb-0">
            {sizeVariants.map(size => {
              const prefix = `${density.prefix}${size.prefix}`;
              const ids = [1, 2, 3, 4, 5].map(i => `${prefix}-${i}`);

              return (
                <FieldSet key={prefix} className="w-30">
                  <FieldLegend
                    variant="label"
                    className={`${size.legendClass} ${listLegendMb(size.key, density.key, 'vertical')}`}>
                    {size.label}
                  </FieldLegend>

                  <RadioGroup
                    defaultValue={ids[0]}
                    density={density.key}
                    size={size.key}>
                    {ids.map(id => (
                      <Field key={id} orientation="horizontal">
                        <RadioGroupItem
                          value={id}
                          id={id}
                          size={size.radioSize}
                        />
                        <FieldLabel htmlFor={id} className={size.labelClass}>
                          Radio label
                        </FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                </FieldSet>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RadioGroupHorizontal() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div
          key={density.key}
          className="border-stroke-tertiary border-b pb-6 last:border-b-0 last:pb-0">
          <h4 className="label-regular-primary mb-4">
            Density: {density.label}
          </h4>
          <div className="flex flex-col gap-8">
            {sizeVariants.map(size => {
              const prefix = `${density.prefix}h${size.prefix}`;
              const ids = [1, 2, 3].map(i => `${prefix}-${i}`);

              return (
                <FieldSet key={prefix} className="w-auto">
                  <FieldLegend
                    variant="label"
                    className={`${size.legendClass} ${listLegendMb(size.key, density.key, 'horizontal')}`}>
                    {size.label}
                  </FieldLegend>

                  <RadioGroup
                    orientation="horizontal"
                    defaultValue={ids[0]}
                    density={density.key}
                    size={size.key}>
                    {ids.map(id => (
                      <Field key={id} orientation="horizontal">
                        <RadioGroupItem
                          value={id}
                          id={id}
                          size={size.radioSize}
                        />
                        <FieldLabel htmlFor={id} className={size.labelClass}>
                          Radio label
                        </FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                </FieldSet>
              );
            })}
          </div>
        </div>
      ))}
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
      'Small, default, and large sizes in default and comfortable density.',
  },
  {
    name: 'RadioGroupHorizontal',
    title: 'Horizontal',
    description:
      'Inline radio groups by size (small, default, large) and density (default, comfortable).',
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
