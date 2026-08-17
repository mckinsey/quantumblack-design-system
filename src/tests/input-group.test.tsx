import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

const componentName = 'input-group';

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
  it('exposes data-slot on group and control', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="group-input" />
      </InputGroup>,
    );

    expect(
      document.querySelector('[data-slot="input-group"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="input-group-control"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="input"]'),
    ).not.toBeInTheDocument();
  });

  it('renders disabled default group without crashing', () => {
    render(
      <InputGroup variant="default">
        <InputGroupInput disabled aria-label="disabled-group-input" />
      </InputGroup>,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('addon click focuses input', async () => {
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <span>Prefix</span>
        </InputGroupAddon>
        <InputGroupInput aria-label="addon-target" />
      </InputGroup>,
    );

    const input = screen.getByRole('textbox');
    const addon = document.querySelector('[data-slot="input-group-addon"]');

    expect(addon).toBeTruthy();
    expect(input).not.toHaveFocus();
    await user.click(addon!);
    expect(input).toHaveFocus();
  });

  it.each(['sm', 'default', 'lg'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() =>
        render(
          <InputGroup size={size}>
            <InputGroupInput size={size} aria-label="sz" />
          </InputGroup>,
        ),
      ).not.toThrow();
    },
  );

  it.each(['default', 'inline'] as const)(
    'renders variant="%s" without crashing',
    variant => {
      expect(() =>
        render(
          <InputGroup variant={variant}>
            <InputGroupInput variant={variant} aria-label="vt" />
          </InputGroup>,
        ),
      ).not.toThrow();
    },
  );
});
