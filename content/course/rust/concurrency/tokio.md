---
title: Tokio Runtime
description: Use Tokio for async I/O and networking
icon: mdi:rocket
group: Concurrency
---

# Tokio Runtime

Use Tokio for async I/O and networking.

## Add Tokio

```bash
cargo add tokio --features full
```

## Tokio Main

```rust
#[tokio::main]
async fn main() {
    println!("Hello world");
}
```

## Spawning Tasks

```rust
#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        println!("Hello from a task!");
    });

    handle.await.unwrap();
}
```

## Channels

```rust
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.send("hello").await.unwrap();
    });

    while let Some(message) = rx.recv().await {
        println!("Got: {}", message);
    }
}
```
