<template>
  <div class="min-h-screen" :class="{ 'dark': isDark }">
    <button 
      @click="toggle()"
      class="fixed bottom-4 right-4 p-2 rounded-full bg-surface shadow-lg z-50"
      aria-label="Toggle dark mode"
    >
      <div class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent w-6 h-6" />
    </button>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
const toggle = useDark({ selector: 'html', attribute: 'class', valueDark: 'dark', valueLight: 'light' })
</script>

<style>
.dark {
  color-scheme: dark;
}
</style>
