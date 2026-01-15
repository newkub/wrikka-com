---
title: Documentation
description: Generate documentation with rustdoc
icon: mdi:book-open
group: Project Setup
---

# Documentation

Generate documentation with rustdoc.

## Documentation Comments

```rust
/// Adds two numbers together.
///
/// # Examples
///
/// ```
/// let result = add(2, 3);
/// assert_eq!(result, 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

## Module Documentation

```rust
//! # My Crate
//!
//! This crate provides functionality for...
```

## Generate Documentation

```bash
cargo doc --open
```

## Test Documentation Examples

```bash
cargo test --doc
```

## Common Sections

- `# Examples` - Code examples
- `# Panics` - When the function panics
- `# Errors` - Possible errors
- `# Safety` - Safety considerations for unsafe code
