import { expect, test } from '@playwright/test';

import {
  type ThemeMode,
  analyzeContrast,
  formatViolations,
  hasDemoPreviews,
  seriousContrastViolations,
  setTheme,
  waitForPageReady,
} from './support/a11y';
import {
  getBaselineMax,
  shouldUpdateBaseline,
  updateBaseline,
} from './support/baseline';
import { getSiteRoutes } from './support/routes';

const themes: ThemeMode[] = ['light', 'dark'];

for (const route of getSiteRoutes()) {
  for (const theme of themes) {
    test(`${route.label} — ${theme} — color contrast`, async ({ page }) => {
      await page.goto(route.path);
      await setTheme(page, theme);
      await waitForPageReady(page);

      if (route.scope === 'demo' && !(await hasDemoPreviews(page))) {
        test.skip();
      }

      const results = await analyzeContrast(page, route.scope);
      const serious = seriousContrastViolations(results.violations);
      const max = getBaselineMax(route.label, theme);

      if (shouldUpdateBaseline()) {
        updateBaseline(route.label, theme, serious.length);
        return;
      }

      expect(
        serious.length,
        serious.length > max
          ? `${serious.length} serious contrast violations (baseline ${max})\n\n${formatViolations(serious)}`
          : undefined,
      ).toBeLessThanOrEqual(max);
    });
  }
}
