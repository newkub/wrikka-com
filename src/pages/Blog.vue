<script setup lang="ts">
import { ref } from 'vue'
import gettingStarted from '../../content/blog/getting-started.md?raw'
import unocssLayouts from '../../content/blog/unocss-layouts.md?raw'

const posts = [
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn how to use Vue 3\'s Composition API to build more maintainable components',
    date: '2024-03-15',
    author: 'John Doe',
    cover: 'https://picsum.photos/seed/blog1/400/400',
    readTime: '5 min read',
    content: gettingStarted
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with UnoCSS',
    excerpt: 'Discover how to create beautiful responsive layouts using UnoCSS utility classes',
    date: '2024-03-10',
    author: 'John Doe',
    cover: 'https://picsum.photos/seed/blog2/400/400',
    readTime: '4 min read',
    content: unocssLayouts
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link v-for="post in posts" 
                   :key="post.id"
                   :to="`/blog/${post.id}`"
                   class="block bg-card-bg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <img :src="post.cover" :alt="post.title" class="w-full aspect-square object-cover" />
        <div class="p-4">
          <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{{ new Date(post.date).toLocaleDateString() }}</span>
            <span>{{ post.readTime }}</span>
          </div>
          <h2 class="text-lg font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm">{{ post.excerpt }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>