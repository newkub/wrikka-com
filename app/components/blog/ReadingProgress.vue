<script setup lang="ts">
const progress = ref(0);

const updateProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  progress.value = Math.min(100, Math.max(0, scrollProgress));
};

onMounted(() => {
  window.addEventListener('scroll', updateProgress);
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-1 bg-surface-200 dark:bg-surface-800 z-50">
    <div
      class="h-full bg-accent transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
