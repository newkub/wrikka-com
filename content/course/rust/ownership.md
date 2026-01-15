---
title: Ownership
description: Understand Rust's ownership system for memory safety
icon: mdi:shield-check
group: Memory Management
---

# Ownership

Understand Rust's ownership system for memory safety.

## Three Rules of Ownership

1. Each value has an owner
2. There can only be one owner at a time
3. When the owner goes out of scope, the value is dropped

## Example

```rust
{                      // s is not valid yet
    let s = String::from("hello");  // s is valid from here
    // do stuff with s
}                       // s is dropped here
```

## Move Semantics

```rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved to s2, s1 is no longer valid
// println!("{}", s1);  // Error: value borrowed after move
```

## Clone for Deep Copy

```rust
let s1 = String::from("hello");
let s2 = s1.clone();  // Deep copy, both are valid
```
