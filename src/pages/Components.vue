<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import HelloWorld from '../components/HelloWorld.vue'

const components = [
  {
    name: 'Navigation',
    description: 'Main navigation component with theme toggle',
    component: Navigation
  },
  {
    name: 'ThemeToggle',
    description: 'Dark/Light mode toggle button',
    component: ThemeToggle
  },
  {
    name: 'HelloWorld',
    description: 'Example component with counter',
    component: HelloWorld
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Components</h1>
    
    <div class="grid gap-12">
      <div v-for="comp in components" 
           :key="comp.name"
           class="bg-card-bg rounded-lg p-6">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">{{ comp.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ comp.description }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <component :is="comp.component" msg="Hello Vue 3 + TypeScript + Vite" />
        </div>
      </div>
    </div>
  </div>
</template>