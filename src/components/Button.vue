<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false
})

const variantClasses = {
  primary: 'bg-primary-color hover:bg-hover-color text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <div v-if="loading" class="i-carbon-circle-dash animate-spin" />
    <div v-else-if="icon" :class="icon" />
    <slot />
  </button>
</template>