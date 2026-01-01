<script setup lang="ts">
const { fetchPosts } = useBlog();
const { data: posts, pending, error } = await fetchPosts();

const latestPosts = computed(() => {
	if (!posts.value) return [];
	return posts.value.filter(Boolean).slice(0, 3);
});
</script>

<template>
	<section>
		<h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
		<div v-if="pending">Loading...</div>
		<div v-else-if="error">Could not load posts.</div>
		<div
			v-else-if="posts"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<BlogPostPreview
				v-for="post in latestPosts"
				:key="post.slug"
				:post="post"
			/>
		</div>
	</section>
</template>
