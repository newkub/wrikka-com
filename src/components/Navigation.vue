<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const routes = [
  { name: 'Personal', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Shop', path: '/shop' },
  { name: 'Blog', path: '/blog' },
]
</script>

<template>
  <nav class="mb-8 border-b dark:border-gray-700">
    <div class="container flex items-center justify-between py-4">
      <div class="flex gap-6">
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          class="text-gray-600 hover:text-primary-color dark:text-gray-300 transition-colors"
          active-class="text-primary-color font-bold"
        >
          {{ route.name }}
        </router-link>
      </div>
      <ThemeToggle />
    </div>
  </nav>
</template>