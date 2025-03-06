<script setup lang="ts">
const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online shopping platform built with Vue.js and Node.js',
    image: 'https://picsum.photos/seed/project1/400/400',
    github: 'https://github.com/username/ecommerce',
    website: 'https://demo-ecommerce.example.com'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates',
    image: 'https://picsum.photos/seed/project2/400/400',
    github: 'https://github.com/username/taskapp',
    website: 'https://demo-taskapp.example.com'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps',
    image: 'https://picsum.photos/seed/project3/400/400',
    github: 'https://github.com/username/weather',
    website: 'https://demo-weather.example.com'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">My Projects</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a v-for="project in projects" 
         :key="project.title"
         :href="project.website"
         target="_blank"
         rel="noopener noreferrer"
         class="block bg-card-bg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <img :src="project.image" :alt="project.title" class="w-full aspect-square object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">{{ project.description }}</p>
          <div class="flex gap-4">
            <a :href="project.github" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-1 text-sm text-primary-color hover:text-hover-color transition-colors">
              <div class="i-carbon-logo-github" />
              GitHub
            </a>
            <a :href="project.website" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-1 text-sm text-primary-color hover:text-hover-color transition-colors">
              <div class="i-carbon-link" />
              Website
            </a>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>