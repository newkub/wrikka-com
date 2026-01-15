---
title: Enums
description: Define types with a fixed set of variants
icon: mdi:format-list-bulleted
group: Data Structures
---

# Enums

Define types with a fixed set of variants.

## Define an Enum

```rust
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

## Enums with Data

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

## Option Enum

```rust
enum Option<T> {
    Some(T),
    None,
}

let some_number = Some(5);
let some_char = Some('e');
let absent_number: Option<i32> = None;
```
