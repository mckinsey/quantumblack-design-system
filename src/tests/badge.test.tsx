import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Badge,
  NumericBadge,
  badgeIconShellProps,
} from '@/components/ui/badge';

const componentName = 'badge';

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

describe(`${componentName} — structure`, () => {
  it('renders label text inside Badge', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders NumericBadge with children text', () => {
    render(<NumericBadge>42</NumericBadge>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders NumericBadge with variant', () => {
    render(<NumericBadge variant="secondary">9</NumericBadge>);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it.each([
    'high-emphasis',
    'alternative',
    'error',
    'warning',
    'success',
  ] as const)('renders variant="%s" without crashing', variant => {
    expect(() => render(<Badge variant={variant}>Label</Badge>)).not.toThrow();
  });

  it('renders pill badge with rounded-full', () => {
    render(<Badge>Pill</Badge>);
    expect(screen.getByText('Pill')).toHaveClass('rounded-full');
  });
});

describe(`${componentName} — badgeIconShellProps`, () => {
  it('uses status types on outline error/warning/success badges', () => {
    expect(badgeIconShellProps('error', true)).toEqual({
      type: 'error',
      variant: 'primary',
    });
    expect(badgeIconShellProps('warning', true)).toEqual({
      type: 'warning',
      variant: 'primary',
    });
    expect(badgeIconShellProps('success', true)).toEqual({
      type: 'success',
      variant: 'primary',
    });
  });

  it('uses variant emphasis only on filled badges', () => {
    expect(badgeIconShellProps('error', false)).toEqual({
      variant: 'primary',
    });
    expect(badgeIconShellProps('alternative', false)).toEqual({
      variant: 'secondary',
    });
  });

  it('uses variant emphasis on outline badges when icon matches label', () => {
    expect(badgeIconShellProps('high-emphasis', true)).toEqual({
      variant: 'primary',
    });
    expect(badgeIconShellProps('brand-accent', true)).toEqual({
      variant: 'primary',
    });
  });
});
