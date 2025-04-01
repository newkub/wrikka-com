<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  totalPages: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const pages = computed(() => {
  const current = props.modelValue
  const total = props.totalPages
  const max = props.maxVisiblePages
  
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const half = Math.floor(max / 2)
  let start = current - half
  let end = current + half

  if (start < 1) {
    start = 1
    end = max
  }

  if (end > total) {
    end = total
    start = total - max + 1
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  if (start > 2) {
    pages.unshift('...')
    pages.unshift(1)
  } else if (start === 2) {
    pages.unshift(1)
  }

  if (end < total - 1) {
    pages.push('...')
    pages.push(total)
  } else if (end === total - 1) {
    pages.push(total)
  }

  return pages
})

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number') {
    emit('update:modelValue', page)
  }
}
</script>

<template>
  <nav class="flex items-center justify-center space-x-2">
    <button
      class="px-3 py-1 rounded-md transition-colors"
      :class="[
        modelValue === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      ]"
      :disabled="modelValue === 1"
      @click="emit('update:modelValue', modelValue - 1)"
    >
      <div class="i-carbon-chevron-left" />
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="px-3 py-1 rounded-md transition-colors text-sm"
      :class="[
        typeof page === 'number'
          ? page === modelValue
            ? 'bg-primary-color text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'text-gray-400 cursor-default'
      ]"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 rounded-md transition-colors"
      :class="[
        modelValue === totalPages
          ? 'text-gray-400 cursor-not-allowed'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      ]"
      :disabled="modelValue === totalPages"
      @click="emit('update:modelValue', modelValue + 1)"
    >
      <div class="i-carbon-chevron-right" />
    </button>
  </nav>
</template>