<script setup lang="ts">
const navItems = [
  { to: '/', text: 'Home' },
  { to: '/news', text: 'News' },
  { to: '/blog', text: 'Blog' },
];
</script>

<template>
  <NuxtLayout>
    <Nav :items="navItems" />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
