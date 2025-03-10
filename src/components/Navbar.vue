<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const routes = [
  { name: 'Personal', path: '/', icon: 'i-carbon-user', color: 'text-blue-700 dark:text-blue-300' },
  { name: 'Projects', path: '/projects', icon: 'i-carbon-code', color: 'text-green-700 dark:text-green-300' },
  { name: 'Shop', path: '/shop', icon: 'i-carbon-shopping-cart', color: 'text-purple-700 dark:text-purple-300' },
  { name: 'Blog', path: '/blog', icon: 'i-carbon-blog', color: 'text-orange-700 dark:text-orange-300' },
  { name: 'Design', path: '/design', icon: 'i-carbon-cube', color: 'text-pink-700 dark:text-pink-300' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 w-full shadow-sm backdrop-blur-sm">
    <div class="max-w-[var(--max-content-width)] mx-auto px-4">
      <div class="flex items-center justify-center py-3">
        <div class="flex gap-8 items-center">
          <router-link
            v-for="route in routes"
            :key="route.name"
            :to="route.path"
            :class="[
              'nav-link flex items-center gap-2 transition-colors hover:opacity-80',
              route.color
            ]"
          >
            <div :class="route.icon" />
            {{ route.name }}
          </router-link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Styles moved to UnoCSS utility classes in the template */
</style>