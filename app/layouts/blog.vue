<script setup lang="ts">
interface Props {
	title?: string;
	metadata?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
	title: "",
	metadata: () => ({}),
});
</script>

<template>
	<div class="blog-layout">
		<div class="max-w-7xl mx-auto px-1.5rem py-2rem">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-2rem">
				<!-- Left Column: Table of Contents -->
				<aside class="lg:col-span-3 order-2 lg:order-1">
					<div class="sticky top-6rem">
						<slot name="toc" />
					</div>
				</aside>

				<!-- Center Column: Content -->
				<main class="lg:col-span-6 order-1 lg:order-2">
					<slot />
				</main>

				<!-- Right Column: Metadata -->
				<aside class="lg:col-span-3 order-3 lg:order-3">
					<div class="sticky top-6rem space-y-1.5rem">
						<slot name="metadata" :metadata="metadata" />
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>
