<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Back button -->
      <button 
        @click="goBack"
        class="mb-8 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <div class="i-mdi-arrow-left mr-2"></div>
        กลับไปยังบทความทั้งหมด
      </button>

      <!-- Blog Content -->
      <article>
        <!-- Category -->
        <span class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
          {{ post.category }}
        </span>
        
        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-text mb-6">
          {{ post.title }}
        </h1>
        
        <!-- Meta -->
        <div class="flex items-center mb-8">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium mr-3">
            {{ post.author[0] }}
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ post.author }}</p>
            <p class="text-xs text-gray-500">{{ post.date }} · {{ post.readTime }}</p>
          </div>
        </div>
        
        <!-- Featured Image -->
        <div class="mb-8 rounded-xl overflow-hidden">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-auto object-cover"
          >
        </div>
        
        <!-- Content -->
        <div class="prose max-w-none text-text">
          <ContentDoc :path="`/blog/${$route.params.slug}`" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

// Sample data - in real app you would fetch this from API or CMS
const posts = [
  {
    id: 1,
    title: "10 เทรนด์เทคโนโลยีที่น่าจับตามองในปี 2025",
    excerpt: "พบกับเทคโนโลยีใหม่ล่าสุดที่จะเข้ามาเปลี่ยนโลกของเราในปี 2025 นี้",
    category: "เทคโนโลยี",
    image: "https://source.unsplash.com/random/600x400/?tech,1",
    author: "สมชาย ใจดี",
    date: "1 มิ.ย. 2025",
    readTime: "5 นาที",
  },
  // Add other posts from blog.vue
];

const post = ref<BlogPost | null>(null);

onMounted(() => {
  const slug = router.currentRoute.value.params.slug;
  post.value = posts.find(p => p.id.toString() === slug) || null;
});

const goBack = () => {
  router.push('/blog');
};
</script>

<style scoped>
/* Custom styles for blog details page */
.prose {
  line-height: 1.75;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-bottom: 1.25em;
}
</style>
