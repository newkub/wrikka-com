<template>
  <div class="container mx-auto px-4 py-12 max-w-7xl">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-primary mb-3">บทความน่าสนใจ</h1>
      <p class="text-lg text-text max-w-2xl mx-auto">ค้นพบบทความล่าสุดเกี่ยวกับเทคโนโลยีและแนวทางการพัฒนาเว็บไซต์</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <article 
        v-for="(blog, index) in blogs" 
        :key="index"
        class="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="relative h-60 overflow-hidden">
          <img 
            :src="blog.image" 
            :alt="blog.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span class="absolute top-4 right-4 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
            {{ blog.category }}
          </span>
        </div>
        
        <div class="p-6">
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div class="i-mdi-calendar-clock mr-2 text-primary"></div>
            {{ formatDate(blog.date) }}
          </div>
          
          <h2 class="text-xl font-bold text-primary mb-3 leading-snug">
            {{ blog.title }}
          </h2>
          
          <p class="text-text mb-4 line-clamp-2">
            {{ blog.excerpt }}
          </p>
          
          <div class="flex items-center text-primary font-medium">
            <span class="mr-2 group-hover:mr-3 transition-all duration-300">อ่านต่อ</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform duration-300"></div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const blogs = ref([
  {
    title: 'เทคนิคการออกแบบเว็บสมัยใหม่ด้วย Vue 3',
    date: '2025-06-05',
    excerpt: 'เรียนรู้วิธีการสร้างเว็บแอปพลิเคชันที่ทันสมัยด้วย Composition API และเครื่องมือใหม่ล่าสุด',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'VueJS'
  },
  {
    title: 'การสร้าง Animation ที่น่าสนใจด้วย CSS',
    date: '2025-05-28',
    excerpt: 'เทคนิคการสร้างมิติให้กับเว็บไซต์ด้วย animation และ transition ที่น่าสนใจ',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'CSS'
  },
  {
    title: 'TypeScript สำหรับนักพัฒนาเว็บ',
    date: '2025-05-20',
    excerpt: 'เริ่มต้นใช้งาน TypeScript ในการพัฒนาเว็บแอปพลิเคชันอย่างมีประสิทธิภาพ',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'TypeScript'
  },
  {
    title: 'การปรับปรุง SEO ให้เว็บ Vue.js',
    date: '2025-05-15',
    excerpt: 'กลยุทธ์การทำ SEO สำหรับเว็บแอปพลิเคชันที่สร้างด้วย Vue.js และ Nuxt.js',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'SEO'
  }
])

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Bangkok'
  }
  return new Date(dateString).toLocaleDateString('th-TH', options)
}
</script>

<style scoped>
/* Using UnoCSS utility classes instead of custom CSS */
</style>