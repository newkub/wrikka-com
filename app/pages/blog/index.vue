<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useBlogPosts } from '~/composables/useBlogPosts'

interface MenuItem {
  name: string
  icon: string
  path: string
  color: string
  bgColor: string
}

const menuItems: MenuItem[] = [
  { 
    name: 'Learn', 
    icon: 'i-mdi-book-open-variant', 
    path: '/learn',
    color: 'text-menu-learn',
    bgColor: 'hover:bg-menu-learn/10 border-menu-learn/20'
  },
  { 
    name: 'Blog', 
    icon: 'i-mdi-post', 
    path: '/blog',
    color: 'text-menu-blog',
    bgColor: 'hover:bg-menu-blog/10 border-menu-blog/20'
  },
  { 
    name: 'Project', 
    icon: 'i-mdi-folder-multiple', 
    path: '/projects',
    color: 'text-menu-project',
    bgColor: 'hover:bg-menu-project/10 border-menu-project/20'
  }
]

const toggleDark = useDark({ 
  selector: 'html', 
  attribute: 'class', 
  valueDark: 'dark', 
  valueLight: 'light',
  storageKey: 'wrikka-theme'
})

// Blog functionality
const { posts, loading, error, loadPosts } = useBlogPosts()

// Load posts on mount
onMounted(async () => {
  await loadPosts()
})

// Navigation functions
const navigateToBlogPost = (slug: string) => {
  navigateTo(`/blog/${slug}`)
}

const navigateToSection = (path: string) => {
  navigateTo(path)
}

// Format date function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO Meta
useHead({
  title: 'Blog | Wrikka',
  meta: [
    { name: 'description', content: 'บทความและความรู้เกี่ยวกับการพัฒนาเว็บไซต์และแอปพลิเคชัน' },
    { property: 'og:title', content: 'Blog | Wrikka' },
    { property: 'og:description', content: 'บทความและความรู้เกี่ยวกับการพัฒนาเว็บไซต์และแอปพลิเคชัน' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-surface dark:bg-surface-dark pt-4">
    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-primary dark:text-primary-dark">Blog</h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="i-mdi-loading animate-spin w-8 h-8 text-accent dark:text-accent-dark"></div>
        <span class="ml-2 text-secondary dark:text-secondary-dark">กำลังโหลดบทความ...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
        <strong class="font-bold">เกิดข้อผิดพลาด!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Blog Posts Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <article 
          v-for="post in posts" 
          :key="post.id"
          @click="navigateToBlogPost(post.slug)"
          class="bg-card dark:bg-card-dark rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-surface-200 dark:border-surface-200-dark overflow-hidden group hover:scale-105"
        >
          <!-- Blog Image - 16:9 Aspect Ratio -->
          <div class="relative w-full overflow-hidden bg-gradient-to-r from-accent/20 to-menu-blog/20" style="aspect-ratio: 16/9;">
            <img 
              v-if="post.image"
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <div class="i-mdi-post w-16 h-16 text-accent/60 dark:text-accent-dark/60 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            
            <!-- Category Badge -->
            <div v-if="post.category" class="absolute top-3 left-3">
              <span class="bg-menu-blog text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                {{ post.category }}
              </span>
            </div>

            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>

          <!-- Blog Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-3 line-clamp-2 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors leading-tight">
              {{ post.title }}
            </h3>

            <!-- Meta Information -->
            <div class="flex items-center justify-between text-sm text-secondary dark:text-secondary-dark mb-4">
              <span class="flex items-center gap-1">
                <div class="i-mdi-calendar w-4 h-4"></div>
                {{ formatDate(post.date) }}
              </span>
              
              <span class="flex items-center gap-1">
                <div class="i-mdi-clock-outline w-4 h-4"></div>
                {{ post.readingTime }} นาที
              </span>
            </div>

            <!-- Tags -->
            <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark px-3 py-1 rounded-full text-xs font-medium"
              >
                #{{ tag }}
              </span>
              <span v-if="post.tags.length > 3" class="text-secondary dark:text-secondary-dark text-xs py-1">
                +{{ post.tags.length - 3 }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && posts.length === 0" class="text-center py-12">
        <div class="i-mdi-post-outline w-16 h-16 text-secondary dark:text-secondary-dark mx-auto mb-4"></div>
        <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-2">ยังไม่มีบทความ</h3>
        <p class="text-secondary dark:text-secondary-dark">กำลังเตรียมเนื้อหาสำหรับคุณ</p>
      </div>
    </div>
  </div>
</template>