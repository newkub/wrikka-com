<script setup lang="ts">
import { useBlog } from "~/composables/blog";

const { posts } = await useBlog();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Blog</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<BlogPostPreview v-for="post in posts" :key="post.slug" :post="post" />
		</div>
	</div>
</template>
