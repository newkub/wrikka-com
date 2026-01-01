<script setup lang="ts">
const route = useRoute();
const { fetchPostBySlug } = useBlog();

const { data: post, pending, error } = await fetchPostBySlug(
	route.params.slug as string,
);
</script>

<template>
	<div class="p-4">
		<div v-if="pending">Loading...</div>
		<div v-else-if="error">Post not found.</div>
		<article v-else-if="post">
			<h1 class="text-4xl lg:text-5xl font-bold mb-2">{{ post.title }}</h1>
			<p class="text-secondary text-lg mb-8">{{ post.description }}</p>
			<div class="prose" v-html="post.html"></div>
		</article>
	</div>
</template>
