import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

const componentName = 'number-field';

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

describe(`${componentName} — structure & interaction`, () => {
  it('exposes data-slot on root, group, and control', () => {
    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    expect(
      document.querySelector('[data-slot="number-field"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="number-field-group"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="number-field-control"]'),
    ).toBeInTheDocument();
  });

  it('renders disabled field without crashing', () => {
    render(
      <NumberField defaultValue={5} disabled min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="disabled-quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    expect(screen.getByLabelText('disabled-quantity')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
  });

  it('keeps stepper buttons out of the tab order', () => {
    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    expect(screen.getByRole('button', { name: 'Decrease' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
    expect(screen.getByRole('button', { name: 'Increase' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('renders invalid control without crashing', () => {
    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="invalid-quantity" aria-invalid />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    expect(screen.getByLabelText('invalid-quantity')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('increments value when increment is clicked', async () => {
    const user = userEvent.setup();

    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    const input = screen.getByLabelText('quantity');

    expect(input).toHaveValue('5');
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(input).toHaveValue('6');
  });

  it('decrements value when decrement is clicked', async () => {
    const user = userEvent.setup();

    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    const input = screen.getByLabelText('quantity');

    expect(input).toHaveValue('5');
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(input).toHaveValue('4');
  });

  it('steps value with arrow keys', async () => {
    const user = userEvent.setup();

    render(
      <NumberField defaultValue={5} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="quantity" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>,
    );

    const input = screen.getByLabelText('quantity');

    input.focus();
    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('6');
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue('5');
  });
});
