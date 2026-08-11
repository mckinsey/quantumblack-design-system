import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

const external = (id: string) => {
  if (
    id === 'react' ||
    id === 'react-dom' ||
    id === 'react/jsx-runtime' ||
    id.startsWith('react/') ||
    id.startsWith('react-dom/')
  ) {
    return true;
  }

  if (id.startsWith('@base-ui/') || id.startsWith('@radix-ui/')) {
    return true;
  }

  if (id.startsWith('date-fns/') || id.startsWith('sonner/')) {
    return true;
  }

  return [
    'class-variance-authority',
    'clsx',
    'date-fns',
    'react-day-picker',
    'sonner',
    'tailwind-merge',
  ].includes(id);
};

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(root, 'src') }],
  },
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(root, 'src/package/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
