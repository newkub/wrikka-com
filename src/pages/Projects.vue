<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue'

const router = useRouter()

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online shopping platform built with Vue.js and Node.js',
    image: 'https://picsum.photos/seed/project1/400/225',
    github: 'https://github.com/username/ecommerce',
    website: 'https://demo-ecommerce.example.com',
    to: '/projects/ecommerce'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates',
    image: 'https://picsum.photos/seed/project2/400/225',
    github: 'https://github.com/username/taskapp',
    website: 'https://demo-taskapp.example.com',
    to: '/projects/taskapp'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps',
    image: 'https://picsum.photos/seed/project3/400/225',
    github: 'https://github.com/username/weather',
    website: 'https://demo-weather.example.com',
    to: '/projects/weather'
  }
]
</script>

<template>
  <div class="max-w-[var(--max-content-width)] mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">My Projects</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="project in projects"
        :key="project.title"
        v-bind="project"
        :links="[
          { label: 'GitHub', url: project.github, icon: 'i-carbon-logo-github' },
          { label: 'Website', url: project.website, icon: 'i-carbon-link' }
        ]"
        :onClick="() => router.push(project.to)"
      />
    </div>
  </div>
</template>