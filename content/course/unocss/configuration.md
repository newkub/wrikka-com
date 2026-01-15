---
title: Configuration
description: Configure UnoCSS in your project
icon: mdi:cog
group: Getting Started
---

# Configuration

Configure UnoCSS in your project.

## Create uno.config.ts

```typescript
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
})
```

## Vite

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

## Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  unoCss: {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
    ],
  },
})
```

## Next.js

```typescript
// next.config.js
import UnoCSS from '@unocss/next'

export default {
  plugins: [
    UnoCSS({ or: 'src/app/**/*.{js,jsx,ts,tsx}' }),
  ],
}
```
