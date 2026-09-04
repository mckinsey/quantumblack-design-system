# QuantumBlack Design System

<img width="1200" height="563" alt="hero" src="https://github.com/user-attachments/assets/ff16271b-798f-4ee6-9878-e334f820d248" />


QuantumBlack Design System provides accessible components built with [Base UI](https://base-ui.com/) and [Radix UI](https://www.radix-ui.com/) primitives and styled with design tokens. You add them to your project as source files through the [shadcn](https://ui.shadcn.com/) registry, not as an NPM package.

With a typical component library, you install a package and import what it exports. Customization often means wrappers, overrides, or working around what the library gives you. QBDS copies the component files into your project instead. You can install only what you need, use components unchanged, or edit them directly.

**Open sourced** under the [Apache License 2.0](LICENSE.txt). Copyright McKinsey & Company.

## Install components in your project

Head to the documentation site to browse components, follow the installation guide, and look up design tokens:

<p align="center">
  <a href="https://designsystem.quantumblack.com">
    <img
      src=".github/images/registry.png"
      alt="QuantumBlack Design System component registry"
      width="100%" />
  </a>
  <br />
  <a href="https://designsystem.quantumblack.com"><sub>designsystem.quantumblack.com</sub></a>
</p>

## Run the registry locally

This repository contains the registry site and component source.

1. Clone the repository
2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:4123](http://localhost:4123).

`npm run dev` rebuilds the registry before starting the server. To rebuild registry files without starting the server, run:

```bash
npm run registry:build
```

For prerequisites, environment setup, and adding components, see the [contributing guide](CONTRIBUTING.md).

## Contribute

Contributions welcome. Before opening an issue or pull request, read the [Code of Conduct](CODE_OF_CONDUCT.md) and [security policy](SECURITY.md).

## License

Licensed under the Apache License, Version 2.0. See [LICENSE.txt](LICENSE.txt) for the full text.
