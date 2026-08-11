/**
 * @vitest-environment node
 *
 * Consumer-app smoke: build + pack the npm package, install it into a Vite +
 * React app, then vite-build an app that imports Button + styles.
 */
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const LIB_DIR = path.join(REPO_ROOT, 'dist/lib');
const PKG_NAME = 'quantumblack-design-system';

function run(cmd: string, args: string[], cwd: string) {
  try {
    return execFileSync(cmd, args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        npm_config_audit: 'false',
        npm_config_fund: 'false',
      },
    });
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message: string };
    throw new Error(
      [
        `Command failed: ${cmd} ${args.join(' ')} (cwd=${cwd})`,
        err.stdout ?? '',
        err.stderr ?? '',
        err.message,
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}

describe('npm package in consumer app', () => {
  let appDir: string;
  let tarball: string;

  beforeAll(() => {
    run('npm', ['run', 'build:lib'], REPO_ROOT);

    expect(fs.existsSync(path.join(LIB_DIR, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(LIB_DIR, 'package/index.js'))).toBe(true);
    expect(fs.existsSync(path.join(LIB_DIR, 'styles.css'))).toBe(true);

    const libPkg = JSON.parse(
      fs.readFileSync(path.join(LIB_DIR, 'package.json'), 'utf8'),
    ) as { name: string; version: string };

    appDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qbds-lib-app-'));
    const packOut = run('npm', ['pack', '--pack-destination', appDir], LIB_DIR);
    const packedName = packOut.trim().split('\n').at(-1)?.trim();

    if (!packedName) {
      throw new Error(`npm pack produced no tarball name:\n${packOut}`);
    }

    tarball = path.join(appDir, packedName);
    expect(fs.existsSync(tarball)).toBe(true);
    expect(packedName).toBe(`${libPkg.name}-${libPkg.version}.tgz`);

    const rootPkg = JSON.parse(
      fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'),
    ) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    fs.writeFileSync(
      path.join(appDir, 'package.json'),
      `${JSON.stringify(
        {
          name: 'qbds-lib-consumer',
          private: true,
          type: 'module',
          scripts: { build: 'vite build' },
        },
        null,
        2,
      )}\n`,
    );

    fs.writeFileSync(
      path.join(appDir, 'index.html'),
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>qbds lib consumer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    );

    fs.writeFileSync(
      path.join(appDir, 'vite.config.ts'),
      `import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
})
`,
    );

    fs.mkdirSync(path.join(appDir, 'src'), { recursive: true });
    fs.writeFileSync(
      path.join(appDir, 'src/main.tsx'),
      `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from '${PKG_NAME}'
import '${PKG_NAME}/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button>QBDS</Button>
  </StrictMode>,
)
`,
    );

    run(
      'npm',
      [
        'install',
        tarball,
        `react@${rootPkg.dependencies.react}`,
        `react-dom@${rootPkg.dependencies['react-dom']}`,
        `vite@${rootPkg.devDependencies.vite}`,
        `@vitejs/plugin-react-swc@${rootPkg.devDependencies['@vitejs/plugin-react-swc']}`,
      ],
      appDir,
    );
  }, 300_000);

  afterAll(() => {
    if (appDir && fs.existsSync(appDir)) {
      fs.rmSync(appDir, { recursive: true, force: true });
    }
  });

  it('resolves package entry and styles from installed package.json', () => {
    const installed = path.join(appDir, 'node_modules', PKG_NAME);
    const pkg = JSON.parse(
      fs.readFileSync(path.join(installed, 'package.json'), 'utf8'),
    ) as {
      name: string;
      version: string;
      exports: { '.': { import: string }; './styles.css': string };
    };

    expect(pkg.name).toBe(PKG_NAME);
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(fs.existsSync(path.join(installed, pkg.exports['.'].import))).toBe(
      true,
    );
    expect(
      fs.existsSync(path.join(installed, pkg.exports['./styles.css'])),
    ).toBe(true);
  });

  it('exports Button from the package entry', async () => {
    const entry = path.join(
      appDir,
      'node_modules',
      PKG_NAME,
      'package',
      'index.js',
    );
    const mod = await import(entry);

    expect(mod.Button).toBeTypeOf('function');
    expect(mod.cn).toBeTypeOf('function');
  });

  it('vite-builds a consumer app that imports Button + styles', () => {
    const out = run('npm', ['run', 'build'], appDir);

    expect(out).toMatch(/built in/i);
    expect(fs.existsSync(path.join(appDir, 'dist/index.html'))).toBe(true);

    const assets = fs.readdirSync(path.join(appDir, 'dist/assets'));
    expect(assets.some(f => f.endsWith('.js'))).toBe(true);
    expect(assets.some(f => f.endsWith('.css'))).toBe(true);
  }, 120_000);
});
