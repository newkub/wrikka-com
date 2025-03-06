<template>
<Tab :tabs="['Personal', 'Projects', 'Shop']" />

  <div class="min-h-screen text-white p-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card 
          v-for="plugin in plugins" 
          :key="plugin.title"
          :title="plugin.title" 
          :description="plugin.description" 
          :color="plugin.color"
        >
          <template #icon>
            <i class="text-4xl" :class="`mdi mdi-${plugin.mdiIcon}`"></i>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './components/Card.vue'
import Tab from './components/Tab.vue'

const plugins = [
  {
    title: "Vite",
    description: "Native-ESM powered web dev build tool",
    color: "yellow",
    mdiIcon: "lightning-bolt"
  },
  {
    title: "Vitest",
    description: "A blazing fast unit-test framework powered by Vite",
    color: "green",
    mdiIcon: "check"
  },
  {
    title: "vite-plugin-inspect",
    description: "Inspect the intermediate state of Vite plugins",
    color: "blue",
    mdiIcon: "magnify"
  },
  {
    title: "vite-plugin-pwa",
    description: "Zero-config PWA for Vite",
    color: "gray",
    mdiIcon: "infinity"
  },
  {
    title: "vite-ssg",
    description: "Server-side generation for Vite",
    color: "gray",
    mdiIcon: "view-grid"
  },
  {
    title: "vite-plugin-optimize-persist",
    description: "Persist dynamically analyzed dependencies optimization",
    color: "purple",
    mdiIcon: "cube-outline"
  },
  {
    title: "vite-plugin-package-config",
    description: "Extend Vite config from your package.json 'vite' field",
    color: "amber",
    mdiIcon: "cube"
  },
  {
    title: "vite-plugin-vue-server-ref",
    description: "Share state between clients and Vite server",
    color: "indigo",
    mdiIcon: "view-grid-plus"
  },
  {
    title: "vite-plugin-remote-assets",
    description: "Bundles your assets from remote urls with your app",
    color: "red",
    mdiIcon: "download"
  },
  {
    title: "vite-plugin-psvg",
    description: "Programmable SVG for Vite",
    color: "pink",
    mdiIcon: "import"
  },
  {
    title: "Vite for VS Code",
    description: "Take one step faster for Vite in VS Code",
    color: "yellow",
    mdiIcon: "lightning-bolt"
  },
  {
    title: "Awesome Vite",
    description: "A curated list of awesome things related to Vite.js",
    color: "cyan",
    mdiIcon: "account"
  }
]
</script>