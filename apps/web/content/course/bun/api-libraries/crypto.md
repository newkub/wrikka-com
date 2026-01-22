---
title: Crypto
description: Cryptographic functions for hashing and encryption
icon: mdi:lock
---

# Crypto

Cryptographic functions for hashing and encryption.

## Hash Data

```typescript
import { createHash } from "crypto";

const hash = createHash("sha256").update("Hello, World!").digest("hex");
console.log(hash);
```

## Generate Random Bytes

```typescript
import { randomBytes } from "crypto";

const bytes = randomBytes(16);
console.log(bytes.toString("hex"));
```

## Encrypt Data

```typescript
import { createCipheriv, createDecipheriv } from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from("01234567890123456789012345678901");
const iv = Buffer.from("0123456789012345");

const cipher = createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello, World!", "utf8", "hex");
encrypted += cipher.final("hex");
console.log(encrypted);
```

## Features

Bun's crypto module supports:

- Hash functions (SHA, MD5, etc.)
- Encryption (AES, DES, etc.)
- Random number generation
- HMAC
- PBKDF2

## Compatibility

It's compatible with Node's crypto module but faster.
