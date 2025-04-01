<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<Toast[]>([])
let counter = 0

const typeConfig = {
  success: {
    icon: 'i-carbon-checkmark-filled',
    bg: 'bg-green-500',
  },
  error: {
    icon: 'i-carbon-error-filled',
    bg: 'bg-red-500',
  },
  info: {
    icon: 'i-carbon-information-filled',
    bg: 'bg-blue-500',
  },
  warning: {
    icon: 'i-carbon-warning-filled',
    bg: 'bg-yellow-500',
  },
}

const show = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
  const id = counter++
  const toast: Toast = { id, message, type, duration }
  toasts.value.push(toast)

  if (duration > 0) {
    setTimeout(() => {
      remove(id)
    }, duration)
  }

  return id
}

const remove = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose the API
defineExpose({ show, remove })
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[typeConfig[toast.type].bg, 'text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 min-w-[300px]']"
      >
        <div :class="typeConfig[toast.type].icon" />
        <span>{{ toast.message }}</span>
        <button
          @click="remove(toast.id)"
          class="ml-auto hover:opacity-80"
        >
          <div class="i-carbon-close" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>