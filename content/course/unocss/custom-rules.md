---
title: Custom Rules
description: Create custom utility rules in UnoCSS
icon: mdi:code-braces
group: Advanced Topics
---

# Custom Rules

Create custom utility rules in UnoCSS.

## Using Shortcuts

Define shortcuts for commonly used utilities:

```typescript
export default defineConfig({
  shortcuts: {
    // Button
    'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition',
    // Card
    'card': 'p-4 rounded-lg border shadow-sm',
  },
})
```

Usage:

```html
<button class="btn">Button</button>
<div class="card">Card content</div>
```

## Using Rules

Define custom rules with CSS:

```typescript
export default defineConfig({
  rules: [
    ['custom-rule', { color: 'red' }],
  ],
})
```

## Using Layers

Organize your rules into layers:

```typescript
export default defineConfig({
  layers: {
    components: 'components',
    utilities: 'utilities',
  },
})
```

## Using Theme

Define custom theme values:

```typescript
export default defineConfig({
  theme: {
    colors: {
      primary: '#3b82f6',
    },
  },
})
```

## Dynamic Classes

Use dynamic classes with variants:

```html
<div class="hover:text-red-500 md:text-xl">Dynamic text</div>
```
