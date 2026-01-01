<script setup lang="ts">
import type { GithubContributionCalendar } from "../../../shared/types/github";

const props = defineProps<{
	calendar: GithubContributionCalendar | null;
}>();

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const weeks = computed(() => props.calendar?.weeks ?? []);
</script>

<template>
	<section>
		<h2 class="text-lg font-semibold text-white mb-4">
			{{ props.calendar?.totalContributions }} contributions in the last year
		</h2>
		<div class="overflow-x-auto pb-4">
			<div class="min-w-[820px]">
				<div class="flex justify-between text-xs text-gray-400 mb-2">
					<span v-for="m in months" :key="m">{{ m }}</span>
				</div>
				<div class="flex gap-1">
					<div
						v-for="(week, wi) in weeks"
						:key="wi"
						class="flex flex-col gap-1"
					>
						<div
							v-for="day in week.contributionDays"
							:key="day.date"
							class="w-3.5 h-3.5 rounded-sm bg-gray-800"
							:style="{
								backgroundColor: day.contributionCount > 0
									? day.color
									: undefined,
							}"
							:title="`${day.date}: ${day.contributionCount} contributions`"
						/>
					</div>
					<div v-if="weeks.length === 0" class="text-gray-400 text-sm">
						Could not load contributions data.
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
