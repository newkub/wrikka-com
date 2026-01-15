---
title: Iterators
description: Process sequences of elements efficiently
icon: mdi:repeat
group: Advanced Concepts
---

# Iterators

Process sequences of elements efficiently.

## Creating Iterators

```rust
let v1 = vec
![1, 2, 3];
let v1_iter = v1.iter();
```

## Using Iterators

```rust
let v1 = vec
![1, 2, 3];

let v1_iter = v1.iter();

for val in v1_iter {
    println!("Got: {}", val);
}
```

## Iterator Methods

```rust
let v1: Vec<i32> = vec
![1, 2, 3];

let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
```

## Lazy Evaluation

```rust
let v1 = vec
![1, 2, 3];

let v2: Vec<_> = v1.iter().map(|x| x + 1).filter(|x| *x > 2).collect();
```

## Consuming Adapters

- `collect()` - collect into a collection
- `sum()` - sum all elements
- `fold()` - accumulate with a function
