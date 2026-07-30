import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox';

const componentName = 'checkbox';

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
  it('is unchecked by default', () => {
    render(<Checkbox aria-label="test" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('is checked when checked={true}', () => {
    render(<Checkbox aria-label="test" checked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('shows indeterminate state when checked="indeterminate"', () => {
    render(<Checkbox aria-label="test" checked="indeterminate" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox aria-label="test" disabled />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('can be toggled by the user', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="test" defaultChecked={false} />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('aria-checked', 'false');
    await user.click(cb);
    expect(cb).toHaveAttribute('aria-checked', 'true');
  });

  it('renders lg size', () => {
    render(<Checkbox aria-label="test" size="lg" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'data-slot',
      'checkbox',
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-size', 'lg');
  });

  it('renders density and orientation attrs', () => {
    const { container } = render(
      <CheckboxGroup density="comfortable" orientation="horizontal" size="sm">
        <Checkbox aria-label="a" value="a" />
      </CheckboxGroup>,
    );

    const group = container.querySelector('[data-slot="checkbox-group"]');

    expect(group).toHaveAttribute('data-density', 'comfortable');
    expect(group).toHaveAttribute('data-orientation', 'horizontal');
    expect(group).toHaveAttribute('data-size', 'sm');
    expect(group).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('parent checkbox reflects partial selection', () => {
    function ParentGroup() {
      const [value, setValue] = useState(['a']);

      return (
        <CheckboxGroup
          allValues={['a', 'b']}
          value={value}
          onValueChange={setValue}>
          <Checkbox aria-label="parent" parent />
          <Checkbox aria-label="a" value="a" />
          <Checkbox aria-label="b" value="b" />
        </CheckboxGroup>
      );
    }

    render(<ParentGroup />);

    expect(screen.getByRole('checkbox', { name: 'parent' })).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  it('parent checkbox selects and clears all values', async () => {
    const user = userEvent.setup();

    function ParentGroup() {
      const [value, setValue] = useState(['a']);

      return (
        <CheckboxGroup
          allValues={['a', 'b']}
          value={value}
          onValueChange={setValue}>
          <Checkbox aria-label="parent" parent />
          <Checkbox aria-label="a" value="a" />
          <Checkbox aria-label="b" value="b" />
        </CheckboxGroup>
      );
    }

    render(<ParentGroup />);

    const parent = screen.getByRole('checkbox', { name: 'parent' });

    await user.click(parent);
    expect(screen.getByRole('checkbox', { name: 'a' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('checkbox', { name: 'b' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(parent).toHaveAttribute('aria-checked', 'true');

    await user.click(parent);
    expect(screen.getByRole('checkbox', { name: 'a' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(screen.getByRole('checkbox', { name: 'b' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(parent).toHaveAttribute('aria-checked', 'false');
  });

  it('can toggle values in a group', async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup defaultValue={['a']}>
        <Checkbox aria-label="a" value="a" />
        <Checkbox aria-label="b" value="b" />
      </CheckboxGroup>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'b' }));
    expect(screen.getByRole('checkbox', { name: 'b' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });
});
