import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import {
  SelectDemo,
  SelectHorizontal,
  SelectInline,
  SelectMultipleDemo,
  SelectMultipleInline,
  SelectSizes,
  SelectValidation,
  SelectWithDisabled,
  SelectWithGroups,
} from '@/app/demo/[name]/ui/select';
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
      <SelectWithDisabled key="disabled" />,
      <SelectValidation key="validation" />,
      <SelectWithGroups key="groups" />,
      <SelectMultipleDemo key="multi" />,
      <SelectMultipleInline key="multi-inline" />,
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

  it('sets data-validation on trigger', () => {
    const { container } = render(
      <Select items={items}>
        <SelectTrigger validationState="warning">
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
    ).toHaveAttribute('data-validation', 'warning');
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
});
