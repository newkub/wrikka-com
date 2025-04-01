<script setup lang="ts">
import { ref, watch } from 'vue'

interface Tab {
  id: string | number
  label: string
  icon?: string
}

interface Props {
  modelValue: string | number
  tabs: Tab[]
  variant?: 'default' | 'pills' | 'underline'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const variantClasses = {
  default: {
    wrapper: 'border-b border-gray-200 dark:border-gray-700',
    tab: 'px-4 py-2 -mb-px border-b-2 border-transparent',
    active: 'border-primary-color text-primary-color',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
  },
  pills: {
    wrapper: 'gap-2',
    tab: 'px-4 py-2 rounded-full',
    active: 'bg-primary-color text-white',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
  },
  underline: {
    wrapper: '',
    tab: 'px-4 py-2 border-b-2 border-transparent',
    active: 'border-primary-color text-primary-color',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
  }
}
</script>

<template>
  <div class="flex items-center" :class="variantClasses[variant].wrapper">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="emit('update:modelValue', tab.id)"
      class="flex items-center gap-2 font-medium transition-colors"
      :class="[
        variantClasses[variant].tab,
        tab.id === modelValue
          ? variantClasses[variant].active
          : variantClasses[variant].inactive
      ]"
    >
      <div v-if="tab.icon" :class="tab.icon" />
      {{ tab.label }}
    </button>
  </div>
</template>