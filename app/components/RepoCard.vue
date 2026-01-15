<script setup lang="ts">
import Badge from "./primitive/Badge.vue";
import Card from "./primitive/Card.vue";
import RepoActions from "./RepoActions.vue";
import RepoCommits from "./RepoCommits.vue";
import RepoReadmeModal from "./RepoReadmeModal.vue";
import RepoStats from "./RepoStats.vue";

interface Props {
	repo: {
		id: number;
		name: string;
		full_name: string;
		description: string | null;
		html_url: string;
		language: string | null;
		stargazers_count: number;
		forks_count: number;
		open_issues_count?: number;
		pulls_count?: number;
		updated_at: string;
		topics: string[];
		fork: boolean;
		archived: boolean;
		readme?: string | null;
		commits?: Array<{
			sha: string;
			message: string;
			date: string;
			url: string;
		}>;
	};
}

const props = defineProps<Props>();

const showReadmeModal = ref(false);
</script>

<template>
	<div
		@click="showReadmeModal = true"
		class="block transition-all-0.3s hover:-translate-y-2px hover:shadow-lg no-underline text-foreground group cursor-pointer"
	>
		<Card variant="default" padding="md" hover>
			<div class="flex items-start justify-between mb-1.25rem">
				<div class="flex items-center gap-0.75rem flex-1">
					<Icon
						name="mdi:source-repository"
						class="w-1.25rem h-1.25rem text-primary shrink-0"
					/>
					<h3 class="text-1.25rem font-600 m-0 truncate">{{ repo.name }}</h3>
				</div>
				<div class="flex items-center gap-0.5rem shrink-0">
					<Badge v-if="repo.fork" size="sm">Fork</Badge>
					<Badge v-if="repo.archived" variant="warning" size="sm"
					>Archived</Badge>
				</div>
			</div>

			<p
				v-if="repo.description"
				class="text-text-secondary mb-1.25rem text-0.875rem line-clamp-2 leading-relaxed"
			>
				{{ repo.description }}
			</p>

			<RepoStats
				:language="repo.language"
				:stargazers-count="repo.stargazers_count"
				:forks-count="repo.forks_count"
				:open-issues-count="repo.open_issues_count"
				:pulls-count="repo.pulls_count"
			/>

			<div
				v-if="repo.topics && repo.topics.length > 0"
				class="flex flex-wrap gap-0.5rem mb-1.25rem"
			>
				<Badge
					v-for="topic in repo.topics.slice(0, 3)"
					:key="topic"
					size="sm"
					class="text-0.75rem"
				>
					{{ topic }}
				</Badge>
				<Badge
					v-if="repo.topics.length > 3"
					size="sm"
					class="text-0.75rem"
				>
					+{{ repo.topics.length - 3 }}
				</Badge>
			</div>

			<div
				v-if="repo.readme"
				class="mb-1.25rem"
			>
				<div class="flex items-center gap-0.5rem px-0 py-0.5rem text-0.875rem font-600 text-muted-foreground">
					<Icon name="mdi:book-open-variant" class="w-1rem h-1rem" />
					<span>Click card to view README</span>
				</div>
			</div>

			<RepoCommits
				v-if="repo.commits && repo.commits.length > 0"
				:commits="repo.commits"
				:updated-at="repo.updated_at"
			/>

			<RepoActions :html-url="repo.html_url" />
		</Card>
	</div>

	<RepoReadmeModal
		:show="showReadmeModal"
		:repo-name="repo.name"
		:readme="repo.readme"
		:html-url="repo.html_url"
		:updated-at="repo.updated_at"
		@close="showReadmeModal = false"
	/>
</template>
