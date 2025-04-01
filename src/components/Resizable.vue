<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: 200,
  minHeight: 200,
  maxWidth: Infinity,
  maxHeight: Infinity
})

const containerRef = ref<HTMLDivElement>()
const width = ref(props.minWidth)
const height = ref(props.minHeight)
let isResizing = false
let startX = 0
let startY = 0
let startWidth = 0
let startHeight = 0

const handleMouseDown = (e: MouseEvent) => {
  isResizing = true
  startX = e.clientX
  startY = e.clientY
  startWidth = width.value
  startHeight = height.value
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing) return

  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY

  width.value = Math.min(Math.max(startWidth + deltaX, props.minWidth), props.maxWidth)
  height.value = Math.min(Math.max(startHeight + deltaY, props.minHeight), props.maxHeight)
}

const handleMouseUp = () => {
  isResizing = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  if (containerRef.value) {
    width.value = containerRef.value.offsetWidth
    height.value = containerRef.value.offsetHeight
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative bg-white dark:bg-gray-800 border rounded-lg overflow-hidden"
    :style="{
      width: `${width}px`,
      height: `${height}px`
    }"
  >
    <slot></slot>
    <div
      class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
      @mousedown="handleMouseDown"
    >
      <div class="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-sm"></div>
    </div>
  </div>
</template>