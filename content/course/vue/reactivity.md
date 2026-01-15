---
title: Reactivity
description: Use Vue's reactivity system
icon: mdi:lightning-bolt
group: Core Features
---

# Reactivity

Use Vue's reactivity system.

## ref

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    Count: {{ count }}
  </button>
</template>
```

## reactive

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    Count: {{ state.count }}
  </button>
</template>
```

## computed

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Doubled: {{ doubled }}</p>
</template>
```

## watch

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
</script>
```
