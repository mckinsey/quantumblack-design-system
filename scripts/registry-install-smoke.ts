import { spawn } from 'node:child_process';
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const REGISTRY = path.join(PUBLIC, 'r');

const CONSUMER = {
  'package.json': {
    name: 'qbds-registry-install-consumer',
    private: true,
    type: 'module',
    dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
    devDependencies: { tailwindcss: '^4.0.0', vite: '^6.0.0' },
  },
  'components.json': {
    $schema: 'https://ui.shadcn.com/schema.json',
    style: 'base-nova',
    rsc: false,
    tsx: true,
    tailwind: {
      config: '',
      css: 'src/index.css',
      baseColor: 'neutral',
      cssVariables: true,
      prefix: '',
    },
    iconLibrary: 'lucide',
    rtl: false,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks',
    },
    registries: {},
  },
  'tsconfig.json': {
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      baseUrl: '.',
      paths: { '@/*': ['./src/*'] },
    },
    include: ['src'],
  },
};

function run(
  cmd: string,
  args: string[],
  opts: { cwd?: string; env?: NodeJS.ProcessEnv } = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd ?? ROOT,
      env: opts.env ?? process.env,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', code =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    );
  });
}

function writeConsumer(dir: string): void {
  mkdirSync(path.join(dir, 'src'), { recursive: true });
  writeFileSync(path.join(dir, 'src/index.css'), "@import 'tailwindcss';\n");

  for (const [file, content] of Object.entries(CONSUMER)) {
    writeFileSync(
      path.join(dir, file),
      `${JSON.stringify(content, null, 2)}\n`,
    );
  }
}

async function main(): Promise<void> {
  const names = (
    JSON.parse(readFileSync(path.join(ROOT, 'registry.json'), 'utf8')) as {
      items: { name: string; type: string }[];
    }
  ).items
    .filter(i => i.type === 'registry:ui')
    .map(i => i.name);

  const env = { ...process.env, QBDS_REGISTRY_URL: PUBLIC };
  const consumer = mkdtempSync(path.join(tmpdir(), 'qbds-registry-install-'));

  try {
    await run('npx', ['--yes', 'shadcn@latest', 'build'], { env });
    cpSync(
      path.join(ROOT, 'registry.json'),
      path.join(REGISTRY, 'registry.json'),
    );
    await run('npx', ['tsx', 'scripts/inject-registry-urls.ts'], { env });

    writeConsumer(consumer);
    await run(
      'npx',
      [
        '--yes',
        'shadcn@latest',
        'add',
        '-y',
        '-o',
        ...names.map(name => path.join(REGISTRY, `${name}.json`)),
      ],
      { cwd: consumer, env },
    );
  } finally {
    rmSync(consumer, { recursive: true, force: true });
  }

  console.log(`\n${names.length} registry:ui installs ok`);
}

void main().catch(err => {
  console.error(err);
  process.exit(1);
});
