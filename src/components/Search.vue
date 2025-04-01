<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <div class="i-carbon-search text-gray-400 text-xl" />
    </div>
    <input
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-color/50 focus:border-primary-color outline-none bg-white dark:bg-gray-800 transition-all"
    />
    <button
      v-if="modelValue"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      <div class="i-carbon-close text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
    </button>
  </div>
</template>