---
title: Project Structure
description: Understand Rust project layout and organization
icon: mdi:folder-multiple
group: Project Setup
---

# Project Structure

Understand Rust project layout and organization.

## Typical Project Structure

A typical Rust project has the following structure:

```
my_project/
├── Cargo.toml          # Project configuration
├── Cargo.lock          # Dependency lock file
├── src/                # Source code
│   ├── main.rs         # Binary entry point
│   └── lib.rs          # Library entry point
├── tests/              # Integration tests
│   └── integration_test.rs
├── benches/            # Benchmarks
├── examples/           # Example code
└── target/             # Build output (generated)
```

## Binary vs Library Projects

- **Binary projects** have `src/main.rs` as the entry point
- **Library projects** have `src/lib.rs` as the entry point

## Modules

Modules are organized in directories with `mod.rs` files:

```
src/
├── main.rs
└── utils/
    ├── mod.rs
    └── helpers.rs
```
