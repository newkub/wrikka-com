---
title: File System
description: Read and write files with Bun's file system API
icon: mdi:file-document
---

# File System

Read and write files with Bun's file system API.

## Read a File

```typescript
const content = await Bun.file('example.txt').text();
console.log(content);
```

## Write a File

```typescript
await Bun.write('output.txt', 'Hello, World!');
```

## Read JSON

```typescript
const data = await Bun.file('data.json').json();
console.log(data);
```

## Check if a File Exists

```typescript
const exists = await Bun.file('example.txt').exists();
```

## Features

Bun's file system API is:

- **Fast**: Uses optimized system calls
- **Simple**: Easier to use than Node's fs module
- **Async-first**: All operations are async by default

## Compatibility

You can also use the traditional `fs` module if you prefer.
