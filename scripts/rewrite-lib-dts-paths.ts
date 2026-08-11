import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libRoot = path.join(root, 'dist/lib');

function walk(dir: string, out: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }

    if (entry.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }

  return out;
}

for (const file of walk(libRoot)) {
  const dir = path.dirname(file);
  const text = fs.readFileSync(file, 'utf8');
  const next = text.replace(/from ['"]@\/([^'"]+)['"]/g, (_m, spec: string) => {
    const target = path.join(libRoot, spec);
    let rel = path.relative(dir, target);

    if (!rel.startsWith('.')) {
      rel = `./${rel}`;
    }

    return `from '${rel.replaceAll('\\', '/')}'`;
  });

  if (next !== text) {
    fs.writeFileSync(file, next);
    console.log(`rewrote ${path.relative(root, file)}`);
  }
}
