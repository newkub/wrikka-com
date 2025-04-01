<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top'
})

const tooltipRef = ref<HTMLDivElement>()
const showTooltip = ref(false)
let timeout: NodeJS.Timeout

const positionClasses = {
  top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
  right: 'top-1/2 -right-2 translate-x-full -translate-y-1/2',
  bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
  left: 'top-1/2 -left-2 -translate-x-full -translate-y-1/2'
}

const arrowClasses = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-700',
  right: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-700',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-700',
  left: 'right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-700'
}

const handleMouseEnter = () => {
  clearTimeout(timeout)
  showTooltip.value = true
}

const handleMouseLeave = () => {
  timeout = setTimeout(() => {
    showTooltip.value = false
  }, 200)
}

onMounted(() => {
  const trigger = tooltipRef.value?.parentElement
  if (trigger) {
    trigger.addEventListener('mouseenter', handleMouseEnter)
    trigger.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  const trigger = tooltipRef.value?.parentElement
  if (trigger) {
    trigger.removeEventListener('mouseenter', handleMouseEnter)
    trigger.removeEventListener('mouseleave', handleMouseLeave)
  }
  clearTimeout(timeout)
})
</script>

<template>
  <div
    ref="tooltipRef"
    v-show="showTooltip"
    class="absolute z-50 px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap"
    :class="positionClasses[position]"
  >
    {{ content }}
    <div
      class="absolute w-2 h-2 bg-gray-700 transform rotate-45"
      :class="arrowClasses[position]"
    ></div>
  </div>
</template>