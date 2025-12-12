<script setup lang="ts">
</script>

<template>
  <nav class="p-4 bg-surface-100">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-primary text-xl font-bold">Wrikka</NuxtLink>
      <div class="flex gap-4">
        <NuxtLink to="/" class="text-secondary hover:underline">Home</NuxtLink>
        <NuxtLink to="/blog" class="text-secondary hover:underline">Blog</NuxtLink>
        <NuxtLink to="/projects" class="text-secondary hover:underline">Projects</NuxtLink>
        <NuxtLink to="/products" class="text-secondary hover:underline">Products</NuxtLink>
      </div>
    </div>
  </nav>
</template>
