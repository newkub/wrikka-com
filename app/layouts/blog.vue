<script setup lang="ts">
interface BlogLayoutProps {
	title?: string;
	metadata?: Record<string, any>;
}

const props = withDefaults(defineProps<BlogLayoutProps>(), {
	title: "",
	metadata: () => ({}),
});
</script>

<template>
	<div class="blog-layout">
		<div class="max-w-7xl mx-auto px-1.5rem py-2rem">
			<!-- Hero Section: Title, Description, Cover - Centered at Top -->
			<div class="mb-4rem">
				<slot name="hero" />
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-2rem">
				<!-- Left Column: Table of Contents -->
				<aside class="lg:col-span-3 order-2 lg:order-1">
					<div class="sticky top-6rem">
						<slot name="toc" />
					</div>
				</aside>

				<!-- Center Column: Content -->
				<main class="lg:col-span-9 order-1 lg:order-2">
					<slot />
				</main>
			</div>
		</div>
	</div>
</template>
