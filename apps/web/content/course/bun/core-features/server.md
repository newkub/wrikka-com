---
title: HTTP Server
description: Built-in HTTP server for building web applications
icon: mdi:server
---

# HTTP Server

Built-in HTTP server for building web applications.

## Create a Simple Server

```typescript
Bun.serve({
	port: 3000,
	fetch(req) {
		return new Response("Hello, World!");
	},
});

console.log("Server running on http://localhost:3000");
```

## Handle Routes

```typescript
Bun.serve({
	port: 3000,
	async fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === "/") {
			return new Response("Home page");
		}

		if (url.pathname === "/api") {
			return Response.json({ message: "API endpoint" });
		}

		return new Response("Not found", { status: 404 });
	},
});
```

## Features

Bun's server supports:

- HTTP/1.1 and HTTP/2
- WebSocket
- Static file serving
- TLS/SSL
- Request body parsing

## Performance

It's designed to be fast and use minimal resources.
