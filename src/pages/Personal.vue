<script setup lang="ts">
import Avatar from '../components/Avatar.vue'
import Tag from '../components/Tag.vue'

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
  <div class="personal-page h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="max-w-4xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Avatar src="" />
          <div class="mt-6 text-center">
            <h1 class="text-2xl font-bold">Newkub</h1>
            <div class="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <p>1. Always be kind</p>
              <p>2. Keep learning</p>
              <p>3. Stay curious</p>
            </div>
          </div>
        </div>
        <section class="space-y-6">
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm a passionate developer with 5 years of experience in building web applications.
            I love creating beautiful and functional user experiences while ensuring clean and maintainable code.
          </p>
          <div class="flex flex-wrap gap-3">
            <Tag v-for="skill in skills" :key="skill.name" :icon="skill.icon" :name="skill.name" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-page {
  overflow: hidden;
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>