<script setup lang="ts">
const props = defineProps<{
	title: string;
	description?: string;
}>();
</script>

<template>
	<article class="group rounded-xl border border-surface-200 dark:border-surface-200-dark bg-surface dark:bg-surface-dark p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-primary focus-within:(ring-2 ring-accent ring-offset-2 ring-offset-surface)">
		<h3 class="font-bold text-lg text-primary dark:text-primary-dark leading-snug">
			{{ props.title }}
		</h3>
		<p
			v-if="props.description"
			class="text-secondary dark:text-secondary-dark mt-1 leading-relaxed"
		>
			{{ props.description }}
		</p>
	</article>
</template>
