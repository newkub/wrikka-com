<template>
<div class="flex items-start space-x-4 opacity-80 hover:opacity-100 transition-opacity">
  <div :class="`text-${color}-500 mt-1`">
    <slot name="icon"></slot>
  </div>
  <div>
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</div>
</template>

<script lang="ts">
interface CardProps {
  title: string
  description: string
  color?: string
}

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'gray'
    }
  }
}
</script>
