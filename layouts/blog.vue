<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showSidebar = ref(true);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    
    <div class="flex flex-1">
      <aside 
        v-if="showSidebar" 
        class="w-64 border-r p-4"
      >
        <slot name="sidebar" />
      </aside>
      
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
    
    <slot name="footer" />
  </div>
</template>

<style>
/* Styles will be handled by UnoCSS */
</style>
