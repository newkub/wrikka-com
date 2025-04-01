<script setup lang="ts">
interface Props {
  variant?: 'default' | 'secondary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  rounded: false
})

const variantClasses = {
  default: 'bg-primary-color/10 text-primary-color',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
  success: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200',
  danger: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200',
  warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}
</script>

<template>
  <span
    class="inline-flex items-center font-medium"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      rounded ? 'rounded-full' : 'rounded-md'
    ]"
  >
    <slot />
  </span>
</template>