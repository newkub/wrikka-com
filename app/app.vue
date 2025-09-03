<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

// Add subtle entrance animation
onMounted(() => {
	document.body.classList.add("animate-fade-in");
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 font-sans">
    <div class="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.15)_1px,transparent_0)] [background-size:20px_20px] pointer-events-none" />
    
    <Transition 
      name="page" 
      mode="out-in"
      appear
      :duration="{ enter: 400, leave: 200 }"
    >
      <NuxtPage class="relative z-10" />
    </Transition>
  </div>
</template>

<style>
/* Page transition animations - ใช้ UnoCSS ไม่ได้ต้องใช้ CSS */
.page-enter-active {
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  filter: blur(4px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(1.01);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhanced focus states */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Motion preferences */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 150ms ease-in-out;
  }
  
  .page-enter-from,
  .page-leave-to {
    transform: none;
    filter: none;
  }
  
  html {
    scroll-behavior: auto;
  }
}

/* Global animations */
@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(8px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 600ms ease-out;
}
</style>
