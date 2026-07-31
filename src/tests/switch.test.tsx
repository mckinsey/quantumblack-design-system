import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Switch } from '@/components/ui/switch';

if (typeof globalThis.PointerEvent === 'undefined') {
  class PointerEvent extends MouseEvent {
    constructor(type: string, props?: MouseEventInit) {
      super(type, props);
    }
  }

  Object.defineProperty(globalThis, 'PointerEvent', {
    value: PointerEvent,
  });
}

const componentName = 'switch';

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

describe(`${componentName} — state`, () => {
  it('renders with data-slot', () => {
    render(<Switch aria-label="test" />);

    expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch');
  });

  it('is unchecked by default', () => {
    render(<Switch aria-label="test" />);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('is checked when checked={true}', () => {
    render(<Switch aria-label="test" checked />);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch aria-label="test" disabled />);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('can be toggled by the user', () => {
    render(<Switch aria-label="test" defaultChecked={false} />);

    const el = screen.getByRole('switch');

    expect(el).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(el);

    expect(el).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();

    render(
      <Switch
        aria-label="test"
        disabled
        defaultChecked={false}
        onCheckedChange={onCheckedChange}
      />,
    );

    fireEvent.click(screen.getByRole('switch'));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
