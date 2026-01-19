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

const hasActiveFilters = computed(() =>
	selectedGroups.value.size > 0 || searchQuery.value.length > 0
);
</script>

<template>
	<div class="min-h-100vh">
		<div class="text-center py-16 px-6 pb-12 bg-gradient-to-br from-primary/5 to-background border-b border-border mb-12">
			<div class="max-w-800px mx-auto">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-500 mb-6">
					<Icon name="mdi:rocket-launch" size="20" />
					<span>Projects</span>
				</div>
				<h1 class="text-3rem font-700 mb-4 leading-1.2 text-foreground">My Projects</h1>
				<p class="text-1.25rem text-muted-foreground leading-1.6">Explore my personal projects and contributions</p>
			</div>
		</div>

		<div v-if="repos && repos.length > 0" class="px-6 pb-12 max-w-1400px mx-auto">
			<div class="bg-card border border-border rounded-1rem p-6 mb-8">
				<div class="flex flex-wrap gap-6 items-center mb-4">
					<div class="flex items-center gap-3">
						<span class="text-sm font-600 text-muted-foreground">Group by:</span>
						<div class="flex gap-2">
							<button
								v-for="option in groupOptions"
								:key="option.value"
								@click="groupBy = option.value as any"
								:class="[
									'px-4 py-2 rounded-lg text-sm font-500 border border-transparent bg-muted text-foreground cursor-pointer transition-all-0.2s',
									'hover:bg-accent hover:text-accent-foreground',
									groupBy === option.value ? 'bg-primary text-primary-foreground' : ''
								]"
							>
								{{ option.label }}
							</button>
						</div>
					</div>

					<div class="flex items-center gap-4 flex-1 min-w-0">
						<div class="relative flex-1 min-w-0">
							<Icon
								name="mdi:magnify"
								class="absolute left-3 top-1/2 -translate-y-1/2 w-1rem h-1rem text-muted-foreground"
							/>
							<input
								v-model="searchQuery"
								type="text"
								placeholder="Search repositories..."
								class="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm transition-all-0.2s focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
							/>
						</div>

						<button
							v-if="hasActiveFilters"
							@click="clearFilters"
							class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-500 bg-destructive/10 text-destructive-foreground border-none cursor-pointer transition-all-0.2s hover:bg-destructive/20"
						>
							<Icon name="mdi:close" size="16" />
							<span>Clear Filters</span>
						</button>
					</div>
				</div>

				<div
					v-if="availableGroups.length > 0"
					class="flex flex-wrap gap-2"
				>
					<Badge
						v-for="group in availableGroups"
						:key="group"
						:variant="isGroupSelected(group) ? 'default' : 'outline'"
						size="sm"
						:class="[
							'cursor-pointer transition-all-0.2s',
							'hover:bg-accent',
							isGroupSelected(group) ? 'bg-primary text-primary-foreground' : ''
						]"
						@click="toggleGroup(group)"
					>
						{{ group }}
					</Badge>
				</div>
			</div>

			<div
				v-if="groupedRepos.length > 0"
				class="flex flex-col gap-8"
			>
				<div
					v-for="group in groupedRepos"
					:key="group.label"
					class="flex flex-col gap-4"
				>
					<div class="flex items-center gap-3">
						<Icon
							name="mdi:folder"
							class="w-1.25rem h-1.25rem text-primary"
						/>
						<h2 class="text-1.25rem font-600 m-0 text-foreground">{{ group.label }}</h2>
						<Badge size="sm" variant="outline">{{ group.count }}</Badge>
					</div>

					<div class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
						<RepoCard
							v-for="repo in group.repos"
							:key="repo.id"
							:repo="repo"
						/>
					</div>
				</div>
			</div>

			<div v-else class="flex flex-col items-center justify-center py-16 px-6 text-center">
				<Icon name="mdi:folder-open-outline" size="64" class="text-muted-foreground mb-4" />
				<p class="text-1.125rem text-muted-foreground">No repositories found matching your filters</p>
			</div>
		</div>

		<div v-else class="flex flex-col items-center justify-center py-16 px-6 text-center">
			<Icon name="mdi:folder-off-outline" size="64" class="text-muted-foreground mb-4" />
			<p class="text-1.125rem text-muted-foreground">No projects found</p>
		</div>
	</div>
</template>



