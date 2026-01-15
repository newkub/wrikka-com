---
title: Comments
description: Document your code with comments and documentation
icon: mdi:comment-text
group: Basics
---

# Comments

Document your code with comments and documentation.

## Regular Comments

```rust
// This is a line comment

/* This is a
   block comment */
```

## Documentation Comments

```rust
/// This is a documentation comment for the following item
/// It supports Markdown formatting
fn add(a: i32, b: i32) -> i32 {
    a + b
}

//! This is a module-level documentation comment
//! It documents the containing module
```

## Best Practices

- Use `///` for item documentation
- Use `//!` for module/crate documentation
- Include examples in documentation
- Run `cargo doc` to generate HTML documentation
- Run `cargo test --doc` to test documentation examples
