---
title: Package Manager
description: Use Bun as a fast package manager for npm packages
icon: mdi:package-variant
---

# Package Manager

Use Bun as a fast package manager for npm packages.

## Install Packages

```bash
bun add lodash
bun add -D typescript
```

## Run Scripts

```bash
bun run dev
bun run build
```

## Performance

Bun's package manager is much faster than npm and yarn because it uses a global cache and installs packages in parallel.

## Bunx

You can also use Bun as a drop-in replacement for npm by using `bunx`:

```bash
bunx create-next-app
```

## Automatic Installation

Bun automatically reads your `package.json` and installs dependencies when needed.
