<script setup lang="ts">
import { skills } from "./SkillsData";

const getTotalProjects = () => {
	return skills.reduce((sum, skill) => sum + (skill.projects || 0), 0);
};

const getTotalYears = () => {
	return Math.max(...skills.map(skill => skill.years || 0));
};
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
			<div class="text-3xl font-bold text-accent mb-2">{{ skills.length }}</div>
			<div class="text-sm text-secondary">Technologies</div>
		</div>

		<div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
			<div class="text-3xl font-bold text-accent mb-2">
				{{ getTotalYears() }}
			</div>
			<div class="text-sm text-secondary">Years Experience</div>
		</div>

		<div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
			<div class="text-3xl font-bold text-accent mb-2">
				{{ getTotalProjects() }}
			</div>
			<div class="text-sm text-secondary">Projects Completed</div>
		</div>
	</div>
</template>
