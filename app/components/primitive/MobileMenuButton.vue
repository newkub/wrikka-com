<script setup lang="ts">
defineProps<{
	ariaLabel?: string
}>()

const emit = defineEmits<{
	click: []
}>()
</script>

<template>
	<button
		@click="emit('click')"
		:aria-label="ariaLabel"
		class="hidden fixed top-4 left-4 z-[1001] flex items-center justify-center p-2 bg-background border border-border rounded-lg text-foreground cursor-pointer transition-all hover:bg-accent hover:border-primary md:flex"
	>
		<Icon name="mdi:menu" size="24" />
	</button>
</template>


