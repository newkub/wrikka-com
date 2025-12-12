<script setup lang="ts">
import { useBlog } from "~/composables/blog";

const route = useRoute();
const { getPostBySlug } = await useBlog();

const post = getPostBySlug(route.params.slug as string);
</script>

<template>
	<div class="p-4">
		<article v-if="post">
			<h1 class="text-4xl lg:text-5xl font-bold mb-2">{{ post.title }}</h1>
			<p class="text-secondary text-lg mb-8">{{ post.date }}</p>
			<MarkdownRender :content="post.content" />
		</article>
	</div>
</template>
