<script setup lang="ts">
const { projects, pending, error } = useProjects();

const pinnedProjects = computed(() =>
	projects.value?.filter(p => p.isPinned) ?? []
);
const otherProjects = computed(() =>
	projects.value?.filter(p => !p.isPinned) ?? []
);
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-primary dark:text-primary-dark">
				My Projects
			</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-secondary">
				A collection of my work, from personal experiments to open-source
				contributions.
			</p>
		</section>

		<div
			v-if="pending"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-800"
			>
				<div class="w-full h-48 bg-surface-200 dark:bg-surface-800"></div>
				<div class="p-6 space-y-4">
					<div class="h-6 bg-surface-200 dark:bg-surface-800 rounded w-3/4">
					</div>
					<div class="h-4 bg-surface-200 dark:bg-surface-800 rounded"></div>
				</div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">
				Could not load projects. Please try again later.
			</p>
		</div>
		<div v-else-if="projects && projects.length" class="space-y-12">
			<!-- Pinned Projects -->
			<section v-if="pinnedProjects.length">
				<h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
					Pinned Projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ProjectsProjectCard
						v-for="project in pinnedProjects"
						:key="project.name"
						:project="project"
					/>
				</div>
			</section>

			<!-- Other Projects -->
			<section v-if="otherProjects.length">
				<h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
					Other Projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ProjectsProjectCard
						v-for="project in otherProjects"
						:key="project.name"
						:project="project"
					/>
				</div>
			</section>
		</div>
		<div v-else class="text-center py-12">
			<p class="text-gray-400">No projects found.</p>
		</div>
	</div>
</template>
