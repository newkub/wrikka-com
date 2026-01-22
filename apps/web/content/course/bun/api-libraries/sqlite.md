---
title: SQLite
description: Built-in SQLite database support
icon: mdi:database
---

# SQLite

Built-in SQLite database support.

## Create a Database

```typescript
const db = new Bun.Database("mydb.sqlite");
```

## Create a Table

```typescript
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`);
```

## Insert Data

```typescript
const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
stmt.run("John Doe", "john@example.com");
```

## Query Data

```typescript
const stmt = db.prepare("SELECT * FROM users");
const users = stmt.all();
console.log(users);
```

## Features

Bun's SQLite support is:

- **Fast**: Uses optimized bindings
- **Simple**: Easy to use API
- **Reliable**: Full SQLite support

## Use Case

Perfect for small to medium applications that need a database.
