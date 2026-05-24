import { expect, test } from '@playwright/test';

test.describe('acceptance smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-title')).toBeVisible();
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

  test('timed session keeps remaining time after reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const startedAt = Date.now() - 5 * 60 * 1000;
      localStorage.setItem(
        'kataforge:session:full-examples',
        JSON.stringify({
          assessmentId: 'full-examples',
          startedAt,
          durationMinutes: 30,
          currentKataIndex: 0,
          submitted: false,
        }),
      );
    });

    await page.goto('/assessment/full-examples');
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.locator('.timer')).toHaveAttribute(
      'aria-label',
      /^Time remaining 2[45]:/,
    );
  });

  test('practice problem page shows fizzbuzz metadata and editor', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/problem/fizzbuzz');
    await expect(page.locator('h2', { hasText: 'FizzBuzz' })).toBeVisible();
    await expect(page.locator('.badge-easy')).toHaveText('easy');
    await expect(page.getByText('10 min')).toBeVisible();
    await expect(page.locator('.problem-meta .tag', { hasText: 'strings' })).toBeVisible();
    await expect(page.locator('.problem-meta .tag', { hasText: 'conditionals' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.locator('.monaco-editor')).toBeVisible();
  });

  test('practice problem page shows two-sum metadata and editor', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/problem/two-sum');
    await expect(page.locator('h2', { hasText: 'Two Sum' })).toBeVisible();
    await expect(page.locator('.badge-easy')).toHaveText('easy');
    await expect(page.getByText('15 min')).toBeVisible();
    await expect(page.locator('.problem-meta .tag', { hasText: 'arrays' })).toBeVisible();
    await expect(page.locator('.problem-meta .tag', { hasText: 'hash-map' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.locator('.monaco-editor')).toBeVisible();
  });

  test('reset to starter restores initial code and clears draft', async ({ page }) => {
    test.setTimeout(60_000);
    page.on('dialog', (dialog) => dialog.accept());

    await page.goto('/assessment/full-examples');
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    await page.evaluate(() => {
      localStorage.setItem(
        'kataforge:draft:two-sum',
        'custom_code = True\ndef two_sum(nums, target):\n    pass',
      );
    });
    await page.reload();
    await expect(page.locator('.monaco-editor')).toContainText('custom_code');

    await page.getByRole('button', { name: 'Reset to starter' }).click();
    await expect(page.locator('.monaco-editor')).not.toContainText('custom_code');

    const draft = await page.evaluate(() => localStorage.getItem('kataforge:draft:two-sum'));
    expect(draft).toBeNull();
  });

  test('retry assessment resets score and results but keeps drafts', async ({ page }) => {
    test.setTimeout(60_000);
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
        ]),
      );
      localStorage.setItem(
        'kataforge:draft:two-sum',
        'old_draft_marker = True\ndef two_sum(nums, target):\n    pass',
      );
      localStorage.setItem(
        'kataforge:score:quick-practice',
        JSON.stringify({
          assessmentId: 'quick-practice',
          totalKatas: 1,
          passedKatas: 1,
          percent: 100,
          computedAt: Date.now(),
        }),
      );
    });

    await page.goto('/results/quick-practice');
    await expect(page.locator('.score-percent')).toHaveText('100%');
    await page.getByRole('button', { name: 'Retry assessment' }).click();
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    const storage = await page.evaluate(() => ({
      draft: localStorage.getItem('kataforge:draft:two-sum'),
      results: localStorage.getItem('kataforge:results:two-sum'),
      score: localStorage.getItem('kataforge:score:quick-practice'),
      session: localStorage.getItem('kataforge:session:quick-practice'),
    }));

    expect(storage.results).toBeNull();
    expect(storage.score).toBeNull();
    expect(storage.draft).toContain('old_draft_marker');
    expect(storage.session).not.toBeNull();
    const session = JSON.parse(storage.session!);
    expect(session.submitted).toBe(false);
    await expect(page.locator('.monaco-editor')).toContainText('old_draft_marker');
  });

  test('cursus lesson continue persists progress', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/cursus/build-ai-agent-harness/step/0');
    await expect(page.getByRole('heading', { name: 'From Chat to Agent' })).toBeVisible({
      timeout: 45_000,
    });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/cursus\/build-ai-agent-harness\/step\/1$/);

    const progress = await page.evaluate(() =>
      localStorage.getItem('kataforge:cursus-progress:build-ai-agent-harness'),
    );
    expect(progress).toContain('agent-loop:0');
  });
});
