---
title: Panic
description: Handle unrecoverable errors with panic!
icon: mdi:alert
group: Error Handling
---

# Panic

Handle unrecoverable errors with panic!

## Trigger a Panic

```rust
panic!("crash and burn");
```

## Panic from Library Calls

```rust
let v = vec
![1, 2, 3];
v[99];  // This will panic!
```

## Backtrace on Panic

```bash
RUST_BACKTRACE=1 cargo run
```

## Recoverable vs Unrecoverable Errors

- Use `panic!` for unrecoverable errors
- Use `Result<T, E>` for recoverable errors

## Unwrap and Expect

```rust
let f = File::open("hello.txt").unwrap();  // Panic on error
let f = File::open("hello.txt").expect("Failed to open hello.txt");
```
