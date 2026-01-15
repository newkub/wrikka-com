---
title: Option Type
description: Handle optional values with Option<T>
icon: mdi:checkbox-marked-circle
group: Error Handling
---

# Option Type

Handle optional values with Option<T>.

## Option Enum

```rust
enum Option<T> {
    Some(T),
    None,
}
```

## Using Option

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

## Combining Option and Result

```rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}
```

## Methods on Option

- `unwrap()` - panic if None
- `unwrap_or(default)` - return default if None
- `map()` - transform the value if Some
