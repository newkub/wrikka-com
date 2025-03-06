<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const routes = [
  { name: 'Personal', path: '/', icon: 'i-carbon-user' },
  { name: 'Projects', path: '/projects', icon: 'i-carbon-code' },
  { name: 'Shop', path: '/shop', icon: 'i-carbon-shopping-cart' },
  { name: 'Blog', path: '/blog', icon: 'i-carbon-blog' },
]
</script>

<template>
  <nav class="mt-4 mb-8">
    <div class="container flex items-center justify-center py-4">
      <div class="flex gap-8 items-center">
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          class="flex items-center gap-2 text-gray-600 hover:text-primary-color dark:text-gray-300 transition-colors"
          active-class="text-primary-color font-bold"
        >
          <div :class="route.icon" />
          {{ route.name }}
        </router-link>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>