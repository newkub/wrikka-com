---
title: Configuration
description: Configure Bun with bun.config.ts and environment variables
icon: mdi:cog
---

# Configuration

Configure Bun with bun.config.ts and environment variables.

## bun.config.ts

Configure Bun using `bun.config.ts` in your project root:

```typescript
import { defineConfig } from 'bun';

export default defineConfig({
  // Test configuration
  test: {
    root: './tests',
    preload: ['./tests/setup.ts'],
  },
  
  // Build configuration
  build: {
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'browser',
  },
});
```

## Environment Variables

Use environment variables:

```bash
# .env file
DATABASE_URL=postgres://localhost/mydb
API_KEY=secret
```

Access them in your code:

```typescript
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

## Automatic Loading

Bun automatically loads `.env` files when you run your application.
