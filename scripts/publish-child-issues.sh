#!/usr/bin/env bash
# Publishes 30 child issues for KataForge PRD hardening wave.
set -euo pipefail
cd "$(dirname "$0")/.."

declare -A ISSUE_NUM

create_issue() {
  local key="$1"
  local title="$2"
  local label="$3"
  local body="$4"
  local url
  url=$(gh issue create --title "$title" --label "$label" --body "$body")
  ISSUE_NUM[$key]=$(echo "$url" | grep -oE '[0-9]+$')
  echo "Created $key -> #${ISSUE_NUM[$key]}: $title"
}

blocked_line() {
  local refs="$1"
  if [[ -z "$refs" || "$refs" == "None" ]]; then
    echo "None - can start immediately"
  else
    for key in $refs; do
      echo "- #${ISSUE_NUM[$key]}"
    done
  fi
}

DOD=$'## Definition of done\n\n- PR passes \`pnpm test\` and \`pnpm build\` (when CI exists)\n- No unrelated file changes\n- Update docs if behavior changes\n- Do not modify \`private/\` or private pack content'

# --- PRD-1 ---
create_issue "1.1" "[PRD-1] Commit generic KataForge scaffold to git" "ready-for-human" "$(cat <<EOF
## Parent

#1

## What to build

The generic KataForge framework (Astro app, examples, docs, CONTEXT.md, config) exists on disk but is uncommitted. Create an initial commit containing only generic, employer-neutral content. Ensure \`private/\`, \`kataforge.local.json\`, and \`sources/repos/\` remain gitignored and are not staged.

## Acceptance criteria

- [ ] \`git status\` shows no staged personal/private pack files under \`private/\`
- [ ] Committed tree includes: \`src/\`, \`examples/\`, \`docs/\`, \`CONTEXT.md\`, \`kataforge.config.ts\`, \`.gitignore\`, \`package.json\`, \`pnpm-lock.yaml\`
- [ ] \`pnpm test\` and \`pnpm build\` pass on a clean clone without \`private/\`
- [ ] Commit message describes generic KataForge foundation (not private-pack-specific)

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "2.4" "[PRD-2] Add schema edge-case unit tests" "ready-for-agent" "$(cat <<EOF
## Parent

#2

## What to build

Extend Vitest coverage for Kata and Assessment schemas. Add tests that reject empty \`tests\` arrays, invalid TestCase shapes, empty \`kataIds\`, and malformed assessment JSON. Optionally add a fixture-based test for \`loadAssessments\` using a temp directory.

## Acceptance criteria

- [ ] \`problemSchema\` rejects \`tests: []\` with a clear Zod error
- [ ] \`assessmentSchema\` rejects empty \`kataIds\`
- [ ] At least one test covers missing required TestCase fields
- [ ] \`pnpm test\` passes

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "3.1" "[PRD-3] Enforce per-TestCase timeout in Judge worker" "ready-for-agent" "$(cat <<EOF
## Parent

#3

## What to build

The Judge currently uses a single batch timeout in \`judgeClient.ts\`. Per CONTEXT.md, each TestCase should respect \`timeoutMs\` (2000 ms RunSamples, 3000 ms Submit). Enforce timeout per test inside the worker or client so one hung test does not block the rest.

## Acceptance criteria

- [ ] A test with \`while True: pass\` returns \`status: timeout\` for that TestCase only
- [ ] Subsequent TestCases in the same Submit still run
- [ ] Timeout uses configured \`sampleTimeoutMs\` / \`submitTimeoutMs\` from config
- [ ] \`pnpm test\` passes; manual check on fizzbuzz kata

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "3.3" "[PRD-3] Add Judge integration tests (Vitest)" "ready-for-agent" "$(cat <<EOF
## Parent

#3

## What to build

Add automated tests for the Judge deep module: passing solution, wrong answer, syntax error, missing function, and hidden TestCase field redaction. Test \`judgeClient\` and/or worker logic using Vitest (mock worker or extract testable harness functions).

## Acceptance criteria

- [ ] Test: valid \`fizzbuzz\` solution passes all visible TestCases
- [ ] Test: incorrect return value yields \`failed\` status with expected/actual
- [ ] Test: syntax error yields \`error\` with \`syntax_error\` category
- [ ] Test: missing function yields \`missing_function\` category
- [ ] Test: hidden TestCase omits expected/actual in response when not passed
- [ ] \`pnpm test\` passes

## Blocked by

None - can start immediately

$DOD
)"

create_issue "3.4" "[PRD-3] Implement or remove reexecPerTest false mode" "ready-for-human" "$(cat <<EOF
## Parent

#3

## What to build

\`kataforge.config.ts\` exposes \`judge.reexecPerTest\`. The worker has identical branches for true/false. Decide with a human: (A) implement shared-namespace mode when false, or (B) remove the flag and document re-exec as the only behavior. Implement the chosen option.

## Acceptance criteria

- [ ] Decision documented in \`docs/judge-engine.md\` or \`CONTEXT.md\`
- [ ] No dead/stub code path remains in the worker
- [ ] Default behavior unchanged (\`reexecPerTest: true\`)
- [ ] \`pnpm test\` and \`pnpm build\` pass

## Blocked by

None - can start immediately (human decision required before coding)

$DOD
EOF
)"

create_issue "4.3" "[PRD-4] Style difficulty badges per Kata metadata" "ready-for-agent" "$(cat <<EOF
## Parent

#4

## What to build

Problem pages render \`badge-\${difficulty}\` classes but CSS lacks distinct styles. Add accessible, readable badge colors for \`easy\`, \`easy-medium\`, \`medium\`, and \`hard\` in the global stylesheet. Verify on landing page and workspace header.

## Acceptance criteria

- [ ] Each difficulty level has a visually distinct badge on landing cards
- [ ] Badge text remains readable (contrast)
- [ ] Works in dark theme without breaking mobile layout
- [ ] No changes to \`private/\` content

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "4.4" "[PRD-4] Scope keyboard shortcuts to Monaco focus" "ready-for-human" "$(cat <<EOF
## Parent

#4

## What to build

Cmd/Ctrl+Enter and Cmd/Ctrl+Shift+Enter currently bind on \`window\`, which may conflict with other focus contexts. Scope RunSamples/Submit shortcuts to fire only when the Monaco editor is focused, unless product decides global shortcuts are preferred.

## Acceptance criteria

- [ ] Human confirms: Monaco-only vs global shortcut behavior
- [ ] Implemented behavior matches decision
- [ ] Run Samples and Submit still reachable via toolbar buttons
- [ ] Document shortcuts in \`docs/ui-requirements.md\` if behavior changes

## Blocked by

None - can start immediately (human decision required before coding)

$DOD
EOF
)"

create_issue "5.1" "[PRD-5] Restore navigator completion from localStorage" "ready-for-agent" "$(cat <<EOF
## Parent

#5

## What to build

Kata completion markers in \`ProblemNavigator\` are React state only and lost on reload. On \`AssessmentShell\` mount, scan each Kata in the Assessment via \`loadResults\` and mark complete when all saved Submit results have \`status: passed\`.

## Acceptance criteria

- [ ] After full Submit pass on a Kata, reload page → navigator shows that Kata as done
- [ ] Kata with failed Submit results stays incomplete
- [ ] Kata with no saved results stays incomplete
- [ ] Works for multi-Kata assessments (\`full-examples\`)

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "5.2" "[PRD-5] Add Submit Assessment header action" "ready-for-human" "$(cat <<EOF
## Parent

#5

## What to build

\`docs/ui-requirements.md\` requires a Submit Assessment button. The header only has View Results. Add an explicit finalize action that sets \`session.submitted = true\`, persists session, and navigates to the Results page. Confirm UX with human: keep View Results separately or merge actions.

## Acceptance criteria

- [ ] Submit Assessment visible in assessment header
- [ ] Click sets \`submitted: true\` in localStorage session
- [ ] User lands on \`/results/{assessmentId}\`
- [ ] Human approves final button labels and flow

## Blocked by

None - can start immediately (human UX sign-off required)

$DOD
EOF
)"

create_issue "5.3" "[PRD-5] Add storage unit tests for session drafts and timer" "ready-for-agent" "$(cat <<EOF
## Parent

#5

## What to build

Add Vitest tests for \`storage.ts\`: session save/load, draft round-trip, \`getRemainingMs\`, \`isTimerExpired\`, and untimed assessments. Use a localStorage mock (happy-dom or manual stub).

## Acceptance criteria

- [ ] Draft save/load round-trip per Kata id
- [ ] Timed session: \`isTimerExpired\` true after simulated elapsed time
- [ ] Untimed session: \`isTimerExpired\` always false
- [ ] Session round-trip preserves \`startedAt\` and \`currentKataIndex\`
- [ ] \`pnpm test\` passes

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "6.2" "[PRD-6] Show hidden TestCase pass/fail on Results page" "ready-for-agent" "$(cat <<EOF
## Parent

#6

## What to build

Results page shows per-Kata aggregates only. Per UI requirements, hidden TestCases should appear as pass/fail rows without expected/actual. Extend \`ResultSummary\` or \`ResultsPage\` to list hidden TestCase outcomes from saved Submit results in localStorage.

## Acceptance criteria

- [ ] After Submit on a Kata with hidden tests, Results page lists each hidden TestCase by name
- [ ] Only pass/fail shown — no expected, actual, stdout, or error text
- [ ] Visible TestCases may show full detail or remain aggregated (document choice)
- [ ] \`pnpm build\` passes

## Blocked by

None - can start immediately

$DOD
EOF
)"

create_issue "6.4" "[PRD-6] Add README security note for browser Judge" "ready-for-agent" "$(cat <<EOF
## Parent

#6

## What to build

Add a short Security section to the generic README explaining: Python runs via Pyodide in the browser; hidden TestCases in the client bundle are inspectable; do not execute candidate code on a server process without a sandbox (future Piston/Judge0 path).

## Acceptance criteria

- [ ] README contains Security section with the three points above
- [ ] No private branding in committed README
- [ ] Links to \`docs/judge-engine.md\` or ADR where appropriate

## Blocked by

None - can start immediately

$DOD
EOF
)"

# Blocked by 1.1
create_issue "1.2" "[PRD-1] Align docs to kataforge.local.json overlay" "ready-for-agent" "$(cat <<EOF
## Parent

#1

## What to build

Documentation still references \`kataforge.local.ts\` in places while implementation uses \`kataforge.local.json\`. Update \`docs/architecture.md\`, \`CONTEXT-MAP.md\`, and \`.gitignore\` comments so overlay setup is consistent everywhere.

## Acceptance criteria

- [ ] No committed doc references \`.ts\` overlay without marking it deprecated
- [ ] README, CONTEXT-MAP, and architecture agree on \`cp kataforge.local.example.json kataforge.local.json\`
- [ ] \`.gitignore\` lists only the JSON overlay (remove stale \`.ts\` if unused)

## Blocked by

$(blocked_line "1.1")

$DOD
EOF
)"

create_issue "1.3" "[PRD-1] Add GitHub Actions CI for test and build" "ready-for-agent" "$(cat <<EOF
## Parent

#1

## What to build

Add \`.github/workflows/ci.yml\` that runs on push/PR: \`pnpm install\`, \`pnpm test\`, \`pnpm build\`. CI must pass without \`private/\` or \`kataforge.local.json\` (examples-only path).

## Acceptance criteria

- [ ] Workflow uses pnpm on Node 22+
- [ ] \`pnpm test\` and \`pnpm build\` run in CI
- [ ] CI passes on default branch without private ProblemPack
- [ ] Badge or note added to README (optional)

## Blocked by

$(blocked_line "1.1")

$DOD
EOF
)"

create_issue "1.4" "[PRD-1] Add MIT LICENSE file" "ready-for-agent" "$(cat <<EOF
## Parent

#1

## What to build

README claims MIT license but no LICENSE file exists. Add standard MIT LICENSE at repo root and link from README.

## Acceptance criteria

- [ ] \`LICENSE\` file exists with MIT text and copyright holder
- [ ] README license section references LICENSE file

## Blocked by

$(blocked_line "1.1")

$DOD
EOF
)"

create_issue "1.5" "[PRD-1] Expand config overlay merge tests" "ready-for-agent" "$(cat <<EOF
## Parent

#1

## What to build

\`loadConfig.test.ts\` only covers base config. Add tests for \`kataforge.local.json\` merge: extra problem/assessment dirs, nested branding/judge overrides, and missing file fallback.

## Acceptance criteria

- [ ] Test: overlay \`problemDirs\` replaces base list when provided
- [ ] Test: nested \`branding\` / \`judge\` shallow-merge correctly
- [ ] Test: missing local file returns base config unchanged
- [ ] \`pnpm test\` passes

## Blocked by

$(blocked_line "1.1")

$DOD
EOF
)"

create_issue "2.1" "[PRD-2] Reuse problemSchema in Astro content collection" "ready-for-agent" "$(cat <<EOF
## Parent

#2

## What to build

\`content.config.ts\` duplicates a weaker inline schema. Refactor to reuse \`problemSchema\` / \`testCaseSchema\` from \`problemSchema.ts\` (or a shared export compatible with Astro) so build-time validation matches runtime \`loadKatas\`.

## Acceptance criteria

- [ ] No duplicated inline problem schema in \`content.config.ts\`
- [ ] \`tests.min(1)\` and \`estimatedMinutes\` constraints match runtime schema
- [ ] \`pnpm build\` succeeds with example katas
- [ ] Invalid example kata (empty tests) fails build

## Blocked by

$(blocked_line "1.1")

$DOD
EOF
)"

create_issue "1.6" "[PRD-1] Fail loudly on malformed local overlay JSON" "ready-for-human" "$(cat <<EOF
## Parent

#1

## What to build

When \`kataforge.local.json\` exists but fails to parse, \`loadConfig\` silently returns \`{}\`. With human approval, implement chosen behavior: console warning, build failure, or strict-mode flag. Document in README/architecture.

## Acceptance criteria

- [ ] Human selects: warn vs fail vs opt-in strict flag
- [ ] Malformed JSON no longer fails silently in default dev path
- [ ] Test covers malformed JSON case
- [ ] Behavior documented

## Blocked by

$(blocked_line "1.5")

$DOD
EOF
)"

create_issue "2.2" "[PRD-2] Fail build on duplicate Kata IDs across dirs" "ready-for-agent" "$(cat <<EOF
## Parent

#2

## What to build

\`loadKatas.ts\` silently skips duplicate \`id\` values. Change to throw a descriptive error naming both file paths so authors fix conflicts immediately.

## Acceptance criteria

- [ ] Duplicate \`id\` in two problem files throws with both paths in message
- [ ] Unit test covers duplicate-id scenario
- [ ] Example katas still load successfully
- [ ] \`pnpm build\` passes

## Blocked by

$(blocked_line "2.1")

$DOD
EOF
)"

create_issue "2.3" "[PRD-2] Validate Assessment kataIds reference existing Katas" "ready-for-agent" "$(cat <<EOF
## Parent

#2

## What to build

Assessments can list unknown \`kataIds\`; pages silently drop them. At load/build time, verify every \`kataId\` exists in the loaded Kata map and fail with assessment file name and missing id.

## Acceptance criteria

- [ ] Assessment JSON with unknown \`kataId\` fails at build/load with clear error
- [ ] \`quick-practice.json\` and \`full-examples.json\` remain valid
- [ ] Unit test for unknown \`kataId\`
- [ ] \`pnpm build\` passes

## Blocked by

$(blocked_line "2.2")

$DOD
EOF
)"

create_issue "3.2" "[PRD-3] Reuse warm Pyodide worker between runs" "ready-for-agent" "$(cat <<EOF
## Parent

#3

## What to build

\`judgeClient.ts\` terminates the worker after every RunSamples/Submit, forcing Pyodide cold start each time. Keep a warm worker for the session; terminate and recreate only on timeout or fatal worker error.

## Acceptance criteria

- [ ] Second RunSamples in same session does not re-download Pyodide (verify in Network tab)
- [ ] Timeout still terminates and recreates worker
- [ ] UI remains responsive between runs
- [ ] \`pnpm test\` passes

## Blocked by

$(blocked_line "3.1")

$DOD
EOF
)"

create_issue "4.1" "[PRD-4] Surface Judge failures in TestPanel" "ready-for-agent" "$(cat <<EOF
## Parent

#4

## What to build

When \`judgeClient.run\` returns \`response.error\` or empty results after failure, \`AssessmentShell\` leaves the panel unchanged. Show a clear error banner in \`TestPanel\` and re-enable toolbar buttons.

## Acceptance criteria

- [ ] Worker crash / internal error shows user-visible message in TestPanel
- [ ] Empty results after failure are not silent
- [ ] Run Samples / Submit buttons re-enable after error
- [ ] Manual test: kill worker or simulate failure path

## Blocked by

$(blocked_line "3.3")

$DOD
EOF
)"

create_issue "5.5" "[PRD-5] Verify currentKataIndex survives reload" "ready-for-agent" "$(cat <<EOF
## Parent

#5

## What to build

Confirm \`currentKataIndex\` persists via session localStorage. Add unit test and, if broken, fix \`saveSession\` on index change. Update acceptance checklist if verified.

## Acceptance criteria

- [ ] Navigate to Kata 2 in multi-Kata assessment, reload → still on Kata 2
- [ ] Unit test covers session index round-trip
- [ ] Documented in \`docs/acceptance-tests.md\` persistence section

## Blocked by

$(blocked_line "5.3")

$DOD
EOF
)"

create_issue "2.5" "[PRD-2] Consolidate to single Kata load pipeline" "ready-for-human" "$(cat <<EOF
## Parent

#2

## What to build

Two paths exist: \`loadKatas\` (pages) and Astro \`content.config.ts\` collection. With human approval, pick one: (A) pages use \`getCollection('problems')\`, or (B) drop unused Astro collection and validate only via \`loadKatas\`. Remove the duplicate path.

## Acceptance criteria

- [ ] Decision recorded in \`docs/architecture.md\`
- [ ] Only one production Kata load/validate path remains
- [ ] Landing and problem pages still render all example Katas
- [ ] Invalid frontmatter still fails \`pnpm build\`

## Blocked by

$(blocked_line "2.1 2.2 2.3")

$DOD
EOF
)"

create_issue "6.1" "[PRD-6] Persist AssessmentScore via saveAssessmentScore" "ready-for-agent" "$(cat <<EOF
## Parent

#6

## What to build

\`saveAssessmentScore\` / \`loadAssessmentScore\` in \`storage.ts\` are unused. When Results page computes score (or on Submit Assessment), persist \`AssessmentScore\` and read cached value when appropriate.

## Acceptance criteria

- [ ] Visiting results writes \`kataforge:score:{assessmentId}\` to localStorage
- [ ] Cached score matches \`scoreAssessment\` output
- [ ] Unit test: save/load round-trip for AssessmentScore
- [ ] \`pnpm test\` passes

## Blocked by

$(blocked_line "5.2")

$DOD
EOF
)"

create_issue "4.2" "[PRD-4] Add Pyodide first-load indicator in workspace" "ready-for-agent" "$(cat <<EOF
## Parent

#4

## What to build

First RunSamples/Submit waits for Pyodide download with only a generic loading message. Show distinct \"Loading Python runtime…\" state until the worker first responds; skip on warm worker (depends on worker reuse).

## Acceptance criteria

- [ ] First run in a session shows loading-runtime message
- [ ] Warm runs show normal \"Running samples…\" without runtime message
- [ ] Message clears when results arrive or error surfaces
- [ ] Accessible (aria-live)

## Blocked by

$(blocked_line "3.2")

$DOD
EOF
)"

create_issue "6.5" "[PRD-6] Add ResultsPage integration test (jsdom)" "ready-for-agent" "$(cat <<EOF
## Parent

#6

## What to build

Add Vitest + jsdom test for \`ResultsPage\`: seed localStorage with session and per-Kata Submit results, render component, assert hero percentage and per-Kata rows.

## Acceptance criteria

- [ ] Test covers 2 Katas with mixed pass/fail
- [ ] Elapsed time derived from session \`startedAt\`
- [ ] \`pnpm test\` passes

## Blocked by

$(blocked_line "6.1")

$DOD
EOF
)"

create_issue "5.4" "[PRD-5] Start fresh vs resume in-progress Assessment" "ready-for-human" "$(cat <<EOF
## Parent

#5

## What to build

Clicking Start on landing always resumes existing session. With human approval, add resume vs start-over prompt (or auto-reset). Start over clears session, drafts, and results for that Assessment and resets timer.

## Acceptance criteria

- [ ] Human approves UX: modal vs two buttons vs auto behavior
- [ ] Start over clears \`session\`, \`draft:*\`, \`results:*\` for that assessmentId
- [ ] Timer resets to full duration on start over
- [ ] Untimed assessments behave consistently

## Blocked by

$(blocked_line "5.2")

$DOD
EOF
)"

create_issue "6.3" "[PRD-6] Retry Assessment clears prior attempt state" "ready-for-human" "$(cat <<EOF
## Parent

#6

## What to build

Retry Assessment link navigates back but keeps old drafts/results. After human confirms semantics, clear session, drafts, results, and cached score then open fresh assessment.

## Acceptance criteria

- [ ] Retry clears all localStorage keys for that assessmentId
- [ ] Timer, navigator, and editors reset to initial state
- [ ] Human verifies on timed multi-Kata assessment

## Blocked by

$(blocked_line "5.4 6.1")

$DOD
EOF
)"

create_issue "6.6" "[PRD-6] Playwright smoke for acceptance checklist" "ready-for-human" "$(cat <<EOF
## Parent

#6

## What to build

Add optional Playwright e2e smoke tests covering persistence and results sections of \`docs/acceptance-tests.md\`: draft survives navigation, timer survives reload, results page shows scores. Human runs or approves CI integration.

## Acceptance criteria

- [ ] \`pnpm test:e2e\` (or documented script) runs smoke suite
- [ ] Covers at least: draft persistence, timer reload, results accuracy
- [ ] Checklist items in \`docs/acceptance-tests.md\` marked verified
- [ ] Human approves e2e scope and CI cost

## Blocked by

$(blocked_line "5.3 6.5")

$DOD
EOF
)"

# Write mapping for parent comments
echo "---ISSUE_MAP---"
for key in 1.1 1.2 1.3 1.4 1.5 1.6 2.1 2.2 2.3 2.4 2.5 3.1 3.2 3.3 3.4 4.1 4.2 4.3 4.4 5.1 5.2 5.3 5.4 5.5 6.1 6.2 6.3 6.4 6.5 6.6; do
  echo "$key=${ISSUE_NUM[$key]}"
done
