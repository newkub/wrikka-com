<script setup lang="ts">
import { useDark } from '@vueuse/core'

const navItems = [
  { name: 'Learn', icon: 'i-mdi-book-open-variant' },
  { name: 'Projects', icon: 'i-mdi-folder-multiple' },
  { name: 'Blog', icon: 'i-mdi-post' }
]

const toggleDark = useDark({ 
  selector: 'html', 
  attribute: 'class', 
  valueDark: 'dark', 
  valueLight: 'light' 
})
</script>

<template>
  <div>
    <!-- Navigation Menu -->
    <nav class="bg-surface shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 flex items-center">
        <!-- Left Space -->
        <div class="flex-1"></div>
        
        <!-- Center Menu -->
        <div class="flex space-x-6 justify-center">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.name" 
            :to="'/' + item.name.toLowerCase()"
            class="flex items-center gap-2 text-primary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <div :class="item.icon + ' w-5 h-5'" />
            {{ item.name }}
          </NuxtLink>
        </div>
        
        <!-- Right Section -->
        <div class="flex-1 flex justify-end items-center gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="toggleDark()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <div class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent w-5 h-5" />
          </button>
          
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-blue-400 transition-colors">
              <div class="i-mdi-twitter w-5 h-5" />
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">
              <div class="i-mdi-facebook w-5 h-5" />
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-700 transition-colors">
              <div class="i-mdi-github w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold mb-8 text-center text-primary">My Projects</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="i in 8" :key="i"
          class="bg-surface rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <img 
            :src="`https://picsum.photos/seed/${i}/300/200`" 
            alt="Project cover"
            class="w-full h-40 object-cover rounded mb-3"
            loading="lazy"
          >
          <h3 class="text-lg font-semibold text-primary">Project {{ i }}</h3>
          <p class="text-secondary mt-2">Description for project {{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>