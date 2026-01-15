<script setup lang="ts">
useSeoMeta({
	title: "Projects",
	description: "My personal projects and contributions",
})

const { data: repos } = await useFetch("/api/projects")
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-gray-900 dark:text-gray-100">Projects</h1>
			<p class="text-1.125rem text-gray-600 dark:text-gray-400">My personal projects and contributions</p>
		</div>

		<div v-if="repos && repos.length > 0" class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
			<RepoCard
				v-for="repo in repos"
				:key="repo.id"
				:repo="repo"
			/>
		</div>

		<div v-else class="text-center py-4rem text-gray-600 dark:text-gray-400">
			<p>No projects found</p>
		</div>
	</div>
</template>
