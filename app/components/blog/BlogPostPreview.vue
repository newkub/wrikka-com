<script setup lang="ts">
import type { BlogPost } from "../../../shared/types/blog";

defineProps<{
	post: BlogPost;
}>();

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
	<NuxtLink :to="`/blog/${post.slug}`">
		<article class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col border border-surface-200 dark:border-surface-800">
			<img
				v-if="post.imageUrl"
				:src="post.imageUrl"
				:alt="post.title"
				class="w-full h-48 object-cover"
			>
			<div class="p-6 flex-1 flex flex-col">
				<h3 class="text-xl font-bold text-primary dark:text-primary-dark mb-2">
					{{ post.title }}
				</h3>
				<p class="text-secondary text-base mb-4 flex-1">
					{{ post.description }}
				</p>
				<div v-if="post.date" class="text-sm text-secondary mb-4">
					{{ formatDate(post.date) }}
				</div>
				<div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2">
					<span
						v-for="tag in post.tags"
						:key="tag"
						class="px-2 py-1 bg-surface-100 dark:bg-surface-200/10 text-xs font-semibold text-secondary rounded-full border border-surface-200 dark:border-surface-800"
					>{{ tag }}</span>
				</div>
			</div>
		</article>
	</NuxtLink>
</template>
