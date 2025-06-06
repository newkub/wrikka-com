<template>
  <div>
    <nav class="navbar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/news">News</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
    </nav>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
// Logic สำหรับ app
</script>

<style>
.navbar {
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  gap: 1rem;
}

.navbar a {
  text-decoration: none;
  color: inherit;
}

.navbar a.router-link-active {
  font-weight: bold;
}
</style>
