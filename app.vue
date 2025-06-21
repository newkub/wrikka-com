<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'

interface Project {
  id: number
  title: string
  description: string
  image: string
  github?: string
  npm?: string
  website?: string
  stackblitz?: string
}

// Helper function to get the first available link
const getProjectLink = (project: Project) => {
  return project.website || project.github || project.stackblitz || project.npm || '#'
}

const colorMode = useColorMode()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
const projects = ref<Project[]>([
  {
    id: 1,
    title: '@packages/ai',
    description: 'AI utilities and tools for Wrikka projects',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80',
    github: 'https://github.com/wrikka/packages/tree/main/packages/ai',
    npm: 'https://npmjs.com/package/@wrikka/ai'
  },
  {
    id: 2,
    title: '@packages/ui',
    description: 'Component library for Wrikka projects',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    github: 'https://github.com/wrikka/packages/tree/main/packages/ui',
    npm: 'https://npmjs.com/package/@wrikka/ui',
    website: 'https://ui.wrikka.com'
  },
  {
    id: 3,
    title: 'learn.wrikka.com',
    description: 'Learning platform and documentation',
    image: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: 'https://github.com/wrikka/learn',
    website: 'https://learn.wrikka.com'
  },
  {
    id: 4,
    title: '@cli/git',
    description: 'Git utilities for CLI',
    image: 'https://images.unsplash.com/photo-1562907550-096d3bf9b25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: 'https://github.com/wrikka/cli/tree/main/packages/git',
    npm: 'https://npmjs.com/package/@wrikka/cli-git'
  },
  {
    id: 5,
    title: '@cli/ai',
    description: 'AI-powered CLI tools',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: 'https://github.com/wrikka/cli/tree/main/packages/ai',
    npm: 'https://npmjs.com/package/@wrikka/cli-ai',
    stackblitz: 'https://stackblitz.com/github/wrikka/cli/tree/main/packages/ai'
  },
  {
    id: 6,
    title: '@cli/file',
    description: 'File system utilities for CLI',
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: 'https://github.com/wrikka/cli/tree/main/packages/file',
    npm: 'https://npmjs.com/package/@wrikka/cli-file',
    stackblitz: 'https://stackblitz.com/github/wrikka/cli/tree/main/packages/file'
  },
  {
    id: 7,
    title: 'Wrikka Website',
    description: 'Official company website',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: 'https://github.com/wrikka/website',
    website: 'https://wrikka.com',
    stackblitz: 'https://stackblitz.com/github/wrikka/website'
  }
])

const socialLinks = {
  github: 'https://github.com/wrikka',
  facebook: 'https://facebook.com/wrikka',
  twitter: 'https://twitter.com/wrikka',
  stackblitz: 'https://stackblitz.com/@wrikka',
  website: 'https://wrikka.com'
}

function toggleDark() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#181a20] transition-colors duration-300">
    <Transition name="fade" mode="out-in">
      <div v-if="isMounted" class="animate-fade-in">
    <header class="p-4 flex justify-center items-center gap-6">
      <!-- GitHub - สีเทาเข้ม -->
      <a :href="socialLinks.github" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
        <div class="i-mdi-github w-6 h-6" />
      </a>
      
      <!-- Facebook - สีฟ้า Facebook -->
      <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-[#1877F2] dark:text-slate-400 dark:hover:text-[#4599FF] transition-colors">
        <div class="i-mdi-facebook w-6 h-6" />
      </a>
      
      <!-- Twitter (X) - สีดำ/ขาว -->
      <a :href="socialLinks.twitter" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
        <div class="i-mdi-twitter w-6 h-6" />
      </a>
      
      <!-- StackBlitz - สีน้ำเงิน -->
      <a :href="socialLinks.stackblitz" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-[#1389FD] dark:text-slate-400 dark:hover:text-[#4DA8FF] transition-colors">
        <div class="w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 368" class="w-5 h-5">
            <path fill="currentColor" d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"/>
          </svg>
        </div>
      </a>
      
      <!-- Website - สีฟ้าเว็บไซต์ -->
      <a :href="socialLinks.website" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
        <div class="i-mdi-web w-6 h-6" />
      </a>

      <button 
        @click="toggleDark"
        class="text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors w-8 h-8 flex items-center justify-center hover:cursor-pointer"
        aria-label="Toggle dark mode"
      >
        <div class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent w-6 h-6" />
      </button>
    </header>

    <main class="container mx-auto  max-w-7xl">
      <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-slate-100 text-center">My Projects</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        <a 
          v-for="project in projects" 
          :key="project.id" 
          :href="getProjectLink(project)"
          target="_blank"
          rel="noopener noreferrer"
          class="group block project-card"
        >
          <div class="bg-white dark:bg-[#1e2329] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 h-full flex flex-col">
            <!-- ใช้ h-full และ flex flex-col เพื่อให้การ์ดขยายความสูงเท่ากัน -->
            <!-- Project Image -->
            <div class="relative pt-[56.25%] overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <!-- Project Content -->
            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ project.title }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex-1">{{ project.description }}</p>
              
              <!-- Project Links -->
              <div class="flex gap-2 mt-3">
                <a v-if="project.github" :href="project.github" target="_blank" 
                   class="text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                   title="GitHub">
                  <div class="i-mdi-github w-5 h-5" />
                </a>
                <a v-if="project.npm" :href="project.npm" target="_blank" 
                   class="text-gray-500 hover:text-red-500 transition-colors"
                   title="NPM">
                  <div class="i-mdi-npm w-5 h-5" />
                </a>
                <a v-if="project.stackblitz" :href="project.stackblitz" target="_blank" 
                   class="text-gray-500 hover:text-blue-500 transition-colors"
                   title="StackBlitz">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 368" class="w-5 h-5">
                    <path fill="currentColor" d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"/>
                  </svg>
                </a>
                <a v-if="project.website" :href="project.website" target="_blank" 
                   class="text-gray-500 hover:text-blue-500 transition-colors"
                   title="Website">
                  <div class="i-mdi-web w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </a>
      </div>
    </main>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Staggered animations for project cards */
.project-card {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.project-card:nth-child(1) { animation-delay: 0.1s; }
.project-card:nth-child(2) { animation-delay: 0.2s; }
.project-card:nth-child(3) { animation-delay: 0.3s; }
.project-card:nth-child(4) { animation-delay: 0.4s; }
.project-card:nth-child(5) { animation-delay: 0.5s; }
.project-card:nth-child(6) { animation-delay: 0.6s; }
.project-card:nth-child(7) { animation-delay: 0.7s; }
</style>
