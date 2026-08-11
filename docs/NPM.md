# NPM package

QBDS ships two delivery modes:

1. **Registry** (primary) — copy component source into your app via shadcn (`npx shadcn add …`).
2. **NPM package** (additive) — import built ESM components. Required for Figma Make kits.

## Build

```bash
npm run build:lib
```

Output: `dist/lib/` (`index.js`, `index.d.ts`, `styles.css`, `package.json`).

Dry-run tarball:

```bash
npm run pack:lib
```

Publish (public npm or Figma org private registry):

```bash
npm run build:lib
npm publish ./dist/lib
```

For Figma’s private registry, paste the org `.npmrc` snippet from Figma Admin → Resources → npm registry, then publish.

## Install

```bash
npm install quantumblack-design-system
```

```tsx
import { Button } from 'quantumblack-design-system';
import 'quantumblack-design-system/styles.css';
```

Peer: React 19. Vite-compatible (Figma Make requirement).

## Figma Make

1. Publish package (public npm or Figma private registry).
2. In a Make kit / Make file: install `quantumblack-design-system`.
3. Add guidelines that prefer QBDS components and document props/variants.
4. Import CSS once in the Make entry.

Smoke-test locally:

```bash
npm create vite@latest make-setup-app -- --template react-ts
cd make-setup-app
npm install
npm install /path/to/quantumblack-design-system/dist/lib
```

Import `Button` + `styles.css`, run `npm run dev`.

## Notes

- Registry remains the customization path (edit copied source).
- NPM package is for import-based consumers (Make, Vite apps).
- Package name/version come from root `package.json`.
- Bump root `version` before each publish.
