<script setup lang="ts">
const props = defineProps<{ post: any }>();
</script>

<template>
	<li
		class="border border-surface-200 rounded-lg p-4 mb-4 hover:shadow-lg hover:border-primary transition-all duration-300"
	>
		<NuxtLink
			:to="`/blog/${props.post.slug}`"
			class="text-xl text-primary font-semibold hover:underline"
		>
			{{ props.post.title }}
		</NuxtLink>
		<p class="text-secondary mt-1">{{ props.post.date }}</p>
	</li>
</template>
