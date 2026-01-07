<script setup lang="ts">
const isFocusMode = useFocusMode();

// SEO Meta
useHead({
	htmlAttrs: {
		lang: "en",
	},
	bodyAttrs: {
		class:
			"bg-primary text-primary dark:bg-primary-dark dark:text-primary-dark",
	},
});
</script>

<template>
	<div class="min-h-screen bg-primary text-primary dark:bg-primary-dark dark:text-primary-dark">
		<UiSkipLink />
		<UiTabNav v-if="!isFocusMode" />
		<main
			id="main-content"
			:class="[
				'mx-auto w-full',
				{ 'container py-8': !isFocusMode, 'px-4': isFocusMode },
			]"
		>
			<UiPageTransition />
		</main>

		<footer v-if="!isFocusMode" class="container mt-8 py-8">
			<UiNewsletterForm />
		</footer>

		<UiBackToTop />
	</div>
</template>
