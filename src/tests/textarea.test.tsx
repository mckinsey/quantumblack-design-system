import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Textarea,
  TextareaCounter,
  TextareaRoot,
} from '@/components/ui/textarea';

const componentName = 'textarea';

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
  it('renders with data-slot="textarea"', () => {
    render(<Textarea aria-label="bio" />);
    expect(
      document.querySelector('[data-slot="textarea"]'),
    ).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(<Textarea placeholder="Hint text" aria-label="notes" />);
    expect(screen.getByPlaceholderText('Hint text')).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is set', () => {
    render(<Textarea disabled aria-label="disabled-textarea" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders as aria-invalid when aria-invalid is set', () => {
    render(<Textarea aria-invalid="true" aria-label="error-textarea" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('user can type into the textarea', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="text-textarea" />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'hello');
    expect(textarea).toHaveValue('hello');
  });

  it.each(['sm', 'default', 'lg'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() =>
        render(<Textarea size={size} aria-label="sz" />),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — TextareaRoot & TextareaCounter`, () => {
  it('renders counter when maxCharacters is set', async () => {
    render(
      <TextareaRoot maxCharacters={150}>
        <TextareaCounter />
        <Textarea aria-label="with-counter" defaultValue="hello" />
      </TextareaRoot>,
    );

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('sets aria-invalid when count exceeds maxCharacters', async () => {
    render(
      <TextareaRoot maxCharacters={5}>
        <Textarea aria-label="over-limit" defaultValue="too long" />
      </TextareaRoot>,
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });
  });
});
