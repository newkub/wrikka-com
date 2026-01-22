---
title: Closures
description: Anonymous functions that capture their environment
icon: mdi:lambda
group: Advanced Concepts
---

# Closures

Anonymous functions that capture their environment.

## Define a Closure

```rust
let expensive_closure = |num| {
    println!("calculating slowly...");
    std::thread::sleep(Duration::from_secs(2));
    num * 2
};
```

## Closure Type Inference

```rust
let add_one = |x: i32| x + 1;
let add_one: fn(i32) -> i32 = |x: i32| x + 1;
```

## Capturing References

```rust
let list = vec
![1, 2, 3];
let borrows_closure = || println!("{:?}", list);
```

## Moving Ownership

```rust
let list = vec
![1, 2, 3];
let moves_closure = || list;
```

## Fn, FnMut, and FnOnce Traits

- `Fn` - borrows values
- `FnMut` - mutably borrows values
- `FnOnce` - takes ownership
