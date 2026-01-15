<script setup lang="ts">
import type { Course } from "~/composables/useCourseData";

useSeoMeta({
	title: "Courses",
	description: "My courses and tutorials",
});

const { data: courses } = await useFetch<Course[]>("/api/course");

console.log("Courses data:", courses);
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				Courses
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				My courses and tutorials
			</p>
		</div>

		<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-4">
			<NuxtLink
				v-for="course in courses"
				:key="course.id"
				:to="course.path"
				class="group flex flex-col gap-1rem p-1.5rem rounded-0.75rem border border-border bg-surface hover:border-primary hover:shadow-lg transition-all-0.2s"
			>
				<div class="flex items-center gap-0.75rem">
					<Icon
						:name="course.icon"
						class="w-2rem h-2rem text-primary"
					/>
					<h2 class="text-1.25rem font-600 m-0 text-foreground">
						{{ course.title }}
					</h2>
				</div>

				<p class="text-0.875rem text-muted-foreground line-clamp-2">
					{{ course.description }}
				</p>

				<div class="flex flex-wrap gap-0.5rem mt-auto">
					<span
						v-for="tag in course.tags"
						:key="tag"
						class="px-0.5rem py-0.25rem rounded-0.25rem text-0.75rem font-500 bg-primary/10 text-primary"
					>
						{{ tag }}
					</span>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>
