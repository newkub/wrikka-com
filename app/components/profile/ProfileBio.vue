<script setup lang="ts">
defineProps<{
	bio: string;
}>();
</script>

<template>
	<section class="bg-surface rounded-2xl border border-surface-200 p-5 sm:p-6">
		<p class="text-secondary leading-relaxed whitespace-pre-line">
			{{ bio }}
		</p>
	</section>
</template>
