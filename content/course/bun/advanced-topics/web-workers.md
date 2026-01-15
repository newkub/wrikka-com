---
title: Web Workers
description: Run JavaScript in background threads
icon: mdi:worker
---

# Web Workers

Run JavaScript in background threads.

## Create a Worker File

```typescript
// worker.ts
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

function heavyComputation(n: number): number {
  // Simulate heavy computation
  return n * n;
}
```

## Use the Worker

```typescript
const worker = new Worker('./worker.ts');

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

worker.postMessage(10);
```

## Use Cases

Workers are useful for:

- CPU-intensive tasks
- Parallel processing
- Keeping the main thread responsive

## Performance

Bun's workers are fast and use minimal memory overhead.
