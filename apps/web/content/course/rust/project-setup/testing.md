---
title: Testing
description: Write unit and integration tests
icon: mdi:test-tube
group: Project Setup
---

# Testing

Write unit and integration tests.

## Unit Tests

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
```

## Assertions

```rust
#[test]
fn exploration() {
    assert_eq!(2 + 2, 4);
}

#[test]
fn another() {
    panic!("Make this test fail");
}
```

## Integration Tests

```rust
// tests/integration_test.rs

use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

## Run Tests

```bash
cargo test
cargo test --test integration_test
cargo test -- --ignored  # Run ignored tests
```
