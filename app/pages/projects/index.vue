<script setup lang="ts">
useSeoMeta({
	title: "Projects",
	description: "My personal projects and contributions",
});

const { data: repos } = await useFetch("/api/projects");

const {
	groupBy,
	searchQuery,
	selectedGroups,
	groupedRepos,
	availableGroups,
	toggleGroup,
	clearFilters,
} = useGroupedRepos(repos as any);

const groupOptions = [
	{ value: "date", label: "Date" },
	{ value: "language", label: "Language" },
	{ value: "topics", label: "Topics" },
];

const isGroupSelected = (group: string) => selectedGroups.value.has(group);

const hasActiveFilters = computed(() => selectedGroups.value.size > 0 || searchQuery.value.length > 0);
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				Projects
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				My personal projects and contributions
			</p>
		</div>

		<div v-if="repos && repos.length > 0" class="flex flex-col gap-1.5rem">
			<div class="flex flex-col gap-1rem">
				<div class="flex flex-wrap items-center gap-1rem">
					<div class="flex items-center gap-0.5rem">
						<span class="text-0.875rem font-600 text-muted-foreground">Group by:</span>
						<div class="flex gap-0.5rem">
							<button
								v-for="option in groupOptions"
								:key="option.value"
								@click="groupBy = option.value as any"
								:class="[
									'px-0.75rem py-0.5rem rounded-lg text-0.875rem font-500 transition-all-0.2s',
									'border border-transparent',
									groupBy === option.value
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-foreground hover:bg-surface-elevated',
								]"
							>
								{{ option.label }}
							</button>
						</div>
					</div>

					<div class="flex-1 min-w-0">
						<div class="relative">
							<Icon
								name="mdi:magnify"
								class="absolute left-0.75rem top-1/2 -translate-y-1/2 w-1rem h-1rem text-muted-foreground"
							/>
							<input
								v-model="searchQuery"
								type="text"
								placeholder="Search repositories..."
								class="w-full pl-2.5rem pr-1rem py-0.5rem rounded-lg border border-border bg-surface text-foreground text-0.875rem focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					</div>

					<button
						v-if="hasActiveFilters"
						@click="clearFilters"
						class="px-0.75rem py-0.5rem rounded-lg text-0.875rem font-500 bg-destructive/10 text-destructive-foreground hover:bg-destructive/20 transition-all-0.2s"
					>
						Clear Filters
					</button>
				</div>

				<div
					v-if="availableGroups.length > 0"
					class="flex flex-wrap gap-0.5rem"
				>
					<Badge
						v-for="group in availableGroups"
						:key="group"
						:variant="isGroupSelected(group) ? 'default' : 'outline'"
						size="sm"
						:class="[
							'cursor-pointer transition-all-0.2s',
							isGroupSelected(group)
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted',
						]"
						@click="toggleGroup(group)"
					>
						{{ group }}
					</Badge>
				</div>
			</div>

			<div
				v-if="groupedRepos.length > 0"
				class="flex flex-col gap-1.5rem"
			>
				<div
					v-for="group in groupedRepos"
					:key="group.label"
					class="flex flex-col gap-1rem"
				>
					<div class="flex items-center gap-0.75rem">
						<Icon
							name="mdi:folder"
							class="w-1.25rem h-1.25rem text-primary"
						/>
						<h2 class="text-1.25rem font-600 m-0 text-foreground">
							{{ group.label }}
						</h2>
						<Badge size="sm" variant="outline">{{ group.count }}</Badge>
					</div>

					<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
						<RepoCard
							v-for="repo in group.repos"
							:key="repo.id"
							:repo="repo"
						/>
					</div>
				</div>
			</div>

			<div v-else class="text-center py-4rem text-muted-foreground">
				<p>No repositories found matching your filters</p>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-gray-600 dark:text-gray-400">
			<p>No projects found</p>
		</div>
	</div>
</template>
