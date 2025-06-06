<script setup lang="ts">
const navItems = [
	{ to: "/", text: "Home", icon: "i-mdi-home" },
	{ to: "/news", text: "News", icon: "i-mdi-newspaper" },
	{ to: "/blog", text: "Blog", icon: "i-mdi-post" },
];

const isScrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10;
  });
});
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-background dark:bg-background-dark">
      <!-- Sticky Navigation -->
      <div 
        class="sticky top-0 z-50 w-full bg-background/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
        :class="{ 'shadow-md': isScrolled }"
      >
        <div class="mx-auto max-w-8xl">
          <Nav :items="navItems" />
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="mx-auto max-w-8xl">
        <NuxtRouteAnnouncer />
        <main class="px-4 py-6 bg-background dark:bg-background-dark">
          <NuxtPage />
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>
