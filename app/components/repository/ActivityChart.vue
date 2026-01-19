<script setup lang="ts">
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
		"bg-muted",
		"bg-success/20",
		"bg-success/40",
		"bg-success/60",
		"bg-success/80",
	];
	return colors[level];
};
</script>

<template>
	<div v-if="pending" class="flex justify-center items-center py-2rem">
		<LoadingSpinner size="md" />
	</div>

	<div v-else-if="activity" class="flex flex-col gap-0.5rem">
		<h2 class="text-1rem font-600 text-foreground">
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
		<div class="flex items-center gap-0.5rem mt-0.5rem text-0.75rem text-muted-foreground">
			<span>Less</span>
			<div class="flex gap-0.125rem">
				<div class="w-0.75rem h-0.75rem rounded-sm bg-muted"></div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-success/20"></div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-success/40"></div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-success/60"></div>
				<div class="w-0.75rem h-0.75rem rounded-sm bg-success/80"></div>
			</div>
			<span>More</span>
		</div>
	</div>
</template>


