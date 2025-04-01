<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Button from './Button.vue'

interface Props {
  modelValue: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  danger: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const dialogRef = ref<HTMLDialogElement>()

const close = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const confirm = () => {
  emit('update:modelValue', false)
  emit('confirm')
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="close"
      />
      
      <!-- Dialog -->
      <div
        ref="dialogRef"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
          <p v-if="description" class="text-gray-600 dark:text-gray-300">
            {{ description }}
          </p>
          
          <div class="mt-6 flex justify-end gap-3">
            <Button
              variant="ghost"
              @click="close"
            >
              {{ cancelText }}
            </Button>
            <Button
              :variant="danger ? 'danger' : 'primary'"
              @click="confirm"
            >
              {{ confirmText }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>