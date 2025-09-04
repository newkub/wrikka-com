<script setup lang="ts">
import { useBlogPosts } from '~/composables/useBlogPosts'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  path: string
  slug: string
  category?: string
  tags?: string[]
  image?: string
}

const route = useRoute()
const slug = route.params.slug as string

// Blog post data
const { getPostBySlug } = useBlogPosts()
const post = ref<BlogPost | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Load blog post
onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    post.value = await getPostBySlug(slug)
    
    if (!post.value) {
      throw createError({
        statusCode: 404,
        statusMessage: 'บทความไม่พบ'
      })
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดบทความ'
  } finally {
    loading.value = false
  }
})

// Custom navigation functions
const navigateToHome = () => {
  navigateTo('/')
}

const navigateToBlog = () => {
  navigateTo('/blog')
}

// Format date function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Extract table of contents from post content
const tableOfContents = computed(() => {
  if (!post.value?.content) return []
  
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings = []
  let match
  
  while ((match = headingRegex.exec(post.value.content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
    
    headings.push({
      level,
      text,
      id
    })
  }
  
  return headings
})

// Format content function to handle markdown-like content
const formatContent = (content: string) => {
  // Simple markdown to HTML conversion
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-surface-100 dark:bg-surface-100-dark px-2 py-1 rounded text-sm">$1</code>')
    .replace(/^### (.*$)/gim, (match, title) => {
      const id = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      return `<h3 id="${id}" class="text-2xl font-bold text-primary dark:text-primary-dark mt-8 mb-4">${title}</h3>`
    })
    .replace(/^## (.*$)/gim, (match, title) => {
      const id = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      return `<h2 id="${id}" class="text-3xl font-bold text-primary dark:text-primary-dark mt-10 mb-6">${title}</h2>`
    })
    .replace(/^# (.*$)/gim, (match, title) => {
      const id = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      return `<h1 id="${id}" class="text-4xl font-bold text-primary dark:text-primary-dark mt-12 mb-8">${title}</h1>`
    })
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```(\w+)?\n?/g, '').replace(/```$/g, '')
      return `<pre class="bg-surface-100 dark:bg-surface-100-dark p-4 rounded-lg overflow-x-auto border border-surface-200 dark:border-surface-200-dark my-6"><code class="text-sm">${code}</code></pre>`
    })
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>')
    .replace(/(<li.*<\/li>)/g, '<div class="my-4">$1</div>')
}

// Scroll to heading function
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// SEO Meta
useHead(() => ({
  title: post.value ? `${post.value.title} | My Blog` : 'กำลังโหลด... | My Blog',
  meta: [
    { name: 'description', content: post.value?.excerpt || 'บทความจากบล็อกของเรา' },
    { property: 'og:title', content: post.value?.title || 'Blog Post' },
    { property: 'og:description', content: post.value?.excerpt || 'บทความจากบล็อกของเรา' },
    { property: 'og:image', content: post.value?.image || '' },
    { property: 'og:type', content: 'article' }
  ]
}))
</script>

<template>
  <div class="min-h-screen bg-surface dark:bg-surface-dark pt-4">
    <!-- Main Content with Sidebar Layout -->
    <div class="container mx-auto px-6 py-8">
      <!-- Back Button -->
      <button 
        @click="navigateToBlog"
        class="flex items-center gap-2 text-secondary dark:text-secondary-dark hover:text-accent dark:hover:text-accent-dark hover:bg-accent/10 dark:hover:bg-accent-dark/10 px-4 py-2 rounded-lg mb-8 transition-all duration-200 group"
      >
        <div class="i-mdi-arrow-left w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>กลับไปยังบล็อก</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-20">
        <div class="w-16 h-16 border-4 border-accent/20 dark:border-accent-dark/20 border-t-accent dark:border-t-accent-dark rounded-full animate-spin mb-4"></div>
        <span class="text-secondary dark:text-secondary-dark text-lg">กำลังโหลดบทความ...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-2xl mx-auto">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-6 py-4 rounded-xl mb-8">
          <div class="flex items-center gap-3">
            <div class="i-mdi-alert-circle w-6 h-6 text-red-500" />
            <div>
              <strong class="font-bold">เกิดข้อผิดพลาด!</strong>
              <p class="text-sm mt-1">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Post Content with Sidebar -->
      <div v-else-if="post" class="flex gap-8 max-w-7xl mx-auto">
        <!-- Main Content -->
        <article class="flex-1 max-w-4xl">
        <!-- Featured Image -->
        <div v-if="post.image" class="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <!-- Post Header -->
        <header class="mb-12">
          <!-- Category -->
          <div v-if="post.category" class="mb-6">
            <span class="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <div class="i-mdi-tag w-4 h-4" />
              {{ post.category }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            {{ post.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-6 text-secondary text-sm mb-6 p-4 bg-surface-50/50 dark:bg-surface-800/50 rounded-xl backdrop-blur-sm border border-surface-200 dark:border-surface-700">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                <div class="i-mdi-account w-4 h-4 text-white" />
              </div>
              <span class="font-medium">Wrikka</span>
            </div>
            
            <div class="flex items-center gap-2">
              <div class="i-mdi-calendar w-4 h-4 text-accent" />
              <span>{{ formatDate(post.date) }}</span>
            </div>
            
            <div class="flex items-center gap-2">
              <div class="i-mdi-clock-outline w-4 h-4 text-primary" />
              <span>{{ post.readingTime }} นาทีในการอ่าน</span>
            </div>
          </div>

          <!-- Excerpt -->
          <div class="bg-gradient-to-r from-accent/5 to-primary/5 p-6 rounded-xl border-l-4 border-accent mb-8">
            <p class="text-lg text-secondary leading-relaxed italic">
              {{ post.excerpt }}
            </p>
          </div>

          <!-- Tags -->
          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="inline-flex items-center gap-1 bg-surface-100 dark:bg-surface-700 text-secondary px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer group"
            >
              <div class="i-mdi-pound w-3 h-3 group-hover:scale-110 transition-transform" />
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- Divider -->
        <div class="flex items-center gap-4 mb-12">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-surface-200 dark:via-surface-700 to-transparent"></div>
          <div class="w-2 h-2 bg-accent rounded-full"></div>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-surface-200 dark:via-surface-700 to-transparent"></div>
        </div>

        <!-- Post Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div class="text-primary leading-relaxed text-lg space-y-6">
            <!-- Process markdown content with better formatting -->
            <div v-html="formatContent(post.content)" class="formatted-content"></div>
          </div>
        </div>

        <!-- Post Footer -->
        <footer class="mt-16 pt-8 border-t border-surface-200 dark:border-surface-700">
          <!-- Share Section -->
          <div class="bg-surface-50/50 dark:bg-surface-800/50 rounded-xl p-6 mb-8 border border-surface-200 dark:border-surface-700">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="i-mdi-share-variant w-6 h-6 text-accent" />
                <span class="text-primary font-semibold">แชร์บทความนี้</span>
              </div>
              <div class="flex gap-3">
                <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 group">
                  <div class="i-mdi-twitter w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="hidden sm:inline">Twitter</span>
                </button>
                <button class="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 group">
                  <div class="i-mdi-facebook w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="hidden sm:inline">Facebook</span>
                </button>
                <button class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 group">
                  <div class="i-mdi-share-variant w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="hidden sm:inline">อื่นๆ</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex flex-col sm:flex-row gap-4 justify-between">
            <button 
              @click="navigateToBlog"
              class="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 text-primary px-6 py-3 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200 group"
            >
              <div class="i-mdi-arrow-left w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>กลับไปยังบล็อก</span>
            </button>
            
            <button 
              @click="navigateToHome"
              class="flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
            >
              <div class="i-mdi-home w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>กลับหน้าหลัก</span>
            </button>
          </div>
        </footer>
        </article>

        <!-- Table of Contents Sidebar -->
        <aside class="hidden xl:block w-80 flex-shrink-0">
          <div class="sticky top-24">
            <div class="bg-card dark:bg-card-dark rounded-xl p-6 border border-surface-200 dark:border-surface-200-dark">
              <h3 class="text-lg font-bold text-primary dark:text-primary-dark mb-4 flex items-center gap-2">
                <div class="i-mdi-format-list-bulleted w-5 h-5" />
                สารบัญ
              </h3>
              <nav v-if="tableOfContents.length > 0" class="space-y-2">
                <button
                  v-for="heading in tableOfContents"
                  :key="heading.id"
                  @click="scrollToHeading(heading.id)"
                  :class="[
                    'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-surface-100 dark:hover:bg-surface-100-dark',
                    heading.level === 1 ? 'font-semibold text-primary dark:text-primary-dark' : '',
                    heading.level === 2 ? 'ml-4 text-secondary dark:text-secondary-dark' : '',
                    heading.level === 3 ? 'ml-8 text-secondary dark:text-secondary-dark text-xs' : ''
                  ]"
                >
                  {{ heading.text }}
                </button>
              </nav>
              <p v-else class="text-secondary dark:text-secondary-dark text-sm">
                ไม่มีหัวข้อในบทความนี้
              </p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-20 max-w-2xl mx-auto">
        <div class="w-24 h-24 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <div class="i-mdi-file-document-outline w-12 h-12 text-accent" />
        </div>
        <h2 class="text-3xl font-bold text-primary mb-4">ไม่พบบทความ</h2>
        <p class="text-secondary text-lg mb-8 leading-relaxed">
          บทความที่คุณค้นหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่<br>
          ลองตรวจสอบ URL หรือค้นหาบทความอื่นๆ
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="navigateToBlog"
            class="flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
          >
            <div class="i-mdi-post w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>ดูบทความทั้งหมด</span>
          </button>
          <button 
            @click="navigateToHome"
            class="flex items-center gap-2 bg-surface border-2 border-surface-200 dark:border-surface-700 text-primary px-6 py-3 rounded-xl hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
          >
            <div class="i-mdi-home w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>กลับหน้าหลัก</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
