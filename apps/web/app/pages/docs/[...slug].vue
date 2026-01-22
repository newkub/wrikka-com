<script setup lang="ts">
import { queryContent } from "#content";
import { useReadingTime } from "~/composables/services/useReadingTime";
import { useDate } from "~/composables/useDate";

definePageMeta({
	layout: "docs",
});

const route = useRoute();
const slug = route.params.slug as string[];

const path = computed(() => {
	if (slug.length === 0) return "/docs";
	return `/docs/${slug.join("/")}`;
});

const { data: doc, error } = await useAsyncData(
	`doc:${path.value}`,
	async () => {
		return await queryContent(path.value).findOne();
	},
);

const { formatDate } = useDate();

const readingTimeContent = computed(() => {
	if (!doc.value?.body) return "";
	const content = typeof doc.value.body === "string"
		? doc.value.body
		: JSON.stringify(doc.value.body);
	return content;
});

const { readingTime, formatReadingTime } = useReadingTime(
	readingTimeContent.value,
);

if (!doc.value && !error.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Document not found",
	});
}
</script>

<template>
	<NuxtLayout name="docs">
		<div class="mb-6 pb-4 border-b border-border">
			<div class="flex items-center gap-6 flex-wrap">
				<span
					v-if="doc?.updatedAt"
					class="flex items-center gap-2 text-sm text-muted-foreground"
				>
					<Icon name="mdi:calendar-clock" size="16" />
					{{ formatDate(doc.updatedAt) }}
				</span>
				<span class="flex items-center gap-2 text-sm text-muted-foreground">
					<Icon name="mdi:clock-outline" size="16" />
					{{ formatReadingTime(readingTime) }}
				</span>
			</div>
			<DocShare />
		</div>
		<DocsDocContent v-if="doc?.body" :content="doc.body" />
	</NuxtLayout>
</template>
