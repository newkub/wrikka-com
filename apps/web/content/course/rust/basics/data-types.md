---
title: Data Types
description: Scalar types (integers, floats, booleans, chars) and compound types
icon: mdi:database
group: Basics
---

# Data Types

Scalar types (integers, floats, booleans, chars) and compound types.

## Scalar Types

### Integers

```rust
let x: i32 = 42;          // Signed 32-bit
let y: u64 = 100;         // Unsigned 64-bit
let z = 255;              // Inferred as i32
```

### Floats

```rust
let a: f32 = 3.14;        // 32-bit floating point
let b: f64 = 2.71828;      // 64-bit floating point
```

### Booleans

```rust
let is_true: bool = true;
let is_false: bool = false;
```

### Characters

```rust
let c: char = 'z';        // Unicode scalar value
let emoji = '😀';          // Unicode emoji
```

## Compound Types

### Tuples

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;      // Destructuring
```

### Arrays

```rust
let arr = [1, 2, 3, 4, 5];
let first = arr[0];        // Access by index
```
