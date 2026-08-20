import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
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
    const { container } = render(
      <InputGroup>
        <InputGroupInput aria-label="group-input" />
      </InputGroup>,
    );

    expect(
      container.querySelector('[data-slot="input-group"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'data-slot',
      'input-group-control',
    );
    expect(
      container.querySelector('[data-slot="input"]'),
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

  it('renders disabled group with affixes and icons without crashing', () => {
    expect(() =>
      render(
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>PRE</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput disabled aria-label="disabled-affix-input" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>SUF</InputGroupText>
          </InputGroupAddon>
        </InputGroup>,
      ),
    ).not.toThrow();
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
    const addon = screen
      .getByText('Prefix')
      .closest('[data-slot="input-group-addon"]');

    expect(addon).not.toBeNull();
    expect(input).not.toHaveFocus();
    await user.click(addon as HTMLElement);
    expect(input).toHaveFocus();
  });

  it('addon click does not steal focus from a nested button', async () => {
    const user = userEvent.setup();
    const onButtonClick = vi.fn();

    render(
      <InputGroup>
        <InputGroupInput aria-label="addon-button-target" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onButtonClick}>Clear</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Clear' });

    await user.click(button);

    expect(onButtonClick).toHaveBeenCalledOnce();
    expect(input).not.toHaveFocus();
  });

  it('addon click does not focus a disabled control', async () => {
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <span>Prefix</span>
        </InputGroupAddon>
        <InputGroupInput disabled aria-label="disabled-addon-target" />
      </InputGroup>,
    );

    const input = screen.getByRole('textbox');
    const addon = screen
      .getByText('Prefix')
      .closest('[data-slot="input-group-addon"]');

    await user.click(addon as HTMLElement);
    expect(input).not.toHaveFocus();
  });

  it.each(['inline-start', 'inline-end', 'block-start', 'block-end'] as const)(
    'exposes data-align="%s" on addon',
    align => {
      const { container } = render(
        <InputGroup>
          <InputGroupAddon align={align}>
            <span>Addon</span>
          </InputGroupAddon>
          <InputGroupInput aria-label="align-target" />
        </InputGroup>,
      );

      expect(
        container.querySelector('[data-slot="input-group-addon"]'),
      ).toHaveAttribute('data-align', align);
    },
  );

  it('renders InputGroupButton with data-size', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="button-sibling" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="clear">
            X
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );

    expect(screen.getByRole('button', { name: 'clear' })).toHaveAttribute(
      'data-size',
      'icon-xs',
    );
  });

  it('renders InputGroupTextarea with data-slot and honors disabled', () => {
    render(<InputGroupTextarea disabled aria-label="group-textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('data-slot', 'input-group-control');
    expect(textarea).toBeDisabled();
  });

  it.each(['sm', 'default', 'lg'] as const)(
    'applies size="%s" via data-size',
    size => {
      const { container } = render(
        <InputGroup size={size}>
          <InputGroupInput aria-label="sz" />
        </InputGroup>,
      );

      expect(
        container.querySelector('[data-slot="input-group"]'),
      ).toHaveAttribute('data-size', size);
    },
  );

  it.each(['sm', 'default', 'lg'] as const)(
    'renders InputGroupText at size="%s" without crashing',
    size => {
      expect(() =>
        render(
          <InputGroup size={size}>
            <InputGroupAddon align="inline-start">
              <InputGroupText>PRE</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label="affix" />
          </InputGroup>,
        ),
      ).not.toThrow();
    },
  );

  it.each(['default', 'inline'] as const)(
    'applies variant="%s" via data-variant',
    variant => {
      const { container } = render(
        <InputGroup variant={variant}>
          <InputGroupInput variant={variant} aria-label="vt" />
        </InputGroup>,
      );

      expect(
        container.querySelector('[data-slot="input-group"]'),
      ).toHaveAttribute('data-variant', variant);
    },
  );
});
