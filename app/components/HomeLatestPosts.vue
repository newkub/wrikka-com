<script setup lang="ts">
import { useBlog } from "~/composables/blog/useBlog";

const { posts } = await useBlog();
const latestPosts = computed(() => posts.value.slice(0, 3));
</script>

<template>
	<section>
		<h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<BlogPostPreview
				v-for="post in latestPosts"
				:key="post.slug"
				:post="post"
			/>
		</div>
	</section>
</template>
