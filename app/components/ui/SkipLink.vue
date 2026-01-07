<script setup lang="ts">
const showSkipLink = ref(false);

onMounted(() => {
	const handleFirstTab = (e: KeyboardEvent) => {
		if (e.key === 'Tab') {
			showSkipLink.value = true;
			window.removeEventListener('keydown', handleFirstTab);
		}
	};
	
	window.addEventListener('keydown', handleFirstTab);
});
</script>

<template>
	<a
		v-if="showSkipLink"
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-md z-50 focus-visible:(outline-none ring-2 ring-accent ring-offset-2)"
	>
		Skip to main content
	</a>
</template>
