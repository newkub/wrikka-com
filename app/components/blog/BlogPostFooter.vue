<script setup lang="ts">
import type { Post } from "../../../shared/types/blog";

defineProps<{
	prevPost: Post | null;
	nextPost: Post | null;
	twitterShareUrl: string;
	facebookShareUrl: string;
}>();
</script>

<template>
	<footer class="mt-12 pt-8 border-t border-surface-200 dark:border-surface-800 space-y-8">
		<!-- Next/Prev Navigation -->
		<nav
			v-if="prevPost || nextPost"
			class="grid grid-cols-1 sm:grid-cols-2 gap-8"
		>
			<NuxtLink
				v-if="prevPost"
				:to="`/blog/${prevPost.slug}`"
				class="block p-6 rounded-lg border border-surface-200 dark:border-surface-800 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
			>
				<div class="text-sm text-secondary mb-2">Previous Post</div>
				<h4 class="text-lg font-bold text-primary dark:text-primary-dark flex items-center gap-2">
					<Icon name="mdi:arrow-left" />
					<span>{{ prevPost.title }}</span>
				</h4>
			</NuxtLink>
			<NuxtLink
				v-if="nextPost"
				:to="`/blog/${nextPost.slug}`"
				class="block p-6 rounded-lg border border-surface-200 dark:border-surface-800 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-right"
			>
				<div class="text-sm text-secondary mb-2">Next Post</div>
				<h4 class="text-lg font-bold text-primary dark:text-primary-dark flex items-center justify-end gap-2">
					<span>{{ nextPost.title }}</span>
					<Icon name="mdi:arrow-right" />
				</h4>
			</NuxtLink>
		</nav>

		<!-- Share Buttons -->
		<div class="flex items-center justify-center gap-4">
			<span class="text-sm font-semibold text-secondary">Share this post:</span>
			<a
				:href="twitterShareUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="text-secondary hover:text-accent transition-colors"
			>
				<Icon name="mdi:twitter" class="text-2xl" />
			</a>
			<a
				:href="facebookShareUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="text-secondary hover:text-accent transition-colors"
			>
				<Icon name="mdi:facebook" class="text-2xl" />
			</a>
		</div>
	</footer>
</template>
