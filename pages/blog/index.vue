<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">บทความล่าสุด</h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto">อัปเดตข่าวสารและบทความน่าสนใจเกี่ยวกับเทคโนโลยีและไอทีล่าสุด</p>
        
        <!-- Categories -->
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <button 
            v-for="(category, index) in categories" 
            :key="index"
            @click="activeCategory = category"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'text-text hover:bg-gray-100'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
        >
          <!-- Featured Image -->
          <div class="h-48 overflow-hidden">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
          </div>
          
          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <!-- Category -->
            <span class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3 self-start">
              {{ post.category }}
            </span>
            
            <!-- Title -->
            <h2 class="text-xl font-bold text-text mb-2 line-clamp-2">
              {{ post.title }}
            </h2>
            
            <!-- Excerpt -->
            <p class="text-text-secondary mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            
            <!-- Meta -->
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                  {{ post.author[0] }}
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ post.author }}</p>
                  <p class="text-xs text-gray-500">{{ post.date }}</p>
                </div>
              </div>
              <button 
                @click="$router.push(`/blog/${post.id}`)" 
                class="text-primary hover:text-primary/80 transition-colors"
              >
                <div class="i-mdi-arrow-right text-xl"></div>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div class="mt-12 text-center">
        <button 
          v-if="hasMorePosts"
          @click="loadMore"
          class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center mx-auto"
        >
          โหลดเพิ่มเติม
          <div class="i-mdi-arrow-down ml-2"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

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

// Categories
const categories = ref([
	"ทั้งหมด",
	"เทคโนโลยี",
	"การออกแบบ",
	"การตลาด",
	"การพัฒนา",
]);
const activeCategory = ref("ทั้งหมด");

// Sample blog posts data
const posts = ref<BlogPost[]>([
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
	{
		id: 2,
		title: "เริ่มต้นกับ UI/UX Design สำหรับมือใหม่",
		excerpt: "เรียนรู้พื้นฐานการออกแบบประสบการณ์ผู้ใช้งานสำหรับผู้เริ่มต้น",
		category: "การออกแบบ",
		image: "https://source.unsplash.com/random/600x400/?design,1",
		author: "นางสาวสมหญิง เก่งดี",
		date: "28 พ.ค. 2025",
		readTime: "7 นาที",
	},
	{
		id: 3,
		title: "เทคนิคการทำ SEO ให้เว็บไซต์ติดหน้าแรก",
		excerpt: "เคล็ดลับและเทคนิคการทำ SEO ที่คุณควรรู้ในปี 2025",
		category: "การตลาด",
		image: "https://source.unsplash.com/random/600x400/?seo,1",
		author: "นายธนวัฒน์ มั่นคง",
		date: "25 พ.ค. 2025",
		readTime: "8 นาที",
	},
	{
		id: 4,
		title: "เรียนรู้ React 18 ฟีเจอร์ใหม่ที่น่าสนใจ",
		excerpt: "อัปเดตฟีเจอร์ใหม่ล่าสุดของ React 18 ที่นักพัฒนาต้องรู้",
		category: "การพัฒนา",
		image: "https://source.unsplash.com/random/600x400/?react,1",
		author: "นายพัฒน์นรี มีสุข",
		date: "20 พ.ค. 2025",
		readTime: "10 นาที",
	},
	{
		id: 5,
		title: "การทำ Data Visualization ด้วย D3.js",
		excerpt: "แนะนำการสร้างกราฟและแผนภูมิแบบ Interactive ด้วย D3.js",
		category: "การพัฒนา",
		image: "https://source.unsplash.com/random/600x400/?data,1",
		author: "นายวิทยา ใจกล้า",
		date: "15 พ.ค. 2025",
		readTime: "12 นาที",
	},
	{
		id: 6,
		title: "เทรนด์สีแห่งปี 2025 สำหรับนักออกแบบ",
		excerpt: "พบกับโทนสีที่จะมาแรงในปี 2025 สำหรับนักออกแบบทุกคน",
		category: "การออกแบบ",
		image: "https://source.unsplash.com/random/600x400/?color,1",
		author: "นางสาวอารีรัตน์ สวยงาม",
		date: "10 พ.ค. 2025",
		readTime: "6 นาที",
	},
]);

// Pagination
const visiblePosts = ref(6);
const postsPerPage = 3;

// Computed properties
const filteredPosts = computed(() => {
	let result = [...posts.value];

	// Filter by category
	if (activeCategory.value !== "ทั้งหมด") {
		result = result.filter((post) => post.category === activeCategory.value);
	}

	// Apply pagination
	return result.slice(0, visiblePosts.value);
});

const hasMorePosts = computed(() => {
	if (activeCategory.value === "ทั้งหมด") {
		return visiblePosts.value < posts.value.length;
	}
	const filtered = posts.value.filter(
		(post) => post.category === activeCategory.value,
	);
	return visiblePosts.value < filtered.length;
});

// Methods
const loadMore = () => {
	visiblePosts.value += postsPerPage;
};

// Format date
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("th-TH", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "Asia/Bangkok",
	});
};
</script>

<style scoped>
/* Custom styles for blog page */

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Animation for blog cards */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animation to blog posts */
article {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
  animation-delay: calc(var(--index) * 0.1s);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Hover effect for category buttons */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}
</style>