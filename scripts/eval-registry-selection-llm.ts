import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  REGISTRY_SELECTION_SYSTEM_PROMPT,
  buildUserPrompt,
  loadRegistryCatalog,
  loadSelectionCases,
  parseLlmJson,
  scoreCase,
  type LlmSelectionResponse,
  type SelectionCase,
} from '../src/lib/registry-selection-eval';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE_DIR = path.join(ROOT, 'evals/.cache');

const DEFAULT_MODEL = 'gpt-4o-mini';

function usage(): void {
  console.log(`Usage: npm run eval:registry-llm [-- id1,id2] [--no-cache] [--model gpt-4o-mini]

Environment:
  OPENAI_API_KEY   required
  OPENAI_MODEL     optional (default ${DEFAULT_MODEL})
`);
}

function parseArgs(argv: string[]) {
  let filter: string[] | undefined;
  let useCache = true;
  let model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      usage();
      process.exit(0);
    }
    if (arg === '--no-cache') {
      useCache = false;
      continue;
    }
    if (arg === '--model' && argv[i + 1]) {
      model = argv[++i];
      continue;
    }
    if (arg === '--' && argv[i + 1]) {
      filter = argv[++i].split(',').map(s => s.trim()).filter(Boolean);
      continue;
    }
  }

  return { filter, useCache, model };
}

function cacheKey(case_: SelectionCase, model: string, catalogHash: string) {
  return createHash('sha256')
    .update(`${case_.id}\n${model}\n${catalogHash}\n${case_.prompt}`)
    .digest('hex')
    .slice(0, 16);
}

function catalogHash(catalog: ReturnType<typeof loadRegistryCatalog>) {
  return createHash('sha256')
    .update(JSON.stringify(catalog))
    .digest('hex')
    .slice(0, 16);
}

async function callOpenAi(
  model: string,
  apiKey: string,
  userContent: string,
): Promise<LlmSelectionResponse> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: REGISTRY_SELECTION_SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI returned empty content');
  }

  return parseLlmJson(content);
}

async function runCase(
  case_: SelectionCase,
  model: string,
  apiKey: string,
  catalog: ReturnType<typeof loadRegistryCatalog>,
  catHash: string,
  useCache: boolean,
) {
  const key = cacheKey(case_, model, catHash);
  const cacheFile = path.join(CACHE_DIR, `${case_.id}-${key}.json`);

  if (useCache && existsSync(cacheFile)) {
    const cached = JSON.parse(readFileSync(cacheFile, 'utf8')) as {
      response: LlmSelectionResponse;
    };
    return { response: cached.response, fromCache: true };
  }

  const userContent = buildUserPrompt(case_.prompt, catalog);
  const response = await callOpenAi(model, apiKey, userContent);

  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(
    cacheFile,
    JSON.stringify({ response, model, at: new Date().toISOString() }, null, 2),
  );

  return { response, fromCache: false };
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set.');
    usage();
    process.exit(1);
  }

  const { filter, useCache, model } = parseArgs(process.argv.slice(2));
  const catalog = loadRegistryCatalog();
  const catHash = catalogHash(catalog);
  let cases = loadSelectionCases();

  if (filter?.length) {
    cases = cases.filter(c => filter.includes(c.id));
    if (cases.length === 0) {
      console.error(`No cases matched filter: ${filter.join(', ')}`);
      process.exit(1);
    }
  }

  console.log(
    `Registry selection LLM eval — ${cases.length} case(s), model=${model}, cache=${useCache ? 'on' : 'off'}\n`,
  );

  let passed = 0;
  const failures: Array<{ id: string; errors: string[]; install: string[] }> =
    [];

  for (const case_ of cases) {
    try {
      const { response, fromCache } = await runCase(
        case_,
        model,
        apiKey,
        catalog,
        catHash,
        useCache,
      );
      const { ok, errors } = scoreCase(case_, response);
      const tag = ok ? 'PASS' : 'FAIL';
      const cacheTag = fromCache ? 'cached' : 'live';
      console.log(
        `[${tag}] ${case_.id} (${cacheTag}) install=${JSON.stringify(response.install)}`,
      );
      if (response.reason) {
        console.log(`       ${response.reason}`);
      }
      if (!ok) {
        failures.push({
          id: case_.id,
          errors,
          install: response.install,
        });
        for (const err of errors) {
          console.log(`       ! ${err}`);
        }
      } else {
        passed++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`[ERROR] ${case_.id}: ${message}`);
      failures.push({ id: case_.id, errors: [message], install: [] });
    }
  }

  console.log(`\n${passed}/${cases.length} passed`);
  if (failures.length > 0) {
    process.exit(1);
  }
}

main();
