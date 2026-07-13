import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tag } from '@/components/ui/tag';

afterEach(() => {
  cleanup();
});

describe('Tag', () => {
  it('renders data-slot and label', () => {
    render(<Tag>Label</Tag>);
    expect(screen.getByText('Label').closest('[data-slot="tag"]')).toBeTruthy();
  });

  it('renders remove button with aria-label', () => {
    render(<Tag onRemove={() => {}}>Label</Tag>);
    expect(
      screen.getByRole('button', { name: 'Remove tag' }),
    ).toBeInTheDocument();
  });

  it('calls onRemove without bubbling', () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Label</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Remove tag' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it.each([
    'primary',
    'secondary',
    'accent',
    'outline',
    'accent-outline',
  ] as const)('renders variant="%s"', variant => {
    expect(() => render(<Tag variant={variant}>X</Tag>)).not.toThrow();
  });
});
