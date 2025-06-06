<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    
    <div class="flex flex-1">
      <aside class="w-64 border-r p-4">
        <slot name="sidebar" />
      </aside>
      
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
    
  </div>
</template>

<style>
/* Styles will be handled by UnoCSS */
</style>
