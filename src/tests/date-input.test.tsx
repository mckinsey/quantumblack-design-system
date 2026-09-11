import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DateInput } from '@/components/ui/date-input';

const componentName = 'date-input';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — structure`, () => {
  it('renders root and choose-date trigger', () => {
    render(<DateInput value="2025-04-01" />);

    expect(
      document.querySelector('[data-slot="date-input"]'),
    ).toBeInTheDocument();

    const trigger = screen.getByRole('button', {
      name: 'Change date, 2025-04-01',
    });

    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders range end input in range mode', () => {
    render(<DateInput mode="range" value="2025-04-01" endValue="2025-04-16" />);

    const inputs = document.querySelectorAll('input[type="date"]');

    expect(inputs).toHaveLength(2);
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
  });

  it('respects disabled', () => {
    render(<DateInput disabled value="2025-04-01" />);

    expect(document.querySelector('[data-slot="date-input"]')).toHaveAttribute(
      'data-disabled',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Change date, 2025-04-01' }),
    ).toBeDisabled();
  });
});

describe(`${componentName} — interactions`, () => {
  it('calls onTriggerClick from the choose-date trigger', () => {
    const onTriggerClick = vi.fn();

    render(<DateInput value="2025-04-01" onTriggerClick={onTriggerClick} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Change date, 2025-04-01' }),
    );

    expect(onTriggerClick).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when the start date changes', () => {
    const onChange = vi.fn();

    render(
      <DateInput
        value="2025-04-01"
        onChange={onChange}
        aria-label="Start date"
      />,
    );

    fireEvent.change(screen.getByLabelText('Start date'), {
      target: { value: '2025-04-15' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onEndChange when the end date changes', () => {
    const onEndChange = vi.fn();

    render(
      <DateInput
        mode="range"
        value="2025-04-01"
        endValue="2025-04-16"
        onEndChange={onEndChange}
        aria-label="Start date"
      />,
    );

    fireEvent.change(screen.getByLabelText('End date'), {
      target: { value: '2025-04-20' },
    });

    expect(onEndChange).toHaveBeenCalledTimes(1);
  });
});
