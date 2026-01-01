<script setup lang="ts">
import type { Project } from "../../../shared/types/projects";

defineProps<{
	project: Project;
}>();
</script>

<template>
	<div class="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm">
		<img
			:src="project.imageUrl"
			:alt="project.name"
			class="w-full h-48 object-cover"
		>
		<div class="p-6">
			<h3 class="text-xl font-bold text-white mb-2">{{ project.name }}</h3>
			<p class="text-gray-400 text-base mb-4">{{ project.description }}</p>
			<div class="flex flex-wrap gap-2 mb-4">
				<span
					v-for="tag in project.tags"
					:key="tag"
					class="px-2 py-1 bg-gray-700 text-xs font-semibold text-gray-300 rounded-full"
				>{{ tag }}</span>
			</div>
			<div class="flex justify-end space-x-4">
				<a
					v-if="project.url"
					:href="project.url"
					target="_blank"
					class="text-gray-300 hover:text-white transition-colors"
					:aria-label="`View live project: ${project.name}`"
				>
					<span class="i-carbon-launch text-2xl"></span>
				</a>
				<a
					v-if="project.githubUrl"
					:href="project.githubUrl"
					target="_blank"
					class="text-gray-300 hover:text-white transition-colors"
					:aria-label="`View source code on GitHub: ${project.name}`"
				>
					<span class="i-carbon-logo-github text-2xl"></span>
				</a>
			</div>
		</div>
	</div>
</template>
