<script setup lang="ts">
const skills = [
  { name: 'Vue.js', icon: 'i-logos-vue' },
  { name: 'React', icon: 'i-logos-react' },
  { name: 'TypeScript', icon: 'i-logos-typescript-icon' },
  { name: 'Node.js', icon: 'i-logos-nodejs-icon' },
  { name: 'Python', icon: 'i-logos-python' },
  { name: 'Git', icon: 'i-logos-git-icon' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'PostgreSQL', icon: 'i-logos-postgresql' }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 min-h-screen flex flex-col justify-center">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <section class="text-center space-y-4">
        <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix" alt="Avatar" 
             class="w-32 h-32 rounded-full mx-auto shadow-lg" />
        <h1 class="text-4xl font-bold">John Doe</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">Full Stack Developer</p>
      </section>

      <section class="space-y-6">
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          I'm a passionate developer with 5 years of experience in building web applications.
          I love creating beautiful and functional user experiences while ensuring clean and maintainable code.
        </p>
        <div class="flex flex-wrap gap-3">
          <div v-for="skill in skills" :key="skill.name" 
               class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-sm">
            <div :class="[skill.icon, 'text-xl']" />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>