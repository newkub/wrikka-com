---
title: Lifetimes
description: Manage references with lifetime annotations
icon: mdi:clock
group: Advanced Concepts
---

# Lifetimes

Manage references with lifetime annotations.

## Explicit Lifetime Annotation

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## Lifetime in Structs

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

## Lifetime Elision Rules

1. Each parameter gets its own lifetime
2. If there's one input lifetime, it's assigned to output
3. If there's `&self` or `&mut self`, output lifetime equals `self`

## Static Lifetime

```rust
let s: &'static str = "I have a static lifetime";
```
