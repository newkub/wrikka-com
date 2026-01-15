---
title: Traits
description: Define shared behavior with trait bounds
icon: mdi:link
group: Advanced Concepts
---

# Traits

Define shared behavior with trait bounds.

## Define a Trait

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```

## Implement a Trait

```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```

## Default Implementations

```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

## Trait Bounds

```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

## Trait Objects

```rust
fn notify(item: &dyn Summary) {
    println!("Breaking news! {}", item.summarize());
}
```
