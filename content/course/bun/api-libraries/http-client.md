---
title: HTTP Client
description: Make HTTP requests with fetch and web standards
icon: mdi:web
---

# HTTP Client

Make HTTP requests with fetch and web standards.

## Make a GET Request

```typescript
const response = await fetch('https://api.example.com/data');
const data = await response.json();
console.log(data);
```

## Make a POST Request

```typescript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Hello' }),
});

const data = await response.json();
console.log(data);
```

## Features

Bun's fetch supports:

- All standard fetch options
- HTTP/2
- Automatic gzip/brotli decompression
- Request/response streaming
- FormData and Blob

## Performance

It's much faster than Node's fetch implementations because it's written in Zig.
