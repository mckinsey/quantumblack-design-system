/**
 * Generate Figma Code Connect config from environment variables.
 *
 * Reads figma.config.template.json and writes figma.config.json with
 * documentUrlSubstitutions built from every FIGMA_URL_* env var
 * (FIGMA_URL_QBDS_BADGE_NUMERIC → <QBDS_BADGE_NUMERIC>).
 *
 * Run from repo root: npm run figma:config
 */
import { readFileSync, writeFileSync } from 'node:fs';

const PREFIX = 'FIGMA_URL_';

function loadEnv(): void {
  try {
    const env = readFileSync('.env', 'utf-8');

    for (const line of env.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*"?([^"\n]*)"?\s*$/);

      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].trim();
      }
    }
  } catch {
    // no .env — rely on process.env only
  }
}

loadEnv();

const config = JSON.parse(readFileSync('figma.config.template.json', 'utf-8'));
const subs: Record<string, string> = {};

for (const [key, val] of Object.entries(process.env)) {
  if (!key.startsWith(PREFIX) || !val) {
    continue;
  }

  subs[`<${key.slice(PREFIX.length)}>`] = val;
}

config.codeConnect.documentUrlSubstitutions = subs;

writeFileSync('figma.config.json', `${JSON.stringify(config, null, 2)}\n`);
console.log(`Wrote ${Object.keys(subs).length} substitution(s)`);
