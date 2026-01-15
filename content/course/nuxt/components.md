---
title: Components
description: Create components in Nuxt
icon: mdi:view-dashboard
group: Core Features
---

# Components

Create components in Nuxt.

## Auto-imported Components

Nuxt auto-imports components from the `components/` directory.

```vue
<!-- components/MyComponent.vue -->
<template>
	<div>My Component</div>
</template>
```

```vue
<!-- Use anywhere without import -->
<MyComponent />
```

## Component Props

```vue
<script setup lang="ts">
interface Props {
	title: string;
	count: number;
}

const props = withDefaults(defineProps<Props>(), {
	count: 0,
});
</script>

<template>
	<div>
		<h2>{{ title }}</h2>
		<p>Count: {{ count }}</p>
	</div>
</template>
```

## Component Emits

```vue
<script setup lang="ts">
const emit = defineEmits<{
	update: [value: string];
}>();
</script>

<template>
	<button @click="emit('update', 'new value')">
		Update
	</button>
</template>
```

## Slots

```vue
<!-- Parent.vue -->
<MyComponent>
	<template #header>
		<h2>Header</h2>
	</template>
	<template #default>
		Content
	</template>
</MyComponent>

<!-- MyComponent.vue -->
<template>
	<slot name="header"></slot>
	<slot></slot>
</template>
```
