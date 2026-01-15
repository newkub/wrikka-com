<script setup lang="ts">
import LoadingSpinner from "./primitive/LoadingSpinner.vue";

interface ActivityData {
	weeks: number[][];
	totalContributions: number;
	years: number[];
}

const { data: activity, pending } = await useFetch<ActivityData>(
	"/api/github/activity",
);

const getLevel = (count: number) => {
	if (count === 0) return 0;
	if (count <= 2) return 1;
	if (count <= 4) return 2;
	if (count <= 6) return 3;
	return 4;
};

const getColor = (level: number) => {
	const colors = [
		"bg-gray-100 dark:bg-gray-800",
		"bg-green-200 dark:bg-green-900",
		"bg-green-300 dark:bg-green-800",
		"bg-green-400 dark:bg-green-700",
		"bg-green-500 dark:bg-green-600",
	];
	return colors[level];
};
</script>

<template>
	<div v-if="pending" class="flex justify-center items-center py-2rem">
		<LoadingSpinner size="md" />
	</div>

	<div v-else-if="activity" class="flex flex-col gap-0.5rem">
		<h2 class="text-1rem font-600 text-gray-900 dark:text-gray-100">
			{{ activity.totalContributions }} contributions in the last year
		</h2>
		<div class="overflow-x-auto">
			<div class="flex gap-0.25rem">
				<div
					v-for="(week, weekIndex) in activity.weeks"
					:key="weekIndex"
					class="flex flex-col gap-0.25rem"
				>
					<div
						v-for="(day, dayIndex) in week"
						:key="dayIndex"
						class="w-0.75rem h-0.75rem rounded-sm"
						:class="getColor(getLevel(day))"
						:title="`${day} contributions`"
					>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-0.5rem mt-0.5rem text-0.75rem text-gray-600 dark:text-gray-400">
			<span>Less</span>
			<div class="flex gap-0.125rem">
				<div class="w-0.75rem h-0.75rem rounded-sm bg-gray-100 dark:bg-gray-800">
				</div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-green-200 dark:bg-green-900">
				</div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-green-300 dark:bg-green-800">
				</div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-green-400 dark:bg-green-700">
				</div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-green-500 dark:bg-green-600">
				</div>
			</div>
			<span>More</span>
		</div>
	</div>
</template>
