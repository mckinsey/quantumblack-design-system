import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

function addHostnameFromUrl(hosts: Set<string>, raw: string | undefined) {
  const trimmed = raw?.trim();

  if (!trimmed) {
    return;
  }

  try {
    const hostname = new URL(trimmed).hostname;

    if (hostname) {
      hosts.add(hostname);
    }
  } catch {
    /* invalid URL — ignore */
  }
}

/**
 * Vite blocks unknown `Host` headers. Configure via env (e.g. Docker/K8s):
 * - `APP_PUBLIC_URL` / `PUBLIC_URL` — app URL; hostname extracted
 * - `QBDS_REGISTRY_URL` — registry base URL; hostname also whitelisted
 * - `ALLOWED_HOSTS` — comma-separated hostnames or `.suffix` patterns (Vite suffix rules)
 *
 * If nothing is set, falls back to Vite’s default allowlist (e.g. localhost only).
 */
function resolveAllowedHosts(): string[] {
  const hosts = new Set<string>();

  const list = process.env.ALLOWED_HOSTS?.split(',') ?? [];

  for (const h of list) {
    const trimmed = h.trim();

    if (trimmed) {
      hosts.add(trimmed);
    }
  }

  addHostnameFromUrl(hosts, process.env.APP_PUBLIC_URL);
  addHostnameFromUrl(hosts, process.env.PUBLIC_URL);
  addHostnameFromUrl(hosts, process.env.QBDS_REGISTRY_URL);

  return [...hosts];
}

const allowedHosts = resolveAllowedHosts();

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  define: {
    'import.meta.env.QBDS_REGISTRY_URL': JSON.stringify(
      process.env.QBDS_REGISTRY_URL ?? '',
    ),
  },
  resolve: {
    alias: [
      {
        find: '@/registry',
        replacement: path.resolve(__dirname, './registry.json'),
      },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    // Large chunks here are shiki language grammars + lazy route chunks — all loaded
    // on demand, not on initial page load, so the default 500kB threshold is misleading.
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 4123,
    allowedHosts,
  },
  preview: {
    port: 4123,
    allowedHosts,
  },
});
