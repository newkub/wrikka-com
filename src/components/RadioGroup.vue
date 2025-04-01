<script setup lang="ts">
interface Option {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  name: string
  options: Option[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="option in options"
      :key="option.value"
      class="relative flex items-start"
    >
      <div class="flex items-center h-5">
        <input
          :id="`${name}-${option.value}`"
          :name="name"
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          @change="emit('update:modelValue', option.value)"
          class="w-4 h-4 text-primary-color border-gray-300 focus:ring-primary-color"
          :class="[
            disabled || option.disabled
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          ]"
        />
      </div>
      <div class="ml-3">
        <label
          :for="`${name}-${option.value}`"
          class="font-medium"
          :class="[
            disabled || option.disabled
              ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
              : 'cursor-pointer text-gray-900 dark:text-gray-100'
          ]"
        >
          {{ option.label }}
        </label>
        <p
          v-if="option.description"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ option.description }}
        </p>
      </div>
    </div>
  </div>
</template>