import { type ChildProcess, spawn, spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const FIXTURE = path.join(REPO_ROOT, 'fixtures/registry-install-consumer');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
const REGISTRY_JSON = path.join(REPO_ROOT, 'registry.json');
const HOST = '127.0.0.1';
const ADD_TIMEOUT_MS = 180_000;

interface RegistryFile {
  readonly path: string;
  readonly type: string;
  readonly target?: string;
}

interface RegistryItem {
  readonly name: string;
  readonly type: string;
  readonly dependencies?: readonly string[];
  readonly files?: readonly RegistryFile[];
}

interface RegistryJson {
  readonly items: readonly RegistryItem[];
}

function runSync(
  cmd: string,
  args: string[],
  opts: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    timeoutMs?: number;
    quiet?: boolean;
  } = {},
): { code: number; stdout: string; stderr: string } {
  const result = spawnSync(cmd, args, {
    cwd: opts.cwd ?? REPO_ROOT,
    env: opts.env ?? process.env,
    encoding: 'utf8',
    timeout: opts.timeoutMs,
    stdio: opts.quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });

  if (
    result.error &&
    (result.error as NodeJS.ErrnoException).code === 'ETIMEDOUT'
  ) {
    return {
      code: 124,
      stdout: result.stdout ?? '',
      stderr: result.stderr ?? '',
    };
  }

  if (result.error) {
    throw result.error;
  }

  return {
    code: result.status ?? 1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

function startServerChild(root: string, port: number): ChildProcess {
  const script = `
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = ${JSON.stringify(root)};
const host = ${JSON.stringify(HOST)};
const port = ${port};

function contentType(filePath) {
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) return 'text/javascript; charset=utf-8';
  return 'application/octet-stream';
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/');
  const rel =
    urlPath === '/'
      ? 'index.html'
      : urlPath.replace(/^\\/+/, '').replaceAll('\\\\', '/');
  const filePath = path.normalize(path.join(root, rel));

  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  try {
    const body = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType(filePath) });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('Error');
  }
});

server.listen(port, host, () => {
  process.stdout.write('ready\\n');
});
`;

  const child = spawn(process.execPath, ['--input-type=module', '-e', script], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  return child;
}

async function waitForReady(
  child: ChildProcess,
  registryUrl: string,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Registry server failed to start'));
    }, 10_000);

    child.stdout?.on('data', (chunk: Buffer) => {
      if (chunk.toString().includes('ready')) {
        clearTimeout(timer);
        resolve();
      }
    });

    child.on('error', err => {
      clearTimeout(timer);
      reject(err);
    });

    child.on('exit', code => {
      clearTimeout(timer);
      reject(new Error(`Registry server exited early with code ${code}`));
    });
  });

  const res = await fetch(`${registryUrl}/r/registry.json`);

  if (!res.ok) {
    throw new Error(`Registry server health check failed: ${res.status}`);
  }
}

async function allocatePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, HOST, () => {
      const addr = server.address();

      if (!addr || typeof addr === 'string') {
        server.close();
        reject(new Error('Failed to allocate port'));
        return;
      }

      const { port } = addr;
      server.close(err => (err ? reject(err) : resolve(port)));
    });
    server.on('error', reject);
  });
}

function installedPackages(consumerRoot: string): Set<string> {
  const pkg = JSON.parse(
    readFileSync(path.join(consumerRoot, 'package.json'), 'utf8'),
  ) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  return new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ]);
}

function packageInstalled(consumerRoot: string, name: string): boolean {
  const parts = name.startsWith('@') ? name.split('/') : [name];
  return existsSync(path.join(consumerRoot, 'node_modules', ...parts));
}

function expectedUiPaths(consumerRoot: string, item: RegistryItem): string[] {
  const paths: string[] = [];

  for (const file of item.files ?? []) {
    if (file.type !== 'registry:ui' && file.type !== 'registry:file') {
      continue;
    }

    const target = (file.target || file.path).replace(/\\/g, '/');
    const rel = target.replace(/^src\//, '').replace(/^\.\//, '');
    paths.push(
      path.join(consumerRoot, 'src', rel),
      path.join(consumerRoot, rel),
    );
  }

  return [...new Set(paths)];
}

function buildRegistry(env: NodeJS.ProcessEnv): void {
  const build = runSync('npx', ['--yes', 'shadcn@latest', 'build'], { env });

  if (build.code !== 0) {
    throw new Error('shadcn build failed');
  }

  const copy = runSync('cp', ['-R', 'registry.json', 'public/r/'], { env });

  if (copy.code !== 0) {
    throw new Error('Failed to copy registry.json into public/r');
  }

  const inject = runSync('npx', ['tsx', 'scripts/inject-registry-urls.ts'], {
    env,
  });

  if (inject.code !== 0) {
    throw new Error('inject-registry-urls failed');
  }
}

async function main(): Promise<void> {
  if (!existsSync(FIXTURE)) {
    throw new Error(`Missing fixture at ${FIXTURE}`);
  }

  const registry = JSON.parse(
    readFileSync(REGISTRY_JSON, 'utf8'),
  ) as RegistryJson;
  const items = registry.items.filter(item => item.type === 'registry:ui');

  if (items.length === 0) {
    throw new Error('No registry:ui items found in registry.json');
  }

  const port = await allocatePort();
  const registryUrl = `http://${HOST}:${port}`;
  const env = {
    ...process.env,
    QBDS_REGISTRY_URL: registryUrl,
  };

  console.log(`Building registry for ${registryUrl}`);
  buildRegistry(env);

  const server = startServerChild(PUBLIC_DIR, port);
  await waitForReady(server, registryUrl);
  console.log(`Serving ${PUBLIC_DIR} at ${registryUrl}`);

  const consumerRoot = mkdtempSync(
    path.join(tmpdir(), 'qbds-registry-install-'),
  );
  const logDir = path.join(consumerRoot, '.smoke-logs');
  let exitCode = 0;

  try {
    cpSync(FIXTURE, consumerRoot, { recursive: true });
    console.log(`Consumer: ${consumerRoot}`);

    const install = runSync('npm', ['install', '--no-audit', '--no-fund'], {
      cwd: consumerRoot,
      timeoutMs: 300_000,
    });

    if (install.code !== 0) {
      throw new Error('Consumer npm install failed');
    }

    mkdirSync(logDir, { recursive: true });

    const failures: string[] = [];

    for (const item of items) {
      const url = `${registryUrl}/r/${item.name}.json`;
      process.stdout.write(`add ${item.name} ... `);

      const add = runSync(
        'npx',
        ['--yes', 'shadcn@latest', 'add', '-y', '-o', '-s', url],
        {
          cwd: consumerRoot,
          quiet: true,
          timeoutMs: ADD_TIMEOUT_MS,
        },
      );

      writeFileSync(
        path.join(logDir, `${item.name}.log`),
        `${add.stdout}${add.stderr}`,
      );

      if (add.code === 124) {
        failures.push(
          `${item.name}: shadcn add timed out after ${ADD_TIMEOUT_MS}ms`,
        );
        console.log('TIMEOUT');
        continue;
      }

      if (add.code !== 0) {
        failures.push(
          `${item.name}: shadcn add failed\n${add.stdout}${add.stderr}`,
        );
        console.log('FAIL');
        continue;
      }

      const uiPaths = expectedUiPaths(consumerRoot, item);

      if (
        uiPaths.length > 0 &&
        !uiPaths.some(candidate => existsSync(candidate))
      ) {
        failures.push(
          `${item.name}: missing installed UI file (looked for ${uiPaths.join(', ')})`,
        );
        console.log('FAIL');
        continue;
      }

      const declared = item.dependencies ?? [];
      const listed = installedPackages(consumerRoot);
      const missing = declared.filter(
        dep => !listed.has(dep) && !packageInstalled(consumerRoot, dep),
      );

      if (missing.length > 0) {
        failures.push(
          `${item.name}: npm packages not installed: ${missing.join(', ')}`,
        );
        console.log('FAIL');
        continue;
      }

      console.log('OK');
    }

    if (failures.length > 0) {
      console.error('\nRegistry install smoke failures:\n');
      console.error(failures.join('\n\n'));
      exitCode = 1;
    } else {
      console.log(`\nAll ${items.length} registry:ui installs passed.`);
    }
  } finally {
    if (server.pid) {
      try {
        process.kill(server.pid, 'SIGTERM');
      } catch {
        // already exited
      }
    }

    rmSync(consumerRoot, { recursive: true, force: true });
  }

  process.exit(exitCode);
}

void main().catch(err => {
  console.error(err);
  process.exit(1);
});
