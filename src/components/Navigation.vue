<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const routes = [
  { name: 'Personal', path: '/', icon: 'i-carbon-user' },
  { name: 'Projects', path: '/projects', icon: 'i-carbon-code' },
  { name: 'Shop', path: '/shop', icon: 'i-carbon-shopping-cart' },
  { name: 'Blog', path: '/blog', icon: 'i-carbon-blog' },
  { name: 'Components', path: '/components', icon: 'i-carbon-cube' },
]
</script>

<template>
  <nav class="sticky top-0 bg-background-color border-b border-gray-100 dark:border-gray-800 z-50 mb-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex items-center justify-center py-6">
        <div class="flex gap-8 items-center">
          <router-link
            v-for="route in routes"
            :key="route.name"
            :to="route.path"
            class="nav-link flex items-center gap-2 text-gray-600 hover:text-primary-color dark:text-gray-300 transition-all"
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