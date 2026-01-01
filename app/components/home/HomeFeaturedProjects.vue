<script setup lang="ts">
const { projects, pending } = useProjects();
const featuredProjects = computed(() => projects.value?.slice(0, 3) ?? []);
</script>

<template>
	<section>
		<h2 class="text-4xl font-extrabold text-center text-white mb-8">
			Featured Projects
		</h2>
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
				v-for="project in featuredProjects"
				:key="project.name"
				:project="project"
			/>
		</div>
	</section>
</template>
