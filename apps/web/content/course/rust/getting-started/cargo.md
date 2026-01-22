---
title: Cargo
description: Rust's package manager and build system
icon: mdi:package-variant
group: Getting Started
---

# Cargo

Rust's package manager and build system.

## Create a New Project

```bash
cargo new my_project
```

## Build a Project

```bash
cargo build          # Debug build
cargo build --release # Release build
```

## Run a Project

```bash
cargo run
```

## Add Dependencies

```bash
cargo add serde
cargo add serde --dev  # Dev dependency
```

## Run Tests

```bash
cargo test
```

## Check Code Without Building

```bash
cargo check
```

## Configuration Files

Cargo uses `Cargo.toml` for configuration and `Cargo.lock` for dependency locking.
