---
title: Bundler
description: Fast bundler for JavaScript and TypeScript projects
icon: mdi:package-variant-closed
---

# Bundler

Fast bundler for JavaScript and TypeScript projects.

## Bundle Your Code

```bash
bun build ./src/index.ts --outdir ./dist
```

## Create a Bundle

```bash
bun build ./src/index.ts --outfile ./dist/bundle.js
```

## Bundler Options

- `--target`: Target environment (browser, node, bun)
- `--format`: Output format (esm, cjs, iife)
- `--minify`: Minify the output
- `--sourcemap`: Generate source maps

## Example

```bash
bun build ./src/index.ts \
  --outfile ./dist/bundle.js \
  --target browser \
  --minify \
  --sourcemap
```

## Performance

Bun's bundler is much faster than Webpack and Rollup, and it supports TypeScript out of the box.
