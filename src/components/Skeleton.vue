<script setup lang="ts">
interface Props {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  width: '100%',
  height: '1rem',
  animated: true
})
</script>

<template>
  <div
    class="bg-gray-200 dark:bg-gray-700"
    :class="[
      variant === 'circular' ? 'rounded-full' : 'rounded',
      animated ? 'animate-pulse' : ''
    ]"
    :style="{
      width: width,
      height: height
    }"
  />
</template>