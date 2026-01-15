---
title: Generics
description: Write flexible code with generic types
icon: mdi:code-brackets
group: Advanced Concepts
---

# Generics

Write flexible code with generic types.

## Generic Functions

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

let number_list = vec
![34, 50, 25, 100, 65];
let result = largest(&number_list);
```

## Generic Structs

```rust
struct Point<T> {
    x: T,
    y: T,
}

let integer_point = Point { x: 5, y: 10 };
let float_point = Point { x: 1.0, y: 4.0 };
```

## Multiple Type Parameters

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

let both_integer = Point { x: 5, y: 10 };
let both_float = Point { x: 1.0, y: 4.0 };
let integer_and_float = Point { x: 5, y: 4.0 };
```
