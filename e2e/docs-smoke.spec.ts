import { expect, test } from '@playwright/test';

test('docs site routes and component Code toggle', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Introduction' }),
  ).toBeVisible();

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Components' })
    .click();
  await expect(page).toHaveURL(/\/components$/);
  await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Tokens' })
    .click();
  await expect(page).toHaveURL(/\/tokens$/);
  await expect(
    page.getByRole('heading', { name: 'Design Tokens' }),
  ).toBeVisible();

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Docs' })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await page
    .getByRole('main')
    .getByRole('link', { name: 'Installation' })
    .click();
  await expect(page).toHaveURL(/\/installation$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Installation' }),
  ).toBeVisible();

  await page.goto('/registry/button');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Button' }),
  ).toBeVisible();

  const codeToggle = page.getByRole('button', { name: 'Code' }).first();
  await expect(codeToggle).toHaveAttribute('aria-expanded', 'false');

  await codeToggle.click();
  await expect(codeToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('pre').first()).toBeVisible();

  await codeToggle.click();
  await expect(codeToggle).toHaveAttribute('aria-expanded', 'false');
});
