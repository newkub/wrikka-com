<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen">
    <Navigation />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>