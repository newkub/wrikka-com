<script setup lang="ts">
const { projects } = useProjects();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Projects</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<NuxtLink
				v-for="project in projects"
				:key="project.name"
				:to="project.url"
				target="_blank"
			>
				<Card :title="project.name" />
			</NuxtLink>
		</div>
	</div>
</template>
