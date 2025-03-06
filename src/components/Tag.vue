<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-sm">
    <div :class="[props.icon, 'text-xl']" />
    <span>{{ props.name }}</span>
  </div>
</template>
