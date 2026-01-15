---
title: Variables
description: Learn about mutability, shadowing, and variable naming
icon: mdi:variable
group: Basics
---

# Variables

Learn about mutability, shadowing, and variable naming.

## Immutable by Default

In Rust, variables are immutable by default. Use `mut` to make them mutable:

```rust
let x = 5;           // Immutable
let mut y = 10;      // Mutable
y = 20;
```

## Shadowing

Shadowing allows you to declare a new variable with the same name:

```rust
let x = 5;
let x = x + 1;      // Shadows the previous x
let x = "Hello";     // Different type, still works
```

## Variable Naming Rules

- Can contain letters, digits, and underscores
- Must start with a letter or underscore
- Case-sensitive
- Use `snake_case` for variables and functions
- Use `PascalCase` for types and structs
