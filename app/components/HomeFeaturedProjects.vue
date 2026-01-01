<script setup lang="ts">
const { projects } = useProjects();
const featuredProjects = computed(() => projects.value.slice(0, 3));
</script>

<template>
	<section>
		<h2 class="text-3xl font-bold mb-6">Featured Projects</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<NuxtLink
				v-for="project in featuredProjects"
				:key="project.name"
				:to="project.url"
				target="_blank"
			>
				<Card :title="project.name" />
			</NuxtLink>
		</div>
	</section>
</template>
