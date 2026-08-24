import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import type { Result } from 'axe-core';

export type ThemeMode = 'light' | 'dark';

export type A11yScanScope = 'demo' | 'page';

export async function setTheme(page: Page, theme: ThemeMode) {
  await page.evaluate(mode => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
  }, theme);
}

export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.getByRole('main').first().waitFor({ state: 'visible' });
}

export async function hasDemoPreviews(page: Page) {
  return (await page.locator('[data-demo-preview]').count()) > 0;
}

export async function analyzeContrast(page: Page, scope: A11yScanScope) {
  let builder = new AxeBuilder({ page }).withRules(['color-contrast']);

  if (scope === 'demo') {
    builder = builder.include('[data-demo-preview]');
  } else {
    builder = builder
      .include('main main')
      .exclude('pre, code, [data-slot="sidebar"]');
  }

  return builder.analyze();
}

export function seriousContrastViolations(violations: Result[]) {
  return violations.filter(
    violation =>
      violation.id === 'color-contrast' &&
      (violation.impact === 'serious' || violation.impact === 'critical'),
  );
}

export function formatViolations(violations: Result[]) {
  if (violations.length === 0) {
    return '';
  }

  return violations
    .map(violation => {
      const nodes = violation.nodes
        .map(node => {
          const target = node.target.join(' > ');
          const summary = node.failureSummary?.replace(/\s+/g, ' ').trim();
          return `  - ${target}${summary ? `\n    ${summary}` : ''}`;
        })
        .join('\n');

      return `${violation.id} (${violation.impact}): ${violation.help}\n${nodes}`;
    })
    .join('\n\n');
}
