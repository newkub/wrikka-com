---
title: Pages
description: Create pages in Nuxt using the pages directory
icon: mdi:file-document-multiple
group: Core Features
---

# Pages

Create pages in Nuxt using the pages directory.

## File-based Routing

```typescript
// pages/index.vue
<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

// pages/about.vue
<template>
  <div>
    <h1>About</h1>
  </div>
</template>

// pages/blog/[id].vue (Dynamic route)
<template>
  <div>
    <h1>Blog Post {{ $route.params.id }}</h1>
  </div>
</template>
```

## Nested Routes

```typescript
// pages/parent.vue
<template>
  <div>
    <h1>Parent</h1>
    <NuxtPage />
  </div>
</template>

// pages/parent/child.vue
<template>
  <div>
    <h1>Child</h1>
  </div>
</template>
```

## Navigation

```vue
<template>
  <NuxtLink to="/">Home</NuxtLink>
  <NuxtLink to="/about">About</NuxtLink>
</template>
```
