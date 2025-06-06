<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <slot name="footer" />
  </div>
</template>

<style>
/* Styles will be handled by UnoCSS */
</style>
