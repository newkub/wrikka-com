<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: "en",
	},
})
</script>

<template>
	<div class="min-h-100vh flex flex-col bg-white dark:bg-gray-900">
		<Navbar />
		<main class="flex-1 px-1.5rem py-2rem max-w-1200px w-full mx-auto md:px-1rem md:py-1.5rem">
			<slot />
		</main>
		<footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-1.5rem py-1.5rem mt-auto">
			<div class="max-w-1200px mx-auto text-center text-gray-600 dark:text-gray-400">
				<p>&copy; {{ new Date().getFullYear() }} Wrikka. All rights reserved.</p>
			</div>
		</footer>
	</div>
</template>
