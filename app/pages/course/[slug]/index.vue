<script setup lang="ts">

const route = useRoute();
const slug = route.params.slug as string;

const course = await queryContent(`/course/${slug}`).findOne();
const conceptGroups = await useCourseLessons(slug);

console.log('conceptGroups:', conceptGroups);

useSeoMeta({
	title: course?.title || "Course",
	description: course?.description || "",
});
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				{{ course?.title || 'Course' }}
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				{{ course?.description || '' }}
			</p>
		</div>

		<div class="flex flex-col gap-2rem">
			<div
				v-for="group in conceptGroups"
				:key="group.label"
				class="flex flex-col gap-1rem"
			>
				<div class="flex items-center gap-0.75rem">
					<Icon
						name="mdi:folder"
						class="w-1.25rem h-1.25rem text-primary"
					/>
					<h2 class="text-1.25rem font-600 m-0 text-foreground">
						{{ group.label }}
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-1rem md:grid-cols-2 lg:grid-cols-4">
					<CourseConceptCard
						v-for="concept in group.concepts"
						:key="concept.id"
						:heading="concept.title"
						:content="concept.description"
						:icon="concept.icon"
						:to="concept.routePath"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
