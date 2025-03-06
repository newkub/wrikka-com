<template>
  <div class="flex justify-center space-x-6 mb-8 border-b border-gray-700 tab-container">
    <button 
      v-for="tab in tabs"
      :key="tab.id"
      @click="handleTabClick(tab)"
      class="px-4 py-2 font-medium hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition-all tab-button"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Tab {
  id: string
  label: string
  route: string
}

const router = useRouter()

const tabs: Tab[] = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'about', label: 'About', route: '/about' },
  { id: 'contact', label: 'Contact', route: '/contact' }
]

const handleTabClick = (tab: Tab) => {
  router.push(tab.route)
}
</script>

<style scoped>
.tab-container {
  display: flex;
  gap: 1rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.tab-button:hover {
  background-color: #f0f0f0;
}
</style>
