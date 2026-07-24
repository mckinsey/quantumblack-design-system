import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

const componentName = 'field';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — structure`, () => {
  it('renders FieldSet with data-slot', () => {
    render(
      <FieldSet>
        <FieldTitle>Label</FieldTitle>
      </FieldSet>,
    );
    expect(
      document.querySelector('[data-slot="field-set"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldLabel and associates via htmlFor', () => {
    render(
      <FieldSet>
        <FieldLabel htmlFor="field-test">Label</FieldLabel>
        <input id="field-test" />
      </FieldSet>,
    );
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  it('renders FieldDescription', () => {
    render(<FieldDescription>Helper text</FieldDescription>);
    expect(
      document.querySelector('[data-slot="field-description"]'),
    ).toHaveTextContent('Helper text');
  });

  it('renders FieldError with alert role', () => {
    render(<FieldError>Feedback</FieldError>);
    expect(screen.getByRole('alert')).toHaveTextContent('Feedback');
  });

  it('returns null for FieldError without content', () => {
    const { container } = render(<FieldError />);
    expect(container.querySelector('[data-slot="field-error"]')).toBeNull();
  });

  it.each(['sm', 'default', 'lg'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() =>
        render(
          <Field>
            <FieldTitle size={size}>Label</FieldTitle>
            <FieldDescription size={size}>Helper</FieldDescription>
            <FieldError size={size}>Error</FieldError>
          </Field>,
        ),
      ).not.toThrow();
    },
  );

  it('renders disabled FieldDescription', () => {
    render(<FieldDescription disabled>Helper text</FieldDescription>);
    expect(
      document.querySelector('[data-slot="field-description"]'),
    ).toHaveAttribute('data-disabled', 'true');
  });
});
