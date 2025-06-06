<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold text-primary mb-8 text-center">อัพเดทข่าวสาร</h1>
    <div class="space-y-8 relative">
      <div 
        v-for="(item, index) in changelogItems" 
        :key="index" 
        class="relative pl-10 border-l-4 border-primary/20 hover:border-primary/40 transition-colors duration-300 group timeline-item"
      >
        <div class="absolute left-0 w-6 h-6 -ml-[14px] rounded-full bg-primary border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 class="text-2xl font-bold text-primary">{{ item.version }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {{ formatDate(item.date) }}
            </span>
          </div>
          <ul class="space-y-2">
            <li 
              v-for="(change, i) in item.changes" 
              :key="i"
              class="flex items-start"
            >
              <div class="text-primary mr-2 mt-1">
                <div class="i-mdi-check-circle text-lg"></div>
              </div>
              <span class="text-gray-700 dark:text-gray-300">{{ change }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const changelogItems = ref([
  {
    version: "v1.0.0",
    date: "2025-06-01",
    changes: ["เปิดตัวเว็บไซต์ครั้งแรก", "เพิ่มระบบแสดงข่าวสาร", "เพิ่มระบบแสดงบล็อก"],
  },
  {
    version: "v0.5.0",
    date: "2025-05-15",
    changes: ["พัฒนาระบบหลังบ้าน", "ออกแบบ UI เริ่มต้น"],
  },
  {
    version: "v0.1.0",
    date: "2025-05-01",
    changes: ["เริ่มต้นโปรเจค", "ตั้งค่าโครงสร้างพื้นฐาน"],
  },
]);

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Bangkok'
  };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};
</script>

<style scoped>
.timeline-item {
  opacity: 0;
  animation: fade-in-up 0.5s ease-out forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>