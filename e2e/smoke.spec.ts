import { expect, test } from '@playwright/test';

test.describe('acceptance smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Assessments' })).toBeVisible();
  });

  test('kata practice results route is available', async ({ page }) => {
    await page.goto('/results/two-sum');
    await expect(page.locator('.results-page')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry assessment' })).toBeVisible({
      timeout: 45_000,
    });
  });

  test('results page shows seeded scores', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'kataforge:session:two-sum',
        JSON.stringify({
          assessmentId: 'two-sum',
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

    await page.goto('/results/two-sum');
    await expect(page.locator('.score-percent')).toHaveText('100%');
    await expect(page.locator('.problem-score-name')).toHaveText('Two Sum');
    await expect(page.locator('.problem-score-value')).toHaveText('2/2 (100%)');
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
    await expect(page.getByRole('button', { name: 'Finish assessment' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Results' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Submit' })).toHaveCount(1);
  });

  test('multi-kata assessment shows Finish and Results in header', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/assessment/full-examples');
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByRole('button', { name: 'Finish assessment' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Results' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toHaveCount(1);
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
        'kataforge:session:two-sum',
        JSON.stringify({
          assessmentId: 'two-sum',
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
        'kataforge:score:two-sum',
        JSON.stringify({
          assessmentId: 'two-sum',
          totalKatas: 1,
          passedKatas: 1,
          percent: 100,
          computedAt: Date.now(),
        }),
      );
    });

    await page.goto('/results/two-sum');
    await expect(page.locator('.score-percent')).toHaveText('100%');
    await page.getByRole('button', { name: 'Retry assessment' }).click();
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    const storage = await page.evaluate(() => ({
      draft: localStorage.getItem('kataforge:draft:two-sum'),
      results: localStorage.getItem('kataforge:results:two-sum'),
      score: localStorage.getItem('kataforge:score:two-sum'),
      session: localStorage.getItem('kataforge:session:two-sum'),
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
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.locator('.cursus-lesson-title')).toHaveText('From Chat to Agent');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/cursus\/build-ai-agent-harness\/step\/1$/);

    const progress = await page.evaluate(() =>
      localStorage.getItem('kataforge:cursus-progress:build-ai-agent-harness'),
    );
    expect(progress).toContain('agent-loop:0');
  });

  test('cursus step navigation avoids full page reload', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/cursus/build-ai-agent-harness/step/0');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible({
      timeout: 45_000,
    });

    const navCountBefore = await page.evaluate(
      () => performance.getEntriesByType('navigation').length,
    );

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/cursus\/build-ai-agent-harness\/step\/1$/);
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    const navCountAfter = await page.evaluate(
      () => performance.getEntriesByType('navigation').length,
    );
    expect(navCountAfter).toBe(navCountBefore);
  });

  test('cursus step pages do not opt into cross-document view transitions', async ({ page }) => {
    await page.goto('/cursus/build-ai-agent-harness/step/0');
    await expect(page.locator('.cursus-shell')).toBeVisible({ timeout: 45_000 });

    const hasAutoNavigation = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (
              rule.cssText.includes('@view-transition') &&
              rule.cssText.includes('navigation: auto')
            ) {
              return true;
            }
          }
        } catch {
          // Cross-origin stylesheets are not readable.
        }
      }
      return false;
    });

    expect(hasAutoNavigation).toBe(false);
  });

  test('docs page is reference-only with combined copy block', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.getByRole('heading', { name: 'Kata Authoring' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copy prompt and format' })).toBeVisible();
    await expect(page.getByText('--- EXAMPLE JSON OUTPUT ---')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Import' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Go to Practice hub' })).toBeVisible();
  });

  test('user kata import appears on hub and opens practice route', async ({ page }) => {
    test.setTimeout(90_000);
    const userKata = {
      id: 'e2e-user-kata',
      title: 'E2E User Kata',
      difficulty: 'easy',
      estimatedMinutes: 5,
      functionName: 'always_one',
      tags: ['demo'],
      starterCode: 'def always_one():\n    return 1',
      bodyMarkdown: '# Always One\n\nReturn `1`.',
      tests: [
        {
          id: 'sample-1',
          name: 'returns one',
          hidden: false,
          args: [],
          expected: 1,
        },
        {
          id: 'hidden-1',
          name: 'still one',
          hidden: true,
          args: [],
          expected: 1,
        },
      ],
    };

    await page.goto('/#katas');
    await page.getByRole('button', { name: 'Import kata' }).click();
    await page.locator('.docs-import-textarea').fill(JSON.stringify(userKata, null, 2));
    await page.getByRole('button', { name: 'Import', exact: true }).click();
    await expect(page.getByText('Imported "E2E User Kata"')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'E2E User Kata' })).toBeVisible();
    await expect(page.locator('.badge-user-kata')).toHaveText('custom');

    await page.goto('/problem/e2e-user-kata');
    await expect(page.locator('h2', { hasText: 'E2E User Kata' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByRole('button', { name: 'Run Samples' })).toBeVisible({
      timeout: 45_000,
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.results-page')).toBeVisible({ timeout: 60_000 });
    await expect(page.locator('.score-percent')).toHaveText('100%');
  });
});
