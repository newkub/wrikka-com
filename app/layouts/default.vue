<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: "en",
	},
});
</script>

<template>
	<div class="min-h-100vh flex flex-col bg-background">
		<LayoutNavbar />
		<main class="flex-1 px-1.5rem py-2rem max-w-1200px w-full mx-auto md:px-1rem md:py-1.5rem">
			<slot />
		</main>
		<footer class="bg-surface border-t border-border px-1.5rem py-1.5rem mt-auto">
			<div class="max-w-1200px mx-auto text-center text-muted-foreground">
				<p>
					&copy; {{ new Date().getFullYear() }} Wrikka. All rights reserved.
				</p>
			</div>
		</footer>
	</div>
</template>


