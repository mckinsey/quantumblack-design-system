import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  SelectDemo,
  SelectHorizontal,
  SelectInline,
  SelectMultipleExamples,
  SelectMultipleSizes,
  SelectMultipleWithSlots,
  SelectSizes,
  SelectValidation,
  SelectWithDisabled,
  SelectWithGroups,
} from '@/app/demo/[name]/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const items = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
];

afterEach(() => {
  cleanup();
});

describe('Select', () => {
  it('renders demos without crash', () => {
    const demos = [
      <SelectDemo key="demo" />,
      <SelectSizes key="sizes" />,
      <SelectInline key="inline" />,
      <SelectHorizontal key="horizontal" />,
      <SelectWithDisabled key="disabled-option" />,
      <SelectValidation key="validation" />,
      <SelectWithGroups key="groups" />,
      <SelectMultipleSizes key="multi-sizes" />,
      <SelectMultipleWithSlots key="multi-slots" />,
      <SelectMultipleExamples key="multi-examples" />,
    ];

    for (const demo of demos) {
      expect(() => render(demo)).not.toThrow();
      cleanup();
    }
  });

  it('exposes select trigger and value data-slots', () => {
    render(
      <Select items={items}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    expect(
      document.querySelector('[data-slot="select-trigger"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="select-value"]'),
    ).toBeInTheDocument();
  });

  it('sets data-variant on trigger', () => {
    const { container } = render(
      <Select items={items}>
        <SelectTrigger variant="inline">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">
            <SelectItemText>One</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).toHaveAttribute('data-variant', 'inline');
  });

  it('sets aria-invalid on trigger for error', () => {
    const { container } = render(
      <Select items={items}>
        <SelectTrigger aria-invalid>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">
            <SelectItemText>One</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders feedback icons in validation demo', () => {
    render(<SelectValidation />);

    expect(
      document.querySelectorAll('[data-slot="select-feedback-icon"]'),
    ).toHaveLength(3);
  });

  it('smoke-renders size and variant combos', () => {
    const sizes = ['sm', 'default', 'lg'] as const;
    const variants = ['default', 'inline'] as const;

    for (const size of sizes) {
      for (const variant of variants) {
        expect(() =>
          render(
            <Select size={size} items={items}>
              <SelectTrigger variant={variant}>
                <SelectValue placeholder="Pick" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">
                  <SelectItemText>One</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>,
          ),
        ).not.toThrow();
        cleanup();
      }
    }
  });

  it('opens and shows options', async () => {
    const user = userEvent.setup();

    render(
      <Select items={items}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    await user.click(screen.getByRole('combobox'));
    expect(await screen.findByRole('option', { name: 'One' })).toBeVisible();
  });

  it('multiple select renders checkbox items', async () => {
    const user = userEvent.setup();

    render(<SelectDemo />);

    const triggers = screen.getAllByRole('combobox');
    await user.click(triggers[2]);

    const options = await screen.findAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    expect(
      document.querySelectorAll('[data-slot="select-item"]'),
    ).not.toHaveLength(0);
    expect(
      document.querySelectorAll('[role="checkbox"]').length,
    ).toBeGreaterThan(0);
  });

  it('multiple select toggles selection', async () => {
    const user = userEvent.setup();

    function MultiHarness() {
      const [value, setValue] = React.useState<string[]>([]);

      return (
        <Select
          multiple
          items={items}
          value={value}
          onValueChange={v => setValue(v as string[])}>
          <SelectTrigger>
            <SelectValue placeholder="Pick" />
          </SelectTrigger>
          <SelectContent>
            {items.map(item => (
              <SelectItem key={item.value} value={item.value}>
                <Checkbox
                  checked={value.includes(item.value)}
                  onCheckedChange={() => {}}
                  tabIndex={-1}
                  className="pointer-events-none"
                />
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    render(<MultiHarness />);

    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'One' }));

    const checkbox = document.querySelector('[role="checkbox"]');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
