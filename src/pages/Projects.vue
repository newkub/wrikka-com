<script setup lang="ts">
const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online shopping platform built with Vue.js and Node.js',
    image: 'https://picsum.photos/seed/project1/400/250',
    link: 'https://github.com/username/ecommerce'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates',
    image: 'https://picsum.photos/seed/project2/400/250',
    link: 'https://github.com/username/taskapp'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps',
    image: 'https://picsum.photos/seed/project3/400/250',
    link: 'https://github.com/username/weather'
  },
  {
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media performance',
    image: 'https://picsum.photos/seed/project4/400/250',
    link: 'https://github.com/username/analytics'
  },
  {
    title: 'Fitness Tracker',
    description: 'Personal fitness tracking application with goal setting',
    image: 'https://picsum.photos/seed/project5/400/250',
    link: 'https://github.com/username/fitness'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 px-4">
    <h1 class="text-3xl font-bold">My Projects</h1>
    <div class="grid gap-6">
      <a v-for="project in projects" 
         :key="project.title" 
         :href="project.link"
         target="_blank"
         class="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <div class="flex flex-col md:flex-row">
          <img :src="project.image" :alt="project.title" class="w-full md:w-48 h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ project.description }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>