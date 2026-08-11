import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/tests/npm-package-app.test.ts'],
    testTimeout: 180_000,
    hookTimeout: 180_000,
  },
});
