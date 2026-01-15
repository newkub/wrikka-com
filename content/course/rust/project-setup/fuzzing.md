---
title: Fuzzing
description: Find bugs with property-based testing
icon: mdi:bug
group: Project Setup
---

# Fuzzing

Find bugs with property-based testing.

## Add cargo-fuzz

```bash
cargo install cargo-fuzz
cargo fuzz init
```

## Write a Fuzz Test

```rust
// fuzz/fuzz_targets/target1.rs

#![no_main]
use libfuzzer_sys::fuzz_target;

fuzz_target!(|data: &[u8]| {
    // Your fuzzing logic here
    if let Ok(s) = std::str::from_utf8(data) {
        // Test your code with s
    }
});
```

## Run Fuzzing

```bash
cargo fuzz run fuzz_target_1
```

## Popular Fuzzing Tools

- **cargo-fuzz** - libFuzzer integration
- **proptest** - Property-based testing
- **quickcheck** - QuickCheck implementation

## Best Practices

- Fuzz public APIs
- Test edge cases
- Keep fuzz tests simple
- Run fuzzing regularly
