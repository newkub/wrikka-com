<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '../components/Card.vue'
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

const post = computed(() => posts.find(p => p.id === Number.parseInt(route.params.id as string)))
const relatedPosts = computed(() => posts.filter(p => p.id !== Number.parseInt(route.params.id as string)))

const processContent = (content: string) => {
  // Simply return the marked content
  return marked(content)
}

const contentHtml = computed(() => post.value ? processContent(post.value.content) : '')

const headings = computed(() => {
  const headings: { id: string; text: string; level: number }[] = []
  const content = post.value?.content
  if (content) {
    const html = marked(content)
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const h2s = doc.querySelectorAll('h2')
    const h3s = doc.querySelectorAll('h3')
    for (const h2 of h2s) {
      headings.push({
        id: h2.id,
        text: h2.textContent || '',
        level: 2,
      })
    }
    for (const h3 of h3s) {
      headings.push({
        id: h3.id,
        text: h3.textContent || '',
        level: 3,
      })
    }
  }
  return headings
})

// Track active heading
const activeHeadingId = ref('')

// Set up intersection observer to detect which heading is in view
onMounted(() => {
  if (headings.value.length === 0) return

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeHeadingId.value = entry.target.id
      }
    }
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)
  
  // Wait for DOM to update
  setTimeout(() => {
    for (const heading of headings.value) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }
  }, 100)

  onUnmounted(() => {
    observer.disconnect()
  })
})

// Scroll to section with offset for fixed header
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return
  
  const offset = 120 // Navbar + TOC height
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div v-if="post" class="max-w-[1600px] mx-auto px-4 pt-16">
    <div class="fixed top-[56px] left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-3">
      <div class="max-w-[1600px] mx-auto px-4">
        <nav v-if="headings.length > 0" class="flex items-center gap-2">
          <div class="text-sm font-medium text-gray-600 dark:text-gray-400 shrink-0">Table of Contents:</div>
          <div class="flex gap-3 overflow-x-auto scrollbar-hide py-1">
            <a v-for="heading in headings" :key="heading.id" 
               @click.prevent="scrollToSection(heading.id)"
               :href="`#${heading.id}`"
               class="shrink-0 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors flex items-center gap-1"
               :class="[
                 heading.level === 3 ? 'ml-3' : '',
                 activeHeadingId === heading.id 
                   ? 'bg-primary-color/10 border-primary-color text-primary-color font-semibold' 
                   : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
               ]">
              <div v-if="heading.level === 2" 
                   :class="[
                     'i-carbon-list-numbered',
                     activeHeadingId === heading.id ? 'text-primary-color' : 'text-gray-500 dark:text-gray-400'
                   ]" />
              <div v-else 
                   :class="[
                     'i-carbon-arrow-right text-xs',
                     activeHeadingId === heading.id ? 'text-primary-color' : 'text-gray-500 dark:text-gray-500'
                   ]" />
              {{ heading.text }}
            </a>
          </div>
        </nav>
      </div>
    </div>
    
    <!-- Add spacing to account for the fixed table of contents -->
    <div class="h-[56px] mb-8"></div>
    
    <div class="flex gap-8">
      <div class="flex-1">
        <button @click="router.push('/blog')" 
                class="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-primary-color text-content-text-light dark:text-content-text-dark rounded-lg hover:bg-hover-color transition-colors">
          <div class="i-carbon-arrow-left" />
          Back to Blog
        </button>
        
        <article class="bg-content-bg-light dark:bg-content-bg-dark text-content-text-light dark:text-content-text-dark p-6 rounded-lg">
          <div class="flex gap-8 mb-8">
            <img :src="post.image" :alt="post.title" class="w-64 aspect-video object-cover rounded-lg" />
            <div class="flex-1">
              <h1 class="text-3xl font-bold mb-4 text-content-heading-light dark:text-content-heading-dark">{{ post.title }}</h1>
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>{{ new Date(post.date).toLocaleDateString() }}</span>
                <span>{{ post.author }}</span>
                <span>{{ post.readTime }}</span>
              </div>
              <p class="text-content-text-light dark:text-content-text-dark">{{ post.description }}</p>
            </div>
          </div>
          
          <div class="prose dark:prose-invert max-w-none" v-html="contentHtml"></div>
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
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 dark:text-gray-300">Post not found</p>
  </div>
</template>

<style scoped>
:root {
  --navbar-height: 56px;
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>