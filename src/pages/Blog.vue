<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue'
import gettingStarted from '../../content/blog/getting-started.md?raw'
import unocssLayouts from '../../content/blog/unocss-layouts.md?raw'

const router = useRouter()

const posts = [
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    description: 'Learn how to use Vue 3\'s Composition API to build more maintainable components',
    date: '2024-03-15',
    author: 'John Doe',
    image: 'https://picsum.photos/seed/blog1/400/225',
    readTime: '5 min read',
    content: gettingStarted
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with UnoCSS',
    description: 'Discover how to create beautiful responsive layouts using UnoCSS utility classes',
    date: '2024-03-10',
    author: 'John Doe',
    image: 'https://picsum.photos/seed/blog2/400/225',
    readTime: '4 min read',
    content: unocssLayouts
  }
]
</script>

<template>
  <div class="max-w-[var(--max-content-width)] mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
        :onClick="() => router.push(`/blog/${post.id}`)"
      />
    </div>
  </div>
</template>