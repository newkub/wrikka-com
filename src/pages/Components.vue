<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tokens from './Tokens.vue'

interface ComponentInfo {
  name: string
  description: string
  component: any
}

const components = ref<ComponentInfo[]>([
  {
    name: 'Tokens',
    description: 'Token management interface',
    component: Tokens
  }
])

const loadComponents = async () => {
  const componentFiles = import.meta.glob('../components/*.vue')

  for (const path in componentFiles) {
    const componentName = path.split('/').pop()?.replace('.vue', '') || ''
    const component = await componentFiles[path]()

    components.value.push({
      name: componentName,
      description: `${componentName} component`,
      component: component.default
    })
  }
}

onMounted(() => {
  loadComponents()
})
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