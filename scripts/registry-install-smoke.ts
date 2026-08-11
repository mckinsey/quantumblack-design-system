import { type ChildProcess, spawn, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE = path.join(ROOT, 'fixtures/registry-install-consumer');
const PUBLIC = path.join(ROOT, 'public');
const HOST = '127.0.0.1';

function sh(
  cmd: string,
  args: string[],
  opts: { cwd?: string; env?: NodeJS.ProcessEnv; quiet?: boolean } = {},
): number {
  const r = spawnSync(cmd, args, {
    cwd: opts.cwd ?? ROOT,
    env: opts.env ?? process.env,
    encoding: 'utf8',
    stdio: opts.quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });

  if (r.error) {
    throw r.error;
  }

  if (opts.quiet && r.status !== 0) {
    process.stderr.write(r.stdout ?? '');
    process.stderr.write(r.stderr ?? '');
  }

  return r.status ?? 1;
}

function allocatePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.listen(0, HOST, () => {
      const addr = s.address();
      if (!addr || typeof addr === 'string') {
        s.close();
        reject(new Error('no port'));
        return;
      }
      const { port } = addr;
      s.close(err => (err ? reject(err) : resolve(port)));
    });
    s.on('error', reject);
  });
}

function serve(root: string, port: number): ChildProcess {
  const code = `
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
const root = ${JSON.stringify(root)};
createServer((req, res) => {
  const rel = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/')
    .replace(/^\\/+/, '') || 'index.html';
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404); res.end(); return;
  }
  res.writeHead(200); res.end(readFileSync(file));
}).listen(${port}, ${JSON.stringify(HOST)}, () => process.stdout.write('ok'));
`;

  return spawn(process.execPath, ['--input-type=module', '-e', code], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });
}

async function waitReady(child: ChildProcess, url: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error('server start timeout')),
      10_000,
    );
    child.stdout?.on('data', (b: Buffer) => {
      if (b.toString().includes('ok')) {
        clearTimeout(t);
        resolve();
      }
    });
    child.on('error', reject);
    child.on('exit', c => {
      clearTimeout(t);
      reject(new Error(`server exited ${c}`));
    });
  });

  const res = await fetch(`${url}/r/registry.json`);
  if (!res.ok) {
    throw new Error(`registry health ${res.status}`);
  }
}

async function main(): Promise<void> {
  if (!existsSync(FIXTURE)) {
    throw new Error(`missing ${FIXTURE}`);
  }

  const names = (
    JSON.parse(readFileSync(path.join(ROOT, 'registry.json'), 'utf8')) as {
      items: { name: string; type: string }[];
    }
  ).items
    .filter(i => i.type === 'registry:ui')
    .map(i => i.name);

  const port = await allocatePort();
  const base = `http://${HOST}:${port}`;
  const env = { ...process.env, QBDS_REGISTRY_URL: base };

  console.log(`build ${base}`);
  if (sh('npx', ['--yes', 'shadcn@latest', 'build'], { env }) !== 0) {
    throw new Error('shadcn build failed');
  }
  if (sh('cp', ['-R', 'registry.json', 'public/r/'], { env }) !== 0) {
    throw new Error('copy registry.json failed');
  }
  if (sh('npx', ['tsx', 'scripts/inject-registry-urls.ts'], { env }) !== 0) {
    throw new Error('inject urls failed');
  }

  const server = serve(PUBLIC, port);
  await waitReady(server, base);
  console.log(`serve ${base}`);

  const consumer = mkdtempSync(path.join(tmpdir(), 'qbds-registry-install-'));
  const fails: string[] = [];

  try {
    cpSync(FIXTURE, consumer, { recursive: true });
    if (
      sh('npm', ['install', '--no-audit', '--no-fund'], { cwd: consumer }) !== 0
    ) {
      throw new Error('consumer npm install failed');
    }

    for (const name of names) {
      process.stdout.write(`add ${name} ... `);
      const code = sh(
        'npx',
        [
          '--yes',
          'shadcn@latest',
          'add',
          '-y',
          '-o',
          '-s',
          `${base}/r/${name}.json`,
        ],
        { cwd: consumer, quiet: true },
      );

      if (code !== 0) {
        fails.push(name);
        console.log('FAIL');
        continue;
      }

      console.log('OK');
    }
  } finally {
    if (server.pid) {
      try {
        process.kill(server.pid, 'SIGTERM');
      } catch {
        // gone
      }
    }
    rmSync(consumer, { recursive: true, force: true });
  }

  if (fails.length) {
    console.error(`\nFailed: ${fails.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n${names.length} registry:ui installs ok`);
}

void main().catch(err => {
  console.error(err);
  process.exit(1);
});
