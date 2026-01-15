---
title: Performance
description: Optimize your Bun applications for speed
icon: mdi:speedometer
---

# Performance

Optimize your Bun applications for speed.

## Use Built-in APIs

Bun's built-in APIs are faster than external libraries:

```typescript
// Fast
const content = await Bun.file('data.txt').text();

// Slower
import { readFileSync } from 'fs';
const content = readFileSync('data.txt', 'utf8');
```

## Minimize I/O

Batch file operations and use streams for large files:

```typescript
const stream = Bun.file('large.txt').stream();
for await (const chunk of stream) {
  processChunk(chunk);
}
```

## Use Workers

Offload CPU-intensive tasks to workers:

```typescript
const worker = new Worker('./compute.ts');
worker.postMessage(data);
```

## Enable Caching

Bun automatically caches modules and dependencies. Use `bun pm cache` to manage the cache.

## Profile Your Code

Use Bun's built-in profiler:

```bash
bun --profile run index.ts
```

## Already Fast

Bun is already fast, but these tips can help you get the most out of it.
