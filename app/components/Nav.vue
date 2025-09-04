<script setup lang="ts">
import { useDark } from '@vueuse/core'

interface MenuItem {
  name: string
  icon: string
  path: string
  color: string
  bgColor: string
}

const menuItems: MenuItem[] = [
  { 
    name: 'Learn', 
    icon: 'i-mdi-book-open-variant', 
    path: '/learn',
    color: 'text-menu-learn',
    bgColor: 'hover:bg-menu-learn/10 border-menu-learn/20'
  },
  { 
    name: 'Blog', 
    icon: 'i-mdi-post', 
    path: '/blog',
    color: 'text-menu-blog',
    bgColor: 'hover:bg-menu-blog/10 border-menu-blog/20'
  },
  { 
    name: 'Project', 
    icon: 'i-mdi-folder-multiple', 
    path: '/projects',
    color: 'text-menu-project',
    bgColor: 'hover:bg-menu-project/10 border-menu-project/20'
  }
]

const toggleDark = useDark({ 
  selector: 'html', 
  attribute: 'class', 
  valueDark: 'dark', 
  valueLight: 'light',
  storageKey: 'wrikka-theme'
})

const navigateToSection = (path: string) => {
  navigateTo(path)
}

const navigateToHome = () => {
  navigateTo('/')
}
</script>

<template>
  <nav class="bg-card dark:bg-card-dark shadow-lg sticky top-0 z-50 border-b border-surface-200 dark:border-surface-200-dark backdrop-blur-md">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <button @click="navigateToHome" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-gradient-to-r from-accent dark:from-accent-dark to-menu-project rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <div class="i-mdi-code-tags w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-primary dark:text-primary-dark">Wrikka</h1>
            <p class="text-xs text-secondary dark:text-secondary-dark">Developer & Creator</p>
          </div>
        </button>
        
        <!-- Center Menu -->
        <div class="hidden md:flex space-x-2">
          <button
            v-for="item in menuItems" 
            :key="item.name" 
            @click="navigateToSection(item.path)"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border group',
              item.color,
              item.bgColor,
              'border-surface-200 dark:border-surface-200-dark'
            ]"
          >
            <div :class="[item.icon, 'w-5 h-5 group-hover:scale-110 transition-transform']" />
            {{ item.name }}
          </button>
        </div>
        
        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <!-- Stats (Hidden on mobile) -->
          <div class="hidden lg:flex items-center gap-6 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold text-accent dark:text-accent-dark">5+</div>
              <div class="text-secondary dark:text-secondary-dark text-xs">ปี ประสบการณ์</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-menu-learn">20+</div>
              <div class="text-secondary dark:text-secondary-dark text-xs">โปรเจกต์</div>
            </div>
          </div>

          <!-- Divider -->
          <div class="hidden lg:block w-px h-8 bg-surface-200 dark:bg-surface-200-dark"></div>

          <!-- Social Icons -->
          <div class="hidden sm:flex items-center gap-2">
            <a 
              href="#" 
              class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-100-dark transition-all duration-200 group"
            >
              <div class="i-mdi-github w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors" />
            </a>
            <a 
              href="#" 
              class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-100-dark transition-all duration-200 group"
            >
              <div class="i-mdi-twitter w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-blue-400 transition-colors" />
            </a>
            <a 
              href="#" 
              class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-100-dark transition-all duration-200 group"
            >
              <div class="i-mdi-linkedin w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-blue-600 transition-colors" />
            </a>
          </div>

          <!-- Theme Toggle -->
          <button 
            @click="toggleDark = !toggleDark"
            class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-100-dark transition-all duration-200 group"
            aria-label="Toggle dark mode"
          >
            <div class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-accent dark:group-hover:text-accent-dark group-hover:scale-110 transition-all" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="md:hidden mt-4 pt-4 border-t border-surface-200 dark:border-surface-200-dark">
        <div class="flex justify-center gap-2 mb-4">
          <button
            v-for="item in menuItems" 
            :key="item.name" 
            @click="navigateToSection(item.path)"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              item.color,
              item.bgColor
            ]"
          >
            <div :class="[item.icon, 'w-4 h-4']" />
            {{ item.name }}
          </button>
        </div>
        
        <!-- Mobile Stats -->
        <div class="flex justify-center gap-8 text-sm">
          <div class="text-center">
            <div class="text-lg font-bold text-accent dark:text-accent-dark">5+</div>
            <div class="text-secondary dark:text-secondary-dark text-xs">ปี ประสบการณ์</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-menu-learn">20+</div>
            <div class="text-secondary dark:text-secondary-dark text-xs">โปรเจกต์</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
