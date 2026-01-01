<script setup lang="ts">
import { computed } from "vue";
const { fetchPosts } = useBlog();
const { data: posts, pending, error } = await fetchPosts();

const filteredPosts = computed(() => posts.value?.filter(Boolean) ?? []);
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Blog</h1>
		<div v-if="pending">Loading...</div>
		<div v-else-if="error">Could not load posts.</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<BlogPostPreview
				v-for="post in filteredPosts"
				:key="post.slug"
				:post="post"
			/>
		</div>
	</div>
</template>
