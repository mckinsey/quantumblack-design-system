import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

export function worktree(root: string, runsDir: string, id: string): string {
  mkdirSync(runsDir, { recursive: true });
  const dir = join(runsDir, id);

  removeWorktree(root, dir);

  execFileSync('git', ['worktree', 'add', '--detach', dir, 'HEAD'], {
    cwd: root,
  });

  if (existsSync(join(root, 'node_modules'))) {
    execFileSync('ln', [
      '-s',
      join(root, 'node_modules'),
      join(dir, 'node_modules'),
    ]);
  }

  return dir;
}

export function removeWorktree(root: string, dir: string): void {
  try {
    execFileSync('git', ['worktree', 'remove', '--force', dir], {
      cwd: root,
      stdio: 'ignore',
    });
  } catch {
    rmSync(dir, { recursive: true, force: true });
    execFileSync('git', ['worktree', 'prune'], { cwd: root, stdio: 'ignore' });
  }
}

export function commitBaseline(dir: string, message: string): void {
  const branch = `eval-baseline-${Date.now()}`;

  execFileSync('git', ['checkout', '--orphan', branch], {
    cwd: dir,
    stdio: 'ignore',
  });
  execFileSync('git', ['add', '-A'], { cwd: dir, stdio: 'ignore' });
  execFileSync(
    'git',
    [
      '-c',
      'user.email=eval@local',
      '-c',
      'user.name=eval',
      'commit',
      '-m',
      message,
    ],
    { cwd: dir, stdio: 'ignore' },
  );
}
