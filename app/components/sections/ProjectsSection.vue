<script setup lang="ts">
const { projects, pending } = useProjects();
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

		<div
			v-if="pending"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse"
		>
			<div
				v-for="i in 3"
				:key="i"
				class="bg-gray-800/50 rounded-lg overflow-hidden"
			>
				<div class="w-full h-48 bg-gray-700"></div>
				<div class="p-6 space-y-4">
					<div class="h-6 bg-gray-700 rounded w-3/4"></div>
					<div class="h-4 bg-gray-700 rounded"></div>
				</div>
			</div>
		</div>

		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<ProjectsProjectCard
				v-for="project in projects"
				:key="project.name"
				:project="project"
			/>
		</div>
	</div>
</template>
