<script setup lang="ts">
import UiProjectCard from "../components/ui/UiProjectCard.vue";

const { projects } = useProjects();
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-white">My Projects</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
				A collection of projects I've worked on, from personal experiments to
				open-source contributions.
			</p>
		</section>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<UiProjectCard
				v-for="project in projects"
				:key="project.name"
				:project="project"
			/>
		</div>
	</div>
</template>
