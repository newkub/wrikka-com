<script setup lang="ts">
import { navigateTo, preloadRouteComponents } from "#app";
import { useFormatter } from "~/composables/useFormatter";
import type { BlogPost } from "~/types/blog";

const props = defineProps<{
	post: BlogPost;
}>();

const { formatDate } = useFormatter();

const navigateToBlogPost = (slug: string) => {
	preloadRouteComponents(`/blog/${slug}`);
	navigateTo(`/blog/${slug}`);
};
</script>

<template>
	<article
		@click="navigateToBlogPost(post.slug)"
		class="bg-card dark:bg-card-dark rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-surface-200 dark:border-surface-200-dark overflow-hidden group hover:scale-102"
	>
		<!-- Blog Image - 16:9 Aspect Ratio -->
		<div
			class="relative w-full overflow-hidden bg-gradient-to-r from-accent/20 to-menu-blog/20"
			style="aspect-ratio: 16/9"
		>
			<img
				v-if="post.image"
				:src="post.image"
				:alt="post.title"
				class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				loading="lazy"
			/>
			<div v-else class="w-full h-full flex items-center justify-center">
				<div class="i-mdi-post w-16 h-16 text-accent/60 dark:text-accent-dark/60 group-hover:scale-110 transition-transform duration-300">
				</div>
			</div>

			<!-- Category Badge -->
			<div v-if="post.category" class="absolute top-3 left-3">
				<span
					class="bg-menu-blog text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
				>
					{{ post.category }}
				</span>
			</div>

			<!-- Overlay on hover -->
			<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
			</div>
		</div>

		<!-- Blog Content -->
		<div class="p-6">
			<h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-3 line-clamp-2 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors leading-tight">
				{{ post.title }}
			</h3>

			<!-- Meta Information -->
			<div class="flex items-center justify-between text-sm text-secondary dark:text-secondary-dark mb-4">
				<span class="flex items-center gap-1">
					<div class="i-mdi-calendar w-4 h-4"></div>
					{{ formatDate(post.date) }}
				</span>

				<span class="flex items-center gap-1">
					<div class="i-mdi-clock-outline w-4 h-4"></div>
					{{ post.readingTime }} นาที
				</span>
			</div>

			<!-- Tags -->
			<div
				v-if="post.tags && post.tags.length > 0"
				class="flex flex-wrap gap-2"
			>
				<span
					v-for="tag in post.tags.slice(0, 3)"
					:key="tag"
					class="bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark px-3 py-1 rounded-full text-xs font-medium"
				>
					#{{ tag }}
				</span>
				<span
					v-if="post.tags.length > 3"
					class="text-secondary dark:text-secondary-dark text-xs py-1"
				>
					+{{ post.tags.length - 3 }}
				</span>
			</div>
		</div>
	</article>
</template>
