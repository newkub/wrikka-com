<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  maxLength?: number
  rows?: number
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rows: 3,
  autoResize: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  emit('update:modelValue', textarea.value)

  if (props.autoResize) {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}
</script>

<template>
  <div class="space-y-2">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div class="relative">
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        @input="handleInput"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-color/50 focus:border-primary-color outline-none transition-all resize-y"
        :class="[
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
            : 'border-gray-300 dark:border-gray-600',
          disabled 
            ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' 
            : 'bg-white dark:bg-gray-800'
        ]"
      />
      <div
        v-if="maxLength"
        class="absolute bottom-2 right-2 text-sm text-gray-500"
      >
        {{ modelValue.length }}/{{ maxLength }}
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>