<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  length?: number
  modelValue: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete', value: string): void
}>()

const inputs = ref<HTMLInputElement[]>([])

onMounted(() => {
  // Focus first input on mount
  if (inputs.value[0]) {
    inputs.value[0].focus()
  }
})

const handleInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    input.value = ''
    return
  }

  // Take only the last character if multiple characters are pasted
  const digit = value.slice(-1)
  input.value = digit

  // Update the model value
  const newValue = [...props.modelValue]
  newValue[index] = digit
  emit('update:modelValue', newValue.join(''))

  // Move to next input if available
  if (digit && index < props.length - 1) {
    inputs.value[index + 1].focus()
  }

  // Emit complete event if all digits are filled
  if (newValue.filter(Boolean).length === props.length) {
    emit('complete', newValue.join(''))
  }
}

const handleKeydown = (index: number, event: KeyboardEvent) => {
  // Move to previous input on backspace if current input is empty
  if (event.key === 'Backspace' && !event.currentTarget.value && index > 0) {
    inputs.value[index - 1].focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text')
  if (!pastedData) return

  // Only allow numbers
  const numbers = pastedData.replace(/\D/g, '').split('').slice(0, props.length)
  
  numbers.forEach((number, index) => {
    if (inputs.value[index]) {
      inputs.value[index].value = number
    }
  })

  // Update model value
  emit('update:modelValue', numbers.join(''))

  // Focus the next empty input or the last input
  const nextEmptyIndex = numbers.length < props.length ? numbers.length : props.length - 1
  inputs.value[nextEmptyIndex].focus()

  // Emit complete event if all digits are filled
  if (numbers.length === props.length) {
    emit('complete', numbers.join(''))
  }
}
</script>

<template>
  <div class="flex gap-2">
    <input
      v-for="(_, index) in Array(length)"
      :key="index"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :disabled="disabled"
      :ref="el => { if (el) inputs[index] = el as HTMLInputElement }"
      :value="modelValue[index] || ''"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
      @paste="handlePaste"
      class="w-12 h-12 text-center text-2xl border rounded-lg focus:ring-2 focus:ring-primary-color/50 focus:border-primary-color outline-none"
      :class="[
        disabled
          ? 'bg-gray-100 cursor-not-allowed'
          : 'hover:border-primary-color'
      ]"
    />
  </div>
</template>