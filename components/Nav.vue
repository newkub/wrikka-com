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
  <nav class="sticky top-0 bg-white dark:bg-gray-800 p-4 shadow-md flex items-center">
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
          class="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500"
        >
          {{ item.text }}
        </NuxtLink>
      </div>
    </div>

    <!-- Toggle dark mode ชิดขวา -->
    <div class="flex-shrink-0">
      <button 
        @click="toggleDark()"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        <div class="i-mdi-white-balance-sunny dark:i-mdi-moon w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
    </div>
  </nav>
</template>