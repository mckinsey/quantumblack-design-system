import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TagToggle } from '@/components/ui/tag-toggle';

afterEach(() => {
  cleanup();
});

describe('TagToggle', () => {
  it('renders data-slot and aria-pressed false', () => {
    render(<TagToggle>Label</TagToggle>);
    const el = screen.getByRole('button', { name: 'Label' });
    expect(el).toHaveAttribute('data-slot', 'tag-toggle');
    expect(el).toHaveAttribute('aria-pressed', 'false');
    expect(el).not.toHaveAttribute('data-pressed');
  });

  it('toggles on click', () => {
    render(<TagToggle>Label</TagToggle>);
    const el = screen.getByRole('button', { name: 'Label' });
    fireEvent.click(el);
    expect(el).toHaveAttribute('aria-pressed', 'true');
    expect(el).toHaveAttribute('data-pressed');
  });

  it('renders pressed when controlled', () => {
    render(<TagToggle pressed>Label</TagToggle>);
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('aria-pressed', 'true');
    expect(el).toHaveAttribute('data-pressed');
  });
});
