<script setup lang="ts">
interface NavItem {
	to: string;
	text: string;
	icon?: string; // Optional icon property
}

const props = defineProps<{
	items: NavItem[];
}>();

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>


<template>
  <nav class="sticky top-0 bg-background dark:bg-background-block p-4 flex items-center">
    <!-- Logo ด้านซ้าย -->
    <div class="flex-shrink-0">
      <NuxtLink to="/" class="flex items-center">
        <img src="/favicon.ico" alt="Logo" class="h-8 w-auto" />
      </NuxtLink>
    </div>

    <!-- Navigation ตรงกลาง -->
    <div class="flex-grow flex justify-center">
      <div class="flex gap-4">
        <NuxtLink 
          v-for="item in items" 
          :key="item.to" 
          :to="item.to"
          class="px-4 py-2 text-text dark:text-text-secondary hover:text-primary flex items-center gap-2"
          :class="{ '!text-primary font-medium': $route.path === item.to }"
        >
          <div v-if="item.icon" :class="item.icon" class="w-5 h-5" />
          {{ item.text }}
        </NuxtLink>
      </div>
    </div>

    <!-- Toggle dark mode ชิดขวา -->
    <div class="flex-shrink-0">
      <button 
        @click="toggleDark()"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        <div class="i-mdi-white-balance-sunny dark:i-mdi-moon w-6 h-6 text-text dark:text-text-secondary" />
      </button>
    </div>
  </nav>
</template>