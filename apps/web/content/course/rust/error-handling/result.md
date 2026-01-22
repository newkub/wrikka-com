---
title: Result Type
description: Handle recoverable errors with Result<T, E>
icon: mdi:alert-circle
group: Error Handling
---

# Result Type

Handle recoverable errors with Result<T, E>.

## Result Enum

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## Using Result

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };
}
```

## Match on Different Errors

```rust
use std::io::ErrorKind;

let f = match f {
    Ok(file) => file,
    Err(error) => match error.kind() {
        ErrorKind::NotFound => match File::create("hello.txt") {
            Ok(fc) => fc,
            Err(e) => panic!("Problem creating the file: {:?}", e),
        },
        other_error => panic!("Problem opening the file: {:?}", other_error),
    },
};
```
