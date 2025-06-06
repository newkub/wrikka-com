
<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold text-primary mb-8 text-center">ข่าวสาร</h1>
    
    <div class="grid grid-cols-4 gap-8">
      <!-- ด้านซ้าย 1/4 -->
      <div class="col-span-1">
        <div class="sticky top-8">
          <h2 class="text-xl font-semibold text-text mb-4">หมวดหมู่</h2>
          <ul class="space-y-2">
            <li 
              v-for="(category, i) in categories" 
              :key="i"
              class="flex items-center text-text hover:text-primary cursor-pointer"
            >
              <div class="i-mdi-circle-small text-lg mr-2"></div>
              {{ category }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ด้านขวา 3/4 -->
      <div class="col-span-3 space-y-8 relative">
        <div 
          v-for="(news, index) in newsList" 
          :key="index"
          class="relative pl-10 border-l-4 border-primary/20 hover:border-primary/40 transition-colors duration-300 group opacity-0 animate-fade-in-up"
          :style="`animation-delay: ${0.1 + (index * 0.1)}s`"
        >
          <div class="absolute left-0 w-6 h-6 -ml-[14px] rounded-full bg-primary border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300"></div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="flex flex-col md:flex-row gap-6 items-start">
              <div class="md:w-1/3">
                <img 
                  :src="news.image" 
                  :alt="news.title"
                  class="w-full h-auto rounded-lg"
                />
              </div>
              <div class="md:w-2/3">
                <h2 class="text-2xl font-bold text-primary mb-2">{{ news.title }}</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-4">{{ formatDate(news.date) }}</p>
                <ul class="space-y-2">
                  <li 
                    v-for="(detail, i) in news.details" 
                    :key="i"
                    class="flex items-start"
                  >
                    <div class="text-primary mr-2 mt-1">
                      <div class="i-mdi-check-circle text-lg"></div>
                    </div>
                    <span class="text-text">{{ detail }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  'ข่าวทั้งหมด',
  'ข่าวสารบริษัท',
  'อัพเดทระบบ',
  'กิจกรรม'
])

const newsList = ref([
  {
    title: 'อัพเดทระบบเวอร์ชัน 1.0.0',
    date: '2025-06-01',
    image: 'https://via.placeholder.com/400x300',
    details: [
      'เปิดตัวเว็บไซต์อย่างเป็นทางการ',
      'เพิ่มระบบจัดการเนื้อหาใหม่',
      'อัพเกรดประสิทธิภาพระบบ'
    ]
  },
  {
    title: 'กิจกรรมเดือนมิถุนายน',
    date: '2025-05-25',
    image: 'https://via.placeholder.com/400x300',
    details: [
      'Workshop การใช้งานระบบ',
      'พบปะทีมพัฒนาทุกวันศุกร์',
      'รับฟังความคิดเห็นผู้ใช้'
    ]
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