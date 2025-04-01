<script setup lang="ts">
import { ref, computed } from 'vue'
import config from '../../uno.config.ts'

const theme = ref(config.theme)

// Computed properties for each token type
const colorTokens = computed(() => {
  return Object.entries(theme.value.colors).map(([category, values]) => {
    const groups = Object.keys(values)
    return {
      name: category,
      colors: values,
      groups
    }
  })
})

const containerTokens = computed(() => {
  return Object.entries(theme.value.container).map(([key, value]) => ({
    name: key,
    value
  }))
})

const breakpointTokens = computed(() => {
  return Object.entries(theme.value.breakpoints).map(([key, value]) => ({
    name: key,
    value
  }))
})

// Function to copy token value to clipboard
const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Function to format token value for display
const formatTokenValue = (value: any): string => {
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}
</script>

<template>
  <div class="max-w-[var(--max-content-width)] mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Design Tokens</h1>
    
    <div class="space-y-12">
      <!-- Colors Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold">Colors</h2>
        <div class="grid gap-8">
          <div v-for="category in colorTokens" :key="category.name" class="space-y-4">
            <h3 class="text-xl font-medium capitalize">{{ category.name }}</h3>
            <div class="grid gap-6">
              <div v-for="group in category.groups" :key="group" class="space-y-2">
                <h4 class="text-lg capitalize">{{ group }}</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div 
                    v-for="mode in ['light', 'dark']" 
                    :key="mode"
                    class="space-y-2 group"
                  >
                    <div 
                      class="h-16 rounded-lg transition-transform cursor-pointer group-hover:scale-105"
                      :style="{ backgroundColor: category.colors[group][mode] }"
                      @click="copyToClipboard(category.colors[group][mode])"
                    ></div>
                    <div class="flex justify-between items-center text-sm">
                      <span class="capitalize">{{ mode }}</span>
                      <code 
                        class="cursor-pointer hover:bg-primary-color/10"
                        @click="copyToClipboard(category.colors[group][mode])"
                      >
                        {{ category.colors[group][mode] }}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Container Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold">Container</h2>
        <div class="grid gap-4">
          <div 
            v-for="token in containerTokens" 
            :key="token.name"
            class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center group hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            @click="copyToClipboard(formatTokenValue(token.value))"
          >
            <span class="font-medium capitalize">{{ token.name }}</span>
            <code class="group-hover:bg-primary-color/10">{{ formatTokenValue(token.value) }}</code>
          </div>
        </div>
      </section>

      <!-- Breakpoints Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold">Breakpoints</h2>
        <div class="grid gap-4">
          <div 
            v-for="token in breakpointTokens" 
            :key="token.name"
            class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center group hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            @click="copyToClipboard(token.value)"
          >
            <span class="font-medium">{{ token.name }}</span>
            <code class="group-hover:bg-primary-color/10">{{ token.value }}</code>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  transition: all 0.2s;
}

.dark code {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Add a subtle animation for copy feedback */
@keyframes copy-feedback {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.copied {
  animation: copy-feedback 0.3s ease-in-out;
}
</style>