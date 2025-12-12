<script setup lang="ts">
import { useHead } from "#app";
import BlogCard from "~/components/blog/BlogCard.vue";
import { useBlogPosts } from "~/composables/blog";

// Blog functionality
const { posts, loading, error, loadPosts } = useBlogPosts();

// Load posts immediately
await loadPosts();

// SEO Meta
useHead({
	title: "Blog | Wrikka",
	meta: [
		{
			name: "description",
			content: "บทความและความรู้เกี่ยวกับการพัฒนาเว็บไซต์และแอปพลิเคชัน",
		},
		{ property: "og:title", content: "Blog | Wrikka" },
		{
			property: "og:description",
			content: "บทความและความรู้เกี่ยวกับการพัฒนาเว็บไซต์และแอปพลิเคชัน",
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-surface dark:bg-surface-dark pt-4">
		<!-- Main Content -->
		<div class="container mx-auto px-6 py-8">
			<h1 class="text-4xl font-bold mb-8 text-center text-primary dark:text-primary-dark">
				Blog
			</h1>

			<!-- Loading State -->
			<div v-if="loading" class="flex justify-center items-center py-12">
				<div class="i-mdi-loading animate-spin w-8 h-8 text-accent dark:text-accent-dark">
				</div>
				<span class="ml-2 text-secondary dark:text-secondary-dark"
				>กำลังโหลดบทความ...</span>
			</div>

			<!-- Error State -->
			<div
				v-else-if="error"
				class="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4"
			>
				<strong class="font-bold">เกิดข้อผิดพลาด!</strong>
				<span class="block sm:inline">{{ error }}</span>
			</div>

			<!-- Blog Posts Grid -->
			<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				<BlogCard v-for="post in posts" :key="post.id" :post="post" />
			</div>

			<!-- Empty State -->
			<div
				v-if="!loading && !error && posts.length === 0"
				class="text-center py-12"
			>
				<div class="i-mdi-post-outline w-16 h-16 text-secondary dark:text-secondary-dark mx-auto mb-4">
				</div>
				<h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-2">
					ยังไม่มีบทความ
				</h3>
				<p class="text-secondary dark:text-secondary-dark">
					กำลังเตรียมเนื้อหาสำหรับคุณ
				</p>
			</div>
		</div>
	</div>
</template>
