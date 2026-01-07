<script setup lang="ts">
import type { Project } from "../../../shared/types/projects";

defineProps<{
	project: Project;
}>();
</script>

<template>
	<div class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col border border-surface-200 dark:border-surface-800 relative">
		<div
			v-if="project.isPinned"
			class="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
		>
			<Icon name="mdi:pin" />
			<span>Pinned</span>
		</div>
		<img
			:src="project.imageUrl"
			:alt="project.name"
			class="w-full h-48 object-cover"
		>
		<div class="p-6 flex-1 flex flex-col">
			<h3 class="text-xl font-bold text-primary dark:text-primary-dark mb-2">
				{{ project.name }}
			</h3>
			<p class="text-gray-400 text-base mb-4 flex-1">
				{{ project.description }}
			</p>
			<div class="flex flex-wrap gap-2 mb-6">
				<span
					v-for="tag in project.tags"
					:key="tag"
					class="px-2 py-1 bg-gray-700 text-xs font-semibold text-gray-300 rounded-full"
				>{{ tag }}</span>
			</div>
			<div class="mt-auto flex justify-end space-x-4">
				<a
					v-if="project.url"
					:href="project.url"
					target="_blank"
					class="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors"
					:aria-label="`View live project: ${project.name}`"
				>
					<Icon name="mdi:launch" class="text-xl" />
					<span class="text-sm font-medium">Website</span>
				</a>
				<a
					v-if="project.githubUrl"
					:href="project.githubUrl"
					target="_blank"
					class="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors"
					:aria-label="`View source code on GitHub: ${project.name}`"
				>
					<Icon name="mdi:github" class="text-xl" />
					<span class="text-sm font-medium">GitHub</span>
				</a>
			</div>
		</div>
	</div>
</template>
