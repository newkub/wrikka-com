<script setup lang="ts">
defineProps<{
	bio: string;
}>();
</script>

<template>
	<section class="bg-surface dark:bg-surface-dark rounded-2xl border border-surface-200 dark:border-surface-200-dark p-5 sm:p-6">
		<p class="text-secondary dark:text-secondary-dark leading-relaxed whitespace-pre-line">
			{{ bio }}
		</p>
	</section>
</template>
