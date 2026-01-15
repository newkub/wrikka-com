---
title: Async/Await
description: Write asynchronous code with async/await
icon: mdi:sync
group: Concurrency
---

# Async/Await

Write asynchronous code with async/await.

## Async Functions

```rust
async fn hello_world() {
    println!("hello, world");
}
```

## Awaiting

```rust
async fn hello_world() {
    hello_cat().await;
    hello_dog().await;
}

async fn hello_cat() {
    println!("hello, cat");
}

async fn hello_dog() {
    println!("hello, dog");
}
```

## Running Async Code

```rust
#[tokio::main]
async fn main() {
    hello_world().await;
}
```

## Futures

```rust
use std::future::Future;

fn hello_world() -> impl Future<Output = ()> {
    async {
        println!("hello, world");
    }
}
```
