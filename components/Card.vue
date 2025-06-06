<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Card component logic
</script>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>
