<script setup lang="ts">
interface Props {
	language: string | null;
	stargazersCount: number;
	forksCount: number;
	openIssuesCount?: number;
	pullsCount?: number;
}

const props = defineProps<Props>();

const { getLanguageColor } = useLanguage();
</script>

<template>
	<div class="flex flex-wrap gap-1.25rem text-0.875rem mb-1.25rem pb-1.25rem border-b border-border">
		<span
			v-if="language"
			class="flex items-center gap-0.375rem px-0.75rem py-0.375rem rounded-full bg-surface transition-all-0.2s hover:bg-surface-elevated"
		>
			<div
				class="w-0.5rem h-0.5rem rounded-full shrink-0"
				:style="{ backgroundColor: getLanguageColor(language) }"
			>
			</div>
			<span class="font-medium">{{ language }}</span>
		</span>
		<span class="flex items-center gap-0.375rem text-warning">
			<Icon name="mdi:star" class="w-1rem h-1rem" />
			<span class="font-medium">{{ stargazersCount }}</span>
		</span>
		<span class="flex items-center gap-0.375rem text-muted-foreground">
			<Icon name="mdi:source-fork" class="w-1rem h-1rem" />
			<span class="font-medium">{{ forksCount }}</span>
		</span>
		<span
			v-if="openIssuesCount !== undefined"
			class="flex items-center gap-0.375rem text-success"
		>
			<Icon name="mdi:alert-circle-outline" class="w-1rem h-1rem" />
			<span class="font-medium">{{ openIssuesCount }}</span>
		</span>
		<span
			v-if="pullsCount !== undefined"
			class="flex items-center gap-0.375rem text-accent"
		>
			<Icon name="mdi:source-pull" class="w-1rem h-1rem" />
			<span class="font-medium">{{ pullsCount }}</span>
		</span>
	</div>
</template>
