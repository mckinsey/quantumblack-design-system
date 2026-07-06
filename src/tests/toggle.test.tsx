import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toggle } from '@/components/ui/toggle';

afterEach(() => {
  cleanup();
});

describe('Toggle', () => {
  it('renders with data-slot and aria-pressed false by default', () => {
    render(<Toggle>Off</Toggle>);

    const el = screen.getByRole('button', { name: 'Off' });

    expect(el).toHaveAttribute('data-slot', 'toggle');
    expect(el).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders pressed state with aria-pressed true', () => {
    render(<Toggle pressed={true}>On</Toggle>);

    expect(screen.getByRole('button', { name: 'On' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('toggles aria-pressed on click', () => {
    render(<Toggle>Toggle</Toggle>);

    const el = screen.getByRole('button', { name: 'Toggle' });

    fireEvent.click(el);
    expect(el).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(el);
    expect(el).toHaveAttribute('aria-pressed', 'false');
  });

  it('does not toggle when disabled', () => {
    const onPressedChange = vi.fn();

    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Disabled
      </Toggle>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));

    expect(onPressedChange).not.toHaveBeenCalled();
  });
});
