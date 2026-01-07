<script setup lang="ts">
import type { GithubEvent } from "../../../shared/types/github";

const { data: memories, pending, error } = useGithubMemories();

const getEventText = (event: GithubEvent) => {
	switch (event.type) {
		case "CreateEvent":
			return `Created repository: ${event.repo.name}`;
		case "IssuesEvent":
			return `Opened issue in ${event.repo.name}: ${event.payload.issue?.title}`;
		case "PullRequestEvent":
			return `Opened pull request in ${event.repo.name}: ${event.payload.pull_request?.title}`;
		case "PushEvent":
			const commitCount = event.payload.commits?.length || 0;
			return `Pushed ${commitCount} commit${
				commitCount !== 1 ? "s" : ""
			} to ${event.repo.name}`;
		default:
			return `Activity in ${event.repo.name}`;
	}
};

const getEventYear = (dateString: string) => {
	return new Date(dateString).getFullYear();
};

const getEventIcon = (eventType: string) => {
	switch (eventType) {
		case "CreateEvent":
			return "mdi:plus-circle";
		case "IssuesEvent":
			return "mdi:alert-circle";
		case "PullRequestEvent":
			return "mdi:source-pull";
		case "PushEvent":
			return "mdi:git";
		default:
			return "mdi:activity";
	}
};

const getRelativeTime = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) {
		return `${Math.floor(diffDays / 7)} week${
			Math.floor(diffDays / 7) !== 1 ? "s" : ""
		} ago`;
	}
	if (diffDays < 365) {
		return `${Math.floor(diffDays / 30)} month${
			Math.floor(diffDays / 30) !== 1 ? "s" : ""
		} ago`;
	}
	return `${Math.floor(diffDays / 365)} year${
		Math.floor(diffDays / 365) !== 1 ? "s" : ""
	} ago`;
};
</script>

<template>
	<section class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-2xl sm:text-3xl font-bold text-primary dark:text-primary-dark">
				On This Day
			</h2>
			<div class="text-sm text-secondary dark:text-secondary-dark">
				{{ memories?.length || 0 }} memories
			</div>
		</div>

		<!-- Loading State -->
		<div v-if="pending" class="space-y-4">
			<UiSkeletonCard
				v-for="i in 3"
				:key="i"
				:lines="2"
				class="animate-pulse"
			/>
		</div>

		<!-- Error State -->
		<UiErrorBoundary
			v-else-if="error"
			:error="error"
		/>

		<!-- Empty State -->
		<div
			v-else-if="!memories?.length"
			class="text-center py-12 bg-secondary dark:bg-surface-800 rounded-lg border border-custom"
		>
			<Icon
				name="mdi:calendar-blank"
				class="text-4xl text-tertiary dark:text-surface-600 mb-4"
				aria-hidden="true"
			/>
			<h3 class="text-lg font-medium text-primary dark:text-primary-dark mb-2">
				No memories today
			</h3>
			<p class="text-secondary dark:text-secondary-dark">
				Check back tomorrow for GitHub memories from this date in previous
				years.
			</p>
		</div>

		<!-- Memories List -->
		<div
			v-else
			class="space-y-4"
			role="list"
			aria-label="GitHub memories"
		>
			<article
				v-for="event in memories"
				:key="event.id"
				class="group bg-secondary dark:bg-surface-800 border border-custom rounded-lg p-4 transition-all hover:shadow-custom-md hover:border-accent/20 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
				role="listitem"
			>
				<div class="flex items-start gap-4">
					<!-- Year Badge -->
					<div class="flex-shrink-0">
						<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-lg">
							{{ getEventYear(event.created_at) }}
						</div>
					</div>

					<!-- Event Content -->
					<div class="flex-1 min-w-0">
						<div class="flex items-start gap-3">
							<Icon
								:name="getEventIcon(event.type)"
								class="text-lg text-accent flex-shrink-0 mt-1"
								aria-hidden="true"
							/>
							<div class="flex-1 min-w-0">
								<p class="text-primary dark:text-primary-dark font-medium break-words">
									{{ getEventText(event) }}
								</p>
								<div class="flex items-center gap-2 mt-2 text-sm text-secondary dark:text-secondary-dark">
									<Icon
										name="mdi:clock"
										class="w-4 h-4"
										aria-hidden="true"
									/>
									<time :datetime="event.created_at">
										{{ getRelativeTime(event.created_at) }}
									</time>
									<span aria-hidden="true">•</span>
									<span>{{
										new Date(event.created_at).toLocaleDateString()
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	</section>
</template>
