<script setup lang="ts">
const props = defineProps<{ product: any }>();
</script>

<template>
	<div
		class="border border-surface-200 rounded-lg p-4 hover:shadow-lg hover:border-primary transition-all duration-300"
	>
		<h3 class="font-bold text-lg text-primary">{{ props.product.name }}</h3>
		<p class="text-secondary mt-1">{{ props.product.description }}</p>
	</div>
</template>
