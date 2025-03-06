<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '../components/Card.vue'
import Code from '../components/Code.vue'
import { marked } from 'marked'
import gettingStarted from '../../content/blog/getting-started.md?raw'
import unocssLayouts from '../../content/blog/unocss-layouts.md?raw'

const route = useRoute()
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

const post = computed(() => posts.find(p => p.id === parseInt(route.params.id as string)))
const relatedPosts = computed(() => posts.filter(p => p.id !== parseInt(route.params.id as string)))

const processContent = (content: string) => {
  const sections = content.split('```')
  return sections.map((section, index) => {
    if (index % 2 === 1) {
      const [lang, ...code] = section.split('\n')
      return {
        type: 'code',
        lang: lang.trim(),
        content: code.join('\n').trim()
      }
    }
    return {
      type: 'text',
      content: marked(section)
    }
  })
}

const contentSections = computed(() => post.value ? processContent(post.value.content) : [])
</script>

<template>
  <div v-if="post" class="max-w-[var(--max-content-width)] mx-auto px-4">
    <button @click="router.push('/blog')" 
            class="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-hover-color transition-colors">
      <div class="i-carbon-arrow-left" />
      Back to Blog
    </button>
    
    <article>
      <div class="flex gap-8 mb-8">
        <img :src="post.image" :alt="post.title" class="w-64 aspect-video object-cover rounded-lg" />
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{{ new Date(post.date).toLocaleDateString() }}</span>
            <span>{{ post.author }}</span>
            <span>{{ post.readTime }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300">{{ post.description }}</p>
        </div>
      </div>
      
      <div class="prose dark:prose-invert max-w-none">
        <template v-for="(section, index) in contentSections" :key="index">
          <Code v-if="section.type === 'code'"
                :code="section.content"
                :lang="section.lang"
                :filename="`example.${section.lang}`"
          />
          <div v-else v-html="section.content"></div>
        </template>
      </div>
    </article>

    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8">Related Articles</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          v-bind="relatedPost"
          :onClick="() => router.push(`/blog/${relatedPost.id}`)"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 dark:text-gray-300">Post not found</p>
  </div>
</template>