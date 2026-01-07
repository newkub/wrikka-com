<script setup lang="ts">
import type { Post } from "../../../shared/types/blog";

defineProps<{
	post: Post;
	currentSectionTitle: string | null;
}>();
</script>

<template>
	<div>
		<div
			v-if="currentSectionTitle"
			class="sticky top-14 z-30 -mt-6 mb-8 rounded-xl border border-surface-200 bg-surface/85 px-4 py-3 backdrop-blur-lg dark:border-surface-800 dark:bg-surface-dark/70"
		>
			<div class="text-xs text-secondary">Current section</div>
			<div class="mt-1 text-base font-semibold text-primary dark:text-primary-dark">
				{{ currentSectionTitle }}
			</div>
		</div>

		<img
			v-if="post.imageUrl"
			:src="post.imageUrl"
			:alt="post.title"
			class="w-full rounded-lg shadow-lg mb-12"
		>

		<div class="markdown-content" v-html="post.html"></div>
	</div>
</template>
