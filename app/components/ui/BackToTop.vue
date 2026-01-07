<script setup lang="ts">
// Back to top button component
const isVisible = ref(false);

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const handleScroll = () => {
	isVisible.value = window.scrollY > 300;
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
	onUnmounted(() => {
		window.removeEventListener("scroll", handleScroll);
	});
});
</script>

<template>
	<button
		v-if="isVisible"
		@click="scrollToTop"
		class="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white shadow-custom-lg hover:bg-accent-hover transition-all focus-visible:(outline-none ring-2 ring-accent ring-offset-2) group"
		aria-label="Back to top"
	>
		<Icon
			name="mdi:chevron-up"
			class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
			aria-hidden="true"
		/>
	</button>
</template>
