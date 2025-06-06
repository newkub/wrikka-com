<script setup lang="ts">
const navItems = [
	{ to: "/", text: "Home", icon: "i-mdi-home" },
	{ to: "/news", text: "News", icon: "i-mdi-newspaper" },
	{ to: "/blog", text: "Blog", icon: "i-mdi-post" },
];

const isScrolled = ref(false);

onMounted(() => {
	window.addEventListener("scroll", () => {
		isScrolled.value = window.scrollY > 10;
	});
});
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-background">
      <!-- Sticky Navigation -->
      <div 
        class="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
        :class="{ 'shadow-md': isScrolled }"
      >
        <div class="mx-auto max-w-8xl">
          <Nav :items="navItems" />
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="mx-auto max-w-8xl">
        <NuxtRouteAnnouncer />
        <main class="p-5">
          <NuxtPage />
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>
