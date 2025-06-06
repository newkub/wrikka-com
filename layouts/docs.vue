<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showToc = ref(true);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    
    <div class="flex flex-1">
      <aside class="w-64 border-r p-4">
        <slot name="sidebar" />
      </aside>
      
      <article class="flex-1 p-4 max-w-3xl mx-auto">
        <slot />
      </article>
      
      <aside 
        v-if="showToc" 
        class="w-64 border-l p-4"
      >
        <slot name="toc" />
      </aside>
    </div>
    
    <slot name="footer" />
  </div>
</template>

<style>
/* Styles will be handled by UnoCSS */
</style>
