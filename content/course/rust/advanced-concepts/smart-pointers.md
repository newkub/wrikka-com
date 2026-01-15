---
title: Smart Pointers
description: Box, Rc, Arc, and other smart pointer types
icon: mdi:cursor-pointer
group: Advanced Concepts
---

# Smart Pointers

Box, Rc, Arc, and other smart pointer types.

## Box<T> - Heap Allocation

```rust
let b = Box::new(5);  // Stores value on the heap
println!("b = {}", b);
```

## Rc<T> - Reference Counting (Single Thread)

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use std::rc::Rc;

let a = Rc::new(List::Cons(5, Rc::new(List::Nil)));
let b = List::Cons(10, Rc::clone(&a));
let c = List::Cons(10, Rc::clone(&a));
```

## Arc<T> - Atomic Reference Counting (Multi-threaded)

```rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(vec
![1, 2, 3]);
let data_clone = Arc::clone(&data);

thread::spawn(move || {
    println!("{:?}", *data_clone);
});
```
