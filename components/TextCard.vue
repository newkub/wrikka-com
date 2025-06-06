<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description: string
  icon: string
}>(), {
  icon: 'i-mdi-vuejs'
})
</script>

<template>
  <div class="bg-background-block rounded-lg p-6 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary">
    <div class="flex items-center space-x-4">
      <div class="text-3xl text-primary">
        <div :class="props.icon"></div>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-text">{{ props.title }}</h3>
        <p class="text-text-secondary text-sm mt-1">{{ props.description }}</p>
      </div>
    </div>
  </div>
</template>
