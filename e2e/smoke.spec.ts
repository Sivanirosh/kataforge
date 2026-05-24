import { expect, test } from '@playwright/test';

test.describe('acceptance smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Assessments' })).toBeVisible();
  });

  test('results page shows seeded scores', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'kataforge:session:quick-practice',
        JSON.stringify({
          assessmentId: 'quick-practice',
          startedAt: Date.now() - 90_000,
          durationMinutes: null,
          currentKataIndex: 0,
          submitted: true,
        }),
      );
      localStorage.setItem(
        'kataforge:results:two-sum',
        JSON.stringify([
          {
            testId: 's1',
            name: 'basic',
            hidden: false,
            status: 'passed',
            durationMs: 1,
          },
          {
            testId: 'h1',
            name: 'hidden case',
            hidden: true,
            status: 'passed',
            durationMs: 1,
          },
        ]),
      );
    });

    await page.goto('/results/quick-practice');
    await expect(page.locator('.score-percent')).toHaveText('100%');
    await expect(page.getByText('hidden case')).toBeVisible();
    await expect(page.locator('.hidden-test-status').first()).toHaveText('Passed');
  });

  test('draft survives kata navigation in multi-kata assessment', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/assessment/full-examples');
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    await page.evaluate(() => {
      localStorage.setItem(
        'kataforge:draft:two-sum',
        'draft_marker = True\ndef two_sum(nums, target):\n    pass',
      );
    });

    await page.getByRole('button', { name: 'FizzBuzz' }).click();
    await page.getByRole('button', { name: 'Two Sum' }).click();

    await expect(page.locator('.monaco-editor')).toContainText('draft_marker');
  });
});
