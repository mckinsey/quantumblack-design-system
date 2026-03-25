/**
 * Inject Registry URLs
 *
 * Replaces the __REGISTRY_URL__ placeholder in all generated public/r/*.json files
 * with the value of QBDS_REGISTRY_URL from the environment or .env file.
 *
 * Run after `npm run registry:build` as part of the registry:build script.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PLACEHOLDER = '__REGISTRY_URL__';
const OUTPUT_DIR = 'public/r';

function getRegistryUrl(): string {
  if (process.env.QBDS_REGISTRY_URL) {
    return process.env.QBDS_REGISTRY_URL;
  }

  try {
    const env = readFileSync('.env', 'utf-8');
    const match = env.match(/^QBDS_REGISTRY_URL=["']?([^"'\n]*)["']?/m);
    if (match?.[1]) return match[1];
  } catch {
    // .env not found, continue
  }

  console.error(
    '❌  QBDS_REGISTRY_URL is not set. Copy .env.example to .env and set the value.',
  );
  process.exit(1);
}

const registryUrl = getRegistryUrl();

const files = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json'));
let count = 0;

for (const file of files) {
  const filePath = join(OUTPUT_DIR, file);
  const content = readFileSync(filePath, 'utf-8');

  if (content.includes(PLACEHOLDER)) {
    writeFileSync(filePath, content.replaceAll(PLACEHOLDER, registryUrl));
    console.log(`  ✔ ${file}`);
    count++;
  }
}

console.log(`\n✅ Injected registry URL into ${count} file(s).`);
