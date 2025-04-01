<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  animated?: boolean
  striped?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'default',
  size: 'md',
  showValue: true,
  animated: false,
  striped: false
})

const percentage = computed(() => Math.min(100, (props.value / props.max) * 100))

const variantClasses = {
  default: 'bg-primary-color',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6'
}
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between mb-1" v-if="showValue">
      <span class="text-sm font-medium">Progress</span>
      <span class="text-sm font-medium">{{ Math.round(percentage) }}%</span>
    </div>
    <div
      class="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      :class="sizeClasses[size]"
    >
      <div
        class="transition-all duration-300 rounded-full"
        :class="[
          variantClasses[variant],
          striped ? 'progress-striped' : '',
          animated ? 'progress-animated' : ''
        ]"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-animated {
  animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
</style>