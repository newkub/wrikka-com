<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const sizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7'
}

const thumbSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
}
</script>

<template>
  <label class="inline-flex items-center cursor-pointer" :class="{ 'opacity-50': disabled }">
    <div class="relative">
      <input
        type="checkbox"
        class="sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="emit('update:modelValue', !modelValue)"
      >
      <div
        :class="[
          'bg-gray-200 rounded-full transition-colors',
          modelValue ? '!bg-primary-color' : '',
          sizeClasses[size]
        ]"
      ></div>
      <div
        :class="[
          'absolute left-0.5 top-0.5 bg-white rounded-full transition-transform',
          modelValue ? 'translate-x-full' : 'translate-x-0',
          thumbSizeClasses[size]
        ]"
      ></div>
    </div>
    <span v-if="label" class="ml-3 text-sm font-medium">{{ label }}</span>
  </label>
</template>