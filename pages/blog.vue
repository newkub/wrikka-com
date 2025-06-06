<template>
  <div class="blog-container">
    <h1>Blog</h1>
    <div class="grid">
      <Card v-for="i in 8" :key="i">
        <h3>Blog Post {{ i }}</h3>
        <p>เนื้อหาบล็อกตัวอย่าง</p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "~/components/Card.vue";
// Logic สำหรับหน้า blog
</script>

<style scoped>
.blog-container {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
/* สไตล์สำหรับหน้า blog */
</style>