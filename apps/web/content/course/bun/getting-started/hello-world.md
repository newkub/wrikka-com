---
title: Hello World
description: Create and run your first Bun application
icon: mdi:rocket-launch
---

# Hello World

Create and run your first Bun application.

## Create a Simple Program

Create a file called `index.ts`:

```typescript
console.log("Hello, World!");
```

Run it with:

```bash
bun run index.ts
```

## Create a Web Server

You can also create a web server:

```typescript
Bun.serve({
	port: 3000,
	fetch(req) {
		return new Response("Hello, World!");
	},
});

console.log("Server running on http://localhost:3000");
```

## TypeScript Support

Bun automatically handles TypeScript compilation, so you don't need a build step. You can run TypeScript files directly without any additional configuration.
