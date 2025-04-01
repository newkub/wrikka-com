<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-color/50 focus:border-primary-color outline-none transition-all"
      :class="[
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
          : 'border-gray-300 dark:border-gray-600',
        disabled 
          ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' 
          : 'bg-white dark:bg-gray-800'
      ]"
    />
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>