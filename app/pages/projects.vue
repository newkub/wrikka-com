<script setup lang="ts">
const { projects, pending, error } = useProjects();

// SEO
useSEO({
	title: "Projects - Wrikka",
	description:
		"A collection of my work, from personal experiments to open-source contributions.",
	type: "website",
	keywords: [
		"projects",
		"portfolio",
		"open source",
		"github",
		"web development",
		"vue.js",
		"nuxt",
	],
	author: "Veerapong",
});

// State
const sortBy = ref<'stars' | 'updated' | 'name' | 'created'>('stars');
const filterLanguages = ref<string[]>([]);
const filterTopics = ref<string[]>([]);
const showArchived = ref(false);
const showForks = ref(false);

// Computed
const pinnedProjects = computed(() =>
	projects.value?.filter(p => p.isPinned) ?? []
);

const otherProjects = computed(() => {
	let filtered = projects.value?.filter(p => !p.isPinned) ?? [];

	// Apply filters
	if (!showArchived.value) {
		filtered = filtered.filter(p => !p.archived);
	}

	if (!showForks.value) {
		filtered = filtered.filter(p => !p.fork);
	}

	if (filterLanguages.value.length > 0) {
		filtered = filtered.filter(p =>
			p.languages?.some(lang => filterLanguages.value.includes(lang))
		);
	}

	if (filterTopics.value.length > 0) {
		filtered = filtered.filter(p =>
			p.topics?.some(topic => filterTopics.value.includes(topic))
		);
	}

	// Sort
	return filtered.sort((a, b) => {
		switch (sortBy.value) {
			case 'stars':
				return (b.stars || 0) - (a.stars || 0);
			case 'updated':
				return new Date(b.lastUpdated || '0').getTime() - new Date(a.lastUpdated || '0').getTime();
			case 'name':
				return a.name.localeCompare(b.name);
			case 'created':
				return new Date(b.createdAt || '0').getTime() - new Date(a.createdAt || '0').getTime();
			default:
				return 0;
		}
	});
});

// Get available filters
const availableLanguages = computed(() => {
	const languages = new Set<string>();
	projects.value?.forEach(project => {
		project.languages?.forEach(lang => languages.add(lang));
	});
	return Array.from(languages).sort();
});

const availableTopics = computed(() => {
	const topics = new Set<string>();
	projects.value?.forEach(project => {
		project.topics?.forEach(topic => topics.add(topic));
	});
	return Array.from(topics).sort();
});

// Methods
const toggleLanguageFilter = (language: string) => {
	if (filterLanguages.value.includes(language)) {
		filterLanguages.value = filterLanguages.value.filter(l => l !== language);
	} else {
		filterLanguages.value.push(language);
	}
};

const toggleTopicFilter = (topic: string) => {
	if (filterTopics.value.includes(topic)) {
		filterTopics.value = filterTopics.value.filter(t => t !== topic);
	} else {
		filterTopics.value.push(topic);
	}
};

const clearFilters = () => {
	filterLanguages.value = [];
	filterTopics.value = [];
	showArchived.value = false;
	showForks.value = false;
	sortBy.value = 'stars';
};

const getProjectCount = () => {
	return otherProjects.value.length;
};

const getTotalStars = () => {
	return projects.value?.reduce((sum, project) => sum + (project.stars || 0), 0) || 0;
};

const getTotalForks = () => {
	return projects.value?.reduce((sum, project) => sum + (project.forks || 0), 0) || 0;
};
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-primary dark:text-primary-dark">
				My Projects
			</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-secondary">
				A collection of my work, from personal experiments to open-source
				contributions.
			</p>
		</section>

		<div
			v-if="pending"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-800"
			>
				<div class="w-full h-48 bg-surface-200 dark:bg-surface-800"></div>
				<div class="p-6 space-y-4">
					<div class="h-6 bg-surface-200 dark:bg-surface-800 rounded w-3/4">
					</div>
					<div class="h-4 bg-surface-200 dark:bg-surface-800 rounded"></div>
				</div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">
				Could not load projects. Please try again later.
			</p>
		</div>
		<div v-else-if="projects && projects.length" class="space-y-12">
			<!-- Pinned Projects -->
			<section v-if="pinnedProjects.length">
				<h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
					Pinned Projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ProjectsProjectCard
						v-for="project in pinnedProjects"
						:key="project.name"
						:project="project"
					/>
				</div>
			</section>

			<!-- Other Projects -->
			<section v-if="otherProjects.length">
				<h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
					Other Projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ProjectsProjectCard
						v-for="project in otherProjects"
						:key="project.name"
						:project="project"
					/>
				</div>
			</section>
		</div>
		<div v-else class="text-center py-12">
			<p class="text-gray-400">No projects found.</p>
		</div>
	</div>
</template>
