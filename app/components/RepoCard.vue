<script setup lang="ts">
import Card from "./primitive/Card.vue"
import Badge from "./primitive/Badge.vue"

interface Props {
	repo: {
		id: number
		name: string
		full_name: string
		description: string | null
		html_url: string
		language: string | null
		stargazers_count: number
		forks_count: number
		updated_at: string
		topics: string[]
		fork: boolean
		archived: boolean
		commits?: Array<{
			sha: string
			message: string
			date: string
			url: string
		}>
	}
}

const props = defineProps<Props>()

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}
</script>

<template>
	<a
		:href="repo.html_url"
		target="_blank"
		rel="noopener"
		class="block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-gray-900 dark:text-gray-100"
	>
		<Card variant="default" padding="md" hover>
			<div class="flex items-start justify-between mb-1rem">
				<div class="flex items-center gap-0.5rem">
					<Icon name="mdi:source-repository" class="w-1rem h-1rem text-blue-600 dark:text-blue-400" />
					<h3 class="text-1.125rem font-600 m-0">{{ repo.name }}</h3>
					<Badge v-if="repo.fork" size="sm">Fork</Badge>
					<Badge v-if="repo.archived" variant="warning" size="sm">Archived</Badge>
				</div>
			</div>
			<p v-if="repo.description" class="text-gray-600 dark:text-gray-400 mb-1rem text-0.875rem line-clamp-2">{{ repo.description }}</p>
			<div class="flex gap-1rem text-0.875rem text-gray-600 dark:text-gray-400 mb-1rem">
				<span v-if="repo.language" class="flex items-center gap-0.25rem">
					<Icon name="mdi:code-tags" class="w-1rem h-1rem text-purple-600 dark:text-purple-400" />
					{{ repo.language }}
				</span>
				<span class="flex items-center gap-0.25rem">
					<Icon name="mdi:star" class="w-1rem h-1rem" />
					{{ repo.stargazers_count }}
				</span>
				<span class="flex items-center gap-0.25rem">
					<Icon name="mdi:source-fork" class="w-1rem h-1rem" />
					{{ repo.forks_count }}
				</span>
			</div>
			<div v-if="repo.topics && repo.topics.length > 0" class="flex flex-wrap gap-0.5rem mb-1rem">
				<Badge
					v-for="topic in repo.topics.slice(0, 3)"
					:key="topic"
					size="sm"
					variant="default"
					class="text-0.75rem"
				>
					{{ topic }}
				</Badge>
			</div>
			<div v-if="repo.commits && repo.commits.length > 0" class="border-t border-gray-200 dark:border-gray-700 pt-1rem">
				<div class="flex items-center justify-between mb-0.75rem">
					<p class="text-0.75rem font-600 text-gray-600 dark:text-gray-400 m-0">Recent commits</p>
					<span class="text-0.75rem text-gray-500 dark:text-gray-500">Updated {{ formatDate(repo.updated_at) }}</span>
				</div>
				<div class="flex flex-col gap-0.5rem">
					<a
						v-for="commit in repo.commits.slice(0, 3)"
						:key="commit.sha"
						:href="commit.url"
						target="_blank"
						rel="noopener"
						class="group flex items-start gap-0.5rem p-0.5rem rounded-0.25rem text-0.75rem text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all-0.2s no-underline"
						@click.stop
					>
						<span class="font-mono text-blue-600 dark:text-blue-400 text-0.7rem shrink-0">{{ commit.sha.slice(0, 7) }}</span>
						<span class="line-clamp-1 flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors-0.2s">{{ commit.message }}</span>
					</a>
				</div>
			</div>
		</Card>
	</a>
</template>
