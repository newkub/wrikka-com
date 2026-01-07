<script setup lang="ts">
import { skills } from "./SkillsData";

const getLevelColor = (level: number) => {
	const colors = [
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-500",
		"bg-blue-500",
	];
	return colors[level - 1] || "bg-gray-500";
};

const getTopSkills = (count: number = 5) => {
	return skills
		.sort((a, b) => b.level - a.level)
		.slice(0, count);
};
</script>

<template>
	<div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6">
		<h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-4">
			Top Expertise
		</h3>
		<div class="flex flex-wrap gap-3">
			<div
				v-for="skill in getTopSkills(8)"
				:key="skill.name"
				class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-700 rounded-full border border-surface-200 dark:border-surface-600"
			>
				<Icon v-if="skill.icon" :name="skill.icon" class="text-lg" />
				<span class="font-medium">{{ skill.name }}</span>
				<div class="flex gap-1">
					<div
						v-for="i in 5"
						:key="i"
						:class="[
							'w-2 h-2 rounded-full',
							i <= skill.level
								? getLevelColor(skill.level)
								: 'bg-gray-300 dark:bg-gray-600',
						]"
					>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
