---
title: Presets
description: Use UnoCSS presets for common CSS frameworks
icon: mdi:puzzle
group: Core Features
---

# Presets

Use UnoCSS presets for common CSS frameworks.

## Preset Uno

The default preset with utility classes similar to Tailwind CSS.

```typescript
import { presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
})
```

## Preset Attributify

Convert class names to attributes.

```typescript
import { presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
  ],
})
```

Usage:

```html
<!-- Instead of -->
<div class="text-red-500"></div>

<!-- Use -->
<div text-red-500></div>
```

## Preset Icons

Use icons from Iconify.

```typescript
import { presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
})
```

Usage:

```html
<div i="mdi-home"></div>
```
