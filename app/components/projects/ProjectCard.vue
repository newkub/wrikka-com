<script setup lang="ts">
import type { Project } from "../../../shared/types/projects";

defineProps<{
	project: Project;
}>();
</script>

<template>
	<div class="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col">
		<img
			:src="project.imageUrl"
			:alt="project.name"
			class="w-full h-48 object-cover"
		>
		<div class="p-6 flex-1 flex flex-col">
			<div class="flex items-start gap-4 mb-4">
				<img
					v-if="project.faviconUrl"
					:src="project.faviconUrl"
					:alt="`${project.name} favicon`"
					class="w-8 h-8 rounded-md mt-1"
				>
				<div class="flex-1">
					<h3 class="text-xl font-bold text-white">{{ project.name }}</h3>
					<p v-if="project.url" class="text-sm text-primary truncate">
						{{ project.url.replace("https://", "") }}
					</p>
				</div>
			</div>
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
					class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
					:aria-label="`View live project: ${project.name}`"
				>
					<span class="i-carbon-launch text-xl"></span>
					<span class="text-sm font-medium">Website</span>
				</a>
				<a
					v-if="project.githubUrl"
					:href="project.githubUrl"
					target="_blank"
					class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
					:aria-label="`View source code on GitHub: ${project.name}`"
				>
					<span class="i-carbon-logo-github text-xl"></span>
					<span class="text-sm font-medium">GitHub</span>
				</a>
			</div>
		</div>
	</div>
</template>
