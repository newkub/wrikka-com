---
title: Functions
description: Define and call functions with parameters and return values
icon: mdi:function-variant
group: Basics
---

# Functions

Define and call functions with parameters and return values.

## Define Functions

Define functions with `fn` keyword:

```rust
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    greet("World");
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}
```

## Statements vs Expressions

- Statements don't return values (end with semicolon)
- Expressions return values (no semicolon)

```rust
fn example() -> i32 {
    let x = 5;           // Statement
    x + 1               // Expression (returns 6)
}
```

## Return Types

- Use `-> Type` for return type annotation
- Early return with `return` keyword
- Implicit return from final expression
