---
title: Channels
description: Communicate between threads with channels
icon: mdi:chat
group: Concurrency
---

# Channels

Communicate between threads with channels.

## Create a Channel

```rust
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let val = String::from("hi");
    tx.send(val).unwrap();
});

let received = rx.recv().unwrap();
println!("Got: {}", received);
```

## Multiple Values

```rust
let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let vals = vec
![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}
```
