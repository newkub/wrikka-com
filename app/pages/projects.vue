<script setup lang="ts">
import { useProjects } from "~/composables/useProjects";

const { projects } = await useProjects();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Projects</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<UiProjectCard
				v-for="project in projects"
				:key="project.id"
				:project="project"
			/>
		</div>
	</div>
</template>
