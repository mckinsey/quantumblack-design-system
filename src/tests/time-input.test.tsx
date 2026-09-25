import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  TimeInput,
  TimeInputRoot,
  TimeInputTrigger,
  TimeSegmentInput,
  TimeSeparator,
} from '@/components/ui/time-input';

const componentName = 'time-input';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — structure & interaction`, () => {
  it('exposes data-slot on root, segments, separator, and trigger', () => {
    const { container } = render(
      <TimeInputRoot>
        <TimeSegmentInput aria-label="hour" value={1} onChange={() => {}} />
        <TimeSeparator />
        <TimeSegmentInput aria-label="minute" value={5} onChange={() => {}} />
        <TimeInputTrigger />
      </TimeInputRoot>,
    );

    for (const slot of [
      'time-input-root',
      'time-segment',
      'time-separator',
      'time-input-trigger',
    ]) {
      expect(
        container.querySelector(`[data-slot="${slot}"]`),
      ).toBeInTheDocument();
    }
  });

  it('renders spinbuttons and clock trigger from TimeInput', () => {
    render(<TimeInput hour={10} minute={30} />);

    expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Choose time' }),
    ).toBeInTheDocument();
  });

  it('exposes dialog popup state on the clock trigger', () => {
    const onTriggerClick = vi.fn();
    const { rerender } = render(
      <TimeInput
        hour={10}
        minute={30}
        open={false}
        onTriggerClick={onTriggerClick}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Choose time' });

    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <TimeInput hour={10} minute={30} open onTriggerClick={onTriggerClick} />,
    );
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('omits dialog popup ARIA when onTriggerClick is absent', () => {
    render(<TimeInput hour={10} minute={30} open />);
    const trigger = screen.getByRole('button', { name: 'Choose time' });

    expect(trigger).not.toHaveAttribute('aria-haspopup');
    expect(trigger).not.toHaveAttribute('aria-expanded');
  });

  it('forwards data-open to the root', () => {
    const { rerender, container } = render(
      <TimeInput hour={10} minute={30} open />,
    );
    const root = container.querySelector('[data-slot="time-input-root"]');

    expect(root).toHaveAttribute('data-open', 'true');

    rerender(<TimeInput hour={10} minute={30} open={false} />);
    expect(root).not.toHaveAttribute('data-open');
  });

  it('sets aria-invalid on root and segments', () => {
    const { container } = render(
      <TimeInput hour={10} minute={30} aria-invalid />,
    );
    const root = container.querySelector('[data-slot="time-input-root"]');

    expect(root).toHaveAttribute('aria-invalid', 'true');

    for (const spin of screen.getAllByRole('spinbutton')) {
      expect(spin).toHaveAttribute('aria-invalid', 'true');
    }
  });

  it('disables segments and trigger when disabled', () => {
    render(<TimeInput hour={10} minute={30} disabled />);

    for (const spin of screen.getAllByRole('spinbutton')) {
      expect(spin).toBeDisabled();
    }

    expect(screen.getByRole('button', { name: 'Choose time' })).toBeDisabled();
  });

  it('calls onTriggerClick from the clock button', async () => {
    const user = userEvent.setup();
    const onTriggerClick = vi.fn();

    render(<TimeInput hour={10} minute={30} onTriggerClick={onTriggerClick} />);

    await user.click(screen.getByRole('button', { name: 'Choose time' }));
    expect(onTriggerClick).toHaveBeenCalledOnce();
  });
});
