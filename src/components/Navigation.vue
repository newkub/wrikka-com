<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const routes = [
  { name: 'Personal', path: '/', icon: 'i-carbon-user', color: 'text-blue-500' },
  { name: 'Projects', path: '/projects', icon: 'i-carbon-code', color: 'text-green-500' },
  { name: 'Shop', path: '/shop', icon: 'i-carbon-shopping-cart', color: 'text-purple-500' },
  { name: 'Blog', path: '/blog', icon: 'i-carbon-blog', color: 'text-orange-500' },
  { name: 'Components', path: '/components', icon: 'i-carbon-cube', color: 'text-pink-500' },
]
</script>

<template>
  <nav class="sticky top-0 bg-background-color/100 z-50 mb-12">
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