<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn how to use Vue 3\'s Composition API to build more maintainable components',
    date: '2024-03-15',
    content: `
# Getting Started with Vue 3 Composition API

Vue 3's Composition API provides a new way to organize component logic. Let's explore how to use it effectively.

## What is the Composition API?

The Composition API is a set of APIs that allows us to write Vue components using imported functions instead of declaring options.

## Key Benefits

1. Better TypeScript support
2. More flexible code organization
3. Better code reuse
4. More predictable code organization

## Example Usage

\`\`\`js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return { count }
  }
}
\`\`\`
    `
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with UnoCSS',
    excerpt: 'Discover how to create beautiful responsive layouts using UnoCSS utility classes',
    date: '2024-03-10',
    content: `
# Building Responsive Layouts with UnoCSS

UnoCSS is an atomic CSS engine that provides utility classes for building responsive layouts.

## Getting Started

First, install UnoCSS in your project:

\`\`\`bash
npm install -D unocss
\`\`\`

## Basic Usage

Add utility classes to your elements:

\`\`\`html
<div class="flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold">Hello World</h1>
</div>
\`\`\`
    `
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    
    <div class="grid gap-6">
      <router-link v-for="post in posts" 
                   :key="post.id"
                   :to="`/blog/${post.id}`"
                   class="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ post.excerpt }}</p>
        <p class="text-sm text-gray-500">{{ new Date(post.date).toLocaleDateString() }}</p>
      </router-link>
    </div>
  </div>
</template>