---
title: Configuration
description: Configure Nuxt in your project
icon: mdi:cog
group: Getting Started
---

# Configuration

Configure Nuxt in your project.

## nuxt.config.ts

```typescript
export default defineNuxtConfig({
	// App configuration
	app: {
		head: {
			title: "My App",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
		},
	},

	// Modules
	modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@vueuse/nuxt",
	],

	// CSS
	css: ["~/assets/css/main.css"],

	// Runtime config
	runtimeConfig: {
		public: {
			apiBase: "/api",
		},
	},
});
```

## TypeScript

```typescript
// Enable TypeScript support
export default defineNuxtConfig({
	typescript: {
		strict: true,
		typeCheck: true,
	},
});
```
