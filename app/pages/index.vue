<script setup lang="ts">
// SEO Meta
useHead({
  title: 'Wrikka | Full-Stack Developer',
  meta: [
    { name: 'description', content: 'Full-Stack Developer ที่หลงใหลในการสร้างสรรค์เว็บไซต์และแอปพลิเคชัน' },
    { property: 'og:title', content: 'Wrikka | Full-Stack Developer' },
    { property: 'og:description', content: 'Full-Stack Developer ที่หลงใหลในการสร้างสรรค์เว็บไซต์และแอปพลิเคชัน' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-surface dark:bg-surface-dark flex flex-col justify-center items-center relative overflow-hidden pt-20">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-5 dark:opacity-10">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-menu-learn rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-3/4 left-1/2 w-64 h-64 bg-menu-project rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 w-full max-w-4xl mx-auto px-6 py-8">
      <!-- Profile Section -->
      <div class="text-center mb-12">
        <!-- Avatar -->
        <div class="w-32 h-32 mx-auto mb-6 relative">
          <div class="w-full h-full bg-gradient-to-br from-accent to-menu-project rounded-full p-1 shadow-2xl">
            <div class="w-full h-full bg-surface dark:bg-surface-dark rounded-full flex items-center justify-center">
              <div class="i-mdi-account w-16 h-16 text-accent dark:text-accent-dark" />
            </div>
          </div>
          <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-surface dark:border-surface-dark"></div>
        </div>

        <!-- Name & Title -->
        <h1 class="text-4xl md:text-5xl font-bold text-primary dark:text-primary-dark mb-3">
          Wrikka
        </h1>
        <p class="text-xl text-secondary dark:text-secondary-dark mb-6">
          Full-Stack Developer & Creator
        </p>

        <!-- Brief Description -->
        <p class="text-lg text-secondary dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed mb-12">
          หลงใหลในการสร้างสรรค์เว็บไซต์และแอปพลิเคชันที่สวยงาม ใช้งานง่าย และตอบโจทย์ผู้ใช้งาน
        </p>
      </div>

      <!-- Skills & Tech Stack -->
      <div class="text-center">
        <h3 class="text-lg font-semibold text-primary dark:text-primary-dark mb-6">Tech Stack</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="tech in ['Vue.js', 'Nuxt.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']"
            :key="tech"
            class="px-4 py-2 bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark rounded-full text-sm font-medium border border-surface-200 dark:border-surface-200-dark hover:border-accent dark:hover:border-accent-dark transition-colors"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>