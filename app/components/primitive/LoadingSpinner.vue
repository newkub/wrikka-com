<script setup lang="ts">
interface Props {
	size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
	size: "md",
});
</script>

<template>
	<div
		class="animate-spin rounded-full border-4 border-border border-t-primary"
		:class="{
			'w-1rem h-1rem': size === 'sm',
			'w-2rem h-2rem': size === 'md',
			'w-3rem h-3rem': size === 'lg',
		}"
	/>
</template>


