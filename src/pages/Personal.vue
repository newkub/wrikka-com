<script setup lang="ts">
const skills = [
  { name: 'Frontend', items: ['Vue.js', 'React', 'TypeScript', 'UnoCSS'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL'] },
  { name: 'Tools', items: ['Git', 'Docker', 'VS Code'] }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 px-4">
    <section class="text-center space-y-4">
      <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix" alt="Avatar" 
           class="w-32 h-32 rounded-full mx-auto shadow-lg" />
      <h1 class="text-4xl font-bold">John Doe</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">Full Stack Developer</p>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">About Me</h2>
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
        I'm a passionate developer with 5 years of experience in building web applications.
        I love creating beautiful and functional user experiences while ensuring clean and maintainable code.
      </p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Skills</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="category in skills" :key="category.name" 
             class="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
          <ul class="space-y-2">
            <li v-for="item in category.items" :key="item" 
                class="text-gray-600 dark:text-gray-300">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>