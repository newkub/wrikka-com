<script setup lang="ts">
interface Props {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: true
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const typeConfig = {
  info: {
    icon: 'i-carbon-information',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-400 dark:text-blue-300'
  },
  success: {
    icon: 'i-carbon-checkmark-outline',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-400 dark:text-green-300'
  },
  warning: {
    icon: 'i-carbon-warning',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-400 dark:text-yellow-300'
  },
  error: {
    icon: 'i-carbon-error',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-400 dark:text-red-300'
  }
}
</script>

<template>
  <div
    class="flex items-start gap-3 p-4 border rounded-lg"
    :class="[typeConfig[type].bg, typeConfig[type].border]"
  >
    <div :class="[typeConfig[type].icon, typeConfig[type].iconColor, 'text-xl flex-shrink-0 mt-0.5']" />
    <div class="flex-grow">
      <h3 v-if="title" class="font-medium mb-1" :class="typeConfig[type].text">
        {{ title }}
      </h3>
      <div :class="typeConfig[type].text">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      @click="emit('close')"
      class="flex-shrink-0 hover:opacity-80 transition-opacity"
      :class="typeConfig[type].text"
    >
      <div class="i-carbon-close" />
    </button>
  </div>
</template>