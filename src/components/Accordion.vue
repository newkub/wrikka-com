<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  title: string
  content: string
}

interface Props {
  items: Item[]
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false
})

const openItems = ref<Set<number>>(new Set())

const toggle = (index: number) => {
  if (props.multiple) {
    if (openItems.value.has(index)) {
      openItems.value.delete(index)
    } else {
      openItems.value.add(index)
    }
  } else {
    if (openItems.value.has(index)) {
      openItems.value.clear()
    } else {
      openItems.value.clear()
      openItems.value.add(index)
    }
  }
}
</script>

<template>
  <div class="divide-y border rounded-lg">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="overflow-hidden"
    >
      <button
        @click="toggle(index)"
        class="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span class="font-medium">{{ item.title }}</span>
        <div
          class="i-carbon-chevron-down transition-transform"
          :class="{ 'rotate-180': openItems.has(index) }"
        />
      </button>
      <div
        v-show="openItems.has(index)"
        class="p-4 bg-gray-50 dark:bg-gray-800"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>