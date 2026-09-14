import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Popover } from '@/components/ui/popover';
import {
  TimePickerItem,
  TimePickerList,
  TimePickerListContent,
} from '@/components/ui/time-picker';

if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = () => [];
}

const componentName = 'time-picker';

function OpenListContent() {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open>
      <div ref={anchorRef} />
      <TimePickerListContent anchor={anchorRef}>
        <TimePickerList value="1" onValueChange={() => {}}>
          <TimePickerItem value="0">00</TimePickerItem>
          <TimePickerItem value="1">01</TimePickerItem>
        </TimePickerList>
      </TimePickerListContent>
    </Popover>
  );
}

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
  it('exposes data-slot on list, item, and content', () => {
    render(<OpenListContent />);

    for (const slot of [
      'time-picker-list-content',
      'time-picker-list',
      'time-picker-item',
    ]) {
      expect(
        document.querySelector(`[data-slot="${slot}"]`),
      ).toBeInTheDocument();
    }
  });

  it('marks the selected digit as checked', () => {
    render(
      <TimePickerList value="5" onValueChange={() => {}}>
        <TimePickerItem value="0">00</TimePickerItem>
        <TimePickerItem value="5">05</TimePickerItem>
      </TimePickerList>,
    );

    expect(screen.getByRole('radio', { name: '05' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '00' })).not.toBeChecked();
  });

  it('opens the overflow from the demo field trigger', async () => {
    const user = userEvent.setup();
    const Example = exampleComponentMaps[componentName].TimePickerDemo;

    render(
      <Renderer>
        <Example />
      </Renderer>,
    );

    const triggers = screen.getAllByRole('button', { name: 'Choose time' });
    await user.click(triggers[0]);

    expect(
      document.querySelector('[data-slot="time-picker-list-content"]'),
    ).toBeInTheDocument();
  });
});
