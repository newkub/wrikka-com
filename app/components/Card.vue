<script setup lang="ts">
const props = defineProps<{
	title: string;
	description?: string;
}>();
</script>

<template>
	<article class="group rounded-xl border border-surface-200 dark:border-surface-200 bg-surface dark:bg-surface p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-primary focus-within:(ring-2 ring-accent ring-offset-2 ring-offset-surface)">
		<h3 class="font-bold text-lg text-primary dark:text-primary leading-snug">
			{{ props.title }}
		</h3>
		<p
			v-if="props.description"
			class="text-secondary dark:text-secondary mt-1 leading-relaxed"
		>
			{{ props.description }}
		</p>
	</article>
</template>
