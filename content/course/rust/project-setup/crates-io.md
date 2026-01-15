---
title: crates.io
description: Discover and use Rust packages from crates.io
icon: mdi:package
group: Project Setup
---

# crates.io

Discover and use Rust packages from crates.io.

## Search for Crates

Visit https://crates.io to search for packages.

## Add a Dependency

```bash
cargo add serde
cargo add tokio --features full
```

## Or Manually Edit Cargo.toml

```toml
[dependencies]
serde = "1.0"
tokio = { version = "1", features = ["full"] }
```

## Popular Crates

- **serde** - Serialization/deserialization
- **tokio** - Async runtime
- **reqwest** - HTTP client
- **diesel** - ORM
- **actix-web** - Web framework
- **rand** - Random number generation

## Semantic Versioning

- `1.0.0` - Specific version
- `^1.0.0` - Compatible with 1.x.x
- `~1.0.0` - Compatible with 1.0.x
