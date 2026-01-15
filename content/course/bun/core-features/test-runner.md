---
title: Test Runner
description: Built-in test runner with Jest-compatible API
icon: mdi:test-tube
---

# Test Runner

Built-in test runner with Jest-compatible API.

## Create a Test File

```typescript
// math.test.ts
import { expect, test } from "bun:test";
import { add } from "./math";

test("add function", () => {
	expect(add(1, 2)).toBe(3);
});
```

## Run Tests

```bash
bun test
```

## Watch Mode

```bash
bun test --watch
```

## Features

Bun's test runner supports:

- Jest-compatible matchers (expect, toBe, toEqual, etc.)
- Async tests
- Test hooks (beforeAll, beforeEach, afterAll, afterEach)
- Snapshot testing
- Mock functions

## Performance

It's much faster than Jest because it doesn't require a separate process for each test file.
