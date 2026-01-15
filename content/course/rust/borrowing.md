---
title: Borrowing
description: Reference data without taking ownership
icon: mdi:link-variant
group: Memory Management
---

# Borrowing

Reference data without taking ownership.

## Immutable References

```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);  // Borrow s1

fn calculate_length(s: &String) -> usize {
    s.len()
}  // s goes out of scope, but no ownership is dropped
```

## Mutable References

```rust
let mut s = String::from("hello");
change(&mut s);

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

## Borrowing Rules

- Can have multiple immutable references
- Can have only one mutable reference
- Cannot have mutable and immutable references simultaneously
