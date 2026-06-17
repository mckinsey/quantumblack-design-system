# QuantumBlack Design System

**Open source** under the [Apache License 2.0](LICENSE.txt). Copyright McKinsey & Company.

QuantumBlack Design System is a set of accessible components built with [Radix UI](https://www.radix-ui.com/) and styled with design tokens.

Most component libraries are installed as NPM packages — you import what the package exports and customize through wrappers or style overrides when you need something different. Here, components are added to your project as source files through a [shadcn](https://ui.shadcn.com/) registry. You can read and edit the code directly, and install only the components you need.

This repository hosts the registry site (component reference, installation guides, token documentation, and live demos) and the component source.

## Documentation

[designsystem.quantumblack.com](https://designsystem.quantumblack.com)

## Development

To run the registry site locally:

**Prerequisites:** [Node.js](https://nodejs.org/) 22+, [npm](https://www.npmjs.com/), and [Git](https://git-scm.com/). Tested on macOS, Linux, and Windows (native or via WSL).

1. **Clone** this repository.
2. **Install dependencies:** `npm install`
3. **Configure environment:** copy `.env.example` to `.env` and set `QBDS_REGISTRY_URL` to `http://localhost:4123`.

   ```bash
   cp .env.example .env
   ```

4. **Start the dev server:** `npm run dev`

The app runs at [http://localhost:4123](http://localhost:4123). See [CONTRIBUTING.md](CONTRIBUTING.md) for project structure, commands, and how to add components.

## Contributing

Contributions are welcome. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md).

## License

Licensed under the Apache License, Version 2.0. See [LICENSE.txt](LICENSE.txt) for the full text.

The McKinsey & Company name and associated marks are trademarks of McKinsey & Company and may not be used without express written permission.
