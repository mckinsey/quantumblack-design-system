import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('triggers onClick when clicked', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled button
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled button' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
