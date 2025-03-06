<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import gettingStarted from '../../content/blog/getting-started.md?raw'
import unocssLayouts from '../../content/blog/unocss-layouts.md?raw'

const route = useRoute()
const router = useRouter()

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

const copyCode = async (code: string, button: HTMLButtonElement) => {
  await navigator.clipboard.writeText(code)
  const originalText = button.innerHTML
  button.innerHTML = '<div class="i-carbon-checkmark text-green-500"></div> Copied!'
  setTimeout(() => {
    button.innerHTML = originalText
  }, 2000)
}

onMounted(() => {
  const preElements = document.querySelectorAll('pre')
  preElements.forEach(pre => {
    const code = pre.querySelector('code')
    if (!code) return
    
    const lang = code.className.replace('language-', '')
    const fileName = lang === 'js' ? 'script.js' :
                    lang === 'html' ? 'index.html' :
                    lang === 'css' ? 'styles.css' :
                    `file.${lang}`
    
    const header = document.createElement('div')
    header.className = 'flex justify-between items-center bg-gray-800 px-4 py-2 text-gray-400 text-sm'
    
    const fileInfo = document.createElement('div')
    fileInfo.className = 'flex items-center gap-2'
    const iconClass = lang === 'js' ? 'i-logos-javascript' :
                     lang === 'html' ? 'i-logos-html-5' :
                     lang === 'css' ? 'i-logos-css-3' :
                     'i-carbon-document'
    fileInfo.innerHTML = `
      <div class="${iconClass} text-lg"></div>
      <span>${fileName}</span>
      <span class="text-gray-500">${lang}</span>
    `
    
    const copyButton = document.createElement('button')
    copyButton.className = 'hover:text-white transition-colors flex items-center gap-1'
    copyButton.innerHTML = '<div class="i-carbon-copy"></div> Copy'
    copyButton.onclick = () => copyCode(code.textContent?.trim() || '', copyButton)
    
    header.appendChild(fileInfo)
    header.appendChild(copyButton)
    pre.insertBefore(header, pre.firstChild)
  })
})
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4">
    <button @click="router.push('/blog')" 
            class="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-hover-color transition-colors">
      <div class="i-carbon-arrow-left" />
      Back to Blog
    </button>
    
    <article>
      <div class="flex gap-8 mb-8">
        <img :src="post.cover" :alt="post.title" class="w-64 h-64 object-cover rounded-lg" />
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{{ new Date(post.date).toLocaleDateString() }}</span>
            <span>{{ post.author }}</span>
            <span>{{ post.readTime }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300">{{ post.excerpt }}</p>
        </div>
      </div>
      
      <div class="prose dark:prose-invert max-w-none" v-html="htmlContent"></div>
    </article>

    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8">Related Articles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <router-link v-for="relatedPost in posts.filter(p => p.id !== post.id)"
                     :key="relatedPost.id"
                     :to="`/blog/${relatedPost.id}`"
                     class="block bg-card-bg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <img :src="relatedPost.cover" :alt="relatedPost.title" class="w-full aspect-square object-cover" />
          <div class="p-4">
            <h3 class="font-semibold mb-2">{{ relatedPost.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ relatedPost.excerpt }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 dark:text-gray-300">Post not found</p>
  </div>
</template>