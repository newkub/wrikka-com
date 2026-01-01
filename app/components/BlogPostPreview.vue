<script setup lang="ts">
import type { BlogPost } from '../../shared/types/blog';
const props = defineProps<{ post: BlogPost }>();
</script>

<template>
	<NuxtLink :to="`/blog/${props.post.slug}`">
		<article class="border border-surface-200 rounded-lg p-4 h-full hover:shadow-lg hover:border-primary transition-all duration-300">
			<h3 class="text-xl text-primary font-semibold">
				{{ props.post.title }}
			</h3>
			<p class="text-secondary mt-1">{{ props.post.description }}</p>
		</article>
	</NuxtLink>
</template>
