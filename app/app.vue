<template>
  <div class="min-h-screen bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark transition-colors duration-300">
    <Nav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

// Initialize dark mode with default to dark
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'wrikka-theme',
  initialValue: 'dark'
})

// Apply theme immediately to prevent flash
if (process.client) {
  const stored = localStorage.getItem('wrikka-theme')
  if (stored) {
    document.documentElement.classList.toggle('dark', stored === 'dark')
  } else {
    // Default to dark mode
    document.documentElement.classList.add('dark')
    localStorage.setItem('wrikka-theme', 'dark')
  }
}

// Provide global access to theme toggle
provide('toggleTheme', () => {
  isDark.value = !isDark.value
})
</script>
