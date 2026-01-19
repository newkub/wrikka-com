<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const lesson = route.params.lesson as string[];

const lessonPath = `/course/${slug}/${lesson.join("/")}`;

const lessonData = await queryContent(lessonPath).findOne();

if (!lessonData) {
	throw createError({
		statusCode: 404,
		statusMessage: "Lesson not found",
	});
}

const course = await queryContent(`/course/${slug}`).findOne();

useSeoMeta({
	title: `${lessonData.title || lesson.join("/")} - ${course?.title || "Course"}`,
	description: lessonData.description || "",
});
</script>

<template>
	<div class="flex flex-col gap-2rem max-w-4xl mx-auto">
		<div class="mb-2rem">
			<NuxtLink
				:to="`/course/${slug}`"
				class="inline-flex items-center gap-0.5rem text-primary hover:underline"
			>
				<Icon name="mdi:arrow-left" class="w-1rem h-1rem" />
				<span>Back to {{ course?.title || "Course" }}</span>
			</NuxtLink>
		</div>

		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				{{ lessonData.title || lesson.join("/") }}
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				{{ lessonData.description || "" }}
			</p>
		</div>

		<div class="bg-surface border border-border rounded-0.75rem p-2rem">
			<div class="prose prose-gray dark:prose-invert max-w-none">
				<MDCRenderer :value="lessonData.body" />
			</div>
		</div>
	</div>
</template>
