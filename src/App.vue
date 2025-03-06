<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <!-- Wrapper with padding for navbar height -->
  <div class="flex flex-col min-h-screen">
    <!-- Fixed navbar at the top -->
    <Navbar />
    <!-- Spacer equal to navbar height -->
    <div class="h-16"></div>
    <!-- Main content container -->
    <main class="container flex-grow">
      <router-view />
    </main>
    <!-- Footer spacer -->
    <div class="h-12"></div>
  </div>
</template>

<style>
/* Ensure the body takes up full height and has proper spacing */
html, body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>