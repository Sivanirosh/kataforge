/** Copy-paste LLM system prompt for generating UserKata JSON. */
export const LLM_KATA_SYSTEM_PROMPT = `You are a KataForge kata author. Output a single JSON object (no markdown fences, no commentary) that defines one Python coding kata.

Required top-level fields:
- id: URL-safe slug (lowercase, hyphens)
- title: display name
- difficulty: one of easy | easy-medium | medium | hard
- estimatedMinutes: positive integer
- functionName: Python snake_case function the candidate implements
- tags: string array of topic labels
- starterCode: Python starter function with pass or minimal stub
- bodyMarkdown: markdown problem statement (prompt, examples, constraints)
- tests: array of TestCase objects (at least one visible sample + at least one hidden)

Optional fields:
- solutionCode: reference Python solution
- solutionExplanation: markdown explanation shown after failed submit

Each TestCase:
- id: unique string within the kata
- name: human-readable label
- hidden: false for samples (RunSamples), true for submit-only tests
- args: array of positional arguments passed to functionName
- expected: expected return value (JSON-serializable)

Rules:
- functionName is invoked as functionName(*args) — no stdin parsing
- Include 2+ visible tests and 1+ hidden tests
- hidden tests must not leak answers in bodyMarkdown
- Use valid JSON only`;

export const LLM_KATA_EXAMPLE_JSON = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  estimatedMinutes: 15,
  functionName: 'two_sum',
  tags: ['arrays', 'hash-map'],
  starterCode: `def two_sum(nums, target):
    # Return indices of two numbers that add up to target
    pass`,
  solutionCode: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
  solutionExplanation:
    'Use a hash map to remember each value and its index as you scan the array once.',
  bodyMarkdown: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.

You may assume each input has exactly one solution, and you may not use the same element twice.

## Examples

\`\`\`
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
\`\`\`

## Constraints

- \`2 <= len(nums) <= 10^4\`
- Exactly one valid answer exists`,
  tests: [
    {
      id: 'sample-1',
      name: 'basic pair',
      hidden: false,
      args: [[2, 7, 11, 15], 9],
      expected: [0, 1],
    },
    {
      id: 'sample-2',
      name: 'same indices order',
      hidden: false,
      args: [[3, 2, 4], 6],
      expected: [1, 2],
    },
    {
      id: 'hidden-1',
      name: 'negative numbers',
      hidden: true,
      args: [[-1, -2, -3, -4, -5], -8],
      expected: [2, 4],
    },
  ],
};

/** Single copy-paste block: LLM instructions plus example JSON output. */
export function buildLlmKataCopyBlock(): string {
  return `${LLM_KATA_SYSTEM_PROMPT}

--- EXAMPLE JSON OUTPUT ---

${JSON.stringify(LLM_KATA_EXAMPLE_JSON, null, 2)}`;
}

export const LLM_KATA_COPY_BLOCK = buildLlmKataCopyBlock();

export const KATA_FIELD_REFERENCE = [
  { field: 'id', type: 'string', description: 'URL slug, unique across built-in and UserKatas' },
  { field: 'title', type: 'string', description: 'Display title on hub and problem page' },
  {
    field: 'difficulty',
    type: 'enum',
    description: 'easy | easy-medium | medium | hard',
  },
  { field: 'estimatedMinutes', type: 'number', description: 'Suggested completion time' },
  { field: 'functionName', type: 'string', description: 'Python function the Judge calls' },
  { field: 'tags', type: 'string[]', description: 'Topic labels shown in problem metadata' },
  { field: 'starterCode', type: 'string', description: 'Initial editor content' },
  { field: 'bodyMarkdown', type: 'string', description: 'Markdown problem statement body' },
  { field: 'solutionCode', type: 'string?', description: 'Reference solution (optional)' },
  {
    field: 'solutionExplanation',
    type: 'string?',
    description: 'Markdown explanation after failed submit (optional)',
  },
  { field: 'tests', type: 'TestCase[]', description: 'At least one test; mix visible and hidden' },
  { field: 'tests[].id', type: 'string', description: 'Unique test id within kata' },
  { field: 'tests[].name', type: 'string', description: 'Label in test panel' },
  {
    field: 'tests[].hidden',
    type: 'boolean',
    description: 'false = RunSamples; true = Submit only',
  },
  { field: 'tests[].args', type: 'unknown[]', description: 'Positional args for functionName' },
  { field: 'tests[].expected', type: 'unknown', description: 'Expected return value' },
];
