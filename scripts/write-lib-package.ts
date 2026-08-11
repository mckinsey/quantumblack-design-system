import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootPkg = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
) as {
  name: string;
  version: string;
  license: string;
  repository: unknown;
  homepage: string;
  bugs: unknown;
  dependencies: Record<string, string>;
};

const libDeps = [
  '@base-ui/react',
  '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-menubar',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-separator',
  '@radix-ui/react-slot',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-toolbar',
  '@radix-ui/react-tooltip',
  'class-variance-authority',
  'clsx',
  'date-fns',
  'react-day-picker',
  'sonner',
  'tailwind-merge',
] as const;

const dependencies: Record<string, string> = {};

for (const name of libDeps) {
  const version = rootPkg.dependencies[name];

  if (!version) {
    throw new Error(`Missing dependency in root package.json: ${name}`);
  }

  dependencies[name] = version;
}

const outDir = path.join(root, 'dist/lib');
fs.mkdirSync(outDir, { recursive: true });

const pkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  description:
    'QuantumBlack Design System React components — Vite ESM package for apps and Figma Make',
  type: 'module',
  sideEffects: ['**/*.css'],
  license: rootPkg.license,
  repository: rootPkg.repository,
  homepage: rootPkg.homepage,
  bugs: rootPkg.bugs,
  main: './package/index.js',
  module: './package/index.js',
  types: './package/index.d.ts',
  exports: {
    '.': {
      types: './package/index.d.ts',
      import: './package/index.js',
    },
    './styles.css': './styles.css',
  },
  files: [
    'package',
    'components',
    'hooks',
    'lib',
    'styles.css',
    'LICENSE.txt',
    'README.md',
  ],
  peerDependencies: {
    react: '^19.0.0',
    'react-dom': '^19.0.0',
  },
  peerDependenciesMeta: {
    'react-dom': { optional: true },
  },
  dependencies,
  keywords: [
    'quantumblack',
    'design-system',
    'react',
    'vite',
    'figma-make',
    'components',
  ],
};

fs.writeFileSync(
  path.join(outDir, 'package.json'),
  `${JSON.stringify(pkg, null, 2)}\n`,
);

const license = path.join(root, 'LICENSE.txt');

if (fs.existsSync(license)) {
  fs.copyFileSync(license, path.join(outDir, 'LICENSE.txt'));
}

const readme = path.join(root, 'docs/NPM.md');

if (fs.existsSync(readme)) {
  fs.copyFileSync(readme, path.join(outDir, 'README.md'));
}

console.log(`Wrote ${path.relative(root, path.join(outDir, 'package.json'))}`);
