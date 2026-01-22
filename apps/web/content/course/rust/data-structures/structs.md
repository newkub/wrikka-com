---
title: Structs
description: Define custom data types with named fields
icon: mdi:shape
group: Data Structures
---

# Structs

Define custom data types with named fields.

## Define a Struct

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
}
```

## Create Instances

```rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    sign_in_count: 1,
};
```

## Tuple Structs

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

## Unit-like Structs

```rust
struct AlwaysEqual;

let subject = AlwaysEqual;
```
