<script setup lang="ts">
import { useProjects } from "~/composables/projects";

const { projects } = await useProjects();
const featuredProjects = computed(() => projects.value.slice(0, 3));
</script>

<template>
	<section>
		<h2 class="text-3xl font-bold mb-6">Featured Projects</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<Card
				v-for="project in featuredProjects"
				:key="project.id"
				:title="project.name"
				:description="project.description"
			/>
		</div>
	</section>
</template>
