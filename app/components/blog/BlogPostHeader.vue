<script setup lang="ts">
import type { Post } from "../../../shared/types/blog";

defineProps<{ post: Post }>();

const formatDate = (dateString?: string) => {
	if (!dateString) return "";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
</script>

<template>
	<header class="text-center mb-12">
		<NuxtLink
			to="/blog"
			class="inline-flex items-center gap-2 text-accent hover:underline mb-6"
		>
			<Icon name="mdi:arrow-left" />
			<span>Back to Blog</span>
		</NuxtLink>
		<h1 class="text-4xl lg:text-6xl font-extrabold text-primary dark:text-primary-dark leading-tight">
			{{ post.title }}
		</h1>
		<p class="mt-4 text-lg text-secondary">{{ post.description }}</p>
		<div class="mt-6 text-sm text-secondary flex items-center justify-center gap-4">
			<span v-if="post.date">{{ formatDate(post.date) }}</span>
		</div>
		<div
			v-if="post.tags && post.tags.length"
			class="flex flex-wrap justify-center gap-2 mt-4"
		>
			<span
				v-for="tag in post.tags"
				:key="tag"
				class="px-2 py-1 bg-surface-100 dark:bg-surface-200/10 text-xs font-semibold text-secondary rounded-full border border-surface-200 dark:border-surface-800"
			>{{ tag }}</span>
		</div>
	</header>
</template>
