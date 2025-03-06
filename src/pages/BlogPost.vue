<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const posts = [
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn how to use Vue 3\'s Composition API to build more maintainable components',
    date: '2024-03-15',
    author: 'John Doe',
    cover: 'https://picsum.photos/seed/blog1/1200/600',
    readTime: '5 min read',
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
    author: 'John Doe',
    cover: 'https://picsum.photos/seed/blog2/1200/600',
    readTime: '4 min read',
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

const post = computed(() => posts.find(p => p.id === parseInt(route.params.id as string)))
const htmlContent = computed(() => {
  if (!post.value) return ''
  marked.setOptions({
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    }
  })
  return marked(post.value.content)
})

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
}

onMounted(() => {
  const preElements = document.querySelectorAll('pre')
  preElements.forEach(pre => {
    const code = pre.textContent || ''
    const lang = pre.querySelector('code')?.className.replace('language-', '') || ''
    const header = document.createElement('div')
    header.className = 'flex justify-between items-center bg-gray-800 px-4 py-2 text-gray-400 text-sm'
    header.innerHTML = `
      <span>${lang}</span>
      <button class="hover:text-white transition-colors" onclick="this.closest('pre').querySelector('code').textContent.trim()">
        <div class="i-carbon-copy"></div>
      </button>
    `
    pre.insertBefore(header, pre.firstChild)
  })
})
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4">
    <router-link to="/blog" class="inline-block mb-8 text-primary-color hover:underline">
      ← Back to Blog
    </router-link>
    
    <article class="prose dark:prose-invert max-w-none">
      <img :src="post.cover" :alt="post.title" class="w-full h-64 object-cover rounded-lg mb-8" />
      <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        <span>{{ post.author }}</span>
        <span>{{ post.readTime }}</span>
      </div>
      <div v-html="htmlContent"></div>
    </article>

    <div class="mt-12 grid md:grid-cols-2 gap-6">
      <router-link v-for="relatedPost in posts.filter(p => p.id !== post.id)"
                   :key="relatedPost.id"
                   :to="`/blog/${relatedPost.id}`"
                   class="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <img :src="relatedPost.cover" :alt="relatedPost.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold mb-2">{{ relatedPost.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ relatedPost.excerpt }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 dark:text-gray-300">Post not found</p>
  </div>
</template>