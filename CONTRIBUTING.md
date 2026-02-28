# Contributing to TrueMap

First off, thank you for considering contributing to TrueMap! It's people like you that make open-source software such a powerful tool. Our goal is to map the unmapped indoor world, and we need your help to build the best 3D spatial engine possible.

## Where to Start?

If you are looking for ways to contribute, please check our [GitHub Issues](https://github.com/TrueMap/truemap/issues) board. We use labels to organize tasks:
- `good first issue`: Ideal for beginners looking to learn the codebase.
- `help wanted`: General issues where the core team needs assistance.
- `3D / Three.js`: Tasks specifically related to the rendering engine.
- `bug`: Something isn't working right.

## Development Setup

1. **Fork the repo** and clone it locally.
2. Install dependencies using `npm install`.
3. Set up the development database using `npx prisma db push`.
4. Create a new branch for your feature or bug fix: `git checkout -b feature/my-awesome-feature`.

### Coding Standards
- **TypeScript**: We heavily rely on strict TypeScript. Please ensure your code is properly typed. Avoid using `any` whenever possible.
- **Formatting**: We use ESLint. Please run `npm run lint` before committing your changes.
- **Styling**: We use Tailwind CSS V4 for all styling. Do not write custom CSS unless absolutely necessary for complex 3D overlays.
- **3D Components**: All Three.js logic should be encapsulated within `src/components/ui/` or a dedicated `src/components/3d/` directory to separate UI from spatial logic.

## Submitting Pull Requests (PRs)

1. Make sure your branch is up to date with the `main` branch.
2. Write clear, descriptive commit messages.
3. Push your branch to your fork and submit a Pull Request.
4. In your PR description, explain **what** you changed and **why**. If your PR fixes an open issue, please reference it (e.g., "Fixes #123").
5. Include screenshots or screen recordings if your PR changes the UI or the 3D rendering engine.

## Reporting Bugs

When logging a bug in our issues board, please include:
- A clear, descriptive title.
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- the OS and Browser you are using.
- Any relevant console errors.

## Community

Join our ongoing discussions on how to democratize spatial mapping in our GitHub Discussions tab!

We look forward to building the future of mapping with you!
