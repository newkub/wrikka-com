---
title: Hello World
description: Write and compile your first Rust program
icon: mdi:rocket-launch
group: Getting Started
---

# Hello World

Write and compile your first Rust program.

## Create a New Project

Create a new Rust project using cargo:

```bash
cargo new hello_world
cd hello_world
```

## Edit the Code

This creates a project with a basic structure. Edit `src/main.rs`:

```rust
fn main() {
    println!("Hello, World!");
}
```

## Run the Program

Run the program:

```bash
cargo run
```

## Compile and Run Separately

Or compile and run separately:

```bash
cargo build
./target/debug/hello_world
```

## Release Builds

For release builds:

```bash
cargo build --release
./target/release/hello_world
```
