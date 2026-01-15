---
title: Deployment
description: Deploy Bun applications to production
icon: mdi:cloud-upload
---

# Deployment

Deploy Bun applications to production.

## Build for Production

```bash
bun build ./src/index.ts --outfile ./dist/bundle.js --minify
```

## Docker

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build
CMD ["bun", "run", "dist/bundle.js"]
```

## Vercel

Add a `vercel.json`:

```json
{
  "builds": [{
    "src": "*.ts",
    "use": "@vercel/bun"
  }]
}
```

## Railway

Railway supports Bun out of the box. Just push your code and Railway will detect Bun.

## AWS Lambda

```bash
bun build ./src/index.ts --outfile ./dist/index.js --target node
```

Then deploy the `dist/index.js` file.

## Environment Variables

Set environment variables in your deployment platform:

- **Vercel**: Project Settings > Environment Variables
- **Railway**: Variables tab
- **AWS Lambda**: Environment variables in function configuration

## Easy Deployment

Bun applications are easy to deploy and run in production.
