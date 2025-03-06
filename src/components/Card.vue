<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  image: string
  variant?: 'horizontal' | 'vertical'
  date?: string
  readTime?: string
  price?: number
  links?: Array<{
    label: string
    url: string
    icon: string
  }>
  onClick?: () => void
}>()
</script>

<template>
  <div 
    :class="[
      'bg-card-bg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer',
      variant === 'horizontal' ? 'flex' : 'flex flex-col'
    ]"
    @click="onClick"
  >
    <div 
      :class="[
        'relative overflow-hidden',
        variant === 'horizontal' ? 'w-48' : 'w-full'
      ]"
    >
      <img 
        :src="image" 
        :alt="title" 
        class="w-full aspect-video object-cover" 
      />
    </div>
    <div class="flex-1 p-6">
      <div v-if="date || readTime" class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span v-if="date">{{ new Date(date).toLocaleDateString() }}</span>
        <span v-if="readTime">{{ readTime }}</span>
      </div>
      <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>
      <p v-if="description" class="text-gray-600 dark:text-gray-300 mb-3">{{ description }}</p>
      <p v-if="price !== undefined" class="text-primary-color font-bold text-xl">${{ price }}</p>
      <div v-if="links" class="flex gap-4 mt-4">
        <a v-for="link in links"
           :key="link.url"
           :href="link.url"
           target="_blank"
           rel="noopener noreferrer"
           @click.stop
           class="flex items-center gap-1 text-sm text-primary-color hover:text-hover-color transition-colors">
          <div :class="link.icon" />
          {{ link.label }}
        </a>
      </div>
    </div>
  </div>
</template>