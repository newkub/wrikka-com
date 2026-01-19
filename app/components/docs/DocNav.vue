<script setup lang="ts">
import type { ContentItem } from "#shared/types/content";

const route = useRoute();

const { data: docs } = await useAsyncData("docs-nav", async () => {
	const items = await queryContent("/docs").find();
	return items as ContentItem[];
});

const currentSet = computed(() => {
	const segments = route.path.split("/").filter(Boolean);
	if (segments[0] !== "docs") return null;
	return segments.length >= 2 ? segments[1] : null;
});

const sortedDocs = computed(() => {
	if (!docs.value) return [];

	const set = currentSet.value;
	if (!set) return [];

	return docs.value
		.filter(item =>
			typeof item._path === "string" && item._path.startsWith(`/docs/${set}`)
		)
		.filter(item => item._path !== `/docs/${set}/index`)
		.filter(item =>
			typeof item._path === "string" && !item._path.endsWith("/index")
		)
		.sort((a, b) => (a.order || 0) - (b.order || 0));
});

const currentIndex = computed(() => {
	return sortedDocs.value.findIndex(item => item._path === route.path);
});

const prevDoc = computed(() => {
	if (currentIndex.value <= 0) return null;
	return sortedDocs.value[currentIndex.value - 1];
});

const nextDoc = computed(() => {
	if (
		currentIndex.value < 0 || currentIndex.value >= sortedDocs.value.length - 1
	) return null;
	return sortedDocs.value[currentIndex.value + 1];
});
</script>

<template>
	<nav class="flex gap-4 mt-12 pt-8 border-t border-border">
		<PrimitiveNavLink
			v-if="prevDoc && prevDoc._path"
			:to="prevDoc._path"
			class="flex-1 p-4 border border-border rounded-lg no-underline transition-all bg-card hover:border-primary hover:bg-accent"
		>
			<div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
				<Icon name="mdi:arrow-left" size="16" />
				Previous
			</div>
			<div class="text-base font-medium text-foreground text-left">
				{{ prevDoc.title }}
			</div>
		</PrimitiveNavLink>

		<PrimitiveNavLink
			v-if="nextDoc && nextDoc._path"
			:to="nextDoc._path"
			class="flex-1 p-4 border border-border rounded-lg no-underline transition-all bg-card hover:border-primary hover:bg-accent"
		>
			<div class="flex items-center gap-2 text-sm text-muted-foreground mb-2 justify-end">
				Next
				<Icon name="mdi:arrow-right" size="16" />
			</div>
			<div class="text-base font-medium text-foreground text-right">
				{{ nextDoc.title }}
			</div>
		</PrimitiveNavLink>
	</nav>
</template>
