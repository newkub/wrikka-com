<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    
    <div class="flex flex-1">
      <slot />
    </div>
    
  </div>
</template>

<style>
/* Styles will be handled by UnoCSS */
</style>
