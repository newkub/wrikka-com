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
	<section class="mt-4">
		<div class="overflow-x-auto">
			<div class="min-w-[860px]">
				<div class="flex justify-between text-xs text-secondary px-2">
					<span v-for="m in months" :key="m">{{ m }}</span>
				</div>

				<div class="mt-3 flex gap-[3px] px-2">
					<div
						v-for="(week, wi) in weeks"
						:key="wi"
						class="flex flex-col gap-[3px]"
					>
						<div
							v-for="day in week.contributionDays"
							:key="day.date"
							class="w-[11px] h-[11px] rounded-[2px] border border-surface-200"
							:style="{ backgroundColor: day.color }"
							:title="`${day.date}: ${day.contributionCount}`"
						/>
					</div>

					<div v-if="weeks.length === 0" class="text-secondary text-sm">
						No contributions data
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
