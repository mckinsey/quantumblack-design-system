import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist/lib');
const cssPath = path.join(root, 'assets/css/qbds.css');
const iconPath = path.join(root, 'src/styles/icon-font.css');

if (!fs.existsSync(cssPath)) {
  throw new Error(
    'assets/css/qbds.css missing — run npm run assets:build first',
  );
}

fs.mkdirSync(outDir, { recursive: true });

const icon = fs.readFileSync(iconPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const banner =
  '/*! quantumblack-design-system styles — icon font + qbds.css */\n';

fs.writeFileSync(path.join(outDir, 'styles.css'), `${banner}${icon}\n${css}`);
console.log('Wrote dist/lib/styles.css');
