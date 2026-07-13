import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast as sonnerToast } from 'sonner';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Toaster, toast } from '@/components/ui/sonner';

const componentName = 'sonner';

function renderToaster() {
  return render(<Toaster />);
}

afterEach(() => {
  sonnerToast.dismiss();
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

describe(`${componentName} — toast API`, () => {
  it.each([
    ['success', 'status'],
    ['info', 'status'],
    ['warning', 'status'],
    ['default', 'status'],
  ] as const)('toast.%s exposes role="%s"', async (type, role) => {
    renderToaster();
    toast[type]('Short message goes here');

    await waitFor(() => {
      expect(screen.getByText('Short message goes here')).toBeInTheDocument();
    });

    const el = document.querySelector('[data-slot="toast"]');

    expect(el).toHaveAttribute('role', role);
    expect(el).toHaveAttribute('aria-live', 'polite');
    expect(document.querySelector('[data-slot="toast-icon"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="toast-message"]'),
    ).toHaveTextContent('Short message goes here');
    expect(document.querySelector('[data-slot="toast-dismiss"]')).toBeTruthy();
  });

  it('toast.error exposes role="alert"', async () => {
    renderToaster();
    toast.error('Something failed');

    await waitFor(() => {
      expect(screen.getByText('Something failed')).toBeInTheDocument();
    });

    expect(document.querySelector('[data-slot="toast"]')).toHaveAttribute(
      'role',
      'alert',
    );
    expect(document.querySelector('[data-slot="toast"]')).toHaveAttribute(
      'aria-live',
      'assertive',
    );
  });

  it('applies testId when provided', async () => {
    renderToaster();
    toast.info('Tagged toast', { testId: 'qbds-toast' });

    await waitFor(() => {
      expect(screen.getByTestId('qbds-toast')).toHaveAttribute(
        'data-slot',
        'toast',
      );
    });
  });

  it('renders action slot content', async () => {
    renderToaster();
    toast.success('Event created', {
      action: <button type="button">Undo</button>,
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    });
  });

  it('renders custom cancel when provided', async () => {
    renderToaster();
    toast.info('Dismiss me', {
      cancel: <button type="button">Custom close</button>,
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Custom close' }),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('button', { name: 'Close toast' }),
    ).not.toBeInTheDocument();
  });

  it('dismisses via default close button', async () => {
    renderToaster();
    toast.success('Dismissible toast');

    await waitFor(() => {
      expect(screen.getByText('Dismissible toast')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Close toast' }));

    await waitFor(() => {
      expect(screen.queryByText('Dismissible toast')).not.toBeInTheDocument();
    });
  });
});

describe(`${componentName} — demo triggers`, () => {
  it('SonnerDemo shows toast on click', async () => {
    const user = userEvent.setup();
    const { SonnerDemo } = await import('@/app/demo/[name]/ui/sonner');

    render(
      <Renderer>
        <SonnerDemo />
        <Toaster />
      </Renderer>,
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      expect(
        screen.getByText('Your message has been sent'),
      ).toBeInTheDocument();
    });
  });
});
